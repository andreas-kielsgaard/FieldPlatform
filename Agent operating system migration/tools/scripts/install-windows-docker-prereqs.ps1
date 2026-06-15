#Requires -RunAsAdministrator

$ErrorActionPreference = "Stop"

Write-Host "Enabling Windows features required for WSL2..."
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

Write-Host "Installing WSL without a default Linux distribution..."
wsl.exe --install --no-distribution

Write-Host "Installing Docker Desktop..."
winget install -e --id Docker.DockerDesktop --accept-package-agreements --accept-source-agreements

Write-Host ""
Write-Host "Docker Desktop prerequisites are installed."
Write-Host "Restart Windows if prompted, launch Docker Desktop, then run:"
Write-Host "  corepack pnpm phase5:verify"
