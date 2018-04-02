import React from 'react'

import Campground from './Campground'

class Campgrounds extends React.Component {
  constructor(props) {
    super(props);
      this.state = {spin: false};
  }

  componentDidMount() {
    this.spinner.addEventListener('click', () => this.setState({spin: true}));
    this.spinner.addEventListener('animationend', () => this.setState({spin: false}));
  }

  render() {
    return (
      <ul className="highlightedCampgrounds">
        <h1>
          <span>Some Awesome Campgrounds</span>
          <span
            onClick={() => {this.props.newRandoms()}}
            className={this.state.spin ? 'spin' : ''}
            ref={spinner => this.spinner = spinner}
            >
            🔃
          </span>
        </h1>
        {this.props.campgrounds.map(val => {
          return (
            <li key={val.id}>
              <Campground name={val.name} image={val.image}/>
            </li>
          )})
        }
      </ul>
    )
  }
}

export default Campgrounds
