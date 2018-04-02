import React from 'react'

const InfoBox = (props) => {
  return (
    <div className='infoBox'>
      <span className='infoBox__icon'>📍</span>
      <span className='infoBox__data bold'>{props.address}</span>
      <span className='infoBox__icon'>🚗</span>
      <span className='infoBox__data'><a href="#">Get Directions</a></span>
      <span className='infoBox__icon'>📞</span>
      <span className='infoBox__data'>{props.phone}</span>
      <span className='infoBox__icon'>✉️</span>
      <span className='infoBox__data'>{props.email}</span>
    </div>
  )
}

export default InfoBox
