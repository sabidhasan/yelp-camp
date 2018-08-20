import React from 'react'
import PropTypes from 'prop-types'
import RatingBar from './RatingBar'

const SearchResultTile = (props) => (
    <li className='SearchResultTile'>
      <a
        className='SearchResultTile__title-container'
        href={`/campground/${props.id}`}
        onMouseEnter={() => props.onTitleHover(props.id)}
        onMouseLeave={() => props.onTitleHover(null)}
        >
        <h2 className='SearchResultTile__title bold'>{`${props.number}. ${props.name}`}</h2>
      </a>
      <h2 className='SearchResultTile__region'>{props.regionAndProvince}</h2>
      <p className='SearchResultTile__address'>{props.address}</p>
      <p className='SearchResultTile__distance'>{props.distance ? `${props.distance} km away` : null} </p>
      <p className='SearchResultTile__description'>{props.description}</p>
      <img className='SearchResultTile__image' src={props.images ? props.images[0] : null} alt='' />

      <div className='SearchResultTile__rating flex-center'>
        <RatingBar rating={props.rating} small={true} />
        <p className='SearchResultTile__rating-count'>
          {props.comments ? props.comments.length : 0} Reviews
        </p>
      </div>
    </li>
)

SearchResultTile.propTypes = {
  id: PropTypes.number,
  onTitleHover: PropTypes.func,
  number: PropTypes.number,
  name: PropTypes.string,
  regionAndProvince: PropTypes.string,
  address: PropTypes.string,
  distance: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.array,
  rating: PropTypes.number,
  comments: PropTypes.array,
}

export default SearchResultTile
