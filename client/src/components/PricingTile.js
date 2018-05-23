import React from 'react'

const PricingTile = (props) => (
  <React.Fragment>
    <h3>{props.type}</h3>
    <div className='Sidebar__text'>
      {props.data.prices ? (props.data.prices[props.type] ? props.data.prices[props.type].join(' - $') : 'None')
      : `No ${props.type} pricing provided`}
    </div>
  </React.Fragment>
)

export default PricingTile
