import React from 'react'

const DiscoverTile = (props) => {
  return (
    <div className='DiscoverTile flex-center'>
      Find campgrounds in your province, and across Canada
      <button
        onClick={() => window.location = '/discover'}
        className='DiscoverTile__button btn btn--large'
      >
        DISCOVER
      </button>
    </div>
  )
}

export default DiscoverTile
