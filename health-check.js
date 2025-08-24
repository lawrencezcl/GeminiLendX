// Simple health check script for GeminiLend X
const fs = require('fs');
const path = require('path');

console.log('=== GeminiLend X Health Check ===\n');

// Check if required directories exist
const requiredDirs = ['backend', 'frontend', 'contracts', 'docs', 'database'];
console.log('1. Checking project structure...');
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (fs.existsSync(dirPath)) {
    console.log(`   ✅ ${dir} directory exists`);
  } else {
    console.log(`   ❌ ${dir} directory missing`);
  }
});

// Check if required files exist
const requiredFiles = ['package.json', 'README.md', '.env.example'];
console.log('\n2. Checking required files...');
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`   ✅ ${file} exists`);
  } else {
    console.log(`   ❌ ${file} missing`);
  }
});

// Check backend structure
console.log('\n3. Checking backend structure...');
const backendDirs = ['controllers', 'models', 'routes', 'services'];
backendDirs.forEach(dir => {
  const dirPath = path.join(__dirname, 'backend', dir);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    console.log(`   ✅ backend/${dir} exists (${files.length} files)`);
  } else {
    console.log(`   ❌ backend/${dir} missing`);
  }
});

// Check if server.js exists
const serverPath = path.join(__dirname, 'backend', 'server.js');
if (fs.existsSync(serverPath)) {
  console.log('   ✅ backend/server.js exists');
} else {
  console.log('   ❌ backend/server.js missing');
}

console.log('\n=== Health Check Complete ===');
console.log('\nNote: To run the full application, you need to:');
console.log('1. Install dependencies with "npm install"');
console.log('2. Set up your environment variables (.env file)');
console.log('3. Run the server with "npm run dev"');