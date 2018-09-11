import React from 'react'
import PropTypes from 'prop-types'

const formatPricing = (pricing) => {
  pricing = pricing.map(val => {
    val = val.replace('$', '');
    return val ? `$${val}` : ''
  });
  return pricing.join(' - ');
}

const PricingTile = (props) => (
  <React.Fragment>
    <h3>{props.type}</h3>
    <div className='Sidebar__text'>
      {props.data.prices ? (props.data.prices[props.type] ? formatPricing(props.data.prices[props.type]) : 'None')
      : `No ${props.type} pricing provided`}
    </div>
  </React.Fragment>
)

PricingTile.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired
}

export default PricingTile
