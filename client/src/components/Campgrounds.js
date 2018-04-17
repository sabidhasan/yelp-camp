import React from 'react'
import CampgroundTile from './CampgroundTile'

class Campgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      campgrounds: []
    };

    this.newRandoms = this.newRandoms.bind(this);
  }

  newRandoms() {
    // Reset the state, then add 10 new campgrounds to it
    fetch('/campground')
      .then(res => res.json())
      .then(cg => this.setState({ campgrounds: cg }))
  }

  componentDidMount() {
    this.spinner.addEventListener('click', () => this.setState({spin: true}));
    this.spinner.addEventListener('animationend', () => this.setState({spin: false}));
    this.newRandoms();
  }

  render() {
    return (
      <ul className="highlightedCampgrounds">
        <h1>
          <span>Some Awesome Campgrounds</span>
          <span
            onClick={this.newRandoms}
            className={this.state.spin ? 'spin' : ''}
            ref={spinner => this.spinner = spinner}
            >
            🔃
          </span>
        </h1>
        {this.state.campgrounds.map(val => {
          return (
            <li key={val['_id']}>
              <CampgroundTile id={val.id} name={val.name} image={val.image}/>
            </li>
          )})
        }
      </ul>
    )
  }
}

export default Campgrounds
