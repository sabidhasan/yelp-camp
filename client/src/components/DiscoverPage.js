import React from 'react'
// import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import { provinces } from '../helpers/helpers'
import DiscoverGoogleMap from './DiscoverGoogleMap'
import DiscoverCampgroundTile from './DiscoverCampgroundTile'
import fetchDiscover from '../services/fetchDiscover'

class Discover extends React.Component {
  constructor(props) {
    super(props)
    if (!provinces[this.props.match.params.province]) {
      props.history.push('/');
    };
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

  static contextTypes = {
    userLocation: PropTypes.object
  }

  setSelected(id) {
    const selectedCampgroundObject = this.state.campgrounds.find(v => id === v.id);
    this.setState({ selectedCampgroundObject })
  }

  async componentDidMount() {
    try {
      const campgrounds = await fetchDiscover(this.state.province.shortName)
      this.setState({ campgrounds })
      document.title = `YelpCamp | Campgrounds in ${this.state.province.fullName}`
    } catch (err) {
      this.props.history.push('/404')
    }
  }

  render() {
    if (this.state.campgrounds == null) return null;
    return (
      <div className='Discover'>
       <div className='Discover__title'>
         <h1 className='Discover__header'>
           Discover campgrounds in <span className='Discover__province'>{this.state.province.fullName}</span>
         </h1>
         <p>
           We have <span className='Discover__length'>{this.state.campgrounds.length}
           </span> campgrounds in {this.state.province.fullName}, of which
           {' ' + this.state.campgrounds.filter(v => v.lat !== null && v.lon !== null).length} are
           {' '} shown on the map
        </p>
       </div>

       <div className='Discover__content'>
         {this.state.selectedCampgroundObject ?
           <DiscoverCampgroundTile
             cg={this.state.selectedCampgroundObject}
             userLocation={this.context.userLocation}
           />
         : null}

         <div className='Discover__map google-map'>
            <DiscoverGoogleMap
             campgrounds={this.state.campgrounds}
             setSelected={this.setSelected}
            />
          </div>
        </div>
      </div>
    )
  }
}

Discover.propTypes = {
  match: PropTypes.object
}

export default Discover
