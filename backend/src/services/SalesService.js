// Sales Service - Core business logic
import { performSearch, applyFilters, applySorting, paginate, getUniqueValues } from '../utils/dataProcessor.js';

export class SalesService {
  constructor(data) {
    this.data = data;
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

    // Apply search
    let result = performSearch(this.data, search, ['customerName', 'phoneNumber']);

    // Apply filters
    result = applyFilters(result, filters);

    // Apply sorting
    result = applySorting(result, sortBy, sortOrder);

    // Apply pagination
    const paginatedResult = paginate(result, page, pageSize);

    return paginatedResult;
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
      ageRange: {
        min: Math.min(...this.data.map(d => d.age)),
        max: Math.max(...this.data.map(d => d.age))
      },
      dateRange: {
        min: new Date(Math.min(...this.data.map(d => new Date(d.date).getTime()))).toISOString().split('T')[0],
        max: new Date(Math.max(...this.data.map(d => new Date(d.date).getTime()))).toISOString().split('T')[0]
      }
    };
  }

  /**
   * Get a single transaction by ID
   */
  getTransactionById(id) {
    return this.data.find(record => record.transactionId === id) || null;
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    const totalTransactions = this.data.length;
    const totalAmount = this.data.reduce((sum, record) => sum + record.finalAmount, 0);
    const totalQuantity = this.data.reduce((sum, record) => sum + record.quantity, 0);
    const totalDiscount = this.data.reduce((sum, record) => sum + record.totalAmount - record.finalAmount, 0);

    return {
      totalTransactions,
      totalAmount,
      totalQuantity,
      totalDiscount,
      averageOrderValue: totalAmount / totalTransactions
    };
  }

  /**
   * Search with pagination (simplified)
   */
  search(searchTerm, page = 1, pageSize = 10) {
    const result = performSearch(this.data, searchTerm, ['customerName', 'phoneNumber']);
    return paginate(result, page, pageSize);
  }
}

export default SalesService;
