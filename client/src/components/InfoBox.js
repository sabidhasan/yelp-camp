import React from 'react'
import PropTypes from 'prop-types'

const InfoBox = (props) => {
  return (
    <div className='InfoBox'>
      {props.address ?
        <React.Fragment>
          <span className='InfoBox__icon'>
            <span role='img' aria-label='Address' id='InfoBox__address'>📍</span>
          </span>
          <span className='InfoBox__data bold' aria-labelledby='InfoBox__address'>
            {props.address}
          </span>
          <span className='InfoBox__icon'>
            <span role='img' aria-label='Get directions' id='InfoBox__directions'>🚗</span>
          </span>
          <span className='InfoBox__data' aria-labelledby='InfoBox__directions'>
            <a href={`https://www.google.com/maps/dir/${props.address}`}>Get Directions</a>
          </span>
        </React.Fragment>
      : null}

      {props.phone ?
        <React.Fragment>
          <span className='InfoBox__icon' role='img' aria-label='Phone' id='InfoBox__phone'>📞</span>
          <span className='InfoBox__data' aria-labelledby='InfoBox__phone'>
            {props.phone}
          </span>
        </React.Fragment>
      : null}

      {props.email ?
        <React.Fragment>
          <span className='InfoBox__icon' role='img' aria-label='Email address' id='InfoBox__email'>✉️</span>
          <span className='InfoBox__data' aria-labelledby='InfoBox__email'>
            {props.email}
          </span>
        </React.Fragment>
      : null}

    </div>
  )
}

InfoBox.propTypes = {
  address: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string
}
export default InfoBox
