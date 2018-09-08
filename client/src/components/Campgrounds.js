import React from 'react'
import PropTypes from 'prop-types'
import CampgroundTile from './CampgroundTile'

class Campgrounds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spin: false,
      campgrounds: []
    };

    this.spinner = {addEventListener: () => {}}
    this.newRandoms = this.newRandoms.bind(this);
  }

  static contextTypes = {
    startLoad: PropTypes.func,
    finishLoad: PropTypes.func
  }

  newRandoms() {
    // Reset the state, then add 10 new campgrounds to it
    // this.context.startLoad(this.constructor.name)
    fetch('/campground?random=true')
      .then(res => res.json())
      .then(cg => this.setState({ campgrounds: cg }))
      .catch(err => {console.log('An error occurred fetching campgrounds')})
      // .then(cg => this.setState({ campgrounds: cg }, () => this.context.finishLoad(this.constructor.name)))
  }

  componentDidMount() {
    this.spinner.addEventListener('click', () => this.setState({spin: true}));
    this.spinner.addEventListener('animationend', () => this.setState({spin: false}));
    this.newRandoms();
  }

  render() {
    return (
      <ul className='Campgrounds'>
        <li className='Campgrounds__header flex-center'>
          <h1 className='Campgrounds__header-title'>Some Awesome Campgrounds</h1>
          <i
            className={`Campgrounds__random fas fa-sync-alt ${this.state.spin ? 'Campgrounds__random--spin' : ''}`}
            onClick={this.newRandoms}
            ref={spinner => this.spinner = spinner}
            ></i>
        </li>
        {this.state.campgrounds.map(val => {
          const rating = val.comments.reduce((acc, val) => acc + val.rating, 0) / val.comments.length || 0
          return (
            <li key={val.id} className='CampgroundTile'>
              <CampgroundTile
                id={val.id}
                name={val.name}
                image={val.image}
                region={val.region}
                province={val.province}
                rating={rating}
                ratingCount={val.comments.length}
              />
            </li>
          )})
        }
      </ul>
    )
  }
}

export default Campgrounds
