import React from 'react'

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
    this.setFocus = this.setFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleMouse = this.handleMouse.bind(this);
    this.goToCampground = this.goToCampground.bind(this);
  }

  doSearch(e) {
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
    } else {
      // do search
      const icons = {
        'name': '⛺', 'paymentMethods': '💵', 'activities': '🚣',
        'address': '📍', 'description': '📛', 'province': '🌎',
        'region': '🗾'
      }
      this.setState({highlightedIndex: -1});
      fetch(`/search?q=${e.target.value}`)
        .then(res => res.json())
        .then(search => {
          const stateSearch = search.map(v => {
            return {
              id: v.id,
              icon: icons[v.type],
              name: v.campgroundName,
              text: `${v.type}: ${v.excerpt}`}
          })
          // Update the state for results, trimming it to top 5
          this.setState({results: stateSearch.slice(0, 5)})
        })
        .catch(err => console.log("Error occurred while searching ", err))
    }
  }

  handleMouse(key) {
    // Called when mousingover the search results
    this.setState({highlightedIndex: key})
  }

  goToCampground() {
    // Redirects to currently selected campground
    if (this.state.highlightedIndex === -1) {
      window.location = `/search/?q=${this.state.searchQuery}`
    } else {
      window.location = `/campground/${this.state.results[this.state.highlightedIndex].id}`
    }
  }

  handleChange(e) {
    // handles search box controlled component
    this.setState({searchQuery: e.target.value})
  }

  setFocus() {
    // Called when losing/gaining focus to input box
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <form autoComplete='off' className='searchbar' onSubmit={(e) => e.preventDefault()}>
        <label htmlFor='search'>Find</label>
        <input
          name='search'
          type='text'
          placeholder='Province, Region, City, Campground Name, etc.'
          onFocus={this.setFocus}
          onBlur={this.setFocus}
          value={this.state.searchQuery}
          onKeyUp={this.doSearch}
          onChange={this.handleChange}
        />
        <button type='submit'>🔎</button>
          <ul className={this.state.active ? 'results' : 'hidden'}>
              {this.state.results.map((v, i) => {
              return (
                <li
                  key={i}
                  className={i === this.state.highlightedIndex ? 'selected' : undefined}
                  onMouseMove={() => this.handleMouse(i)}
                  onMouseOut={() => this.setState({highlightedIndex: -1})}
                  onClick={this.goToCampground}
                >
                  <i className='search-icon'>{v.icon}</i>
                  <div className='searchtext capitalize'>
                    <h1>{v.name}</h1><h2>{v.text}</h2>
                  </div>
                </li>
            )
            })}
          </ul>
      </form>
    )
  }
}

export default SearchBar
