// Utility functions for filtering, searching, and sorting

/**
 * Validates if a value is a valid number
 * @param {*} value - Value to validate
 * @returns {Boolean}
 */
const isValidNumber = (value) => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

/**
 * Safely converts string to number
 * @param {*} value - Value to convert
 * @param {Number} defaultValue - Default if conversion fails
 * @returns {Number}
 */
const safeNumberConvert = (value, defaultValue = 0) => {
  const num = Number(value);
  return isValidNumber(num) ? num : defaultValue;
};

/**
 * Validates numeric range for conflicts
 * @param {Number} min - Minimum value
 * @param {Number} max - Maximum value
 * @returns {Object} { isValid: Boolean, min: Number, max: Number, error: String }
 */
const validateRange = (min, max) => {
  if (min === undefined || min === null || max === undefined || max === null) {
    return { isValid: true, min, max, error: null };
  }

  const validMin = safeNumberConvert(min, 0);
  const validMax = safeNumberConvert(max, Infinity);

  if (validMin > validMax) {
    return { 
      isValid: false, 
      min: validMax, 
      max: validMin, 
      error: 'Min value cannot be greater than max value. Values have been swapped.' 
    };
  }

  if (validMin === validMax) {
    return { 
      isValid: true, 
      min: validMin, 
      max: validMax, 
      error: 'Range represents a single value.' 
    };
  }

  return { isValid: true, min: validMin, max: validMax, error: null };
};

/**
 * Performs case-insensitive full-text search with edge case handling
 * @param {Array} data - Array of records
 * @param {String} searchTerm - Search term
 * @param {Array} searchFields - Fields to search in
 * @returns {Object} { results: Array, searchApplied: Boolean, resultCount: Number }
 */
export const performSearch = (data, searchTerm, searchFields = ['customerName', 'phoneNumber']) => {
  // Edge case: No data
  if (!Array.isArray(data) || data.length === 0) {
    return { results: [], searchApplied: false, resultCount: 0 };
  }

  // Edge case: Empty search term
  if (!searchTerm || typeof searchTerm !== 'string' || searchTerm.trim() === '') {
    return { results: data, searchApplied: false, resultCount: data.length };
  }

  // Edge case: Invalid search fields
  if (!Array.isArray(searchFields) || searchFields.length === 0) {
    searchFields = ['customerName', 'phoneNumber'];
  }

  const lowerSearchTerm = searchTerm.toLowerCase().trim();
  const results = data.filter(record => {
    if (!record || typeof record !== 'object') {
      return false;
    }

    return searchFields.some(field => {
      try {
        const fieldValue = record[field];
        // Edge case: Missing optional fields
        if (fieldValue === null || fieldValue === undefined) {
          return false;
        }
        return String(fieldValue).toLowerCase().includes(lowerSearchTerm);
      } catch (error) {
        console.warn(`Error searching field ${field}:`, error);
        return false;
      }
    });
  });

  return { results, searchApplied: true, resultCount: results.length };
};

/**
 * Applies multi-select and range-based filters with edge case handling
 * @param {Array} data - Array of records
 * @param {Object} filters - Filter object
 * @returns {Object} { results: Array, warnings: Array, filterCount: Number }
 */
