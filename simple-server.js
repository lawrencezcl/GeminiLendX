// Simple HTTP server for testing without external dependencies
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Simple routing function
function handleRequest(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Route handling
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>GeminiLend X - Health Check</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .success { color: green; }
          .error { color: red; }
          .info { color: blue; }
        </style>
      </head>
      <body>
        <h1>GeminiLend X Health Check</h1>
        <p class="success">✅ Server is running successfully!</p>
        <h2>Available Endpoints:</h2>
        <ul>
          <li><strong>GET /</strong> - This health check page</li>
          <li><strong>GET /health</strong> - JSON health status</li>
          <li><strong>GET /structure</strong> - Project structure information</li>
        </ul>
        <h2>Next Steps:</h2>
        <p>To run the full application with all features:</p>
        <ol>
          <li>Install dependencies: <code>npm install</code></li>
          <li>Start the development server: <code>npm run dev</code></li>
        </ol>
      </body>
      </html>
    `);
  } else if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'OK',
      message: 'GeminiLend X is running',
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }));
  } else if (req.url === '/structure' && req.method === 'GET') {
    // Get project structure info
    const getDirInfo = (dirPath) => {
      try {
        const items = fs.readdirSync(dirPath);
        return items.length;
      } catch (err) {
        return 'Error reading directory';
      }
    };
    
    const structure = {
      backend: {
        controllers: getDirInfo(path.join(__dirname, 'backend', 'controllers')),
        models: getDirInfo(path.join(__dirname, 'backend', 'models')),
        routes: getDirInfo(path.join(__dirname, 'backend', 'routes')),
        services: getDirInfo(path.join(__dirname, 'backend', 'services'))
      },
      frontend: getDirInfo(path.join(__dirname, 'frontend')),
      contracts: getDirInfo(path.join(__dirname, 'contracts')),
      database: getDirInfo(path.join(__dirname, 'database')),
      docs: getDirInfo(path.join(__dirname, 'docs'))
    };
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      projectStructure: structure,
      message: 'Project structure information'
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'Not Found',
      message: `Route ${req.url} not found`
    }));
  }
}

// Create and start server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`🚀 Simple GeminiLend X Server running on port ${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`📂 Structure info: http://localhost:${PORT}/structure`);
  console.log(`🌐 Homepage: http://localhost:${PORT}/`);
});

// Handle server errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
    server.listen(PORT + 1);
  } else {
    console.error('Server error:', err);
  }
});