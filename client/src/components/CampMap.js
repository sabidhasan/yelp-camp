import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class CampMap extends React.Component {
  render() {
    let lat = this.props.lat;
    let lon = this.props.lon;
    let marker;

    if (!lat || !lon) {
      return null
    } else {
      marker = <Marker position={{ lat: lat, lng: lon }} />
    }

    return (
      <Map
        google={this.props.google}
        zoom={14}
        initialCenter={{ lat: lat, lng: lon }}
        zoom={8}>
        { marker }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(CampMap)
