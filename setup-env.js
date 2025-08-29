const fs = require('fs');
const path = require('path');

console.log('🌤️ Weather App Environment Setup');
console.log('==================================\n');

// Check if .env files already exist
const serverEnvPath = path.join(__dirname, 'server', '.env');
const clientEnvPath = path.join(__dirname, 'client', '.env');

if (fs.existsSync(serverEnvPath)) {
  console.log('✅ Server .env file already exists');
} else {
  console.log('❌ Server .env file not found');
  console.log('Please create server/.env with the following content:');
  console.log('WEATHER_API_KEY=your_actual_api_key_here');
  console.log('PORT=5000\n');
}

if (fs.existsSync(clientEnvPath)) {
  console.log('✅ Client .env file already exists');
} else {
  console.log('❌ Client .env file not found');
  console.log('Please create client/.env with the following content:');
  console.log('VITE_API_BASE_URL=http://localhost:5000\n');
}

console.log('📋 Setup Instructions:');
console.log('1. Get your OpenWeather API key from: https://openweathermap.org/api');
console.log('2. Create server/.env file with your API key');
console.log('3. Create client/.env file with the API base URL');
console.log('4. Restart the servers\n');

console.log('🔧 Example server/.env content:');
console.log('WEATHER_API_KEY=1234567890abcdef1234567890abcdef');
console.log('PORT=5000\n');

console.log('🔧 Example client/.env content:');
console.log('VITE_API_BASE_URL=http://localhost:5000\n');

console.log('🚀 After setting up the environment files, run:');
console.log('npm run dev');

