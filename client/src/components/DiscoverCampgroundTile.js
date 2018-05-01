import React from 'react'
import haversine from 'haversine'

const DiscoverCampgroundTile = (props) => {
  if (!props.cg) return null;
  // TO--DO: CHECK FOR existing lat/lon from userLoc!
  const userLoc = {latitude: props.userLocation.lat, longitude: props.userLocation.lon}
  const cgLoc = {latitude: props.cg.lat, longitude: props.cg.lon}

  return (
    <div>
      <a href={`/campground/${props.cg.id}`}><h2>{props.cg.name}</h2></a>
      <p>{props.cg.region} Region</p>
      <p>{props.cg.address}</p>
      <p>~{Math.round(haversine(cgLoc, userLoc))} km away</p>
    </div>
  )
}

// activities [array]
// comments [array]
// description [text]
// id [number for url]
// image [array of strings]
// type [text]

export default DiscoverCampgroundTile
