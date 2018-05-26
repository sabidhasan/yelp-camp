import React from 'react'
import { Link } from 'react-router-dom'

const DiscoverTile = (props) => {
  return (
    <div className='DiscoverTile flex-center'>
      Find campgrounds in your province, and across Canada
      <Link
        // onClick={() => window.location = '/discover'}
        to='/discover'
        className='DiscoverTile__button btn btn--large'
      >
        DISCOVER
      </Link>
    </div>
  )
}

export default DiscoverTile
