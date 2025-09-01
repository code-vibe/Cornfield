import React from 'react';

const FilterTabs = ({ currentFilter, onFilterChange, todoCount }) => {
  const filters = [
    { key: 'all', label: 'All', count: todoCount.total },
    { key: 'active', label: 'Active', count: todoCount.active },
    { key: 'completed', label: 'Completed', count: todoCount.completed }
  ];

  return (
    <div className="filter-tabs">
      {filters.map(filter => (
        <button
          key={filter.key}
          className={`filter-tab ${currentFilter === filter.key ? 'active' : ''}`}
          onClick={() => onFilterChange(filter.key)}
        >
          {filter.label}
          {filter.count > 0 && (
            <span className="filter-count"> ({filter.count})</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
