import React from 'react';
import '../styles/ActiveFilters.css';

const ActiveFilters = ({ searchTerm, filters, activeFiltersCount, onClearFilters }) => {
  const filterLabels = {
    regions: 'Region',
    genders: 'Gender',
    customerTypes: 'Customer Type',
    orderStatuses: 'Order Status',
    paymentMethods: 'Payment Method',
    deliveryTypes: 'Delivery Type',
    productCategories: 'Product Category',
    discountRange: 'Discount',
    priceRange: 'Price',
    quantityRange: 'Quantity'
  };

  const renderFilterValue = (filterName, value) => {
    if (Array.isArray(value)) {
      return value.join(', ');
    } else if (typeof value === 'object') {
      const parts = [];
      if (value.min !== undefined && value.min !== null) {
        parts.push(`Min: ${value.min}`);
      }
      if (value.max !== undefined && value.max !== null) {
        parts.push(`Max: ${value.max}`);
      }
      return parts.join(' - ');
    }
    return value;
  };

  return (
    <div className="active-filters-container">
      <div className="active-filters-header">
        <span className="filters-title">Active Filters:</span>
        <span className="filters-badge">{searchTerm ? 1 : 0 + activeFiltersCount}</span>
      </div>

      <div className="active-filters-list">
        {/* Search Term Filter */}
        {searchTerm && (
          <div className="filter-tag search-tag">
            <span className="tag-label">Search:</span>
            <span className="tag-value">{searchTerm}</span>
          </div>
        )}

        {/* Applied Filters */}
        {Object.entries(filters).map(([filterName, value]) => {
          if (!value || (Array.isArray(value) && value.length === 0) || (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0)) {
            return null;
          }

          const displayLabel = filterLabels[filterName] || filterName;
          const displayValue = renderFilterValue(filterName, value);

          return (
            <div key={filterName} className="filter-tag">
              <span className="tag-label">{displayLabel}:</span>
              <span className="tag-value">{displayValue}</span>
            </div>
          );
        })}
      </div>

      {(searchTerm || activeFiltersCount > 0) && (
        <button className="clear-all-filters" onClick={onClearFilters}>
          ✕ Clear All
        </button>
      )}
    </div>
  );
};

export default ActiveFilters;
