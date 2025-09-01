const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage for todos
let todos = [
  {
    id: uuidv4(),
    text: "Complete the Cornfield Group Assessment",
    completed: false,
    createdAt: new Date().toISOString(),
    order: 0
  },
  {
    id: uuidv4(),
    text: "Build an awesome todo app",
    completed: false,
    createdAt: new Date().toISOString(),
    order: 1
  }
];

// Helper function to get next order value
const getNextOrder = () => {
  return todos.length > 0 ? Math.max(...todos.map(todo => todo.order)) + 1 : 0;
};

// Routes

// GET /api/todos - Get all todos
app.get('/api/todos', (req, res) => {
  const { filter } = req.query;
  
  let filteredTodos = todos;
  
  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed);
  } else if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed);
  }
  
  // Sort by order
  filteredTodos.sort((a, b) => a.order - b.order);
  
  res.json({
    success: true,
    data: filteredTodos,
    total: filteredTodos.length
  });
});

// GET /api/todos/:id - Get a specific todo
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todos.find(t => t.id === id);
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  res.json({
    success: true,
    data: todo
  });
});

// POST /api/todos - Create a new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  
  if (!text || text.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Todo text is required'
    });
  }
  
  const newTodo = {
    id: uuidv4(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString(),
    order: getNextOrder()
  };
  
  todos.push(newTodo);
  
  res.status(201).json({
    success: true,
    data: newTodo,
    message: 'Todo created successfully'
  });
});

// PUT /api/todos/:id - Update a todo
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  // Update todo properties
  if (text !== undefined) {
    todos[todoIndex].text = text.trim();
  }
  
  if (completed !== undefined) {
    todos[todoIndex].completed = completed;
  }
  
  todos[todoIndex].updatedAt = new Date().toISOString();
  
  res.json({
    success: true,
    data: todos[todoIndex],
    message: 'Todo updated successfully'
  });
});

// DELETE /api/todos/:id - Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }
  
  const deletedTodo = todos.splice(todoIndex, 1)[0];
  
  res.json({
    success: true,
    data: deletedTodo,
    message: 'Todo deleted successfully'
  });
});

// DELETE /api/todos/completed - Clear all completed todos
app.delete('/api/todos/completed/clear', (req, res) => {
  const completedTodos = todos.filter(todo => todo.completed);
  todos = todos.filter(todo => !todo.completed);
  
  res.json({
    success: true,
    data: completedTodos,
    message: `${completedTodos.length} completed todos cleared`
  });
});

// PUT /api/todos/reorder - Reorder todos (for drag and drop)
app.put('/api/todos/reorder', (req, res) => {
  const { todoIds } = req.body;
  
  if (!Array.isArray(todoIds)) {
    return res.status(400).json({
      success: false,
      message: 'todoIds must be an array'
    });
  }
  
  // Update order based on the new array order
  todoIds.forEach((id, index) => {
    const todo = todos.find(t => t.id === id);
    if (todo) {
      todo.order = index;
    }
  });
  
  // Sort todos by order
  todos.sort((a, b) => a.order - b.order);
  
  res.json({
    success: true,
    data: todos,
    message: 'Todos reordered successfully'
  });
});

// GET /api/stats - Get todo statistics
app.get('/api/stats', (req, res) => {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const active = total - completed;
  
  res.json({
    success: true,
    data: {
      total,
      completed,
      active,
      completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
    }
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Todo API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Todo API server is running on port ${PORT}`);
  console.log(`📖 API Documentation: http://localhost:${PORT}/api/health`);
  console.log(`🔍 Health Check: http://localhost:${PORT}/api/health`);
});
