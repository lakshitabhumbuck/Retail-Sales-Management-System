import React, { useState } from 'react';
import '../styles/FilterPanel.css';

const FilterPanel = ({ filterOptions, filters, onFilterChange, onClearFilters }) => {
  const [expandedFilters, setExpandedFilters] = useState({});

  if (!filterOptions) {
    return <div className="filter-panel">Loading filters...</div>;
  }

  const toggleFilter = (filterName) => {
    setExpandedFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const handleMultiSelectChange = (filterName, value) => {
    const currentValues = filters[filterName] || [];
    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter(v => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    onFilterChange(filterName, newValues.length > 0 ? newValues : undefined);
  };

  const handleRangeChange = (filterName, field, value) => {
    const currentRange = filters[filterName] || {};
    const newRange = {
      ...currentRange,
      [field]: value ? (field === 'min' || field === 'max' ? parseInt(value, 10) : value) : undefined
    };

    // Remove undefined values
    Object.keys(newRange).forEach(key => newRange[key] === undefined && delete newRange[key]);

    onFilterChange(filterName, Object.keys(newRange).length > 0 ? newRange : undefined);
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        {Object.keys(filters).length > 0 && (
          <button className="clear-filters-btn" onClick={onClearFilters}>
            Clear All
          </button>
        )}
      </div>

      {/* Region Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('regions')}
        >
          <span>Customer Region</span>
          <span className={expandedFilters.regions ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.regions && (
          <div className="filter-options">
            {filterOptions.regions?.map(region => (
              <label key={region} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.regions?.includes(region) || false}
                  onChange={(e) => handleMultiSelectChange('regions', region)}
                />
                <span>{region}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Gender Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('genders')}
        >
          <span>Gender</span>
          <span className={expandedFilters.genders ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.genders && (
          <div className="filter-options">
            {filterOptions.genders?.map(gender => (
              <label key={gender} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.genders?.includes(gender) || false}
                  onChange={(e) => handleMultiSelectChange('genders', gender)}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Age Range Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('ageRange')}
        >
          <span>Age Range</span>
          <span className={expandedFilters.ageRange ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.ageRange && filterOptions.ageRange && (
          <div className="filter-range">
            <div className="range-input">
              <label>Min:</label>
              <input
                type="number"
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
                value={filters.ageRange?.min || filterOptions.ageRange.min}
                onChange={(e) => handleRangeChange('ageRange', 'min', e.target.value)}
              />
            </div>
            <div className="range-input">
              <label>Max:</label>
              <input
                type="number"
                min={filterOptions.ageRange.min}
                max={filterOptions.ageRange.max}
                value={filters.ageRange?.max || filterOptions.ageRange.max}
                onChange={(e) => handleRangeChange('ageRange', 'max', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Product Category Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('categories')}
        >
          <span>Product Category</span>
          <span className={expandedFilters.categories ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.categories && (
          <div className="filter-options">
            {filterOptions.categories?.map(category => (
              <label key={category} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category) || false}
                  onChange={(e) => handleMultiSelectChange('categories', category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Tags Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('tags')}
        >
          <span>Tags</span>
          <span className={expandedFilters.tags ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.tags && (
          <div className="filter-options">
            {filterOptions.tags?.map(tag => (
              <label key={tag} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.tags?.includes(tag) || false}
                  onChange={(e) => handleMultiSelectChange('tags', tag)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Payment Method Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('paymentMethods')}
        >
          <span>Payment Method</span>
          <span className={expandedFilters.paymentMethods ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.paymentMethods && (
          <div className="filter-options">
            {filterOptions.paymentMethods?.map(method => (
              <label key={method} className="filter-option">
                <input
                  type="checkbox"
                  checked={filters.paymentMethods?.includes(method) || false}
                  onChange={(e) => handleMultiSelectChange('paymentMethods', method)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Date Range Filter */}
      <div className="filter-group">
        <button 
          className="filter-title" 
          onClick={() => toggleFilter('dateRange')}
        >
          <span>Date Range</span>
          <span className={expandedFilters.dateRange ? 'arrow-up' : 'arrow-down'}>▼</span>
        </button>
        {expandedFilters.dateRange && filterOptions.dateRange && (
          <div className="filter-range">
            <div className="range-input">
              <label>Start:</label>
              <input
                type="date"
                value={filters.dateRange?.startDate || filterOptions.dateRange.min}
                onChange={(e) => handleRangeChange('dateRange', 'startDate', e.target.value)}
              />
            </div>
            <div className="range-input">
              <label>End:</label>
              <input
                type="date"
                value={filters.dateRange?.endDate || filterOptions.dateRange.max}
                onChange={(e) => handleRangeChange('dateRange', 'endDate', e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterPanel;
