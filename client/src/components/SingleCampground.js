import React from 'react'
import CampMap from './CampMap'
import InfoBox from './InfoBox'
import SideBarInfoBox from './SideBarInfoBox'
import Reviews from './Reviews'
import RatingBar from './RatingBar'
import NewReviewForm from './NewReviewForm'

class SingleCampground extends React.Component {
  constructor(props) {
    super(props);
    this.requestedID = this.props.match.params.id;

    this.state = {
      editable: false,
      id: undefined,
      image: undefined,
      name: undefined,
      rating: 3.5,
      description: "Riverbend Campground is located on the Sheep River near Okotoks, Alberta. A small town just 20 kms from Calgary’s city limits. Riverbend is in the heart of Alberta’s ranchlands with a view of the spectacular Rocky Mountains and within a day trip to Banff National Park.",
      author: "Automatic",
      address: "48033 370 Ave E, Okotoks, AB  T1S 1B5",
      email: 'info@riverbendcampground.ca',
      lat: -34,
      lon: 150.66,
      phone: "(403) 938-2017",
      sites: 280,
      hours: {daily: '9 am to 9 pm (front gate closed at 11 pm)', seasonal: 'Open all year'},
      prices: {visitors: 2, daily: [40, 50], weekly: [270, 330], seasonal: null, description: 'Free for children 6 and under.'},
      paymentMethods: ['interac', 'cash'],
      reviews: [
        {id: 0, author: 'John', time: 'Apr 1, 2018', rating: 5, text: 'More text here'},
        {id: 1, author: 'Jane', time: 'Mar 28, 2018', rating: 4, text: 'Lorem Ipsum'},
        {id: 2, author: 'Jim', time: 'Mar 22, 2018', rating: 2, text: 'This is an OK campground'},
        {id: 3, author: 'Jason', time: 'Jan 2, 2018', rating: 0, text: 'Worst camp ever'}
      ]
    }

    this.editFormToggle = this.editFormToggle.bind(this);
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

  editFormToggle(event) {
    event.preventDefault();
    const test = !this.state.editable;
    this.setState({editable: test}, () => console.log(this.state));
    // const newreviews = this.state.reviews.concat([{id: 4, author: 'test', time: '2', rating: '4', text: 'sometext'}])
    // this.setState({reviews: newreviews}, () => console.log(this.state, 'edit complete'));
    // this.setState({rating: 5})
  }

  render() {
    return (
      <div className='singleCampground'>
        <h1 className='title'>{this.state.name}</h1>

        <button href="#" className="review-link" onClick={this.editFormToggle} >Write a Review</button>

        <div className='rating'>
          <RatingBar rating={this.state.rating} />
          <h2>{this.state.reviews.length} Reviews</h2>
        </div>


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
          <h1>Description</h1>
          {this.state.description}
        </div>

        <SideBarInfoBox hours={this.state.hours}
          campsites={this.state.sites}
          prices={this.state.prices}
          paymentMethods={this.state.paymentMethods}
        />

        <img className='campground-image' src={this.state.image} alt="" />

        <h1>Reviews</h1>
        <NewReviewForm editable={this.state.editable} editFormToggle={this.editFormToggle} />
        <Reviews reviews={this.state.reviews} />
      </div>
    )
  }
}

export default SingleCampground;
