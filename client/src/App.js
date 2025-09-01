import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

import { todoAPI } from './api';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import FilterTabs from './components/FilterTabs';
import TodoStats from './components/TodoStats';
import TodoFooter from './components/TodoFooter';

function App() {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, active: 0, completed: 0 });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load todos on component mount
  useEffect(() => {
    loadTodos();
    checkServerHealth();
  }, []);

  // Update filtered todos when todos or filter changes
  useEffect(() => {
    filterTodos();
    updateStats();
  }, [todos, currentFilter]);

  const checkServerHealth = async () => {
    try {
      await todoAPI.healthCheck();
      console.log('✅ Backend server is healthy');
    } catch (error) {
      console.warn('⚠️ Backend server health check failed:', error.message);
      toast.warn('Unable to connect to server. Some features may not work.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  const loadTodos = async () => {
    try {
      setError(null);
      const response = await todoAPI.getTodos();
      setTodos(response.data || []);
    } catch (error) {
      console.error('Failed to load todos:', error);
      setError('Failed to load todos. Please check if the server is running.');
      toast.error('Failed to load todos', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setInitialLoading(false);
    }
  };

  const filterTodos = () => {
    let filtered = todos;

    switch (currentFilter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = todos.filter(todo => todo.completed);
        break;
      default:
        filtered = todos;
    }

    // Sort by order
    filtered.sort((a, b) => a.order - b.order);
    setFilteredTodos(filtered);
  };

  const updateStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;

    setStats({ total, active, completed });
  };

  const handleAddTodo = async (text) => {
    try {
      setLoading(true);
      const response = await todoAPI.createTodo(text);
      
      if (response.success) {
        setTodos(prev => [...prev, response.data]);
        toast.success('Todo added successfully!', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      console.error('Failed to add todo:', error);
      toast.error('Failed to add todo', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      // Optimistic update
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed } : todo
        )
      );

      const response = await todoAPI.updateTodo(id, { completed });
      
      if (response.success) {
        // Update with server response
        setTodos(prev => 
          prev.map(todo => 
            todo.id === id ? response.data : todo
          )
        );
        
        toast.success(
          completed ? 'Todo completed! 🎉' : 'Todo marked as active',
          {
            position: 'top-right',
            autoClose: 1500,
          }
        );
      }
    } catch (error) {
      // Revert optimistic update
      setTodos(prev => 
        prev.map(todo => 
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
      
      console.error('Failed to update todo:', error);
      toast.error('Failed to update todo', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      // Optimistic update
      const todoToDelete = todos.find(todo => todo.id === id);
      setTodos(prev => prev.filter(todo => todo.id !== id));

      const response = await todoAPI.deleteTodo(id);
      
      if (response.success) {
        toast.success('Todo deleted', {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Revert optimistic update
      if (todoToDelete) {
        setTodos(prev => [...prev, todoToDelete].sort((a, b) => a.order - b.order));
      }
      
      console.error('Failed to delete todo:', error);
      toast.error('Failed to delete todo', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleClearCompleted = async () => {
    try {
      setLoading(true);
      const completedTodos = todos.filter(todo => todo.completed);
      
      // Optimistic update
      setTodos(prev => prev.filter(todo => !todo.completed));

      const response = await todoAPI.clearCompleted();
      
      if (response.success) {
        toast.success(`${completedTodos.length} completed todos cleared!`, {
          position: 'top-right',
          autoClose: 2000,
        });
      }
    } catch (error) {
      // Revert optimistic update
      loadTodos();
      
      console.error('Failed to clear completed todos:', error);
      toast.error('Failed to clear completed todos', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReorderTodos = async (todoIds) => {
    try {
      // Optimistic update
      const reorderedTodos = todoIds.map((id, index) => {
        const todo = todos.find(t => t.id === id);
        return { ...todo, order: index };
      });
      setTodos(reorderedTodos);

      const response = await todoAPI.reorderTodos(todoIds);
      
      if (response.success) {
        // Update with server response if needed
        setTodos(response.data);
      }
    } catch (error) {
      // Revert to original order
      loadTodos();
      
      console.error('Failed to reorder todos:', error);
      toast.error('Failed to reorder todos', {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  const handleRetry = () => {
    setInitialLoading(true);
    loadTodos();
  };

  if (initialLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="loading-spinner"></div>
          Loading todos...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error">
          <div className="error-icon">⚠️</div>
          <div className="error-text">Oops! Something went wrong</div>
          <div>{error}</div>
          <button className="retry-btn" onClick={handleRetry}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Cornfield Todo</h1>
        <p className="app-subtitle">Get things done, beautifully</p>
        <TodoStats stats={stats} />
      </header>

      <TodoForm onAdd={handleAddTodo} loading={loading} />

      <FilterTabs
        currentFilter={currentFilter}
        onFilterChange={setCurrentFilter}
        todoCount={stats}
      />

      <TodoList
        todos={filteredTodos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
        onReorder={handleReorderTodos}
        filter={currentFilter}
      />

      {todos.length > 0 && (
        <TodoFooter
          totalCount={stats.total}
          activeCount={stats.active}
          completedCount={stats.completed}
          onClearCompleted={handleClearCompleted}
          loading={loading}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
