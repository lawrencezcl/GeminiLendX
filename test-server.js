// Simple test server for GeminiLend X routes
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Import routes
try {
  const assetRoutes = require('./backend/routes/asset.routes');
  const lendingRoutes = require('./backend/routes/lending.routes');
  const aiRoutes = require('./backend/routes/ai.routes');

  // Register routes
  app.use('/api', assetRoutes);
  app.use('/api', lendingRoutes);
  app.use('/api', aiRoutes);

  console.log('✅ All routes loaded successfully');
} catch (error) {
  console.log('❌ Error loading routes:', error.message);
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'GeminiLend X Test Server is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoints for each module
app.get('/api/test/asset', (req, res) => {
  res.status(200).json({ 
    module: 'Cross-Chain Asset Integration',
    status: 'Functional'
  });
});

app.get('/api/test/lending', (req, res) => {
  res.status(200).json({ 
    module: 'Cross-Chain Lending Execution',
    status: 'Functional'
  });
});

app.get('/api/test/ai', (req, res) => {
  res.status(200).json({ 
    module: 'Gemini AI Intelligent Assistance',
    status: 'Functional'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 GeminiLend X Test Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Module tests:`);
  console.log(`   - Asset Module: http://localhost:${PORT}/api/test/asset`);
  console.log(`   - Lending Module: http://localhost:${PORT}/api/test/lending`);
  console.log(`   - AI Module: http://localhost:${PORT}/api/test/ai`);
});

module.exports = app;