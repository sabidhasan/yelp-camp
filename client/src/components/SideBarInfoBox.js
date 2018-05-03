import React from 'react'

const SideBarInfoBox = (props) => {
  const paymentLogos = {'interac': '💳', cash: '💵'};

  return (
    <div className='sidebar'>
      <h1>Hours</h1>
      <span className='capitalize'>
        <h2>Daily</h2>
        <span>{props.hours ? props.hours.daily : ''}</span>
        <h2>Seasonal</h2>
        <span>{props.hours ? props.hours.seasonal : ''}</span>
      </span>

      <h1>Camp sites</h1>
      <span className='capitalize'>{props.campsites}</span>

      <h1>Prices</h1>
      <span className='capitalize'>
        <h2>Visitors</h2>
        <span>${props.prices ? (props.prices.visitors || 'Free') : ''}</span>
      </span>
      <span className='capitalize'>
        <h2>Daily</h2>
        <span>{props.prices ? (props.prices.daily ? '$'+props.prices.daily.join(' - $') : 'None') : ''}</span>
      </span>
      <span className='capitalize'>
        <h2>Weekly</h2>
        <span>{props.prices ? (props.prices.weekly ? '$'+props.prices.weekly.join(' - $') : 'None') : ''}</span>
      </span>
      <span className='capitalize'>
        <h2>Seasonal</h2>
        <span>{props.prices ? (props.prices.seasonal ? '$'+props.prices.seasonal.join(' - $') : 'None') : ''}</span>
      </span>
      <span className='capitalize'>{props.prices ? props.prices.description : ''}</span>

      <h1>Payment Methods</h1>
      <span className='capitalize'>
        {props.paymentMethods ? props.paymentMethods.map((val, idx) => <h2 key={idx}>{paymentLogos[val]} {val}</h2>) : ''}
      </span>
    </div>
  )
}



export default SideBarInfoBox
