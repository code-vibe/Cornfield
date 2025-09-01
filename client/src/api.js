import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'http://localhost:5000/api' 
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const todoAPI = {
  // Get all todos with optional filter
  getTodos: async (filter = 'all') => {
    const params = filter !== 'all' ? { filter } : {};
    const response = await api.get('/todos', { params });
    return response.data;
  },

  // Get a specific todo
  getTodo: async (id) => {
    const response = await api.get(`/todos/${id}`);
    return response.data;
  },

  // Create a new todo
  createTodo: async (text) => {
    const response = await api.post('/todos', { text });
    return response.data;
  },

  // Update a todo
  updateTodo: async (id, updates) => {
    const response = await api.put(`/todos/${id}`, updates);
    return response.data;
  },

  // Delete a todo
  deleteTodo: async (id) => {
    const response = await api.delete(`/todos/${id}`);
    return response.data;
  },

  // Clear completed todos
  clearCompleted: async () => {
    const response = await api.delete('/todos/completed/clear');
    return response.data;
  },

  // Reorder todos (for drag and drop)
  reorderTodos: async (todoIds) => {
    const response = await api.put('/todos/reorder', { todoIds });
    return response.data;
  },

  // Get todo statistics
  getStats: async () => {
    const response = await api.get('/stats');
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

export default api;
