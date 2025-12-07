// SalesService.js - Core business logic
import { performSearch, applyFilters, applySorting, paginate, getUniqueValues } from '../utils/dataProcessor.js';

export class SalesService {
  constructor(data) {
    if (!data || !Array.isArray(data)) {
      console.warn('SalesService: No data provided or data is not an array.');
      this.data = [];
    } else {
      this.data = data;
    }
  }

  /**
   * Get all transactions with search, filters, sorting, and pagination
   */
  getTransactions(params = {}) {
    const {
      search = '',
      filters = {},
      sortBy = 'date',
      sortOrder = 'desc',
      page = 1,
      pageSize = 10
    } = params;

    // Defensive: Ensure we have data
    if (!this.data.length) {
      return {
        success: true,
        data: [],
        pagination: {
          currentPage: page,
          pageSize,
          totalItems: 0,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
          itemsInCurrentPage: 0
        }
      };
    }

    // Apply search
    let result = performSearch(this.data, search, ['customerName', 'phoneNumber']);

    // Apply filters
    result = applyFilters(result, filters);

    // Apply sorting
    result = applySorting(result, sortBy, sortOrder);

    // Apply pagination
    const paginatedResult = paginate(result, page, pageSize);

    return {
      success: true,
      data: paginatedResult.items,
      pagination: {
        currentPage: page,
        pageSize,
        totalItems: result.length,
        totalPages: Math.ceil(result.length / pageSize),
        hasNextPage: page < Math.ceil(result.length / pageSize),
        hasPreviousPage: page > 1,
        itemsInCurrentPage: paginatedResult.items.length
      }
    };
  }

  /**
   * Get filter options for UI dropdowns
   */
  getFilterOptions() {
    return {
      regions: getUniqueValues(this.data, 'customerRegion'),
      genders: getUniqueValues(this.data, 'gender'),
      categories: getUniqueValues(this.data, 'productCategory'),
      tags: getUniqueValues(this.data, 'tags'),
      paymentMethods: getUniqueValues(this.data, 'paymentMethod'),
      ageRange: this.data.length
        ? {
            min: Math.min(...this.data.map(d => d.age)),
            max: Math.max(...this.data.map(d => d.age))
          }
        : { min: 0, max: 0 },
      dateRange: this.data.length
        ? {
            min: new Date(Math.min(...this.data.map(d => new Date(d.date).getTime())))
              .toISOString()
              .split('T')[0],
            max: new Date(Math.max(...this.data.map(d => new Date(d.date).getTime())))
              .toISOString()
              .split('T')[0]
          }
        : { min: null, max: null }
    };
  }

  /**
   * Get a single transaction by ID
   */
  getTransactionById(id) {
    const record = this.data.find(record => record.transactionId === id);
    return record ? { success: true, data: record } : { success: false, error: 'Transaction not found' };
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    if (!this.data.length) {
      return { totalTransactions: 0, totalAmount: 0, totalQuantity: 0, totalDiscount: 0, averageOrderValue: 0 };
    }

    const totalTransactions = this.data.length;
    const totalAmount = this.data.reduce((sum, record) => sum + record.finalAmount, 0);
    const totalQuantity = this.data.reduce((sum, record) => sum + record.quantity, 0);
    const totalDiscount = this.data.reduce((sum, record) => sum + (record.totalAmount - record.finalAmount), 0);

    return { totalTransactions, totalAmount, totalQuantity, totalDiscount, averageOrderValue: totalAmount / totalTransactions };
  }

  /**
   * Search with pagination (simplified)
   */
  search(searchTerm, page = 1, pageSize = 10) {
    const result = performSearch(this.data, searchTerm, ['customerName', 'phoneNumber']);
    const paginatedResult = paginate(result, page, pageSize);
    return { success: true, data: paginatedResult.items, total: result.length };
  }
}

export default SalesService;
