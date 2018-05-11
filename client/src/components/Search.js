import React from 'react'
import {parse} from 'query-string'
import PropTypes from 'prop-types';
import haversine from 'haversine'

import { provinces, activitySymbols } from '../helpers/helpers'
import SearchResultTile from './SearchResultTile'
import SearchBar from './SearchBar'
import FilterSearch from './FilterSearch'
import Pagination from './Pagination'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.searchQuery = parse(this.props.location.search)['q'];
    // Used to populate the select box
    this.selectBoxProvinces = Object.keys(provinces).map(v => ({value: v, text: provinces[v]}))
    this.state = {
      // query: searchQuery,
      originalResults: [],
      filteredResults: [],
      page: 0,
      filterAreaExpanded: false,
      hovered: null,
      mapScroll: ''
    };
    this.updateFilteredResults = this.updateFilteredResults.bind(this)
    this.shortenDescription = this.shortenDescription.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  static contextTypes = {
    userLocation: PropTypes.object,
  }

  componentDidMount() {
    fetch(`/search?q=${this.searchQuery}`)
      .then(res => res.json())
      .then(search => {
        search = search.map(v => {
          const cgLoc = {latitude: v.lat, longitude: v.lon}
          if (this.context.userLocation && this.context.userLocation.latitude && this.context.userLocation.longitude && v.lat && v.lon) {
            v.distanceFromUser = Math.round(haversine(cgLoc, this.context.userLocation))
          }
          return v;
        });
        this.setState({originalResults: search, filteredResults: search})
      })

    // Add event listener for scroll for map
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300 && this.state.mapScroll) return;
      if (window.scrollY <= 300 && this.state.mapScroll === '') return;
      let mapScrollClass = window.scrollY > 300 ? 'map-scrolling-fixed' : '';
      this.setState({mapScroll: mapScrollClass})
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    // if (nextState.mapScroll === this.state.mapScroll) return false;
    console.log(nextState);
    return true;
  }

  shortenDescription(desc) {

    let excerpt = desc.split(' ')
    if (excerpt.length > 20) {
      excerpt = excerpt.slice(0, 20)
      excerpt.push('...')
    }
    return excerpt.join(' ')
  }

  prevPage(e) {
    e.preventDefault()
    this.setState({page: this.state.page - 1})
  }

  nextPage(e) {
    e.preventDefault();
    this.setState({page: this.state.page + 1})
  }

  goToPage(e, val) {
    e.preventDefault()
    this.setState({page: val})
  }

  toggleExpanded() {
      this.setState({filterAreaExpanded: !this.state.filterAreaExpanded})
  }

  updateFilteredResults(val) {
    // Val contains info on whats selected, you apply the filter here.
    const filteredResults = [];
    for (let item in this.state.originalResults) {
      // Filter based on province, region, activities
      const currItem = this.state.originalResults[item];

      if ((!val.selectedProv || provinces[val.selectedProv].toLowerCase() === currItem.province.toLowerCase()) &&
        (val.selectedRegions.includes(currItem.region) || !currItem.region) &&
        (!currItem.activities.length || currItem.activities.some(v => val.selectedActivities.includes(v)))
      ) {
        filteredResults.push(currItem)
      }
    }
    this.setState({filteredResults: filteredResults, page: 0})
  }

  render() {
    console.log('rerendering');
    if (!this.state.originalResults.length) return (
      <div className='search-page-container'>
        <div className='filters'>
          <h1>No results found for {this.searchQuery}</h1>
          <SearchBar initialValue={this.searchQuery} />
        </div>
      </div>
    );

    const results = this.state.filteredResults
      .slice(this.state.page * 10, (this.state.page * 10) + 10)
      .map((r, idx) => {
        return (
          <li
            key={r.id}
            className='search-result'
            // onMouseEnter={() => this.setState({hovered: r.id})}
            // onMouseLeave={() => this.setState({hovered: null})}
            >
            <SearchResultTile
              number={(this.state.page * 10) + idx + 1}
              name={r.campgroundName}
              regionAndProvince={[r.region, r.province].filter(a=>!!a).join(', ')}
              address={this.shortenDescription(r.address)}
              description={this.shortenDescription(r.description)}
              rating={(r.comments && r.comments.reduce((acc, val) => acc + val.rating, 0) / r.comments.length) || 0}
              comments={r.comments}
              images={r.images}
              id={r.id}
              distance={r.distanceFromUser}
              onTitleHover={(id) => this.setState({hovered: id})}
            />
          </li>
        )
      })

    const currentResultStartUserFriendly = (this.state.page * 10) + 1;
    const currentResultEndUserFriendly = Math.min(((this.state.page * 10) + 10), this.state.filteredResults.length)

    // Create activities for dropdown
    const selectBoxRegions = []
    let selectBoxActivities = []

    for (let item in this.state.originalResults) {
      const _item = this.state.originalResults[item].region;
      selectBoxActivities = selectBoxActivities.concat(this.state.originalResults[item].activities);
      if (!selectBoxRegions.includes(_item) && _item) selectBoxRegions.push(_item)
    }
    selectBoxActivities = Array.from(new Set(selectBoxActivities))

    // Markers for maps
    let markers;
    let bounds = new this.props.google.maps.LatLngBounds();
    // const hoveredCG = this.state.filteredResults.find(v => v.id === this.state.hovered)
    // if (this.state.hovered && hoveredCG.lat !== null && hoveredCG.lon !== null) {
      // Generate one marker for hovered CG
      // markers = [hoveredCG]
    // } else {
    markers = this.state.filteredResults
      .slice(this.state.page * 10, (this.state.page * 10) + 10)
    // }
      .map((v, i) => {
        if (v.lat && v.lon) {
          bounds.extend({lat: v.lat, lng: v.lon});
        }
        const resultNum = (this.state.page * 10) + i + 1;
        const color = v.id === this.state.hovered ? 'FFFFFF' : 'FF0000';
        return (<Marker
           key={i}
           icon={{
             url: `http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|${color}|15|b|${resultNum}`,
             scaledSize: new this.props.google.maps.Size(36,52)
           }}
           onClick={() => window.location = `/campground/${v.id}`}
           position={{lat: v.lat, lng: v.lon }}>
          </Marker>)
    })



    const pagination = (<Pagination currentPage={this.state.page + 1}
              lastPage={Math.ceil(this.state.filteredResults.length / 10)}
              totalResults={this.state.filteredResults.length} prevHandler={this.prevPage}
              nextHandler={this.nextPage} goToPageHandler={this.goToPage} />)

    // Holds center of the map
    const initialCenter = {lat: (bounds.f.b + bounds.f.f)/2, lng: (bounds.b.b + bounds.b.f)/2}
    const center = initialCenter;
    // var zoom = 5;
    // if (this.state.hovered) {
    //     const cg =
    //     console.log(bounds);
    //     if (cg.lat !== null && cg.lon !== null) {
    //       center = {lat: cg.lat, lng: cg.lon};
    //       zoom = 12;
    //       bounds = {north: cg.lon + 0.1, south: cg.lon - 0.1, east: cg.lat + 0.1, west: cg.lat - 0.1}
    //     }
    // }
    return (
      <div className='search-page-container'>
        <div className='filters'>
          <SearchBar initialValue={this.searchQuery} />

          <h2>Filters</h2>
          <p>Filter by...</p>
          <button onClick={this.toggleExpanded}>{this.state.filterAreaExpanded ? 'Hide ' : 'Show '}Filters</button>
            <FilterSearch
              provinces={this.selectBoxProvinces}
              regions={selectBoxRegions}
              activities={selectBoxActivities}
              onChange={(val) => this.updateFilteredResults(val)}
              className={this.state.filterAreaExpanded ? 'filter__section-expanded' : ''}
            />
        </div>

        {pagination}

        <div className='search-page-results'>
            {markers.length > 0 ?
            <div className={`discover__map google-map ${this.state.mapScroll}`}>
              <Map
                google={this.props.google}
                // zoom={2}
                // initialBounds={bounds}
                initialCenter={initialCenter}
                // center={center}
                bounds={bounds}
              >
                {markers}
              </Map>
            </div>
            : null}

          {currentResultEndUserFriendly > 0
            ? <h2>Showing results {currentResultStartUserFriendly}-{currentResultEndUserFriendly}
                {' '} of {this.state.filteredResults.length}
                {' '} for '<span className='bold'>{this.searchQuery}</span>'
              </h2>
            : null
          }

          <ol>
            {results}
          </ol>

          {pagination}
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg'
})(Search)
