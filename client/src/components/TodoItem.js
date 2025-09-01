import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TodoItem = ({ todo, index, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id, !todo.completed);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`todo-item ${todo.completed ? 'completed' : ''} ${
            snapshot.isDragging ? 'dragging' : ''
          }`}
        >
          <div
            {...provided.dragHandleProps}
            className="drag-handle"
            title="Drag to reorder"
          >
            ⋮⋮
          </div>
          
          <div
            className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
            onClick={handleToggle}
            title={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          />
          
          <span className="todo-text">{todo.text}</span>
          
          <div className="todo-actions">
            <button
              className="delete-btn"
              onClick={handleDelete}
              title="Delete todo"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
