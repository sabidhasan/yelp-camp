import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      highlightedIndex: 0,
      results: [
        {icon: '🌆', name: 'Campground 1', text: '...search text...'},
        {icon: '🌆', name: 'Campground 3', text: '...search text...'},
        {icon: '🌆', name: 'Campground 2', text: '...search text...'}
      ],
      active: false,
      searchQuery: ''
    }

    this.doSearch = this.doSearch.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  doSearch(e) {
    // do search in server
    if (e.key == 'ArrowUp') {
      const newIndex = Math.max(this.state.highlightedIndex - 1, -1);
      this.setState({
        highlightedIndex: newIndex,
        searchQuery: this.state.results[newIndex].name
      });
    } else if (e.key == 'ArrowDown') {
      const newIndex = Math.min(this.state.highlightedIndex + 1, this.state.results.length - 1);
      this.setState({
        highlightedIndex: newIndex,
        searchQuery: this.state.results[newIndex].name
      });
    }
  }

  handleChange(e) {
    // console.log(e.target);
    this.setState({searchQuery: e.target.value})
  }

  setFocus() {
    this.setState({active: !this.state.active});
  }

  render() {
    return (
      <form autoComplete='off' className="searchbar">
        <label htmlFor="search">Find</label>
        <input
          name="search"
          type="text"
          placeholder="Province, Region, City, Campground Name, etc."
          onKeyDown={this.doSearch}
          onFocus={this.setFocus}
          onBlur={this.setFocus}
          onChange={this.handleChange}
          value={this.state.searchQuery}
        />
        <button type="submit">🔎</button>
          <ul className={this.state.active ? 'results' : 'hidden'}>
              {this.state.results.map((v, i) => {
              return (<li key={i} className={i === this.state.highlightedIndex ? 'selected' : ''}>
                <i className='search-icon'>{v.icon}</i>
                <div className='searchtext'>
                  <h1>{v.name}</h1><h2>{v.text}</h2>
                </div>
              </li>)
            })}
          </ul>
      </form>
    )
  }
}

export default SearchBar
