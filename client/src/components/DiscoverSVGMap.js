import React from 'react'
// import { Switch, Route } from 'react-router-dom'
import { provinces } from '../helpers/helpers'
import CanadaMapSVG from '../helpers/CanadaMapSVG'

class DiscoverMap extends React.Component {
  constructor() {
    super();
    //state keeps track of currently hovered province
    this.state = {
      hoveredProvince: null
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.getProvinceName = this.getProvinceName.bind(this);
  }

  getProvinceName(e) {
    // if the hovered item isnt in the svg, then return null (could be hovering
    // on parent div)
    if (!['svg', 'path'].includes(e.target.tagName)) return null;
    const classList = Array.from(e.target.classList);
    const provName = classList[classList.length - 1];
    if (!provName) return null;
    return {
      fullName: provinces[provName.slice(-2)],
      shortName: provName.slice(-2)
    }
  }

  handleClick(e) {
    const clickedProvince = this.getProvinceName(e);
    if (!clickedProvince) return;

    // if command or control is pressed Redirect in new window
    if (e.ctrlKey || e.metaKey) {
      window.open(`/discover/${clickedProvince.shortName}`) ;
    } else {
      this.props.history.push(`/discover/${clickedProvince.shortName}`)
      // window.location = `/discover/${clickedProvince.shortName}`;
    }
  }

  handleHover(e) {
    const hoveredProvince = this.getProvinceName(e);
    if (!hoveredProvince) {
        this.setState({ hoveredProvince: null })
    } else {
      this.setState({ hoveredProvince: hoveredProvince.fullName })
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Discover Campgrounds in Canada</h1>
        <p>Explore all the campgrounds we have, from hiking the Rocky Mountains to
          the fields of Prince Edward Island. Click a province to see its campgrounds.</p>
        <div className='DiscoverSVGMap'
          onClick={this.handleClick}
          onMouseOver={this.handleHover}
          onMouseOut={() => this.setState({hoveredProvince: null})}
        >
          <CanadaMapSVG />
          <span className='DiscoverSVGMap__map-text bold flex-center'>
            Discover
            {this.state.hoveredProvince
              ?
              ` ${this.state.hoveredProvince} `
              :
              // Show scrolling list of provinces
              <div className='DiscoverSVGMap__scroll'>{Object.keys(provinces)
                .map((prov, idx) => (
                  <span key={idx} className='DiscoverSVGMap__scroll-prov'>{prov}</span>
                ))
              }</div>
            }
            Campgrounds
          </span>
        </div>
      </React.Fragment>
    )
  }
}

export default DiscoverMap
