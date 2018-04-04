import React from 'react'
import ReactDOM from 'react-dom'
import CampMap from './CampMap'
import InfoBox from './InfoBox'
import SideBarInfoBox from './SideBarInfoBox'
import Reviews from './Reviews'
import RatingBar from './RatingBar'
import NewReviewForm from './NewReviewForm'

class SingleCampground extends React.Component {
  constructor(props) {
    super(props);
    this.requestedID = parseInt(this.props.match.params.id);

    this.state = {
      editable: false,
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
      comments: []
    }

    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
  }

  // componentWillReceiveProps(np) {
  //   console.log(np);
  // }

  componentDidMount() {
    fetch(`/campground?id=${this.requestedID}`)
      .then(res => res.json())
      .then(campground => {
        this.setState({comments: campground.comments, image: campground.image, name: campground.name});
      })
      .catch(err => {
        //TO--DO proper error handling for all fetch
        console.log("there is an error");
      });
  }

  calculateRating() {
    if (this.state.comments.length) {
      console.log();
      return this.state.comments.reduce((acc, val) => acc + val.rating, 0) / this.state.comments.length
    }
    return 0;
  }

  addNewComment(comment) {
    //takes comment from NewReviewForm and adds to this components comments array
    const newCommentArray = this.state.comments.concat([comment]);
    this.setState({comments: newCommentArray});
  }

  toggleReviewForm(event, show) {
    //show true = show form, false = hide form
    event.preventDefault();
    this.setState({editable: show});
    if (show) {
      const form = ReactDOM.findDOMNode(this.refs.reviewForm);
      window.scrollTo(0, form.offsetTop);
    }
  }

  render() {
    return (
      <div className='singleCampground'>
        <h1 className='title'>{this.state.name}</h1>

        <button href="#" className="review-link" onClick={(event) => this.toggleReviewForm(event, true)} >Write a Review</button>

        <div className='rating'>
          <RatingBar rating={this.calculateRating()} />
          <h2>{this.state.comments.length} Reviews</h2>
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

        <h1 ref='reviewForm'>Reviews</h1>
        <NewReviewForm
          editable={this.state.editable}
          campgroundID={this.requestedID}
          toggleReviewForm={this.toggleReviewForm}
          addNewComment={this.addNewComment}
        />
        <Reviews comments={this.state.comments} />
      </div>
    )
  }
}

export default SingleCampground;
