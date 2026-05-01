@echo off
echo ============================================
echo   Hammar IPF SCADA - Deploy to GitHub Pages
echo ============================================
echo.
echo STEP 1: Go to https://github.com/new
echo   - Name: hammar-scada
echo   - Make it PUBLIC
echo   - Click "Create repository"
echo.
set /p USERNAME=Enter your GitHub username: 
echo.
echo Pushing to GitHub...
git remote add origin https://github.com/%USERNAME%/hammar-scada.git
git branch -M main
git push -u origin main
echo.
echo Now enable GitHub Pages:
echo   1. Go to https://github.com/%USERNAME%/hammar-scada/settings/pages
echo   2. Under "Source" select "main" branch
echo   3. Click Save
echo.
echo Your site will be live at:
echo   https://%USERNAME%.github.io/hammar-scada/
echo.
echo ============================================
pause
