import React from 'react'
import PropTypes from 'prop-types'

import withStickyBar from './withStickyBar'

const SingleCampgroundTitle = (props, context) => {
  return (
    <React.Fragment>
      <h1 className={`SingleCampgroundTitle ${context.stickyClass}`}>
        {props.name}
      </h1>
      <h2 className='SingleCampgroundTitle__region'>
        {props.region} Region
      </h2>
    </React.Fragment>
  )
}

SingleCampgroundTitle.contextTypes = {
  stickyClass: PropTypes.string,
};

export default withStickyBar(SingleCampgroundTitle)
