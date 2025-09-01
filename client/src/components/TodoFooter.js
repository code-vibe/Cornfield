import React from 'react';

const TodoFooter = ({ 
  totalCount, 
  activeCount, 
  completedCount, 
  onClearCompleted, 
  loading 
}) => {
  const getCountText = () => {
    if (totalCount === 0) return 'No todos';
    if (activeCount === 0) return 'All done! 🎉';
    if (activeCount === 1) return '1 item left';
    return `${activeCount} items left`;
  };

  return (
    <div className="todo-footer">
      <span className="todo-count">
        {getCountText()}
      </span>
      
      {completedCount > 0 && (
        <button
          className="clear-completed-btn"
          onClick={onClearCompleted}
          disabled={loading}
        >
          {loading ? 'Clearing...' : `Clear Completed (${completedCount})`}
        </button>
      )}
    </div>
  );
};

export default TodoFooter;
