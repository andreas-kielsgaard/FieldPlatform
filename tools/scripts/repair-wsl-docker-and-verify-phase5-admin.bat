@echo off
setlocal EnableExtensions

cd /d "%~dp0..\.."

echo Field Platform WSL/Docker repair and Phase 5 verifier
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

powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0repair-wsl-docker-and-verify-phase5-admin.ps1"
set "REPAIR_EXIT=%ERRORLEVEL%"

echo.
if not "%REPAIR_EXIT%"=="0" (
  echo WSL/Docker repair did not complete successfully.
  echo Review the log printed above, then rerun this BAT as Administrator.
  pause
  exit /b %REPAIR_EXIT%
)

echo WSL/Docker repair and Phase 5 verification completed successfully.
pause
exit /b 0
