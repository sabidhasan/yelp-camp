import React from 'react'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import CanadaMapSVG from '../helpers/CanadaMapSVG'
import PropTypes from 'prop-types'

export class CampMap extends React.Component {
  render() {
    let lat = this.props.lat;
    let lon = this.props.lon;
    let marker;

    if (!lat || !lon) {
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
      marker = <Marker position={{ lat: lat, lng: lon }} />
    }

    return (
      <div className='CampMap google-map'>
        <Map
          google={this.props.google}
          initialCenter={{ lat: lat, lng: lon }}
          zoom={8}>
          { marker }
        </Map>
      </div>
    );
  }
}

CampMap.propTypes = {
  lat: PropTypes.number,
  lon: PropTypes.number,
  google: PropTypes.object
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(CampMap)
