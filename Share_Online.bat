@echo off
title Hammar IPF - Online Share
color 0A

echo ===============================================================
echo     HAMMAR IPF - SMART SCADA (ONLINE SHARING SYSTEM)
echo ===============================================================
echo.
echo 1. Starting the local server on port 8080...
start /b python -m http.server 8080 >nul 2>&1

echo 2. Requesting a public internet link from Cloudflare...
echo.
echo ===============================================================
echo  PLEASE WAIT 5 SECONDS...
echo  COPY THE LINK THAT LOOKS LIKE:  https://-----.trycloudflare.com
echo ===============================================================
echo.

.\cloudflared.exe tunnel --url http://localhost:8080

echo.
pause
