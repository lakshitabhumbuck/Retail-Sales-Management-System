// API service for backend communication
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000
});

export const transactionService = {
  /**
   * Fetch transactions with search, filters, sort, and pagination
   */
  getTransactions: async (params) => {
    try {
      const queryParams = {
        search: params.search || '',
        filters: JSON.stringify(params.filters || {}),
        sortBy: params.sortBy || 'date',
        sortOrder: params.sortOrder || 'desc',
        page: params.page || 1,
        pageSize: params.pageSize || 10
      };

      const response = await api.get('/transactions', { params: queryParams });
      return response.data;
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw error;
    }
  },

  /**
   * Get filter options
   */
  getFilterOptions: async () => {
    try {
      const response = await api.get('/filters/options');
      return response.data;
    } catch (error) {
      console.error('Error fetching filter options:', error);
      throw error;
    }
  },

  /**
   * Search transactions
   */
  search: async (searchTerm, page = 1) => {
    try {
      const response = await api.get('/search', {
        params: { q: searchTerm, page, pageSize: 10 }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  /**
   * Get summary statistics
   */
  getSummary: async () => {
    try {
      const response = await api.get('/summary');
      return response.data;
    } catch (error) {
      console.error('Error fetching summary:', error);
      throw error;
    }
  },

  /**
   * Get single transaction
   */
  getTransactionById: async (id) => {
    try {
      const response = await api.get(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw error;
    }
  }
};

export default transactionService;
