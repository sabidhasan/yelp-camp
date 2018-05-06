import React from 'react'
import {parse} from 'query-string'
import PropTypes from 'prop-types';
import haversine from 'haversine'

import { provinces, activitySymbols } from '../helpers/helpers'
import SearchResultTile from './SearchResultTile'
import SearchBar from './SearchBar'
import FilterSearch from './FilterSearch'
import Pagination from './Pagination'

class Search extends React.Component {
  constructor(props) {
    super(props)
    const searchQuery = parse(this.props.location.search)['q'];
    this.state = {
      query: searchQuery,
      originalResults: [],
      filteredResults: [],
      page: 0
    };
    this.updateFilteredResults = this.updateFilteredResults.bind(this)
    this.shortenDescription = this.shortenDescription.bind(this)
    this.prevPage = this.prevPage.bind(this)
    this.nextPage = this.nextPage.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  static contextTypes = {
    userLocation: PropTypes.object,
  }

  componentDidMount() {
    fetch(`/search?q=${this.state.query}`)
      .then(res => res.json())
      .then(search => {
        search = search.map(v => {
          const cgLoc = {latitude: v.lat, longitude: v.lon}
          if (this.context.userLocation && this.context.userLocation.latitude && this.context.userLocation.longitude && v.lat && v.lon) {
            v.distanceFromUser = Math.round(haversine(cgLoc, this.context.userLocation))
          }
          return v;
        });
        console.log(search);
        this.setState({originalResults: search, filteredResults: search})
      })
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
    // console.log(filteredResults);
    this.setState({filteredResults: filteredResults, page: 0})
  }

  render() {
    if (!this.state.originalResults.length) return (
      <div className='search-page-container'>
        <div className='filters'>
          <h1>No results found for {this.state.query}</h1>
          <SearchBar initialValue={this.state.query} />
        </div>
      </div>
    );

    const results = this.state.filteredResults
      .slice(this.state.page * 10, (this.state.page * 10) + 10)
      .map((r, idx) => {
        return (
          <li key={r.id} className='search-result'>
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
            />
          </li>
        )
      })

    const currentResultStartUserFriendly = (this.state.page * 10) + 1;
    const currentResultEndUserFriendly = Math.min(((this.state.page * 10) + 10), this.state.filteredResults.length)

    // Create provinces object for select box
    const selectBoxProvinces = []
    for (let item in provinces) {
      selectBoxProvinces.push({value: item, text: provinces[item]})
    }

    // Create activities for dropdown
    const selectBoxRegions = []
    let selectBoxActivities = []

    for (let item in this.state.originalResults) {
      const _item = this.state.originalResults[item].region;
      selectBoxActivities = selectBoxActivities.concat(this.state.originalResults[item].activities);
      if (!selectBoxRegions.includes(_item) && _item) selectBoxRegions.push(_item)
    }
    selectBoxActivities = Array.from(new Set(selectBoxActivities))

    return (
      <div className='search-page-container'>
        <div className='filters'>
          <SearchBar initialValue={this.state.query} />

          <h2>Filters</h2>
          <p>Filter by...</p>
          <FilterSearch
            provinces={selectBoxProvinces}
            regions={selectBoxRegions}
            activities={selectBoxActivities}
            onChange={(val) => this.updateFilteredResults(val)}
          />
        </div>

        <Pagination
          currentPage={this.state.page + 1}
          lastPage={Math.ceil(this.state.filteredResults.length / 10)}
          totalResults={this.state.filteredResults.length}
          prevHandler={this.prevPage}
          nextHandler={this.nextPage}
          goToPageHandler={this.goToPage}
        />

        {currentResultEndUserFriendly > 0
          ? <h2>Showing results {currentResultStartUserFriendly}-{currentResultEndUserFriendly}
              {' '} of {this.state.filteredResults.length}
              {' '} for '<span className='bold'>{this.state.query}</span>'
            </h2>
          : null
        }

        <ol>
          {results}
        </ol>
      </div>
    )
  }
}

export default Search
