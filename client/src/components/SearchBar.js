import React from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import { searchIcons } from '../helpers/helpers'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // which search result is highlighted, list of search results, whether
      // box has focus, and searchbox contents
      highlightedIndex: -1,
      results: [],
      active: false,
      searchQuery: props.initialValue || ''
    }

    this.doSearch = this.doSearch.bind(this);
    this.changeFocus = this.changeFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.goToCampground = this.goToCampground.bind(this);
    this.doAsyncSearch = debounce(this.doAsyncSearch.bind(this), 150);
  }

  doSearch(e) {
    e.persist()
    // handle arrow key input
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const newIndex = Math.max(this.state.highlightedIndex - 1, -1);
      this.setState({highlightedIndex: newIndex});
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const newIndex = Math.min(this.state.highlightedIndex + 1, this.state.results.length - 1);
      this.setState({highlightedIndex: newIndex});
    } else if (e.key === 'Enter') {
      // if something is selected then go to it
      this.goToCampground();
    } else if (e.key === 'Escape') {
      // Hide the search
      this.changeFocus(false);
    } else {
      // show the search, and do search
      this.changeFocus(true);

      this.setState({highlightedIndex: -1});
      this.doAsyncSearch(e.target.value)
    }
  }

  doAsyncSearch(query) {
    fetch(`/search?q=${query}`)
    .then(res => res.json())
    .then(search => {
      const stateSearch = search.map(v => {
        return {
          id: v.id,
          icon: searchIcons[v.type],
          name: v.campgroundName,
          text: `${v.type}: ${v.excerpt}`}
        })
        // Update the state for results, trimming it to top 5
        this.setState({results: stateSearch.slice(0, 5)})
      })
    .catch(err => console.log("Error occurred while searching ", err))
  }

  handleMouse(key) {
    // Called when mousingover the search results
    this.setState({highlightedIndex: key})
  }

  goToCampground() {
    // Redirects to currently selected campground
    if (this.state.highlightedIndex === -1) {
      // This is done to ensure search page is freshly loaded each time
      // (otherwise there are problems with pagination, etc.)
      window.location = `/search/?q=${this.state.searchQuery}`
    } else {
      // window.location = `/campground/${this.state.results[this.state.highlightedIndex].id}`
      this.props.history.push(`/campground/${this.state.results[this.state.highlightedIndex].id}`);
    }
  }

  handleChange(e) {
    // handles search box controlled component
    this.setState({searchQuery: e.target.value})
  }

  changeFocus(focus) {
    // Called when losing/gaining focus to input box
    this.setState({active: focus});
  }

  render() {
    const searchResults = this.state.results.map((v, i) => (
      <li
        role='option'
        aria-selected={i === this.state.highlightedIndex ? 'true' : 'false'}
        key={i}
        className={`SearchBar__result${i === this.state.highlightedIndex ? '--selected' : '--unselected'}`}
        onMouseMove={() => this.handleMouse(i)}
        onMouseOut={() => this.setState({highlightedIndex: -1})}
        onMouseDown={this.goToCampground}>
        <i className='SearchBar__result-icon' aria-hidden='true'>{v.icon}</i>
        <div className='SearchBar__result-text capitalize'>
          <h2 className='bold' aria-label='Campground Name'>{v.name}</h2>
          <h2 aria-label='Matched text'>{v.text}</h2>
        </div>
      </li>
    ))
    return (
      <form role='search' autoComplete='off' className='SearchBar' onSubmit={(e) => e.preventDefault()}>
        <input
          aria-labelledby='SearchBar__label'
          name='search'
          id='search'
          type='text'
          placeholder='Province, Region, City, Campground Name, Amenity, etc.'
          onFocus={() => this.changeFocus(true)}
          onClick={() => this.changeFocus(true)}
          onBlur={() => this.changeFocus(false)}
          value={this.state.searchQuery}
          onKeyUp={this.doSearch}
          onChange={this.handleChange}
          className='SearchBar__input'
        />
        <label id='SearchBar__label' htmlFor='search' className='SearchBar__label bold flex-center'>
          Find
        </label>
        <button
          type='submit'
          className='SearchBar__button flex-center'
          onClick={this.goToCampground}
          aria-label='Search'
        >
          <i className="SearchBar__button-icon fas fa-search"></i>
        </button>
        <ul
          role='listbox'
          aria-label='Search results'
          // These ensure that updates to this element are read out by screenreader
          aria-live='assertive' aria-atomic='true'
          aria-hidden={this.state.active ? 'false' : 'true'}
          className={`SearchBar__results${this.state.active ? '--active' : '--hidden'}`}
        >
          {(searchResults.length || !this.state.searchQuery) ?
            searchResults
            : <p
                className='SearchBar__no-results bold'>No results found for '{this.state.searchQuery}'
              </p>
          }
        </ul>
      </form>
    )
  }
}

SearchBar.propTypes = {
  initialValue: PropTypes.string
}

export default SearchBar
