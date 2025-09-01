import React from 'react';

const TodoStats = ({ stats }) => {
  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats">
      <div className="stat-item">
        <span className="stat-number">{stats.total}</span>
        <span className="stat-label">Total</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{stats.active}</span>
        <span className="stat-label">Active</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{stats.completed}</span>
        <span className="stat-label">Done</span>
      </div>
      <div className="stat-item">
        <span className="stat-number">{completionRate}%</span>
        <span className="stat-label">Complete</span>
      </div>
    </div>
  );
};

export default TodoStats;
