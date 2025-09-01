# Todo API Documentation

## Base URL
```
http://localhost:5000/api
```

## Overview
This is a RESTful API for managing todos with full CRUD operations, filtering, and drag-and-drop reordering capabilities.

## Response Format
All API responses follow this format:
```json
{
  "success": boolean,
  "data": object | array,
  "message": string,
  "total": number (for list endpoints)
}
```

## Todo Object Structure
```json
{
  "id": "string (UUID)",
  "text": "string",
  "completed": "boolean",
  "createdAt": "string (ISO date)",
  "updatedAt": "string (ISO date, optional)",
  "order": "number"
}
```

## Endpoints

### 1. Get All Todos
**GET** `/todos`

**Query Parameters:**
- `filter` (optional): `all` | `active` | `completed`

**Example Request:**
```bash
GET /api/todos?filter=active
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "Complete the project",
      "completed": false,
      "createdAt": "2025-08-31T10:00:00.000Z",
      "order": 0
    }
  ],
  "total": 1
}
```

### 2. Get Single Todo
**GET** `/todos/:id`

**Example Request:**
```bash
GET /api/todos/123e4567-e89b-12d3-a456-426614174000
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "text": "Complete the project",
    "completed": false,
    "createdAt": "2025-08-31T10:00:00.000Z",
    "order": 0
  }
}
```

### 3. Create New Todo
**POST** `/todos`

**Request Body:**
```json
{
  "text": "string (required)"
}
```

**Example Request:**
```bash
POST /api/todos
Content-Type: application/json

{
  "text": "Learn React"
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174001",
    "text": "Learn React",
    "completed": false,
    "createdAt": "2025-08-31T10:30:00.000Z",
    "order": 1
  },
  "message": "Todo created successfully"
}
```

### 4. Update Todo
**PUT** `/todos/:id`

**Request Body:**
```json
{
  "text": "string (optional)",
  "completed": "boolean (optional)"
}
```

**Example Request:**
```bash
PUT /api/todos/123e4567-e89b-12d3-a456-426614174000
Content-Type: application/json

{
  "completed": true
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "text": "Complete the project",
    "completed": true,
    "createdAt": "2025-08-31T10:00:00.000Z",
    "updatedAt": "2025-08-31T11:00:00.000Z",
    "order": 0
  },
  "message": "Todo updated successfully"
}
```

### 5. Delete Todo
**DELETE** `/todos/:id`

**Example Request:**
```bash
DELETE /api/todos/123e4567-e89b-12d3-a456-426614174000
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "text": "Complete the project",
    "completed": true,
    "createdAt": "2025-08-31T10:00:00.000Z",
    "order": 0
  },
  "message": "Todo deleted successfully"
}
```

### 6. Clear Completed Todos
**DELETE** `/todos/completed/clear`

**Example Request:**
```bash
DELETE /api/todos/completed/clear
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "Completed task",
      "completed": true,
      "createdAt": "2025-08-31T10:00:00.000Z",
      "order": 0
    }
  ],
  "message": "1 completed todos cleared"
}
```

### 7. Reorder Todos (Drag & Drop)
**PUT** `/todos/reorder`

**Request Body:**
```json
{
  "todoIds": ["id1", "id2", "id3"]
}
```

**Example Request:**
```bash
PUT /api/todos/reorder
Content-Type: application/json

{
  "todoIds": [
    "123e4567-e89b-12d3-a456-426614174001",
    "123e4567-e89b-12d3-a456-426614174000"
  ]
}
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "123e4567-e89b-12d3-a456-426614174001",
      "text": "Learn React",
      "completed": false,
      "order": 0
    },
    {
      "id": "123e4567-e89b-12d3-a456-426614174000",
      "text": "Complete the project",
      "completed": true,
      "order": 1
    }
  ],
  "message": "Todos reordered successfully"
}
```

### 8. Get Statistics
**GET** `/stats`

**Example Request:**
```bash
GET /api/stats
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "total": 5,
    "completed": 2,
    "active": 3,
    "completionRate": 40
  }
}
```

### 9. Health Check
**GET** `/health`

**Example Request:**
```bash
GET /api/health
```

**Example Response:**
```json
{
  "success": true,
  "message": "Todo API is running!",
  "timestamp": "2025-08-31T12:00:00.000Z",
  "version": "1.0.0"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Todo text is required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Todo not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Something went wrong!"
}
```

## Features Implemented

✅ **Core Features:**
- Add new todos
- Mark todos as complete/incomplete
- Delete individual todos
- Filter todos (all/active/completed)
- Clear all completed todos

✅ **Bonus Features:**
- Drag and drop reordering
- Todo statistics
- Comprehensive error handling
- Health check endpoint

✅ **Technical Features:**
- RESTful API design
- UUID for unique IDs
- ISO timestamp tracking
- CORS enabled for frontend integration
- Proper HTTP status codes
- Consistent response format

## Testing the API

You can test the API using tools like:
- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)
- **REST Client** (VS Code extension)

### Example cURL Commands:

```bash
# Get all todos
curl -X GET http://localhost:5000/api/todos

# Create a new todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test todo"}'

# Update a todo
curl -X PUT http://localhost:5000/api/todos/{id} \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Delete a todo
curl -X DELETE http://localhost:5000/api/todos/{id}
```
