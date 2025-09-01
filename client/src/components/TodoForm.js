import React, { useState } from 'react';

const TodoForm = ({ onAdd, loading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedText = text.trim();
    
    if (trimmedText) {
      onAdd(trimmedText);
      setText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="input-container">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What needs to be done?"
          className="todo-input"
          disabled={loading}
          maxLength={200}
        />
        <button 
          type="submit" 
          className="add-btn"
          disabled={!text.trim() || loading}
        >
          {loading ? (
            <>
              <span className="loading-spinner"></span>
              Adding...
            </>
          ) : (
            'Add Todo'
          )}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
