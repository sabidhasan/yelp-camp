import React from 'react'
import PropTypes from 'prop-types'
import { weatherIcons } from '../helpers/helpers'

const WeatherBox = (props) => {
  if (!props.weather || !Object.keys(props.weather).length) return (
    <div className='WeatherBox'>
      <h2 className='WeatherBox__error'>No weather available</h2>
    </div>
  )

  return (
    <div className='WeatherBox'>
      <h2 className='WeatherBox__header'>Current Conditions</h2>
      <span aria-hidden='true' className='WeatherBox__summary'>
        {weatherIcons[props.weather.icon]}
      </span>
      <span className='WeatherBox__text'>
        {props.weather.summary}
      </span>
      <span className='WeatherBox__item'>
        Temp {Math.round(props.weather.temperature)}℉
      </span>
      <span className='WeatherBox__item'>
        Humidity {Math.round(props.weather.humidity * 100)}%
      </span>
      <span className='WeatherBox__item'>
        Wind {Math.round(props.weather.windSpeed)} mph
      </span>
    </div>
  )
}

WeatherBox.propTypes = {
  weather: PropTypes.object
}

export default WeatherBox
