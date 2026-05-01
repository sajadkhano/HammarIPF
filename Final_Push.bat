@echo off
title Hammar IPF - Professional Deployment
echo ======================================================
echo   HAMMAR IPF - AUTOMATED GITHUB DEPLOYMENT
echo ======================================================
echo.

:: Initialize git if not already
if not exist .git (
    echo [1/4] Initializing Git...
    git init
) else (
    echo [1/4] Git already initialized.
)

:: Configure remote (Using your GitHub URL)
echo [2/4] Configuring Remote Origin...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/sajadkhano/HammarIPF.git

:: Stage and Commit
echo [3/4] Staging files and committing changes...
git add .
git commit -m "Professional SCADA Dashboard Release v1.0 - Full Features & Engineering Calc"

:: Push to GitHub
echo [4/4] Pushing to GitHub (Main Branch)...
echo.
echo NOTE: A browser window or login prompt may appear for GitHub authentication.
echo.
git branch -M main
git push -u origin main

echo.
echo ======================================================
echo   SUCCESS: Project uploaded to GitHub!
echo   Your final professional link will be:
echo   https://sajadkhano.github.io/HammarIPF/
echo.
echo   Don't forget to enable GitHub Pages in settings!
echo ======================================================
pause
