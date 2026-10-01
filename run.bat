@echo off
title Asem Portfolio
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto nonode

if not exist node_modules echo Installing packages for the first time, this takes a minute...
if not exist node_modules call npm install
if not exist .env.local copy .env.example .env.local >nul

echo.
echo Starting the site. The browser will open automatically.
echo Dashboard login: admin@asem.com / Admin@123456
echo To stop the site, close this window or press Ctrl+C.
echo.

start "" cmd /c "timeout /t 8 /nobreak >nul & start http://localhost:3000"
call npm run dev
pause
exit /b

:nonode
echo Node.js is not installed. Download the LTS version from https://nodejs.org then run this file again.
pause
