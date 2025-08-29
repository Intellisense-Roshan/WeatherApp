# 🌤️ Weather App - Full Stack

A modern, responsive weather application that provides real-time weather data for any city in the world. Built with React, Node.js, and the OpenWeather API.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **5-Day Forecast**: View detailed weather predictions
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern UI**: Clean, glassmorphism design with Tailwind CSS
- **Error Handling**: Graceful error handling for API failures
- **Loading States**: Smooth loading animations
- **Weather Icons**: Dynamic weather condition icons
- **Search Functionality**: Easy city search with suggestions

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variable management

### APIs
- **OpenWeather API** - Weather data provider

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- OpenWeather API key

### 1. Clone the Repository
```bash
git clone <repository-url>
cd WeatherApp
```

### 2. Get OpenWeather API Key
1. Visit [OpenWeather API](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key from the dashboard

### 3. Set Up Environment Variables
Copy the example environment file and add your API key:

```bash
# For the main project
cp env.example .env

# For the server
cp server/env.example server/.env
```

Edit the `.env` files and add your OpenWeather API key:
```env
WEATHER_API_KEY=your_actual_api_key_here
```

### 4. Install Dependencies
```bash
# Install all dependencies (root, client, and server)
npm run install-all
```

### 5. Start the Development Servers
```bash
# Start both frontend and backend
npm run dev
```

This will start:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📁 Project Structure

```
WeatherApp/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── SearchBar.jsx
│   │   │   ├── WeatherCard.jsx
│   │   │   └── ForecastList.jsx
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── index.js           # Express server
│   ├── package.json
│   └── .env               # Server environment variables
├── package.json           # Root package.json
└── README.md
```

## 🎨 Components

### SearchBar
- City input field with search button
- Loading state during API calls
- Enter key support
- Placeholder suggestions

### WeatherCard
- Current temperature and conditions
- Weather icon based on conditions
- Detailed metrics (humidity, wind, pressure, visibility)
- Sunrise/sunset times
- Responsive grid layout

### ForecastList
- 5-day weather forecast
- Daily high/low temperatures
- Weather conditions and icons
- Humidity and wind data
- Responsive card grid

## 🌐 API Endpoints

### Backend Routes
- `GET /api/weather?city={city}` - Get current weather
- `GET /api/forecast?city={city}` - Get 5-day forecast
- `GET /api/health` - Health check endpoint

### Error Handling
- 404: City not found
- 401: Invalid API key
- 500: Server errors
- Network errors

## 🎯 Available Scripts

### Root Level
```bash
npm run dev          # Start both frontend and backend
npm run client       # Start only frontend
npm run server       # Start only backend
npm run build        # Build frontend for production
npm run install-all  # Install all dependencies
```

### Client Level
```bash
cd client
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Server Level
```bash
cd server
npm run dev          # Start with nodemon
npm start           # Start production server
```

## 🎨 Styling

The app uses Tailwind CSS with custom configurations:
- Glassmorphism effects with backdrop blur
- Custom color palette for weather themes
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Custom weather icons from Lucide React

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:5000
```

#### Backend (.env)
```env
WEATHER_API_KEY=your_openweather_api_key
PORT=5000
```

### Vite Configuration
- Proxy setup for API calls
- React plugin
- Development server on port 3000

### Tailwind Configuration
- Custom color palette
- Custom animations
- Responsive breakpoints
- Component classes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `client/dist` folder

### Backend (Heroku/Railway)
1. Set environment variables
2. Deploy the `server` folder
3. Update frontend API base URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [OpenWeather API](https://openweathermap.org/api) for weather data
- [Lucide React](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development

## 📞 Support

If you encounter any issues or have questions:
1. Check the console for error messages
2. Verify your API key is correct
3. Ensure all dependencies are installed
4. Check that both servers are running

---

**Happy Weather Tracking! 🌤️**


