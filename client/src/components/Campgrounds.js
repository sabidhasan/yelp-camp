import React from 'react'
import CampgroundTile from './CampgroundTile'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
    fetch('/campground?random=true')
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
          const rating = val.comments.reduce((acc, val) => acc + val.rating, 0) / val.comments.length || 0
          return (
            <li key={val['_id']} className='highlightedCampgrounds__tile'>
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
