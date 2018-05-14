import React from 'react'
import PropTypes from 'prop-types';
import { parse } from 'query-string'
import haversine from 'haversine'

import { provinces, activitySymbols, shortenDescription } from '../helpers/helpers'
import SearchResultTile from './SearchResultTile'
import SearchBar from './SearchBar'
import FilterSearch from './FilterSearch'
import Pagination from './Pagination'
import SearchResultsMap from './SearchResultsMap'

class Search extends React.Component {
  constructor(props) {
    super(props)

    this.searchQuery = parse(this.props.location.search)['q'];
    // Used to populate the select box
    this.selectBoxProvinces = Object.keys(provinces).map(v => ({value: v, text: provinces[v]}))
    this.state = {
      originalResults: [],
      filteredResults: [],
      page: 0,
      filterAreaExpanded: false,
      hovered: null,
      selectBoxRegions: null,
      selectBoxActivities: null
    };
    this.updateFilteredResults = this.updateFilteredResults.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.goToPage = this.goToPage.bind(this)
    this.toggleExpanded = this.toggleExpanded.bind(this)
  }

  // Holds location of the user if available
  static contextTypes = {
    userLocation: PropTypes.object,
    startLoad: PropTypes.func,
    finishLoad: PropTypes.func
  };

  componentDidMount() {
    this.context.startLoad();
    fetch(`/search?q=${this.searchQuery}`)
      .then(res => res.json())
      .then(search => {
        search = search.map(result => {
          const cgLoc = {latitude: result.lat, longitude: result.lon}
          if (this.context.userLocation && this.context.userLocation.latitude && this.context.userLocation.longitude && result.lat && result.lon) {
            result.distanceFromUser = Math.round(haversine(cgLoc, this.context.userLocation))
          }
          return result;
        })

        // Create activities for dropdown
        const selectBoxRegions = []
        let selectBoxActivities = []

        search.forEach(result => {
          const _item = result.region;
          selectBoxActivities = selectBoxActivities.concat(result.activities);
          if (!selectBoxRegions.includes(_item) && _item) selectBoxRegions.push(_item)
        });

        this.setState({
          originalResults: search,
          filteredResults: search,
          selectBoxRegions: selectBoxRegions,
          selectBoxActivities: Array.from(new Set(selectBoxActivities))
        }, () => this.context.finishLoad())
      })
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
        (!currItem.activities.length || currItem.activities.some(v => val.selectedActivities.includes(v))) &&
        (!currItem.distanceFromUser || (currItem.distanceFromUser > val.selectedDistances.min && currItem.distanceFromUser < val.selectedDistances.max))
      ) {
        filteredResults.push(currItem)
      }
    }
    // Sort if needed
    if (val.sortBy === 'Distance') {
      filteredResults.sort((a, b) => {
        // Force the missing distances to the bottom, and sort others
        if (!b.distanceFromUser) return -1;
        if (!a.distanceFromUser) return 1;
        return a.distanceFromUser > b.distanceFromUser ? 1 : -1;
      });
    }

    this.setState({filteredResults: filteredResults, page: 0})
  }

  render() {
    if (!this.state.originalResults.length) return (
      <div className='search-page-container'>
        <div className='filters'>
          <h1>No results found for {this.searchQuery}</h1>
          <SearchBar initialValue={this.searchQuery} />
        </div>
      </div>
    );

    const maxDistance = Math.max.apply(null, this.state.originalResults
      .map(v => v.distanceFromUser)
      .filter(v => !!v));

    const results = this.state.filteredResults
      .slice(this.state.page * 10, (this.state.page * 10) + 10)
      .map((r, idx) => {
        return (
          <li key={r.id} className='search-result'>
            <SearchResultTile
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
          </li>
        )
      })

    const currentResultStartUserFriendly = (this.state.page * 10) + 1;
    const currentResultEndUserFriendly = Math.min(((this.state.page * 10) + 10), this.state.filteredResults.length)

    const pagination = <Pagination currentPage={this.state.page + 1}
      lastPage={Math.ceil(this.state.filteredResults.length / 10)}
      totalResults={this.state.filteredResults.length} prevHandler={this.prevPage}
      nextHandler={this.nextPage} goToPageHandler={this.goToPage} />

    return (
      <div className='search-page-container'>
        <div className='filters'>
          <SearchBar initialValue={this.searchQuery} />
          <h2>Filters</h2><p>Filter by...</p>
          <button onClick={this.toggleExpanded}>{this.state.filterAreaExpanded ? 'Hide ' : 'Show '}Filters</button>
          <FilterSearch
            provinces={this.selectBoxProvinces}
            regions={this.state.selectBoxRegions}
            activities={this.state.selectBoxActivities}
            maxDistance={maxDistance}
            onChange={(val) => this.updateFilteredResults(val)}
            className={this.state.filterAreaExpanded ? 'filter__section-expanded' : ''}/>
        </div>

        {pagination}

        <div className='search-page-results'>
            {currentResultEndUserFriendly > 0
              ? <h2>Showing results {currentResultStartUserFriendly}-{currentResultEndUserFriendly}
                  {' '} of {this.state.filteredResults.length}
                  {' '} for '<span className='bold'>{this.searchQuery}</span>'
                </h2>
              : null
              }
            <SearchResultsMap results={this.state.filteredResults} page={this.state.page}
              hovered={this.state.hovered} />
            <ol>
              {results}
            </ol>

            {pagination}
          </div>
        </div>
    )
  }
}

export default Search