export const applyFilters = (data, filters = {}) => {
  // Edge case: No data
  if (!Array.isArray(data) || data.length === 0) {
    return { results: [], warnings: ['No data available to filter'], filterCount: 0 };
  }

  let filtered = [...data];
  const warnings = [];
  let filterCount = 0;

  try {
    // Filter by Customer Region (multi-select)
    if (filters.regions && Array.isArray(filters.regions) && filters.regions.length > 0) {
      const validRegions = filters.regions.filter(r => r !== null && r !== undefined);
      if (validRegions.length > 0) {
        filtered = filtered.filter(record => 
          record && validRegions.includes(record.customerRegion)
        );
        filterCount++;
      }
    }

    // Filter by Gender (multi-select)
    if (filters.genders && Array.isArray(filters.genders) && filters.genders.length > 0) {
      const validGenders = filters.genders.filter(g => g !== null && g !== undefined);
      if (validGenders.length > 0) {
        filtered = filtered.filter(record => 
          record && validGenders.includes(record.gender)
        );
        filterCount++;
      }
    }

    // Filter by Customer Type
    if (filters.customerTypes && Array.isArray(filters.customerTypes) && filters.customerTypes.length > 0) {
      const validTypes = filters.customerTypes.filter(t => t !== null && t !== undefined);
      if (validTypes.length > 0) {
        filtered = filtered.filter(record => 
          record && validTypes.includes(record.customerType)
        );
        filterCount++;
      }
    }

    // Filter by Order Status
    if (filters.orderStatuses && Array.isArray(filters.orderStatuses) && filters.orderStatuses.length > 0) {
      const validStatuses = filters.orderStatuses.filter(s => s !== null && s !== undefined);
      if (validStatuses.length > 0) {
        filtered = filtered.filter(record => 
          record && validStatuses.includes(record.orderStatus)
        );
        filterCount++;
      }
    }

    // Filter by Payment Method (multi-select)
    if (filters.paymentMethods && Array.isArray(filters.paymentMethods) && filters.paymentMethods.length > 0) {
      const validMethods = filters.paymentMethods.filter(m => m !== null && m !== undefined);
      if (validMethods.length > 0) {
        filtered = filtered.filter(record => 
          record && validMethods.includes(record.paymentMethod)
        );
        filterCount++;
      }
    }

    // Filter by Age Range with validation
    if (filters.ageRange && typeof filters.ageRange === 'object') {
      const rangeValidation = validateRange(filters.ageRange.min, filters.ageRange.max);
      if (rangeValidation.error) {
        warnings.push(`Age Range: ${rangeValidation.error}`);
      }
      if (rangeValidation.isValid) {
        const { min, max } = rangeValidation;
        if (min !== undefined && max !== undefined) {
          const beforeCount = filtered.length;
          filtered = filtered.filter(record => {
            if (!record || isNaN(record.age)) {
              return false; // Edge case: Missing age field
            }
            return record.age >= min && record.age <= max;
          });
          // Edge case: Conflicting filters result in no data
          if (filtered.length === 0 && beforeCount > 0) {
            warnings.push('Age range filters resulted in no matching records.');
          }
          filterCount++;
        }
      }
    }

    // Filter by Product Category (multi-select)
    if (filters.productCategories && Array.isArray(filters.productCategories) && filters.productCategories.length > 0) {
      const validCategories = filters.productCategories.filter(c => c !== null && c !== undefined);
      if (validCategories.length > 0) {
        filtered = filtered.filter(record => 
          record && validCategories.includes(record.productCategory)
        );
        filterCount++;
      }
    }

    // Filter by Tags (multi-select)
    if (filters.tags && Array.isArray(filters.tags) && filters.tags.length > 0) {
      const validTags = filters.tags.filter(t => t !== null && t !== undefined);
      if (validTags.length > 0) {
        filtered = filtered.filter(record => {
          // Edge case: Missing optional tags field
          if (!record || !record.tags || !Array.isArray(record.tags)) {
            return false;
          }
          return validTags.some(tag => record.tags.includes(tag));
        });
        filterCount++;
      }
    }

    // Filter by Price Range with validation
    if (filters.priceRange && typeof filters.priceRange === 'object') {
      const rangeValidation = validateRange(filters.priceRange.min, filters.priceRange.max);
      if (rangeValidation.error) {
        warnings.push(`Price Range: ${rangeValidation.error}`);
      }
      if (rangeValidation.isValid) {
        const { min, max } = rangeValidation;
        if (min !== undefined && max !== undefined) {
          const beforeCount = filtered.length;
          filtered = filtered.filter(record => {
            // Edge case: Missing optional price field
            if (!record || record.finalAmount === undefined || record.finalAmount === null) {
              return false;
            }
            const price = safeNumberConvert(record.finalAmount, 0);
            return price >= min && price <= max;
          });
          if (filtered.length === 0 && beforeCount > 0) {
            warnings.push('Price range filters resulted in no matching records.');
          }
          filterCount++;
        }
      }
    }

    // Filter by Quantity Range with validation
    if (filters.quantityRange && typeof filters.quantityRange === 'object') {
      const rangeValidation = validateRange(filters.quantityRange.min, filters.quantityRange.max);
      if (rangeValidation.error) {
        warnings.push(`Quantity Range: ${rangeValidation.error}`);
      }
      if (rangeValidation.isValid) {
        const { min, max } = rangeValidation;
        if (min !== undefined && max !== undefined) {
          const beforeCount = filtered.length;
          filtered = filtered.filter(record => {
            // Edge case: Missing quantity field
            if (!record || record.quantity === undefined || record.quantity === null) {
              return false;
            }
            const qty = safeNumberConvert(record.quantity, 0);
            return qty >= min && qty <= max;
          });
          if (filtered.length === 0 && beforeCount > 0) {
            warnings.push('Quantity range filters resulted in no matching records.');
          }
          filterCount++;
        }
      }
    }

    // Filter by Date Range
    if (filters.dateRange && typeof filters.dateRange === 'object') {
      const { startDate, endDate } = filters.dateRange;
      if (startDate && endDate) {
        try {
          const start = new Date(startDate).getTime();
          const end = new Date(endDate).getTime();
          
          // Edge case: Invalid date range
          if (isNaN(start) || isNaN(end)) {
            warnings.push('Invalid date range provided.');
          } else if (start > end) {
            warnings.push('Start date is after end date. Dates have been swapped.');
            const beforeCount = filtered.length;
            filtered = filtered.filter(record => {
              if (!record || !record.date) {
                return false;
              }
              const recordDate = new Date(record.date).getTime();
              return recordDate >= end && recordDate <= start;
            });
            if (filtered.length === 0 && beforeCount > 0) {
              warnings.push('Date range filters resulted in no matching records.');
            }
            filterCount++;
          } else {
            const beforeCount = filtered.length;
            filtered = filtered.filter(record => {
              if (!record || !record.date) {
                return false;
              }
              const recordDate = new Date(record.date).getTime();
              return recordDate >= start && recordDate <= end;
            });
            if (filtered.length === 0 && beforeCount > 0) {
              warnings.push('Date range filters resulted in no matching records.');
            }
            filterCount++;
          }
        } catch (error) {
          warnings.push(`Date range error: ${error.message}`);
        }
      }
    }

    // Edge case: Large filter combinations
    if (filterCount > 5) {
      warnings.push(`Multiple filters applied (${filterCount}). Results may be limited. Consider adjusting filters.`);
    }

  } catch (error) {
    warnings.push(`Filtering error: ${error.message}`);
    console.error('Filter error:', error);
  }

  return { results: filtered, warnings, filterCount };
};

