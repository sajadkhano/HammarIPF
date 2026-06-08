@echo off
echo Starting local server on port 8089...
start /b python -m http.server 8089

echo Starting Cloudflare Tunnel...
echo Please copy the URL ending in ".trycloudflare.com" from the output below:
cloudflared.exe tunnel --url http://localhost:8089
pause
