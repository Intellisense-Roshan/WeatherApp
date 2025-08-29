import { Droplets, Wind, Eye, Thermometer } from 'lucide-react'

const WeatherCard = ({ data, icon }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="weather-card p-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-weather-dark mb-2">
          {data.name}, {data.sys.country}
        </h2>
        <p className="text-gray-600">
          {formatDate(data.dt)} • {formatTime(data.dt)}
        </p>
      </div>

      {/* Main Weather Info */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Temperature and Icon */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            {icon}
          </div>
          <div className="mb-4">
            <div className="text-6xl font-bold text-weather-dark mb-2">
              {Math.round(data.main.temp)}°C
            </div>
            <div className="text-xl text-gray-600 capitalize">
              {data.weather[0].description}
            </div>
          </div>
          <div className="flex justify-center gap-4 text-sm text-gray-500">
            <span>Feels like: {Math.round(data.main.feels_like)}°C</span>
            <span>•</span>
            <span>High: {Math.round(data.main.temp_max)}°C</span>
            <span>•</span>
            <span>Low: {Math.round(data.main.temp_min)}°C</span>
          </div>
        </div>

        {/* Right Side - Weather Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Humidity */}
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Droplets className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-weather-dark">
                {data.main.humidity}%
              </div>
              <div className="text-sm text-gray-600">Humidity</div>
            </div>

            {/* Wind Speed */}
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Wind className="w-6 h-6 text-gray-500" />
              </div>
              <div className="text-2xl font-bold text-weather-dark">
                {Math.round(data.wind.speed)} m/s
              </div>
              <div className="text-sm text-gray-600">Wind Speed</div>
            </div>

            {/* Visibility */}
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-weather-dark">
                {(data.visibility / 1000).toFixed(1)} km
              </div>
              <div className="text-sm text-gray-600">Visibility</div>
            </div>

            {/* Pressure */}
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <div className="flex justify-center mb-2">
                <Thermometer className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-weather-dark">
                {data.main.pressure} hPa
              </div>
              <div className="text-sm text-gray-600">Pressure</div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/50 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Sunrise:</span>
                <span className="ml-2 font-semibold">
                  {formatTime(data.sys.sunrise)}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Sunset:</span>
                <span className="ml-2 font-semibold">
                  {formatTime(data.sys.sunset)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard


