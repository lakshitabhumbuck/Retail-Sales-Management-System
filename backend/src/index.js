// Main server entry point
import express from 'express';
import cors from 'cors';
import SalesService from './services/SalesService.js';
import createSalesRoutes from './routes/salesRoutes.js';
import sampleData from './models/sampleData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.1.2:3000', 'http://172.21.160.1:3000'],
  credentials: true
}));
app.use(express.json());

// Initialize service with sample data
const salesService = new SalesService(sampleData);

// Routes (ALL API ROUTES START WITH /api)
app.use('/api', createSalesRoutes(salesService));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server (Works locally + Render)
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📊 Transactions API: http://localhost:${PORT}/api/transactions`);
});
