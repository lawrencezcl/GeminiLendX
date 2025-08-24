// Main server file for GeminiLend X backend
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Import routes
const assetRoutes = require('./routes/asset.routes');
const lendingRoutes = require('./routes/lending.routes');
const aiRoutes = require('./routes/ai.routes');

// Register routes
app.use('/api', assetRoutes);
app.use('/api', lendingRoutes);
app.use('/api', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'GeminiLend X Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API documentation endpoint
app.get('/api/docs', (req, res) => {
  res.status(200).json({
    message: 'GeminiLend X API Documentation',
    endpoints: {
      assets: {
        'GET /api/assets/:userAddress': 'Get user\'s cross-chain asset view',
        'POST /api/assets/map': 'Map asset for collateral',
        'POST /api/assets/unmap': 'Unmap asset after repayment',
        'GET /api/assets/health/:userAddress': 'Monitor asset health'
      },
      lending: {
        'POST /api/loans/initiate': 'Initiate a new loan',
        'POST /api/loans/repay': 'Repay a loan',
        'POST /api/loans/liquidate': 'Liquidate an under-collateralized loan',
        'GET /api/loans/:loanId': 'Get loan details'
      },
      ai: {
        'POST /api/ai/parse-request': 'Parse natural language lending request',
        'GET /api/ai/credit-score/:userId': 'Calculate user\'s credit score',
        'GET /api/ai/recommendations': 'Generate asset allocation recommendations',
        'POST /api/ai/loan-advice': 'Get AI-powered loan advice'
      }
    }
  });
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
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GeminiLend X Backend server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📚 API docs: http://localhost:${PORT}/api/docs`);
});

module.exports = app;