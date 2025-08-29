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
        <div key={idx} className="bg-white rounded-lg shadow p-4 text-center">
          <div className="mb-2 text-lg font-semibold">
            {new Date(forecast.dt_txt).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
          <div className="flex justify-center mb-2">
            {getWeatherIcon(forecast.weather[0].main)}
          </div>
          <div className="text-xl font-bold text-weather-blue">
            {Math.round(forecast.main.temp)}°C
          </div>
          <div className="text-gray-500 text-sm">
            {forecast.weather[0].main}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastList;
