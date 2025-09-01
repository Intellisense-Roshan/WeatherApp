import { Droplets, Wind, Eye, Thermometer } from 'lucide-react'
import WeatherBackground from './WeatherBackground'

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
    <div className="weather-card p-8 animate-fade-in relative overflow-hidden">
      <WeatherBackground weatherCondition={data.weather[0].main} />
      {/* Glass effect container */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm rounded-lg" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-gray-200 drop-shadow">
            {formatDate(data.dt)} • {formatTime(data.dt)}
          </p>
        </div>

        {/* Main Weather Info */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Temperature and Icon */}
          <div className="text-center">
            <div className="flex justify-center mb-4 text-yellow-400 drop-shadow-lg scale-125">
              {icon}
            </div>
            <div className="mb-4">
              <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">
                {Math.round(data.main.temp)}°C
              </div>
              <div className="text-xl text-gray-200 capitalize drop-shadow">
                {data.weather[0].description}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-base sm:text-lg text-gray-200 font-medium">
              <span className="drop-shadow-sm whitespace-nowrap">
                Feels like: {Math.round(data.main.feels_like)}°C
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="drop-shadow-sm whitespace-nowrap">
                High: {Math.round(data.main.temp_max)}°C
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="drop-shadow-sm whitespace-nowrap">
                Low: {Math.round(data.main.temp_min)}°C
              </span>
            </div>
          </div>

          {/* Right Side - Weather Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Humidity */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-2">
                  <Droplets className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">
                  {data.main.humidity}%
                </div>
                <div className="text-sm text-gray-200">Humidity</div>
              </div>

              {/* Wind Speed */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-2">
                  <Wind className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">
                  {Math.round(data.wind.speed)} m/s
                </div>
                <div className="text-sm text-gray-200">Wind Speed</div>
              </div>

              {/* Visibility */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-2">
                  <Eye className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">
                  {(data.visibility / 1000).toFixed(1)} km
                </div>
                <div className="text-sm text-gray-200">Visibility</div>
              </div>

              {/* Pressure */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                <div className="flex justify-center mb-2">
                  <Thermometer className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white drop-shadow">
                  {data.main.pressure} hPa
                </div>
                <div className="text-sm text-gray-200">Pressure</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-colors">
              <div className="grid grid-cols-2 gap-4 text-base">
                <div>
                  <span className="text-gray-300">Sunrise:</span>
                  <span className="ml-2 font-semibold text-white drop-shadow">
                    {formatTime(data.sys.sunrise)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-300">Sunset:</span>
                  <span className="ml-2 font-semibold text-white drop-shadow">
                    {formatTime(data.sys.sunset)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherCard
