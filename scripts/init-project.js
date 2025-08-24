// Script to initialize the GeminiLend X project
const fs = require('fs');
const path = require('path');

console.log('Initializing GeminiLend X project...');

// Check if required directories exist, create if they don't
const requiredDirs = ['backend', 'frontend', 'contracts', 'docs', 'database', 'scripts'];

requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Check if required files exist, create if they don't
const requiredFiles = [
  '.env.example',
  'README.md',
  'package.json'
];

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing required file: ${file}`);
  }
});

console.log('Project initialization check complete.');
console.log('Next steps:');
console.log('1. Copy .env.example to .env and fill in your API keys');
console.log('2. Run "npm install" in the root directory');
console.log('3. Set up your database using the schema in database/schema.sql');
console.log('4. Start the development server with "npm run dev"');