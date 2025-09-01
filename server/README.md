# Todo API Server

A RESTful API server for managing todos, built with Node.js and Express.

## Features

- Full CRUD operations for todos
- In-memory storage (no database required)
- Filter todos by status (all/active/completed)
- Drag and drop reordering support
- Clear completed todos
- Todo statistics
- Comprehensive API documentation
- Docker support
-  Health check endpoint
- CORS enabled for frontend integration

## Quick Start

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Or start the production server:**
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`

### Running with Docker

1. **Build the Docker image:**
   ```bash
   docker build -t todo-api .
   ```

2. **Run the container:**
   ```bash
   docker run -p 5000:5000 todo-api
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos (with optional filter) |
| GET | `/api/todos/:id` | Get a specific todo |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |
| DELETE | `/api/todos/completed/clear` | Clear all completed todos |
| PUT | `/api/todos/reorder` | Reorder todos (drag & drop) |
| GET | `/api/stats` | Get todo statistics |
| GET | `/api/health` | Health check |

## Example Usage

### Create a new todo:
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Learn Docker"}'
```

### Get all active todos:
```bash
curl "http://localhost:5000/api/todos?filter=active"
```

### Mark a todo as completed:
```bash
curl -X PUT http://localhost:5000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

## Configuration

The server uses the following environment variables:

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)

## Data Storage

This API uses in-memory storage, which means:
-  No database setup required
-  Fast performance
-  Data is lost when server restarts
-  Not suitable for production with persistence requirements

For production use, consider integrating with a database like MongoDB, PostgreSQL, or MySQL.

## Health Check

The API includes a health check endpoint at `/api/health` that returns:
```json
{
  "success": true,
  "message": "Todo API is running!",
  "timestamp": "2025-08-31T12:00:00.000Z",
  "version": "1.0.0"
}
```

## Development

### Project Structure
```
server/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── Dockerfile            # Docker configuration
├── healthcheck.js        # Docker health check
├── API_DOCUMENTATION.md  # Detailed API docs
└── README.md            # This file
```

### Adding New Features

1. Add new routes in `server.js`
2. Update the API documentation
3. Test the endpoints
4. Update Docker configuration if needed

## Testing

You can test the API using:
- **Postman** - Import the endpoints
- **cURL** - Command line testing
- **Thunder Client** - VS Code extension
- **REST Client** - VS Code extension

## Docker Commands

```bash
# Build the image
docker build -t todo-api .

# Run the container
docker run -p 5000:5000 todo-api

# Run with environment variables
docker run -p 5000:5000 -e PORT=3000 todo-api

# Run in background
docker run -d -p 5000:5000 --name todo-api-container todo-api

# View logs
docker logs todo-api-container

# Stop the container
docker stop todo-api-container
```

