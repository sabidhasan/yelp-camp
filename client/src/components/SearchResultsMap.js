import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class SearchResultsMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mapScroll: '' };
  }

  componentDidMount() {
    // Add event listener for scroll for map
    window.addEventListener('scroll', () => {
      let mapScrollClass = ''
      const searchPageRes = document.querySelector('.search-page-results ol').getBoundingClientRect();
      const footer = document.querySelector('footer').getBoundingClientRect();
      // if (window.scrollY > document.body.clientHeight - window.innerHeight - document.querySelector('footer').clientHeight + 90) {
      if (window.scrollY > document.body.clientHeight - window.innerHeight - footer.height + 80) {
        mapScrollClass = 'map-stick-bottom';
      } else if (window.scrollY > (searchPageRes.top + window.scrollY) - 50) {
        mapScrollClass = 'map-scrolling';
      }
      this.setState({mapScroll: mapScrollClass})
    });
    // Needed to make the map actually render
    this.forceUpdate();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.mapScroll !== nextState.mapScroll || this.props != nextProps);
  }

  render() {
    let bounds = new this.props.google.maps.LatLngBounds();
    // Markers for maps
    const markers = this.props.results
      .slice(this.props.page * 10, (this.props.page * 10) + 10)
      .map((v, i) => {
        if (v.lat && v.lon) {
          bounds.extend({lat: v.lat, lng: v.lon});
        }
        const resultNum = (this.props.page * 10) + i + 1;
        const color = v.id === this.props.hovered ? 'FFFFFF' : 'FF0000';
        return (
          <Marker
           key={i}
           icon={{
             url: `http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|${color}|15|b|${resultNum}`,
             scaledSize: new this.props.google.maps.Size(36,52)
           }}
           onClick={() => window.location = `/campground/${v.id}`}
           position={{lat: v.lat, lng: v.lon }}>
          </Marker>
        )
    })

    // Holds center of the map
    const initialCenter = {lat: (bounds.f.b + bounds.f.f)/2, lng: (bounds.b.b + bounds.b.f)/2}
    if (markers.length === 0) return null;
    return (
      <div className={`discover__map google-map ${this.state.mapScroll}`}>
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(SearchResultsMap)
