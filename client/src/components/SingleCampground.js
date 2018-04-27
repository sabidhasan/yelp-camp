import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

import CampMap from './CampMap'
import WeatherBox from './WeatherBox'
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
    // this.requestedID = parseInt(this.props.match.params.id);
    this.state = {id: parseInt(this.props.match.params.id)};
    // this.state = {reviewLoginWarning: true};

    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  static contextTypes = {
    user: PropTypes.object,
  };

  componentDidMount() {
    fetch(`/campground?id=${this.state.id}`)
    .then(res => res.json())
    .then(campground => {
      this.setState({
        comments: campground.comments,
        image: campground.image,
        name: campground.name,
        region: campground.region,
        description: campground.description,
        address: campground.address,
        lat: campground.lat,
        lon: campground.lon,
        weather: campground.weather,
        email: campground.email,
        phone: campground.phone,
        sites: campground.sites,
        hours: campground.hours,
        prices: campground.prices,
        paymentMethods: campground.paymentMethods,
        activities: campground.activities,
        province: campground.province
        // reviewLoginWarning: true
      });
    })
    .catch(err => {
    //   //TO--DO proper error handling for all fetch
      console.log("there is an error");
    //   window.location = `/not-found/${this.state.id}`;
    });
  }

  shouldComponentUpdate(prevProps, prevState) {
    // Update only when props exist
    return !(prevState.name === undefined);
  }

  calculateRating() {
    if (this.state.comments && this.state.comments.length) {
      return this.state.comments.reduce((acc, val) => acc + val.rating, 0) / this.state.comments.length
    }
    return 0;
  }

  addNewComment(comment) {
    //takes comment from NewReviewForm and adds to this components comments array
    let newCommentArray = this.state.comments.slice()
    newCommentArray.unshift(comment);
    this.setState({comments: newCommentArray, editable: false });
  }

  toggleReviewForm(event, show) {
    //show true = show form, false = hide form
    if (event) event.preventDefault();
    if (!this.context.user || this.context.user.loading) {
      this.props.toggleLoginForm();
      return;
    }
    this.setState({editable: show});
    if (show) {
      const form = ReactDOM.findDOMNode(this.refs.reviewForm);
      window.scrollTo(0, form.offsetTop);
    }
  }

  async deleteReview(reviewId) {
    // send user, CG ID, comment ID to server to see if it's OK. If so, update local state.
    // Check for not signed in user
    if (!this.context.user || this.context.user.loading) return;

    // Get user token first
    try {
      var userToken = await this.context.user.getIdToken();
    } catch(err) {
      console.log(err);
      return;
    }

    try {
      const response = await fetch('/comment', {
        body: JSON.stringify({
          userID: userToken,
          campgroundID: this.state.id,
          commentID: reviewId
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'DELETE'
      });
      const result = await response.json();
      // Update comments array locally
      this.setState({comments: result});

    //     // Reset UI
    //     this.setState({
    //       disableForm: false,
    //       pickedRating: 0,
    //       reviewText: '',
    //       errorMessage: null,
    //     });
    } catch (err) {
      console.log('error occure in deleteing review');
      return;
    }

  }

  render() {
    return (
      <div className='singleCampground'>
        <h1 className='singleCampground__title'>
          {this.state.name}
          <span className='singleCampground__region'>{this.state.region}, {this.state.province} Region</span>
        </h1>

        <div className='review-link'>
          <ReviewButton toggleReviewForm={this.toggleReviewForm} />
          <button onClick={() => this.props.addToCart(this.state)} className='singleCampground__add-to-cart'>
            <i className='fas fa-shopping-cart nav__cart-icon'></i>Add to Cart
          </button>
        </div>

        <div className='rating'>
          <RatingBar rating={this.calculateRating()} />
          <h2>{this.state.comments ? this.state.comments.length : 0} Reviews</h2>
        </div>


        <CampMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
          loadingElement={<div className='map' />}
          containerElement={<div className='mapContainer' />}
          mapElement={<div className='map' />}
          lat={this.state.lat}
          lon={this.state.lon}
        />

        <div className='singleCampground__infoBox'>
          <InfoBox address={this.state.address} phone={this.state.phone} email={this.state.email} />
          <WeatherBox weather={this.state.weather} />
        </div>

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
        {!this.context.user || this.context.user.loading ?
          <span className='error'>
            You must be logged in to write a review
          </span>
        : this.state.editable ?
          <NewReviewForm
            campgroundID={this.state.id}
            toggleReviewForm={this.toggleReviewForm}
            addNewComment={this.addNewComment}
          />
        : null
      }
        <Reviews comments={this.state.comments} deleteReview={this.deleteReview}/>
      </div>
    )
  }
}

export default SingleCampground;
