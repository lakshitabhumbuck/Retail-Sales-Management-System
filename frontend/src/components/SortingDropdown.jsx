import React from 'react';
import '../styles/SortingDropdown.css';

const SortingDropdown = ({ sortBy, sortOrder, onSort }) => {
  return (
    <div className="sorting-dropdown">
      <label htmlFor="sort-select">Sort By:</label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onSort(e.target.value)}
        className="sort-select"
      >
        <option value="date">Date (Newest First)</option>
        <option value="quantity">Quantity</option>
        <option value="customerName">Customer Name (A-Z)</option>
      </select>
      <button 
        className="sort-order-btn"
        onClick={() => onSort(sortBy)}
        title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
      >
        {sortOrder === 'desc' ? '↓' : '↑'}
      </button>
    </div>
  );
};

export default SortingDropdown;
