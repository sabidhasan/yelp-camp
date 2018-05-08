import React from 'react'
import PropTypes from 'prop-types'

import withStickyBar from './withStickyBar'

const SingleCampgroundTitle = (props, context) => {
  return (
    <h1 className={`singleCampground__title ${context.stickyClass}`}>
      {props.name}
      <span className='singleCampground__region'>
        {props.region} Region
      </span>
    </h1>
  )
}

SingleCampgroundTitle.contextTypes = {
  stickyClass: PropTypes.string,
};

export default withStickyBar(SingleCampgroundTitle)
