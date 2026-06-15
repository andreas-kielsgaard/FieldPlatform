#Requires -RunAsAdministrator

$ErrorActionPreference = "Continue"

$StagingRoot = Resolve-Path (Join-Path $PSScriptRoot "..\..")
$Log = Join-Path $env:TEMP "field-platform-wsl-docker-repair.log"
$DockerDesktop = "C:\Program Files\Docker\Docker\Docker Desktop.exe"

$dockerPaths = @(
  "C:\Program Files\Docker\Docker\resources\bin",
  "C:\Program Files\Docker\cli-plugins",
  (Join-Path $env:USERPROFILE ".docker\cli-plugins"),
  (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Docker.DockerCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\docker"),
  (Join-Path $env:LOCALAPPDATA "Microsoft\WinGet\Packages\Docker.DockerCompose_Microsoft.Winget.Source_8wekyb3d8bbwe")
) | Where-Object { $_ -and (Test-Path $_) }

$env:Path = (($dockerPaths + ($env:Path -split ";")) | Select-Object -Unique) -join ";"

Set-Location $StagingRoot

"Field Platform WSL/Docker repair started at $(Get-Date -Format o)" | Set-Content -Path $Log
"Working directory: $StagingRoot" | Add-Content -Path $Log
"" | Add-Content -Path $Log

function Write-StepHeader {
  param([string] $Label)

  Write-Host ""
  Write-Host "=== $Label ==="
  Add-Content -Path $Log -Value ""
  Add-Content -Path $Log -Value "=== $Label ==="
}

function Invoke-LoggedStep {
  param(
    [string] $Label,
    [scriptblock] $Script,
    [switch] $IgnoreFailure
  )

  Write-StepHeader $Label

  $global:LASTEXITCODE = 0
  $output = & $Script 2>&1
  $success = $?

  if ($null -ne $output) {
    $output | Tee-Object -FilePath $Log -Append
  }

  $code = 0
  if ($global:LASTEXITCODE -ne 0) {
    $code = $global:LASTEXITCODE
  } elseif (-not $success) {
    $code = 1
  }

  Write-Host "Exit code: $code"
  Add-Content -Path $Log -Value "Exit code: $code"

  if ($code -ne 0 -and -not $IgnoreFailure) {
    throw "$Label failed with exit code $code"
  }

  return $code
}

function Wait-ForDockerEngine {
  Write-StepHeader "Wait for Docker engine"

  for ($attempt = 1; $attempt -le 120; $attempt += 1) {
    $global:LASTEXITCODE = 0
    $serverVersion = docker info --format "{{.ServerVersion}}" 2>&1

    if ($LASTEXITCODE -eq 0) {
      "Docker engine is running: $serverVersion" | Tee-Object -FilePath $Log -Append
      return
    }

    if ($attempt -eq 1) {
      "Docker is not ready yet. If Docker Desktop shows a setup prompt or error, handle it now." |
        Tee-Object -FilePath $Log -Append
    }

    Start-Sleep -Seconds 5
  }

  "Docker engine did not become available." | Tee-Object -FilePath $Log -Append
  "Last Docker output:" | Tee-Object -FilePath $Log -Append
  docker info 2>&1 | Tee-Object -FilePath $Log -Append
  throw "Docker engine did not become available within the wait window."
}

try {
  Invoke-LoggedStep "System virtualization summary" {
    systeminfo | Select-String -Pattern "Virtualization|Hyper-V|VM Monitor|Second Level|Data Execution"
  } -IgnoreFailure

  Invoke-LoggedStep "Processor virtualization fields" {
    Get-CimInstance Win32_Processor |
      Select-Object Name, VirtualizationFirmwareEnabled, SecondLevelAddressTranslationExtensions, VMMonitorModeExtensions |
      Format-List
  } -IgnoreFailure

  Invoke-LoggedStep "Corrected Windows optional feature check" {
    "Microsoft-Windows-Subsystem-Linux", "VirtualMachinePlatform", "Microsoft-Hyper-V-All" |
      ForEach-Object {
        Get-WindowsOptionalFeature -Online -FeatureName $_ |
          Select-Object FeatureName, State
      } |
      Format-Table -AutoSize
  } -IgnoreFailure

  Write-Host ""
  Write-Host "Ensuring WSL and Virtual Machine Platform features are enabled..."
  Write-Host "This is safe to rerun. A Windows restart may still be required."

  Invoke-LoggedStep "Enable WSL feature" {
    dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
  } -IgnoreFailure

  Invoke-LoggedStep "Enable Virtual Machine Platform feature" {
    dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
  } -IgnoreFailure

  Invoke-LoggedStep "Current hypervisorlaunchtype" {
    bcdedit /enum "{current}" | Select-String -Pattern "hypervisorlaunchtype"
  } -IgnoreFailure

  Invoke-LoggedStep "Set hypervisorlaunchtype Auto" {
    bcdedit.exe /set hypervisorlaunchtype auto
  } -IgnoreFailure

  Invoke-LoggedStep "WSL update" { wsl.exe --update } -IgnoreFailure
  Invoke-LoggedStep "WSL version" { wsl.exe --version } -IgnoreFailure
  Invoke-LoggedStep "WSL status" { wsl.exe --status } -IgnoreFailure
  Invoke-LoggedStep "WSL distros before Docker restart" { wsl.exe -l -v } -IgnoreFailure

  Invoke-LoggedStep "WSL shutdown" { wsl.exe --shutdown } -IgnoreFailure
  Invoke-LoggedStep "Stop Docker Desktop frontend" {
    taskkill.exe /F /IM "Docker Desktop.exe"
  } -IgnoreFailure
  Invoke-LoggedStep "Stop Docker backend" {
    taskkill.exe /F /IM "com.docker.backend.exe"
  } -IgnoreFailure

  if (-not (Test-Path $DockerDesktop)) {
    throw "Docker Desktop was not found at: $DockerDesktop. Run install-windows-docker-prereqs-admin.bat first."
  }

  Write-Host ""
  Write-Host "Starting Docker Desktop visibly. Complete any prompt it shows."
  Add-Content -Path $Log -Value ""
  Add-Content -Path $Log -Value "Starting Docker Desktop: $DockerDesktop"
  Start-Process -FilePath $DockerDesktop

  Wait-ForDockerEngine

  Invoke-LoggedStep "Docker version" { docker.exe version } -IgnoreFailure
  Invoke-LoggedStep "WSL distros after Docker start" { wsl.exe -l -v } -IgnoreFailure

  Invoke-LoggedStep "Phase 5 verification" {
    corepack.cmd pnpm phase5:verify
  }

  Write-Host ""
  Write-Host "Phase 5 is finalized: Docker, Postgres, and Drizzle migration verification passed."
  Write-Host "Full log: $Log"
  Add-Content -Path $Log -Value ""
  Add-Content -Path $Log -Value "Phase 5 verification passed."
} catch {
  Write-Host ""
  Write-Host "WSL/Docker repair failed:"
  Write-Host $_
  Write-Host ""
  Write-Host "Review the log:"
  Write-Host "  $Log"
  Write-Host ""
  Write-Host "If Docker Desktop still says virtualization support is not detected, check:"
  Write-Host "- HP BIOS virtualization settings"
  Write-Host "- whether Windows needs a restart after enabling WSL/Virtual Machine Platform"
  Write-Host "- enterprise/App Control policy"
  Write-Host "- nested virtualization if this Windows environment is itself a VM"
  Add-Content -Path $Log -Value ""
  Add-Content -Path $Log -Value "FAILED: $_"
  exit 1
}
