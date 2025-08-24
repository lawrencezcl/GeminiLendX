// Local test script to verify project structure without external dependencies
const fs = require('fs');
const path = require('path');

console.log('=== GeminiLend X Local Test ===\n');

// Function to test if a file can be imported
function testImport(filePath, description) {
  try {
    require(filePath);
    console.log(`✅ ${description} - Import successful`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - Import failed: ${error.message.split('\n')[0]}`);
    return false;
  }
}

// Test importing route files
console.log('1. Testing route imports...');
testImport('./backend/routes/asset.routes.js', 'Asset routes');
testImport('./backend/routes/lending.routes.js', 'Lending routes');
testImport('./backend/routes/ai.routes.js', 'AI routes');

// Test importing controller files
console.log('\n2. Testing controller imports...');
testImport('./backend/controllers/asset.controller.js', 'Asset controller');
testImport('./backend/controllers/lending.controller.js', 'Lending controller');
testImport('./backend/controllers/ai.controller.js', 'AI controller');

// Test importing service files
console.log('\n3. Testing service imports...');
testImport('./backend/services/zetchain.service.js', 'ZetaChain service');
testImport('./backend/services/gemini.service.js', 'Gemini service');
testImport('./backend/services/price.service.js', 'Price service');

// Test importing model files
console.log('\n4. Testing model imports...');
testImport('./backend/models/User.js', 'User model');
testImport('./backend/models/Loan.js', 'Loan model');
testImport('./backend/models/Endorsement.js', 'Endorsement model');

// Check if all required directories exist
console.log('\n5. Checking directory structure...');
const requiredDirs = [
  'backend/controllers',
  'backend/models',
  'backend/routes',
  'backend/services',
  'backend/tests',
  'contracts',
  'database',
  'docs',
  'frontend',
  'scripts'
];

requiredDirs.forEach(dir => {
  const fullPath = path.join(__dirname, dir);
  if (fs.existsSync(fullPath)) {
    const items = fs.readdirSync(fullPath);
    console.log(`   ✅ ${dir} (${items.length} items)`);
  } else {
    console.log(`   ❌ ${dir} (missing)`);
  }
});

console.log('\n=== Local Test Complete ===');
console.log('\nNote: Some import tests may fail due to missing dependencies.');
console.log('This is expected in a local test environment without full setup.');
console.log('\nTo run the full application:');
console.log('1. Install all dependencies with "npm install"');
console.log('2. Set up environment variables');
console.log('3. Run "npm run dev" to start the server');