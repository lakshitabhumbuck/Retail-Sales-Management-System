// Sales Controller - Request handling
import SalesService from '../services/SalesService.js';

export class SalesController {
  constructor(salesService) {
    this.salesService = salesService;
  }

  /**
   * Get all transactions with query parameters
   */
  getTransactions(req, res) {
    try {
      const {
        search = '',
        filters = '{}',
        sortBy = 'date',
        sortOrder = 'desc',
        page = '1',
        pageSize = '10'
      } = req.query;

      // Parse filters if it's a string
      let parsedFilters = {};
      if (typeof filters === 'string') {
        try {
          parsedFilters = JSON.parse(filters);
        } catch (e) {
          parsedFilters = {};
        }
      } else {
        parsedFilters = filters;
      }

      const params = {
        search: String(search),
        filters: parsedFilters,
        sortBy: String(sortBy),
        sortOrder: String(sortOrder),
        page: Math.max(1, parseInt(page, 10)),
        pageSize: Math.max(1, Math.min(100, parseInt(pageSize, 10)))
      };

      const result = this.salesService.getTransactions(params);

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get filter options
   */
  getFilterOptions(req, res) {
    try {
      const options = this.salesService.getFilterOptions();
      res.json({
        success: true,
        data: options
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get transaction by ID
   */
  getTransactionById(req, res) {
    try {
      const { id } = req.params;
      const transaction = this.salesService.getTransactionById(id);

      if (!transaction) {
        return res.status(404).json({
          success: false,
          error: 'Transaction not found'
        });
      }

      res.json({
        success: true,
        data: transaction
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Get summary statistics
   */
  getSummary(req, res) {
    try {
      const summary = this.salesService.getSummary();
      res.json({
        success: true,
        data: summary
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  /**
   * Search transactions
   */
  search(req, res) {
    try {
      const { q = '', page = '1', pageSize = '10' } = req.query;

      const result = this.salesService.search(
        String(q),
        Math.max(1, parseInt(page, 10)),
        Math.max(1, Math.min(100, parseInt(pageSize, 10)))
      );

      res.json({
        success: true,
        data: result.data,
        pagination: result.pagination
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

export default SalesController;