/**
 * Sorts data based on sortBy parameter with edge case handling
 * @param {Array} data - Array of records
 * @param {String} sortBy - Sort field
 * @param {String} sortOrder - 'asc' or 'desc'
 * @returns {Object} { data: Array, sortApplied: Boolean }
 */
export const applySorting = (data, sortBy = 'date', sortOrder = 'desc') => {
  // Edge case: No data
  if (!Array.isArray(data) || data.length === 0) {
    return { data: [], sortApplied: false };
  }

  // Edge case: Invalid sort order
  if (!['asc', 'desc'].includes(sortOrder)) {
    sortOrder = 'desc';
  }

  try {
    const sorted = [...data];

    switch (sortBy) {
      case 'date':
        sorted.sort((a, b) => {
          // Edge case: Missing date field
          const dateA = a && a.date ? new Date(a.date).getTime() : 0;
          const dateB = b && b.date ? new Date(b.date).getTime() : 0;
          return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });
        break;

      case 'quantity':
        sorted.sort((a, b) => {
          // Edge case: Missing quantity field
          const qtyA = a && isValidNumber(a.quantity) ? a.quantity : 0;
          const qtyB = b && isValidNumber(b.quantity) ? b.quantity : 0;
          return sortOrder === 'desc' ? qtyB - qtyA : qtyA - qtyB;
        });
        break;

      case 'finalAmount':
      case 'amount':
        sorted.sort((a, b) => {
          // Edge case: Missing amount field
          const amountA = a && isValidNumber(a.finalAmount) ? a.finalAmount : 0;
          const amountB = b && isValidNumber(b.finalAmount) ? b.finalAmount : 0;
          return sortOrder === 'desc' ? amountB - amountA : amountA - amountB;
        });
        break;

      case 'customerName':
        sorted.sort((a, b) => {
          // Edge case: Missing name field
          const nameA = (a && a.customerName ? String(a.customerName) : '').toLowerCase();
          const nameB = (b && b.customerName ? String(b.customerName) : '').toLowerCase();
          if (sortOrder === 'desc') {
            return nameB.localeCompare(nameA);
          } else {
            return nameA.localeCompare(nameB);
          }
        });
        break;

      case 'age':
        sorted.sort((a, b) => {
          // Edge case: Missing age field
          const ageA = a && isValidNumber(a.age) ? a.age : 0;
          const ageB = b && isValidNumber(b.age) ? b.age : 0;
          return sortOrder === 'desc' ? ageB - ageA : ageA - ageB;
        });
        break;

      default:
        return { data: sorted, sortApplied: false };
    }

    return { data: sorted, sortApplied: true };
  } catch (error) {
    console.error('Sorting error:', error);
    return { data: data, sortApplied: false };
  }
};

