import React from 'react'
import PropTypes from 'prop-types'

const PricingTile = (props) => (
  <React.Fragment>
    <h3>{props.type}</h3>
    <div className='Sidebar__text'>
      {props.data.prices ? (props.data.prices[props.type] ? props.data.prices[props.type].join(' - $') : 'None')
      : `No ${props.type} pricing provided`}
    </div>
  </React.Fragment>
)

PricingTile.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string.isRequired
}

export default PricingTile
