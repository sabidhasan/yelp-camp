import React from 'react'
import CampMap from './CampMap'
import InfoBox from './InfoBox'

class SingleCampground extends React.Component {
  constructor(props) {
    super(props);
    this.requestedID = this.props.match.params.id;

    this.state = {
      id: undefined,
      image: undefined,
      name: undefined,
      rating: 3.5,
      ratingCount: 25,
      description: "Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.",
      author: "Automatic",
      address: "48033 370 Ave E, Okotoks, AB  T1S 1B5",
      email: 'info@riverbendcampground.ca',
      lat: -34,
      lon: 150.66,
      phone: "(403) 938-2017",
      sites: 280
    }

  	// Description
    // Hours
    // Campsites
    // Prices
    // Payment Method
    // Services
    // Reviews
    this.ratingArray = this.ratingArray.bind(this);
  }

  componentDidMount(props) {
    fetch(`/campground?id=${this.requestedID}`)
      .then(res => res.json())
      .then(campground => {
        this.setState({id: campground.id, image: campground.image, name: campground.name});
      })
      .catch(err => {
        //TO--DO proper error handling for all fetch
        console.log("there is an error");
      });
  }

  ratingArray() {
    // for rating of campgrounds
    let initRating = this.state.rating || 0;
    let rating = new Array(5);

    for (var i = 0; i < rating.length; i++) {
      if (initRating <= 0) {
        rating[i] = 0;
      } else if (initRating < 1) {
        rating[i] = initRating;
        initRating = 0;
      } else {
        rating[i] = 1;
        initRating -= 1;
      }
    }
    return rating.map((val, idx) => <span key={idx} className={'star star' + (val * 100)}></span>);
  }

  render() {
    return (
      <div className='singleCampground'>
        <h1>{this.state.name}</h1>

        <div className='rating'>
          {this.ratingArray()}
          <h2>{this.state.ratingCount} Reviews</h2>
        </div>

        <a href="#">Write Review</a>

        <CampMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className='map' />}
          containerElement={<div className='mapContainer' />}
          mapElement={<div className='map' />}
          lat={this.state.lat}
          lon={this.state.lon}
        />

        <InfoBox address={this.state.address} phone={this.state.phone} email={this.state.email} />

        <div className="description">
          {this.state.description}
        </div>

        <img src={this.state.image} alt="" />
      </div>
    )
  }
}

export default SingleCampground;
