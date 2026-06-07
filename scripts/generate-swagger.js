// This script can be used to generate Swagger JSON from the built application
// Run with: npm run swagger:generate

const fs = require('fs');
const path = require('path');

console.log('To generate Swagger documentation:');
console.log('1. Make sure the application is running');
console.log('2. The openapi.json is automatically generated in the public/ folder');
console.log('3. Access it at: http://localhost:3000/swagger');
console.log('4. For static documentation, open: http://localhost:3000/swagger-ui.html');
