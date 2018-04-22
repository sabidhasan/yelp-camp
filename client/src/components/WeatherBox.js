import React from 'react'

const weatherIcons = {
  'clear-day' : '☀️',
  'clear-night' : '☀️',
  'rain' : '☔️',
  'snow' : '⛄',
  'sleet' : '⛄',
  'wind' : '💨',
  'fog' : '🌁',
  'cloudy' : '☁️',
  'partly-cloudy-day' : '⛅',
  'partly-cloudy-night' : '⛅'
}

const WeatherBox = (props) => {
  if (!props.weather) return null;

  return (
    <div className='infoBox__weather'>
      <span className='infoBox__weather-summary'>
        {weatherIcons[props.weather.icon]}
      </span>
      <span className='infoBox__weather-text'>
        {props.weather.summary}
      </span>
      <span className='infoBox__weather-item'>
        Temp {Math.round(props.weather.temperature)}℉
      </span>
      <span className='infoBox__weather-item'>
        Humidity {Math.round(props.weather.humidity * 100)}%
      </span>
      <span className='infoBox__weather-item'>
        Wind {Math.round(props.weather.windSpeed)} mph
      </span>
    </div>
  )
}


export default WeatherBox
