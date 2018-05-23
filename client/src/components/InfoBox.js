import React from 'react'

const InfoBox = (props) => {
  return (
    <div className='InfoBox'>
      {props.address ?
        <React.Fragment>
          <span className='InfoBox__icon'>📍</span>
          <span className='InfoBox__data bold'>{props.address}</span>
          <span className='InfoBox__icon'>🚗</span>
          <span className='InfoBox__data'><a href="#">Get Directions</a></span>
        </React.Fragment>
      : null}
      {props.phone ?
        <React.Fragment>
          <span className='InfoBox__icon'>📞</span>
          <span className='InfoBox__data'>{props.phone}</span>
        </React.Fragment>
      : null}
      {props.email ?
        <React.Fragment>
          <span className='InfoBox__icon'>✉️</span>
          <span className='InfoBox__data'>{props.email}</span>
        </React.Fragment>
      : null}
    </div>
  )
}

export default InfoBox
