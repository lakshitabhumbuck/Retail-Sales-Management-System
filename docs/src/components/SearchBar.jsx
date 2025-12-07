import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearch, onClear }) => {
  return (
    <div className="search-bar">
      <div className="search-input-group">
        <input
          type="text"
          className="search-input"
          placeholder="Search by Customer Name or Phone Number..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
        {searchTerm && (
          <button className="search-clear-btn" onClick={onClear} title="Clear search">
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
