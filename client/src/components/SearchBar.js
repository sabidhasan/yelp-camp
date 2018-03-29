import React from 'react'

class SearchBar extends React.Component {
  render() {
    return (
      <form className="searchbar">
        <label htmlFor="search">Find</label>
        <input name="search" type="text" placeholder="Provice, Region, City or Campground Name" />
        <button type="submit">🔎</button>
      </form>
    )
  }
}

export default SearchBar
