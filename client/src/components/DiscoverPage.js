import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { provinces } from '../helpers/helpers'
import DiscoverGoogleMap from './DiscoverGoogleMap'

class Discover extends React.Component {
 constructor(props) {
   super(props)
   if (!provinces[this.props.match.params.province]) window.location = '/';
   const province = {
     fullName: provinces[this.props.match.params.province],
     shortName: this.props.match.params.province
   }
   this.state = {province: province}
 }

 componentDidMount() {
   fetch(`/campground?province=${this.state.province.shortName}`)
    .then(res => res.json())
    .then(c => console.log(c));
 }

 render() {
   return (
   <div className='discover'>
     <h1>This is the single page for {this.state.province.fullName}</h1>
     <DiscoverGoogleMap
       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
       loadingElement={<div className='map' />}
       containerElement={<div className='mapContainer' />}
       mapElement={<div className='map' />}
       lat={this.state.lat}
       lon={this.state.lon}
     />
   </div>
)
   // return
 }
}

export default Discover
