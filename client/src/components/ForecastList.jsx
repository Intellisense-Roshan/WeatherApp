import React from "react";

const ForecastList = ({ data, getWeatherIcon }) => {
  if (!data || !data.list) return null;

  // Group forecast by day
  const days = {};
  data.list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });

  // Get one forecast per day (e.g., midday)
  const dailyForecasts = Object.keys(days).map((date) => {
    // Find the forecast closest to 12:00
    const midday = days[date].reduce((prev, curr) => {
      return Math.abs(new Date(curr.dt_txt).getHours() - 12) < Math.abs(new Date(prev.dt_txt).getHours() - 12) ? curr : prev;
    });
    return midday;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
      {dailyForecasts.map((forecast, idx) => (
        <div key={idx} className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-black/30 transition-all">
          <div className="mb-2 text-lg font-semibold text-white drop-shadow-md">
            {new Date(forecast.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          <div className="flex justify-center mb-2 text-yellow-400 drop-shadow-lg">
            {getWeatherIcon(forecast.weather[0].main)}
          </div>
          <div className="text-2xl font-bold text-blue-400 drop-shadow-md">
            {Math.round(forecast.main.temp)}°C
          </div>
          <div className="text-gray-200 text-base mt-1 capitalize">
            {forecast.weather[0].main}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
