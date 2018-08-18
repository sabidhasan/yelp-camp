import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import CampMap from './CampMap'
import WeatherBox from './WeatherBox'
import InfoBox from './InfoBox'
import Sidebar from './Sidebar'
import Reviews from './Reviews'
import RatingBar from './RatingBar'
import NewReviewForm from './NewReviewForm'
import ReviewButton from './ReviewButton'
import Activities from './Activities'
import SingleCampgroundTitle from './SingleCampgroundTitle'

class SingleCampground extends React.Component {
  constructor(props) {
    super(props);
    // this.requestedID = parseInt(this.props.match.params.id);
    this.state = {id: parseInt(this.props.match.params.id, 10)};
    // proper routing with error state, for redirecting
    this.toggleReviewForm = this.toggleReviewForm.bind(this);
    this.addNewComment = this.addNewComment.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
    this.deleteReview = this.deleteReview.bind(this);
  }

  static contextTypes = {
    user: PropTypes.object,
    startLoad: PropTypes.func,
    finishLoad: PropTypes.func
  };

  componentDidMount() {
    this.context.startLoad(this.constructor.name, 'campground data');
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
      }, () => this.context.finishLoad(this.constructor.name, 'campground data'));
    })
    .catch(err => {
    //   //TO--DO proper error handling for all fetch
      console.log("there is an error");
      this.context.finishLoad(this.constructor.name, 'campground data');
      // this.setState({e: true}, console.log(this.state));
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
      window.scrollTo(0, form.offsetTop - 350);
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
      this.context.startLoad(this.constructor.name, 'comments');
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
      this.setState({comments: result}, () => this.context.finishLoad(this.constructor.name, 'comments'));
    } catch (err) {
      console.log('error occure in deleteing review');
      this.context.finishLoad(this.constructor.name, 'comments');
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to='/discover'/>

    return (
      <div className='SingleCampground'>
        <SingleCampgroundTitle
          name={this.state.name}
          region={[this.state.region, this.state.province].filter(a => a).join(', ')}
        />

        <section className='SingleCampground__review-link'>
          <ReviewButton toggleReviewForm={this.toggleReviewForm} />
          <button
            aria-label='Add to Shopping Cart'
            onClick={() => this.props.addToCart(this.state)}
            className='SingleCampground__cart btn btn--flat'>
            <i className='fas fa-shopping-cart'></i>Add to Cart
          </button>
        </section>

        <section className='SingleCampground__rating'>
          <RatingBar rating={this.calculateRating()} />
          <h2>{this.state.comments && this.state.comments.length ? this.state.comments.length : 'No'} Review{(this.state.comments && this.state.comments.length !== 1 && 's')}</h2>
        </section>

        <CampMap lat={this.state.lat} lon={this.state.lon} />

        <section className='SingleCampground__info-weather'>
          <InfoBox address={this.state.address} phone={this.state.phone} email={this.state.email} />
          <WeatherBox weather={this.state.weather} />
        </section>

        {this.state.description ?
          <section className="SingleCampground__description">
            <h2>Description</h2>
            {this.state.description}
          </section>
        : null }

        <Sidebar hours={this.state.hours}
          campsites={this.state.sites}
          prices={this.state.prices}
          paymentMethods={this.state.paymentMethods}
        />

        <img className='SingleCampground__image' src={this.state.image} alt='Campground' />

        <section className='SingleCampground__activities'>
          <h1>Activities at {this.state.name}</h1>
          <Activities activitiesList={this.state.activities} />
        </section>

        <section className='SingleCampground__reviews-header' ref='reviewForm'>
          <h1>Reviews</h1>
          <ReviewButton toggleReviewForm={this.toggleReviewForm} />
        </section>
        { this.state.editable ?
          <NewReviewForm
            campgroundID={this.state.id}
            toggleReviewForm={this.toggleReviewForm}
            addNewComment={this.addNewComment}
          />
        : null}
        <Reviews comments={this.state.comments} deleteReview={this.deleteReview}/>
      </div>
    )
  }
}

export default SingleCampground;
