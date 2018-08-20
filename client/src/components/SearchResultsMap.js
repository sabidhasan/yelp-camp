import React from 'react'
import PropTypes from 'prop-types'
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class SearchResultsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapScroll: '' };
  }

  render() {

    let bounds = new this.props.google.maps.LatLngBounds();
    // Markers for maps
    const markers = this.props.results
      .slice(this.props.page * 10, (this.props.page * 10) + 10)
      .filter(v => v.lat && v.lon)
      .map((v, i) => {
        bounds.extend({lat: v.lat, lng: v.lon});
        const resultNum = (this.props.page * 10) + i + 1;
        const color = v.id === this.props.hovered ? 'FFFFFF' : 'FF0000';
        return (
          <Marker
           key={v.id}
           icon={{
             url: `http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|${color}|15|b|${resultNum}`,
             scaledSize: new this.props.google.maps.Size(36,52)
           }}
           position={{lat: v.lat, lng: v.lon }}>
          </Marker>
        )
    });

    // Holds center of the map
    const initialCenter = {lat: (bounds.f.b + bounds.f.f)/2, lng: (bounds.b.b + bounds.b.f)/2}
    if (markers.length === 0) return null;
    return (
      <div className={`SearchResultsMap google-map`}>
        <Map
          google={this.props.google}
          initialCenter={initialCenter}
          bounds={bounds}>
          {markers}
        </Map>
      </div>
    )
  }
}

SearchResultsMap.propTypes = {
  google: PropTypes.object,
  results: PropTypes.array,
  page: PropTypes.number,
  hovered: PropTypes.bool
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(SearchResultsMap)
