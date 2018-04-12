import React from 'react'

const WeatherBox = (props) => {
  if (!props.weather) return null;

  return (
    <div className='infoBox__weather'>
      <span className='infoBox__weather-summary'>{props.weather.summary}</span>
      <span className='infoBox__weather-temperature'>{Math.round(props.weather.temperature)}</span>
      <span className='infoBox__weather-humidity'>{props.weather.humidity}</span>
      <span className='infoBox__weather-windSpeed'>{Math.round(props.weather.windSpeed)}</span>
    </div>
  )
}


export default WeatherBox
