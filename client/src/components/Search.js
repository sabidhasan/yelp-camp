import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types';
import { parse } from 'query-string'
import haversine from 'haversine'

import { provinces, shortenDescription } from '../helpers/helpers'
import SearchResultTile from './SearchResultTile'
import SearchBar from './SearchBar'
import FilterSearch from './FilterSearch'
import Pagination from './Pagination'
import SearchResultsMap from './SearchResultsMap'

class Search extends React.Component {
  constructor(props) {
    super(props)
    // Static variables (well, originalResults is not static!)
    this.searchQuery = parse(this.props.location.search)['q'];
    this.originalResults = [];

    this.state = {
      filteredResults: [],
      page: Math.max(0, parseInt(parse(this.props.location.search)['start'], 10)) || 0,
      hovered: null,
      filterCriteria: null
    };

    // Function bindings
    this.updateFilteredResults = this.updateFilteredResults.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  // Holds location of the user if available, register and deregister withLoading
  static contextTypes = {
    userLocation: PropTypes.object,
    startLoad: PropTypes.func,
    finishLoad: PropTypes.func
  };

  componentDidMount() {
    this.context.startLoad(this.constructor.name);
    fetch(`/search?q=${this.searchQuery}`)
      .then(res => res.json())
      .then(search => {
        search = search.map(result => {
          const cgLoc = {latitude: result.lat, longitude: result.lon}
          if (this.context.userLocation && this.context.userLocation.latitude && this.context.userLocation.longitude && result.lat && result.lon) {
            result.distanceFromUser = Math.round(haversine(cgLoc, this.context.userLocation))
          }
          return result;
        });
        // Update original results variable and generate select box variables from that
        this.originalResults = search;
        // this.makeFilterVariables();

        // Update maxDistance, activities and regions, provinces
        // Make filter critera object (part of component state) - holds all criteria
        const _fc = {regions: new Set(), activities: new Set(), provinces: [], maxDistance: 0};
        // Update provinces from imported provinces
        _fc.provinces = Object.keys(provinces).map(v => ({value: v, text: provinces[v]}))
        // Loop through search results
        search.forEach(r => {
          // Update max distance if it's greater than existing
          _fc.maxDistance = Math.max(_fc.maxDistance, r.distanceFromUser || 0);
          // Add activity to set
          r.activities.forEach(v => {
              if (v) _fc.activities.add(v)
          })
          // Add region if not already in _fc
          if (r.region) _fc.regions.add(r.region)
        });
        _fc.regions = Array.from(_fc.regions);
        _fc.activities = Array.from(_fc.activities);

        this.setState({
          filterCriteria: _fc,
          filteredResults: search,
          page: Math.min(Math.ceil(search.length / 10) - 1, this.state.page)}, () => this.context.finishLoad(this.constructor.name)
        );
      })
  }

  goToPage(e, page) {
    e.preventDefault();
    this.setState({ page })
  }

  updateFilteredResults(val) {
    // Val contains info on whats selected, you apply the filter here.
    const filteredResults = [];
    for (let item in this.originalResults) {
      // Filter based on province, region, activities
      const _cI = this.originalResults[item];
      if (
        (!val.selectedProv || provinces[val.selectedProv].toLowerCase() === _cI.province.toLowerCase()) &&
        (val.selectedRegions.includes(_cI.region) || (!_cI.region && this.state.filterCriteria.regions.length === val.selectedRegions.length)) &&
        (_cI.activities.some(v => val.selectedActivities.includes(v)) || (!_cI.activities.length && this.state.filterCriteria.activities.length === val.selectedActivities.length)) &&
        (!_cI.distanceFromUser || (_cI.distanceFromUser >= val.selectedDistances.min && _cI.distanceFromUser <= val.selectedDistances.max))
        ) {
          filteredResults.push(_cI)
        }
    }
    // Sort if needed
    if (val.sortBy === 'Distance') {
      filteredResults.sort((a, b) => {
        // Force the missing distances to the bottom, and sort others
        if (!a.distanceFromUser) return 1;
        if (!b.distanceFromUser) return -1;
        return a.distanceFromUser > b.distanceFromUser ? 1 : -1;
      });
    }
    this.setState({filteredResults: filteredResults, page: 0})
  }

  render() {
    const results = this.state.filteredResults
      .slice(this.state.page * 10, (this.state.page * 10) + 10)
      .map((r, idx) => {
        return (
          <SearchResultTile
            key={r.id}
            number={(this.state.page * 10) + idx + 1}
            name={r.campgroundName}
            regionAndProvince={[r.region, r.province].filter(a=>!!a).join(', ')}
            address={shortenDescription(r.address)}
            description={shortenDescription(r.description)}
            rating={(r.comments && r.comments.reduce((acc, val) => acc + val.rating, 0) / r.comments.length) || 0}
            comments={r.comments}
            images={r.images}
            id={r.id}
            distance={r.distanceFromUser}
            onTitleHover={(id) => this.setState({hovered: id})}
          />
        )
      })

    const currentResultEndUserFriendly = Math.min((this.state.page * 10) + 10, this.state.filteredResults.length)
    return (
      <div className='Search'>
        <div className='Search__filter-container'>
          {!this.originalResults.length && this.searchQuery ?
            <h1>No results found for {this.searchQuery}</h1>
            : !this.originalResults.length && !this.searchQuery ?
              <h1>Search</h1>
              : <h1>{`Search for ${this.searchQuery}`}</h1>
          }
          <Route
            path="/"
            render={(props) => <SearchBar {...props} />}
          />
          {this.state.filterCriteria ?
            <FilterSearch
              filterCriteria={this.state.filterCriteria}
              className={`${!this.originalResults.length ? ' FilterSearch--hidden' : ''}`}
              onChange={val => this.updateFilteredResults(val)}
            />
          : null
          }
        </div>
        <Pagination
          currentPage={this.state.page + 1}  goToPageHandler={this.goToPage}
          lastPage={Math.ceil(this.state.filteredResults.length / 10)}
          totalResults={this.state.filteredResults.length}
        />
        <div className='Search__results'>
          <h2 className='Search__summary'>
            {currentResultEndUserFriendly > 0
              ? <React.Fragment>
                  Showing results {(this.state.page * 10) + 1}-{currentResultEndUserFriendly}
                  {' '} of {this.state.filteredResults.length}
                  {' '} for <span className='bold'>{this.searchQuery}</span>
                </React.Fragment>
              : this.searchQuery && this.originalResults && this.originalResults.length ?
                <React.Fragment>No campgrounds found with the applied filter(s)</React.Fragment>
                : null
              }
          </h2>
          <ol className='Search__results-list'>
            {results}
          </ol>
          <SearchResultsMap
            results={this.state.filteredResults}
            page={this.state.page}
            hovered={this.state.hovered} />
        </div>
      </div>
      )
  }
}

Search.propTypes = {
  location: PropTypes.object
}

export default Search
