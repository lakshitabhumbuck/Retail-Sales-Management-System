// API Routes
import express from 'express';
import SalesController from '../controllers/SalesController.js';

export const createSalesRoutes = (salesService) => {
  const router = express.Router();
  const controller = new SalesController(salesService);

  // Transaction endpoints
  router.get('/transactions', (req, res) => controller.getTransactions(req, res));
  router.get('/transactions/:id', (req, res) => controller.getTransactionById(req, res));
  router.get('/search', (req, res) => controller.search(req, res));

  // Filter and metadata endpoints
  router.get('/filters/options', (req, res) => controller.getFilterOptions(req, res));
  router.get('/summary', (req, res) => controller.getSummary(req, res));

  return router;
};

export default createSalesRoutes;
