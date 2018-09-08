import React from 'react'
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom'
import RatingBar from './RatingBar'
import PropTypes from 'prop-types'

const CampgroundTile = (props) => {
  return (
    <React.Fragment>
      <LazyLoad once>
        <img className='CampgroundTile__img' src={props.image} alt="" />
      </LazyLoad>
      <Link className='CampgroundTile__link' to={'campground/' + props.id}>
        <h2 className='CampgroundTile__name bold'>{props.name}</h2>
      </Link>
      <span className='CampgroundTile__region'>{[props.region, props.province].filter(a=>!!a).join(', ')}</span>
      <RatingBar rating={props.rating} small={true} />
      <span className='CampgroundTile__review-count'>
        {props.ratingCount ? `${props.ratingCount} Reviews` : 'No reviews yet' }
      </span>
    </React.Fragment>
  )
}

CampgroundTile.propTypes = {
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  id: PropTypes.number,
  name: PropTypes.string,
  region: PropTypes.string,
  province: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number
}

export default CampgroundTile
