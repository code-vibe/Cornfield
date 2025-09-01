@echo off
echo 🐳 Cornfield Todo App - Docker Deployment Script
echo =================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    echo    Download from: https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo ✅ Docker is installed

REM Check if Docker Compose is available
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    docker compose version >nul 2>&1
    if %errorlevel% neq 0 (
        echo ❌ Docker Compose is not available. Please install Docker Compose.
        pause
        exit /b 1
    )
)

echo ✅ Docker Compose is available
echo.

echo 🚀 Starting Cornfield Todo App...
echo.

REM Stop any existing containers
echo 🛑 Stopping existing containers...
docker-compose down

REM Build and start services
echo 🔨 Building and starting services...
docker-compose up --build -d

REM Wait a moment for services to start
echo ⏳ Waiting for services to initialize...
timeout /t 15 /nobreak >nul

REM Check service status
echo.
echo 📊 Service Status:
docker-compose ps

echo.
echo 🎉 Deployment complete!
echo.
echo 📱 Access your application:
echo    Frontend: http://localhost:80
echo    Backend API: http://localhost:5000/api/health
echo.
echo 📋 Useful commands:
echo    View logs: docker-compose logs
echo    Stop services: docker-compose down
echo    Restart: docker-compose restart
echo.

pause
