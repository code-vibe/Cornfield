import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete, onReorder, filter }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Extract IDs in new order
    const todoIds = items.map(item => item.id);
    onReorder(todoIds);
  };

  const getEmptyStateMessage = () => {
    switch (filter) {
      case 'active':
        return {
          icon: '🎉',
          text: 'No active todos!',
          subtext: 'Great job! All your todos are completed.'
        };
      case 'completed':
        return {
          icon: '📝',
          text: 'No completed todos',
          subtext: 'Complete some todos to see them here.'
        };
      default:
        return {
          icon: '📋',
          text: 'No todos yet',
          subtext: 'Add your first todo above to get started!'
        };
    }
  };

  if (todos.length === 0) {
    const emptyState = getEmptyStateMessage();
    return (
      <div className="empty-state">
        <div className="empty-state-icon">{emptyState.icon}</div>
        <div className="empty-state-text">{emptyState.text}</div>
        <div className="empty-state-subtext">{emptyState.subtext}</div>
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todos">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`todo-list ${snapshot.isDraggingOver ? 'drag-over' : ''}`}
          >
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
