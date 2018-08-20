import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import haversine from 'haversine'

const DiscoverCampgroundTile = (props, context) => {
  if (!props.cg) return null;
  const cgLoc = {latitude: props.cg.lat, longitude: props.cg.lon}

  return (
    <div className='DiscoverCampgroundTile'>
      {/* <a href={`/campground/${props.cg.id}`}><h2>{props.cg.name}</h2></a> */}
      <Link to={`/campground/${props.cg.id}`}>
        <h2>{props.cg.name}</h2>
      </Link>
      <p>{props.cg.region} Region</p>
      <p>{props.cg.address}</p>
      <p>~{Math.round(haversine(cgLoc, props.userLocation))} km away</p>
    </div>
  )
}

DiscoverCampgroundTile.propTypes = {
  userLocation: PropTypes.object,
  cg: PropTypes.object
}

export default DiscoverCampgroundTile
