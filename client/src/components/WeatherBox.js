import React from 'react'

const WeatherBox = (props) => {
  if (!props.weather) return null;

  return <h1>{props.weather.summary}</h1>
}


export default WeatherBox
