import React from 'react'
import ReactDOM from 'react-dom'
import CampMap from './CampMap'
import InfoBox from './InfoBox'
import SideBarInfoBox from './SideBarInfoBox'
import Reviews from './Reviews'
import RatingBar from './RatingBar'
import NewReviewForm from './NewReviewForm'
import ReviewButton from './ReviewButton'
import Activities from './Activities'

class SingleCampground extends React.Component {
  constructor(props) {
    super(props);
    this.requestedID = parseInt(this.props.match.params.id);

    this.state = {
      editable: false,
      image: undefined,
      name: undefined,
      description: undefined,
      address: undefined,
      lat: undefined,
      lon: undefined,
      email: undefined,
      phone: undefined,
      sites: undefined,
      hours: {daily: null, seasonal: null},
      prices: {visitors: null, daily: [], weekly: [], seasonal: null},
      paymentMethods: [],
      comments: [],
      activities: []
    }

    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
  }

  componentDidMount() {
    fetch(`/campground?id=${this.requestedID}`)
      .then(res => res.json())
      .then(campground => {
        this.setState({
          comments: campground.comments,
          image: campground.image,
          name: campground.name,
          description: campground.description,
          address: campground.address,
          lat: campground.lat,
          lon: campground.lon,
          email: campground.email,
          phone: campground.phone,
          sites: campground.sites,
          hours: campground.hours,
          prices: campground.prices,
          paymentMethods: campground.paymentMethods,
          activities: campground.activities
        });
      })
      .catch(err => {
        //TO--DO proper error handling for all fetch
        console.log("there is an error");
        window.location = `/not-found/${this.requestedID}`;
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
    this.setState({comments: newCommentArray, editable: false, });
  }

  toggleReviewForm(event, show) {
    //show true = show form, false = hide form
    if (event) event.preventDefault();
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

        <ReviewButton toggleReviewForm={this.toggleReviewForm} />

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

        <h1>Activities at {this.state.name}</h1>
        <ul className='activities__list'>
          <Activities activitiesList={this.state.activities} />
        </ul>

        <h1 className='reviews-header' ref='reviewForm'>
          Reviews
          <ReviewButton toggleReviewForm={this.toggleReviewForm} />
        </h1>
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
