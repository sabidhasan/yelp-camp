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
   this.state = {
     province: province,
     campgrounds: null,
     selectedCampgroundID: null
   }
   this.setSelected = this.setSelected.bind(this);
 }

 setSelected(id) {
    this.setState({selectedCampgroundID: id})
 }

 componentDidMount() {
   fetch(`/campground?province=${this.state.province.shortName}`)
    .then(res => res.json())
    .then(provCG => {
      this.setState({campgrounds: provCG})
    });

    fetch('https://ipinfo.io/json')
      .then(res => res.json())
      .then(locData => {
        this.setState({userLocation: locData.loc.split(',')})
      })
      .catch(err => console.log('error occrurred'))
 }

 render() {
   if (this.state.campgrounds == null) return null;
   const selectedCampgroundObject = this.state.campgrounds.find(v => this.state.selectedCampgroundID === v.id);
   // const name = this.state.campgrounds.length && this.state.selectedCampgroundID ? this.state.campgrounds[this.state.selectedCampgroundID].name : ''
   return (
   <div className='discover'>
     <h1 className='discover__title'>
       Discover campgrounds in <span>{this.state.province.fullName}</span>
     </h1>

     <div className='discover__details'>
       <DiscoverCampgroundTile
         cg={selectedCampgroundObject}

       />
     </div>

     <div className='discover__map google-map'>
       <DiscoverGoogleMap
         coords={this.state.campgrounds}
         setSelected={this.setSelected}
         selected={this.state.selectedCampgroundID}
       />
     </div>
   </div>
)
   // return
 }
}

export default Discover
