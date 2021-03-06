import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { GoogleMapsAPIKey } from '../helpers/APIKeys.js'
import CanadaMapSVG from '../helpers/CanadaMapSVG'
import PropTypes from 'prop-types'

export class CampMap extends React.Component {
  render() {
    let lat = this.props.lat;
    let lng = this.props.lon;
    let marker;

    if (!lat || !lng) {
      return (
        <div className='CampMap CampMap--error google-map'>
          <CanadaMapSVG />
          <div className='CampMap__error'>
            <h1 className='CampMap__error-header'>Map Not Available</h1>
            <h2 className='CampMap__error-header'>Sorry, we are working on bringing the map for this campground</h2>
          </div>
        </div>
      )
    } else {
      marker = <Marker position={{ lat, lng }} />
    }

    return (
        <Map
          google={this.props.google}
          initialCenter={{ lat, lng }}
          zoom={8}>
          { marker }
        </Map>
    );
  }
}

CampMap.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  google: PropTypes.object.isRequired
}


export default GoogleApiWrapper({
  apiKey: GoogleMapsAPIKey,
})(CampMap)
