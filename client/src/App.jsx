import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import WeatherCard from './components/WeatherCard'
import ForecastList from './components/ForecastList'  // Remove .jsx extension here
import { CloudRain, Sun, Cloud, CloudSnow } from 'lucide-react'

function App() {
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastSearchedCity, setLastSearchedCity] = useState('')

  const fetchWeatherData = async (city) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch current weather
      const weatherResponse = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)
      const weatherResult = await weatherResponse.json()

      if (!weatherResponse.ok) {
        throw new Error(weatherResult.message || 'Failed to fetch weather data')
      }

      setWeatherData(weatherResult)
      setLastSearchedCity(city)

      // Fetch 5-day forecast
      const forecastResponse = await fetch(`/api/forecast?city=${encodeURIComponent(city)}`)
      const forecastResult = await forecastResponse.json()

      if (forecastResponse.ok) {
        setForecastData(forecastResult)
      }
    } catch (err) {
      setError(err.message)
      setWeatherData(null)
      setForecastData(null)
    } finally {
      setLoading(false)
    }
  }

  const getWeatherIcon = (condition) => {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
      return <CloudRain className="weather-icon" />
    } else if (conditionLower.includes('snow')) {
      return <CloudSnow className="weather-icon" />
    } else if (conditionLower.includes('cloud')) {
      return <Cloud className="weather-icon" />
    } else {
      return <Sun className="weather-icon" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-weather-dark mb-2">
            Meteora
          </h1>
          <p className="text-lg text-gray-600">
            Get real-time weather data for any city in the world
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar onSearch={fetchWeatherData} loading={loading} />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-weather-blue"></div>
            <p className="mt-4 text-gray-600">Fetching weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto text-center py-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <CloudRain className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">Oops!</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Weather Data */}
        {weatherData && !loading && !error && (
          <div className="space-y-8">
            <WeatherCard 
              data={weatherData} 
              icon={getWeatherIcon(weatherData.weather[0].main)}
            />
            {forecastData && (
              <ForecastList 
                data={forecastData} 
                getWeatherIcon={getWeatherIcon}
              />
            )}
          </div>
        )}

        {/* Welcome State */}
        {!weatherData && !loading && !error && (
          <div className="text-center py-16">
            <Sun className="w-24 h-24 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Welcome to Meteora
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Enter a city name above to get current weather conditions and a 5-day forecast.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
