import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import campIcon from '../images/camp-icon.png'
import campIconRed from '../images/camp-icon-red.png'

export class DiscoverGoogleMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedId: null}
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(reactObject, mapObject, event) {
    // See if any CGs match
    const clickRange = 2.5 * (0.0001314318 + (0.8191036682/(1 + Math.pow((mapObject.zoom/2.974602), 4.536466))))

    const nearestCG = this.props.campgrounds.find((cg, idx) => (
      cg.lat && cg.lon && Math.abs(cg.lat - event.latLng.lat()) < clickRange && Math.abs(cg.lon - event.latLng.lng()) < clickRange
    ));

    if (nearestCG) {
      this.props.setSelected(nearestCG.id);
      this.setState({selectedId: nearestCG.id})
      // console.log('\n\n\n\n----------');
      // console.log(nearestCG.lat, nearestCG.lon, nearestCG.name, nearestCG.id, nearestCG.address);
    } else if (this.state.selectedId !== null) {
      this.props.setSelected(null);
      this.setState({selectedId: null})
    }
  }
  // shouldComponentUpdate(np, ns) {
  //   // Only update if click event is
  //   return ns.selectedId !== this.state.selectedId;
  // }

  render() {
    var lngs = [];
    var lats = [];

    const markers = this.props.campgrounds
      .map(c => ({lat: c.lat, lon: c.lon, id: c.id}))
      .filter(v => v.lat !== null && v.lon !== null)
      .map((coords, idx) => {
        const point = {lat: coords.lat, lng: coords.lon };
        lngs.push(coords.lon);
        lats.push(coords.lat);

        const url = (this.state.selectedId && this.state.selectedId === coords.id) ? campIconRed : campIcon;

        return (
            <Marker
              key={idx+(Math.random()*1000)}
              position={point}
              icon={{
                url: url,
                scaledSize: new this.props.google.maps.Size(12,12)
              }}>
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
        onClick={this.handleClick}
      >
        { markers }
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(DiscoverGoogleMap)
