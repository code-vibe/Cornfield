#!/bin/bash

echo "🐳 Cornfield Todo App - Docker Deployment Script"
echo "================================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check if Docker is installed
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "   Download from: https://www.docker.com/products/docker-desktop"
    exit 1
fi

# Check if Docker Compose is available
if ! command_exists docker-compose && ! docker compose version >/dev/null 2>&1; then
    echo "❌ Docker Compose is not available. Please install Docker Compose."
    exit 1
fi

echo "✅ Docker is installed"
echo "✅ Docker Compose is available"

# Function to use docker-compose or docker compose
docker_compose_cmd() {
    if command_exists docker-compose; then
        docker-compose "$@"
    else
        docker compose "$@"
    fi
}

echo ""
echo "🚀 Starting Cornfield Todo App..."
echo ""

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker_compose_cmd down

# Build and start services
echo "🔨 Building and starting services..."
docker_compose_cmd up --build -d

# Wait a moment for services to start
echo "⏳ Waiting for services to initialize..."
sleep 10

# Check service status
echo ""
echo "📊 Service Status:"
docker_compose_cmd ps

# Test backend health
echo ""
echo "🏥 Testing backend health..."
if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
    echo "✅ Backend is healthy"
else
    echo "⚠️  Backend health check failed"
fi

# Test frontend
echo ""
echo "🌐 Testing frontend..."
if curl -f http://localhost:80 >/dev/null 2>&1; then
    echo "✅ Frontend is accessible"
else
    echo "⚠️  Frontend accessibility check failed"
fi

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📱 Access your application:"
echo "   Frontend: http://localhost:80"
echo "   Backend API: http://localhost:5000/api/health"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose logs"
echo "   Stop services: docker-compose down"
echo "   Restart: docker-compose restart"
echo ""