/**
 * Paginates data with edge case handling
 * @param {Array} data - Array of records
 * @param {Number} page - Page number (1-indexed)
 * @param {Number} pageSize - Items per page
 * @returns {Object} Paginated result with data and metadata
 */
export const paginate = (data, page = 1, pageSize = 10) => {
  // Edge case: No data
  if (!Array.isArray(data)) {
    data = [];
  }

  // Edge case: Invalid page number
  page = Math.max(1, safeNumberConvert(page, 1));

  // Edge case: Invalid page size
  pageSize = Math.max(1, Math.min(100, safeNumberConvert(pageSize, 10)));

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize);

  // Edge case: Page exceeds total pages
  if (page > totalPages && totalPages > 0) {
    page = totalPages;
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: page,
      pageSize,
      totalItems,
      totalPages: Math.max(1, totalPages),
      hasNextPage: endIndex < totalItems,
      hasPreviousPage: page > 1,
      itemsInCurrentPage: paginatedData.length
    }
  };
};

/**
 * Extracts unique values from a field across all records with edge case handling
 * @param {Array} data - Array of records
 * @param {String} field - Field name
 * @returns {Array} Unique values
 */
export const getUniqueValues = (data, field) => {
  // Edge case: No data
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Edge case: Invalid field
  if (!field || typeof field !== 'string') {
    return [];
  }

  const values = new Set();

  data.forEach(record => {
    try {
      if (!record || typeof record !== 'object') {
        return;
      }

      const value = record[field];
      // Edge case: Missing optional fields
      if (value === null || value === undefined || value === '') {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach(v => {
          if (v !== null && v !== undefined && v !== '') {
            values.add(v);
          }
        });
      } else {
        values.add(value);
      }
    } catch (error) {
      console.warn(`Error extracting value from field ${field}:`, error);
    }
  });

  return Array.from(values).sort();
};
