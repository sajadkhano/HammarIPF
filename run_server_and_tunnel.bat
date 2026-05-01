@echo off
echo Starting local server on port 8080...
start /b python -m http.server 8080

echo Starting Cloudflare Tunnel...
echo Please copy the URL ending in ".trycloudflare.com" from the output below:
cloudflared.exe tunnel --url http://localhost:8080
pause
