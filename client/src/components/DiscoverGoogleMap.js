import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import campIcon from '../images/camp-icon.png'
import campIconRed from '../images/camp-icon-red.png'

export class DiscoverGoogleMap extends React.Component {
  constructor() {
    super();
  }

  render() {
    var lngs = [];
    var lats = [];

    const markers = this.props.coords
      .map(c => ({lat: c.lat, lon: c.lon, id: c.id}))
      .filter(v => v.lat !== null && v.lon !== null)
      .map((coords, idx) => {
        const point = {lat: coords.lat, lng: coords.lon };
        lngs.push(coords.lon);
        lats.push(coords.lat);

        const url = (this.props.selected && this.props.selected.id === coords.id) ? campIconRed : campIcon;

        return (
            <Marker
              key={idx}
              position={point}
              onMouseover={() => console.log('hello')}
              // onClick={() => this.props.setSelected(coords.id)}
              icon={{
                url: url,
                scaledSize: new this.props.google.maps.Size(12,12)
              }}>
              {/* TO--DO LOGIC FOR MARKER TYPE BASED ON  SELECTED ID... */}
            </Marker>
        )
    });

    const averageLat = lats.reduce((a,v) => a+v, 0) / lats.length;
    const averageLng = lngs.reduce((a,v) => a+v, 0) / lngs.length;

    return (
      <Map
        google={this.props.google}
        zoom={5}
        initialCenter={{lat: averageLat, lng: averageLng}}
      >
        { markers }

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(DiscoverGoogleMap)
