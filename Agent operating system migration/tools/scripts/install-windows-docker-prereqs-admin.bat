@echo off
setlocal EnableExtensions

cd /d "%~dp0..\.."

echo Field Platform Docker Desktop and WSL2 prerequisite installer
echo.

net session >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo This script must be run as Administrator.
  echo.
  echo Right-click this file and choose "Run as administrator":
  echo   %~f0
  echo.
  pause
  exit /b 1
)

where powershell.exe >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo PowerShell was not found on PATH.
  pause
  exit /b 1
)

where winget.exe >nul 2>&1
if not "%ERRORLEVEL%"=="0" (
  echo winget was not found on PATH. Install App Installer from Microsoft Store, then rerun this script.
  pause
  exit /b 1
)

echo Running Administrator-only prerequisite setup...
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0install-windows-docker-prereqs.ps1"
if not "%ERRORLEVEL%"=="0" (
  echo.
  echo Docker prerequisite setup failed. Review the messages above, then rerun this script as Administrator.
  pause
  exit /b 1
)

echo.
echo Setup command completed.
echo.
echo If Windows or Docker Desktop asks for a restart, restart Windows now.
echo After restart, launch Docker Desktop and wait for it to say the engine is running.
echo.
echo Then verify Phase 5 from this folder:
echo   cd /d "%CD%"
echo   corepack pnpm phase5:verify
echo.
pause
