import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { provinces } from '../helpers/helpers'
import DiscoverGoogleMap from './DiscoverGoogleMap'
import DiscoverCampgroundTile from './DiscoverCampgroundTile'

class Discover extends React.Component {
  constructor(props) {
    super(props)
      if (!provinces[this.props.match.params.province]) window.location = '/';
      const province = {
        fullName: provinces[this.props.match.params.province],
        shortName: this.props.match.params.province
      }
      this.state = {
        province: province,
        campgrounds: null,
        selectedCampgroundObject: null
      }
      this.setSelected = this.setSelected.bind(this);
  }

  setSelected(id) {
    const selectedCampgroundObject = this.state.campgrounds.find(v => id === v.id);
    this.setState({selectedCampgroundObject: selectedCampgroundObject})
  }

  componentDidMount() {
    fetch(`/campground?province=${this.state.province.shortName}`)
      .then(res => res.json())
      .then(provCG => {
        this.setState({campgrounds: provCG})
      });
  }

  render() {
    console.log(this.context.userLocation);
    if (this.state.campgrounds == null) return null;

    // const name = this.state.campgrounds.length && this.state.selectedCampgroundID ? this.state.campgrounds[this.state.selectedCampgroundID].name : ''
    return (
    <div className='discover'>
     <div className='discover__title'>
       <h1>Discover campgrounds in <span>{this.state.province.fullName}</span></h1>
       <p>We have {this.state.campgrounds.length} campgrounds in <span className='capitalize'>{this.state.province.fullName}</span>
       , of which {this.state.campgrounds.filter(v => v.lat !== null && v.lon !== null).length}
       {' '} are shown on the map</p>
     </div>

     <div className='discover__details'>
       <DiscoverCampgroundTile
         cg={this.state.selectedCampgroundObject}
         userLocation={this.state.userLocation}
       />
     </div>

     <div className='discover__map google-map'>
       <DiscoverGoogleMap
         coords={this.state.campgrounds}
         setSelected={this.setSelected}
         selected={this.state.selectedCampgroundObject}
       />
     </div>
   </div>
   )
   }
}

export default Discover
