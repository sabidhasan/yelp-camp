import React from 'react'
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom'
import sunsetImage from '../images/test2.jpg'

const DiscoverTile = (props) => {
  return (
    <div className='DiscoverTile flex-center'>
      <LazyLoad once>
        <img className='DiscoverTile__img' src={sunsetImage} alt="Sunset over mountains"/>
      </LazyLoad>
      <span className='DiscoverTile__text'>
        Find campgrounds in your province, and across Canada
      </span>
      <Link
        to='/discover'
        className='DiscoverTile__button btn btn--large'
      >
        DISCOVER
      </Link>
    </div>
  )
}

export default DiscoverTile
