@echo off
chcp 65001 > nul
powershell -ExecutionPolicy Bypass -File "%~dp0generate-adr-index.ps1"
echo.
pause
