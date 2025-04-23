@echo off
echo Starting Backend...

rem Set UTF-8 encoding for cmd
start cmd /k "chcp 65001 && cd backend && gradlew.bat bootRun"

echo Starting Frontend...

rem Set UTF-8 encoding for cmd
start cmd /k "chcp 65001 && cd front && npm run dev"

echo All services started.