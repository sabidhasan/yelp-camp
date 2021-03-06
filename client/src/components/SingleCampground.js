import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import LazyLoad from 'react-lazyload'
import fetchNewPost from '../services/fetchNewPost'
import fetchCampground from '../services/fetchCampground'

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

  async componentDidMount() {
    this.context.startLoad(this.constructor.name, 'campground data');
    try {
      const campground = await fetchCampground(this.state.id);
      // The following properties are set: comments, image, name, region, description, address,
      // lat, lon, weather, email, phone, sites, hours, prices, paymentMethods, activities, province
      this.setState({ ...campground }, () => {
        this.context.finishLoad(this.constructor.name, 'campground data');
        document.title = `YelpCamp | ${this.state.name}`
      });
    } catch (err) {
      console.log('There is an error fetching the campgrounds');
      this.context.finishLoad(this.constructor.name, 'campground data');
    }
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
      return this.props.toggleLoginForm();
    }
    this.setState({editable: show});
    if (show) {
      const form = ReactDOM.findDOMNode(this.refs.reviewForm);
      // If node not found ignore - for testing purposes
      if (form) window.scrollTo(0, form.offsetTop - 350);
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

    if (!window.confirm('Are you sure want to delete the review?\nThis action cannot be undone')) return

    try {
      this.context.startLoad(this.constructor.name, 'comments');
      const postBody = {
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
      }
      const comments = await fetchNewPost(postBody)
      this.setState({ comments }, () => {
        this.context.finishLoad(this.constructor.name, 'comments')
      })
    } catch (err) {
      console.log('Error occured in deleteing review');
      this.context.finishLoad(this.constructor.name, 'comments');
    }
  }

  render() {
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
          <h2 className='SingleCampground__rating-count'>
            {this.state.comments && this.state.comments.length ? this.state.comments.length : 'No'} Review
            {(!this.state.comments || this.state.comments.length !== 1) ? 's' : ''}
          </h2>
        </section>

        <section className='CampMap'>
          <CampMap lat={this.state.lat} lon={this.state.lon}/>
        </section>

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

        <LazyLoad once>
          <img className='SingleCampground__image' src={this.state.image} alt='Campground' />
        </LazyLoad>

        <section className='SingleCampground__activities'>
          <h1 className='SingleCampground__activities-header'>
            Activities at {this.state.name}
          </h1>
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

SingleCampground.propTypes = {
  toggleLoginForm: PropTypes.func,
  addToCart: PropTypes.func
}

export default SingleCampground;
