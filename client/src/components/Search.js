import React from 'react'
import {parse} from 'query-string'
import { provinces, activitySymbols } from '../helpers/helpers'
import SearchResultTile from './SearchResultTile'
import SearchBar from './SearchBar'
import FilterSearch from './FilterSearch'

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

  componentDidMount() {
    fetch(`/search?q=${this.state.query}`)
      .then(res => res.json())
      .then(search => this.setState({originalResults: search, filteredResults: search}))
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
    e.preventDefault()
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
        val.selectedRegions.includes(currItem.region) &&
        currItem.activities.some(v => val.selectedActivities.includes(v))
      ) {
        filteredResults.push(currItem)
      }
    }
    // console.log(filteredResults);
    this.setState({filteredResults: filteredResults})
  }

  render() {
    if (!this.state.filteredResults.length) return null;

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
            />
          </li>
        )
      })

    const origResultsLength = this.state.filteredResults.length
    const currentResultStartUserFriendly = (this.state.page * 10) + 1;
    const currentPageUserFriendly = this.state.page + 1;
    const currentResultEndUserFriendly = Math.min(((this.state.page * 10) + 10), origResultsLength)
    const pageEndUserFriendly = Math.ceil(origResultsLength / 10);

    // Generate pages counter with current page already in there
    const allPages = [currentPageUserFriendly]
    for (let i = 1; i <= 10; i++) {
      // look current page +/- i
      const newNums = [currentPageUserFriendly + i, currentPageUserFriendly - i]
      // Add if allPages isnt too long and page number is not too small/big
      newNums.forEach(v => {if (v > 0 && v <= pageEndUserFriendly && allPages.length < 7) allPages.push(v)})
    }
    // Sort because it is in no order
    allPages.sort((a, b) => (a > b ? 1 : -1))

    // Create provinces object for select box
    const selectBoxProvinces = []
    for (let item in provinces) {
      selectBoxProvinces.push({value: item, text: provinces[item]})
    }

    // Create region
    // Create activities for dropdown
    const selectBoxRegions = []
    // let tmpSelectBoxActivities = []
    let selectBoxActivities = []

    for (let item in this.state.originalResults) {
      const _item = this.state.originalResults[item].region;
      // tmpSelectBoxActivities = tmpSelectBoxActivities.concat(this.state.originalResults[item].activities);
      selectBoxActivities = selectBoxActivities.concat(this.state.originalResults[item].activities);
      if (!selectBoxRegions.includes(_item) && _item) selectBoxRegions.push(_item)
    }
    // tmpSelectBoxActivities = Array.from(new Set(tmpSelectBoxActivities))
    selectBoxActivities = Array.from(new Set(selectBoxActivities))
    // for (let i of tmpSelectBoxActivities) {
    //     selectBoxActivities.push({text: `${activitySymbols[i]} ${i}`, value: i})
    // }

    return (
      <div className='search-page-container'>
        <div className='filters'>
          <h2>Showing results {currentResultStartUserFriendly}-{currentResultEndUserFriendly}
            {' '} of {origResultsLength}
            {' '} for '<span className='bold'>{this.state.query}</span>'
          </h2>

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

        <div className='search-page-selector'>
          <span className='page-count'>
            Page {currentPageUserFriendly} of {pageEndUserFriendly}
          </span>
          {allPages.length > 1 ?
            <div className='pages'>
              {this.state.page > 0
                ? <a href='' className='prev-link' onClick={this.prevPage}>« Previous</a>
                : null
              }
              {allPages.map(v=> (
                <a key={v} className={v===currentPageUserFriendly ? 'current' : undefined} onClick={(e) => this.goToPage(e, v - 1)} href='#'>{v}</a>)
              )}
              {this.state.page !== pageEndUserFriendly - 1
                ? <a href='' className='next-link' onClick={this.nextPage}>Next »</a>
                : null
              }
            </div>
          : null }
        </div>

        <ol>
          {results}
        </ol>
      </div>
    )
  }
}

export default Search
