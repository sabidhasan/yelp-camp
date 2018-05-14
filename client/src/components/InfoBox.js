import React from 'react'

const InfoBox = (props) => {
  return (
    <div className='infoBox__info'>
      {props.address ?
        <React.Fragment>
          <span className='infoBox__icon'>📍</span>
          <span className='infoBox__data bold'>{props.address}</span>
          <span className='infoBox__icon'>🚗</span>
          <span className='infoBox__data'><a href="#">Get Directions</a></span>
        </React.Fragment>
      : null}
      {props.phone ?
        <React.Fragment>
          <span className='infoBox__icon'>📞</span>
          <span className='infoBox__data'>{props.phone}</span>
        </React.Fragment>
      : null}
      {props.email ?
        <React.Fragment>
          <span className='infoBox__icon'>✉️</span>
          <span className='infoBox__data'>{props.email}</span>
        </React.Fragment>
      : null}
    </div>
  )
}

export default InfoBox
