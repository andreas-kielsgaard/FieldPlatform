@echo off
setlocal

cd /d "%~dp0"

if "%PORT%"=="" set "PORT=4177"
set "URL=http://localhost:%PORT%"

echo Reloading FieldPlatform context wiki on %URL%

powershell -NoProfile -ExecutionPolicy Bypass -Command "$port = [int]$env:PORT; $listeners = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; foreach ($listener in $listeners) { if ($listener -and $listener -ne $PID) { Write-Host ('Stopping process ' + $listener + ' on port ' + $port); Stop-Process -Id $listener -Force -ErrorAction SilentlyContinue } }"

start "FieldPlatform Context Wiki Server" cmd /k "cd /d ""%~dp0"" && set PORT=%PORT%&& node server.js"

echo Waiting for server...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$url = $env:URL + '/api/pages'; for ($i = 0; $i -lt 30; $i++) { try { $response = Invoke-WebRequest -UseBasicParsing -Uri $url -TimeoutSec 1; if ($response.StatusCode -eq 200) { exit 0 } } catch { Start-Sleep -Milliseconds 500 } }; exit 1"

if errorlevel 1 (
  echo Server did not respond at %URL%.
  echo Check the server window for errors.
  exit /b 1
)

start "" "%URL%"
echo Opened %URL%
