import React from 'react'
import haversine from 'haversine'

const DiscoverCampgroundTile = (props, context) => {
  if (!props.cg) return null;
  const cgLoc = {latitude: props.cg.lat, longitude: props.cg.lon}

  return (
    <div>
      <a href={`/campground/${props.cg.id}`}><h2>{props.cg.name}</h2></a>
      <p>{props.cg.region} Region</p>
      <p>{props.cg.address}</p>
      <p>~{Math.round(haversine(cgLoc, props.userLocation))} km away</p>
    </div>
  )
}

export default DiscoverCampgroundTile
