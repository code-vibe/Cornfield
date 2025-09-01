# Cornfield Todo Frontend

A modern, responsive React application for managing todos with drag-and-drop functionality.

## Features

-  **Modern React App** - Built with React 18 and functional components
-  **Responsive Design** - Works perfectly on desktop and mobile devices
- **Drag & Drop** - Reorder todos with beautiful drag and drop
-  **Real-time Updates** - Instant UI updates with optimistic rendering
- **Filter System** - View all, active, or completed todos
- **Statistics** - Real-time completion statistics
- **Toast Notifications** - User-friendly feedback for all actions
- **Error Handling** - Graceful error handling with retry options
- **Loading States** - Smooth loading indicators
- **API Integration** - Full integration with the backend API
-  **Docker Ready** - Containerized with Nginx for production

## Core Functionality

###  Required Features:
- **Add new todos** - Type and press Enter or click Add
- **Mark todos as complete** - Click the circular checkbox
- **Delete todos** - Click the delete button (appears on hover)
- **Filter todos** - All/Active/Completed tabs
- **Clear completed todos** - Bulk delete all completed items

###  Bonus Features:
- **Drag and drop reordering** - Drag todos to reorder them
- **Statistics dashboard** - Real-time completion metrics
- **Responsive design** - Mobile-friendly interface
- **Toast notifications** - User feedback for all actions
- **Optimistic updates** - Instant UI updates

## Technology Stack

- **React 18** - Latest React with hooks
- **Axios** - HTTP client for API calls
- **React Beautiful DnD** - Drag and drop functionality
- **React Toastify** - Toast notifications
- **CSS3** - Modern styling with gradients and animations
- **Nginx** - Production web server
- **Docker** - Containerization

## Quick Start

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

### Building for Production

1. **Create production build:**
   ```bash
   npm run build
   ```

2. **Serve the build:**
   ```bash
   npx serve -s build
   ```

### Running with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t todo-frontend .
   ```

2. **Run the container:**
   ```bash
   docker run -p 3000:80 todo-frontend
   ```

## API Integration

The frontend connects to the backend API running on port 5000. It includes:

- **Automatic proxy** - Development server proxies API calls
- **Error handling** - Graceful handling of API failures
- **Health checks** - Automatic backend health verification
- **Optimistic updates** - Instant UI feedback with server sync

### API Endpoints Used:

| Frontend Action | API Endpoint | Method |
|----------------|--------------|---------|
| Load todos | `/api/todos` | GET |
| Add todo | `/api/todos` | POST |
| Update todo | `/api/todos/:id` | PUT |
| Delete todo | `/api/todos/:id` | DELETE |
| Clear completed | `/api/todos/completed/clear` | DELETE |
| Reorder todos | `/api/todos/reorder` | PUT |
| Get statistics | `/api/stats` | GET |

## Component Architecture

```
src/
├── App.js                 # Main application component
├── App.css               # Global styles
├── api.js                # API service layer
├── index.js              # React DOM entry point
└── components/
    ├── TodoForm.js       # Add new todo form
    ├── TodoList.js       # Todo list with drag & drop
    ├── TodoItem.js       # Individual todo item
    ├── FilterTabs.js     # Filter navigation
    ├── TodoStats.js      # Statistics display
    └── TodoFooter.js     # Footer with actions
```

## Styling

The app features a modern design with:

- **Gradient backgrounds** - Beautiful color transitions
- **Smooth animations** - Hover effects and transitions
- **Responsive layout** - Mobile-first design
- **Custom checkboxes** - Styled completion indicators
- **Loading states** - Spinners and skeleton screens
- **Toast notifications** - Non-intrusive user feedback

## Configuration

### Environment Variables

- `NODE_ENV` - Environment mode (development/production)
- `REACT_APP_API_URL` - Backend API URL (optional)

### Proxy Configuration

The development server automatically proxies API calls to `http://localhost:5000` when the backend is running locally.

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## Docker Configuration

### Development
```bash
# Build and run for development
docker build -t todo-frontend-dev --target build .
docker run -p 3000:3000 -v $(pwd):/app todo-frontend-dev npm start
```

### Production
```bash
# Build and run for production
docker build -t todo-frontend .
docker run -p 80:80 todo-frontend
```

## Browser Support

- Chrome 90+
-  Firefox 88+
-  Safari 14+
-  Edge 90+

## Performance Features

- **Code splitting** - Lazy loading of components
- **Asset optimization** - Minified CSS and JS
- **Gzip compression** - Compressed static assets
- **Caching** - Browser caching for static files
- **Optimistic updates** - Instant UI feedback

## Accessibility

- **Keyboard navigation** - Full keyboard support
- **ARIA labels** - Screen reader friendly
- **Focus management** - Proper focus indicators
- **Color contrast** - WCAG compliant colors

