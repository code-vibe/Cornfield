#  Cornfield Todo App

A modern, full-stack todo application built for the Cornfield Group Assessment.

##  Project Overview

This is a complete todo application featuring:
- **Backend**: Node.js REST API with Express
- **Frontend**: React application with modern UI
- **Database**: In-memory storage 
- **Containerization**: Full Docker support with Docker Compose

##  Requirements Completed

### Core Features 
-  Add new todos to the list
- Mark todos as complete
- Delete todos from the list  
- Filter by all/active/complete todos
- Clear all completed todos

### Bonus Features 
-  **Drag and drop to reorder items**
-  Real-time statistics dashboard
-  Toast notifications for user feedback
-  Responsive mobile-friendly design
-  Optimistic UI updates

### Technical Stack 
-  **Backend**: Node.js with Express (preferred)
- **Frontend**: React (preferred)
- **API Documentation**: Comprehensive docs included
- **Docker**: Both frontend and backend containerized
- **Communication**: Frontend makes API calls to backend

##  Quick Start

### Method 1: Docker Compose (Recommended)

**Prerequisites**: Docker and Docker Compose installed

```bash
# Clone or navigate to project directory
cd Cornfield

# Build and run both services
docker-compose up --build

# Or run in background
docker-compose up -d --build
```

**Access the application:**
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:5000/api/health

### Method 2: Local Development

**Prerequisites**: Node.js 16+ installed

```bash
# Start Backend (Terminal 1)
cd server
npm install
npm start

# Start Frontend (Terminal 2) 
cd client
npm install
npm start
```

**Access the application:**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

##  Project Structure

```
Cornfield/
├── server/                 # Backend API
│   ├── server.js          # Main server file
│   ├── package.json       # Backend dependencies
│   ├── Dockerfile         # Backend container config
│   ├── healthcheck.js     # Health check script
│   ├── test-api.js        # API testing script
│   ├── api-tester.html    # Interactive API tester
│   ├── API_DOCUMENTATION.md # Complete API docs
│   └── README.md          # Backend documentation
├── client/                # Frontend React App
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── api.js         # API service layer
│   │   └── components/    # React components
│   ├── public/            # Static assets
│   ├── package.json       # Frontend dependencies
│   ├── Dockerfile         # Production container config
│   ├── Dockerfile.dev     # Development container config
│   ├── nginx.conf         # Nginx configuration
│   └── README.md          # Frontend documentation
├── docker-compose.yml     # Production Docker setup
├── docker-compose.dev.yml # Development Docker setup
└── README.md             # This file
```

## Docker Commands

### Production Build
```bash
# Build and run production containers
docker-compose up --build

# Stop containers
docker-compose down

# View logs
docker-compose logs

# Rebuild specific service
docker-compose build server
docker-compose build client
```

### Development Build
```bash
# Build and run development containers (with hot reload)
docker-compose -f docker-compose.dev.yml up --build

# Stop development containers
docker-compose -f docker-compose.dev.yml down
```

### Individual Container Commands
```bash
# Build backend only
cd server
docker build -t cornfield-api .
docker run -p 5000:5000 cornfield-api

# Build frontend only
cd client
docker build -t cornfield-frontend .
docker run -p 80:80 cornfield-frontend
```

## Configuration

### Environment Variables

**Backend (server/.env):**
```
PORT=5000
NODE_ENV=production
```

**Frontend:**
- Development: Automatically proxies to `http://localhost:5000`
- Production: Uses Nginx reverse proxy to backend

### Port Configuration
- **Frontend**: Port 80 (production) / 3000 (development)
- **Backend**: Port 5000
- **API Endpoints**: `/api/*`

##  API Documentation

Complete API documentation is available at:
- **File**: `server/API_DOCUMENTATION.md`
- **Interactive Tester**: `server/api-tester.html`
- **Health Check**: http://localhost:5000/api/health

### Key Endpoints:
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
- `DELETE /api/todos/completed/clear` - Clear completed
- `PUT /api/todos/reorder` - Reorder todos (drag & drop)
- `GET /api/stats` - Get statistics

##  Testing

### Backend Testing
```bash
cd server

# Test with Node.js script
node test-api.js

# Test with interactive HTML page
open api-tester.html
```

### Frontend Testing
```bash
cd client

# Run React tests
npm test

# Build production version
npm run build
```

### Integration Testing
1. Start both services (Docker or locally)
2. Open frontend in browser
3. Test all CRUD operations
4. Verify drag & drop functionality
5. Test filtering and statistics

## Features Showcase

### Frontend Features:
- **Modern React UI** with hooks and functional components
- **Drag & Drop Reordering** using react-beautiful-dnd
- **Real-time Filtering** (All/Active/Completed)
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Responsive Design** for mobile devices
- **Statistics Dashboard** with completion metrics
- **Optimistic Updates** for smooth UX

### Backend Features:
- **RESTful API** with proper HTTP status codes
- **In-memory Storage** (no database required)
- **CORS Support** for frontend integration
- **Error Handling** with consistent response format
- **Health Checks** for Docker monitoring
- **API Documentation** with examples
- **UUID-based IDs** for unique identification

## Troubleshooting

### Common Issues:

**1. Port Already in Use:**
```bash
# Check what's using the port
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Kill process if needed (Windows)
taskkill /PID <PID> /F
```

**2. Docker Build Issues:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

**3. API Connection Issues:**
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Ensure frontend proxy is configured correctly

**4. Dependencies Issues:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

##Browser Support

- Chrome 90+
-  Firefox 88+ 
- Safari 14+
- Edge 90+

## Performance Features

- **Optimistic Updates** - Instant UI feedback
- **Code Splitting** - Lazy loaded components
- **Asset Optimization** - Minified production builds
- **Nginx Caching** - Static asset caching
- **Gzip Compression** - Reduced transfer sizes

##  Future Enhancements

Potential improvements for production use:
- [ ] Database persistence (MongoDB/PostgreSQL)
- [ ] User authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Progressive Web App (PWA) features
- [ ] Dark theme support
- [ ] Bulk operations (select multiple todos)
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Export/Import functionality


## 📧 Contact
**Mrsamoladapo@gmail.com

For any questions about this implementation, please contact the development team.

---

