@echo off
setlocal EnableExtensions EnableDelayedExpansion

cd /d "%~dp0..\.."

echo Field Platform Phase 5 Docker/Postgres verifier
echo.

set "DOCKER_DESKTOP=C:\Program Files\Docker\Docker\Docker Desktop.exe"
set "PATH=C:\Program Files\Docker\Docker\resources\bin;C:\Program Files\Docker\cli-plugins;%USERPROFILE%\.docker\cli-plugins;%LOCALAPPDATA%\Microsoft\WinGet\Packages\Docker.DockerCLI_Microsoft.Winget.Source_8wekyb3d8bbwe\docker;%LOCALAPPDATA%\Microsoft\WinGet\Packages\Docker.DockerCompose_Microsoft.Winget.Source_8wekyb3d8bbwe;%PATH%"

where powershell.exe >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo PowerShell was not found on PATH.
  pause
  exit /b 1
)

echo Checking whether Windows exposes CPU virtualization to WSL2...
for /f "usebackq delims=" %%V in (`powershell.exe -NoProfile -Command "$p = Get-CimInstance Win32_Processor | Select-Object -First 1; if ($p.VirtualizationFirmwareEnabled -and $p.SecondLevelAddressTranslationExtensions -and $p.VMMonitorModeExtensions) { 'True' } else { 'False' }"`) do set "VIRT_READY=%%V"

if /I not "%VIRT_READY%"=="True" (
  echo.
  echo Windows processor virtualization fields are not all True.
  echo This can indicate a BIOS/nested-virtualization issue, but it can also be inconclusive when Hyper-V/VBS is already active.
  echo.
  powershell.exe -NoProfile -Command "Get-CimInstance Win32_Processor | Select-Object Name,VirtualizationFirmwareEnabled,SecondLevelAddressTranslationExtensions,VMMonitorModeExtensions | Format-List"
  echo.
  echo Continuing to Docker startup. For deeper repair, run:
  echo   tools\scripts\repair-wsl-docker-and-verify-phase5-admin.bat
)

if not exist "%DOCKER_DESKTOP%" (
  echo Docker Desktop was not found at:
  echo   %DOCKER_DESKTOP%
  echo.
  echo Run install-windows-docker-prereqs-admin.bat as Administrator first.
  pause
  exit /b 1
)

where docker.exe >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo docker.exe was not found on PATH.
  echo Run install-windows-docker-prereqs-admin.bat as Administrator first.
  pause
  exit /b 1
)

where corepack.cmd >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo corepack.cmd was not found on PATH.
  echo Install/repair Node 24 and Corepack, then rerun this script.
  pause
  exit /b 1
)

docker --version
docker compose version

echo.
echo Starting Docker Desktop...
start "" "%DOCKER_DESKTOP%"

echo Waiting for Docker engine to become available...
set "DOCKER_INFO=%TEMP%\field-platform-docker-info.txt"

for /L %%I in (1,1,90) do (
  docker info --format "{{.ServerVersion}}" > "%DOCKER_INFO%" 2>&1
  if "!ERRORLEVEL!"=="0" (
    set /p DOCKER_SERVER_VERSION=<"%DOCKER_INFO%"
    echo Docker engine is running: !DOCKER_SERVER_VERSION!
    goto verify_phase5
  )

  if %%I==1 (
    echo Docker is still starting. If Docker Desktop shows setup prompts, complete them.
  )

  timeout /t 5 /nobreak >nul
)

echo.
echo Docker engine did not become available within the wait window.
echo Last Docker output:
type "%DOCKER_INFO%"
echo.
echo Open Docker Desktop, resolve any visible prompt or error, then run this BAT again.
pause
exit /b 1

:verify_phase5
echo.
echo Running Field Platform Phase 5 verification...
corepack pnpm phase5:verify
if not "%ERRORLEVEL%"=="0" (
  echo.
  echo Phase 5 verification failed. Review the messages above, then rerun this BAT.
  pause
  exit /b 1
)

echo.
echo Phase 5 is finalized: Docker, Postgres, and Drizzle migration verification passed.
pause
