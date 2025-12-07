// Main server entry point
import express from 'express';
import cors from 'cors';
import SalesService from './services/SalesService.js';
import createSalesRoutes from './routes/salesRoutes.js';
import sampleData from './models/sampleData.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize service with sample data
const salesService = new SalesService(sampleData);

// Routes
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

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📊 API available at /api`);
});
