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
      <p className='SearchResultTile__distance'>{props.distance ? `${props.distance} km away` : null}</p>
      <p className='SearchResultTile__description'>{props.description}</p>
      <img className='SearchResultTile__image' src={props.images ? props.images[0] : null} alt='' />

      <div className='SearchResultTile__rating flex-center'>
        <RatingBar rating={props.rating} small={true} />
        <p className='SearchResultTile__rating-count'>
          {((props.comments && props.comments.length) || 'No')} Review{(props.comments && props.comments.length !== 1) || !props.comments ? 's' : ''}
        </p>
      </div>
    </li>
)

SearchResultTile.propTypes = {
  id: PropTypes.number.isRequired,
  onTitleHover: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  regionAndProvince: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  distance: PropTypes.number,
  description: PropTypes.string,
  images: PropTypes.array,
  rating: PropTypes.number.isRequired,
  comments: PropTypes.array,
}

export default SearchResultTile
