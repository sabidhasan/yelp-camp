import React from 'react'
import RatingBar from './RatingBar'
import PropTypes from 'prop-types'

import CircularProgressbar from 'react-circular-progressbar';

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pickedRating: 0,
      reviewText: '',
      // errorMessage is what is shown to user ('submitting', 'comment too short'...)
      errorMessage: null,
      // disableForm disables the submit button to prevent double submissions
      disableForm: false
    }
    this.updatePickedRating = this.updatePickedRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  static contextTypes = {
    user: PropTypes.object,
  };

  async postReview(event) {
    // send stuff to server to see if it's OK. If so, update local state.
    // Otherwise, set error to "couldn't post"

    // Check for not signed in user
    event.preventDefault();
    if (!this.context.user || this.context.user.loading) {
      this.setState({errorMessage: 'Sorry, could not post review at this time. Try logging out and logging back in.'})
    }

    // Check for review length, rating given and no-text
    if (!this.state.reviewText) {
      this.setState({errorMessage: 'No review text was entered!'});
      return;
    } else if (this.state.reviewText.length < 15) {
      this.setState({errorMessage: 'Review is too short. To make reviews meaningful, we would like a little more text, please.'});
      return;
    } else if (this.state.pickedRating === 0) {
      this.setState({errorMessage: 'Please pick a rating'});
      return;
    }

    // Get user token first
    try {
      var userToken = await this.context.user.getIdToken();
    } catch(err) {
      this.setState({errorMessage: 'Sorry, your user ID is not valid. Try logging out and logging back in.'})
    }

    this.setState({errorMessage: 'Posting comment...', disableForm: true})
    try {
      const response = await fetch('/comment', {
        method: 'post',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: userToken,
          campgroundID: this.props.campgroundID,
          displayName: this.context.user.displayName,
          photoURL: this.context.user.photoURL,
          uid: this.context.user.uid,
          pickedRating: this.state.pickedRating,
          reviewText: this.state.reviewText
        })
      });
      const result = await response.json();
      // Update comments array locally
      this.props.addNewComment(result);
    } catch (err) {
      this.setState({
        errorMessage: 'Could not post review at this time. Please try again later',
        disableForm: false
      });
    }
  }

  handleChange(event) {
    // change handle for text area
    this.setState({reviewText: event.target.value, errorMessage: null})
  }

  updatePickedRating(newRating) {
    this.setState({pickedRating: newRating})
  }

  render() {
    const fillPercentage  = Math.round(this.state.reviewText.length / 1000 * 100)
    var styles = {};
    if (fillPercentage === 100) {
      var styles = {path: {stroke: 'red'}};
    } else if (fillPercentage > 85) {
      var styles = {path: {stroke: 'orange'}};
    }

    return (
      <form className='review-form'>
        <span className='review-form__picker rating'>
          <RatingBar rating={this.state.pickedRating} updateRating={this.updatePickedRating} />
        </span>
        <span className='review-form__author'>
          Posting publically as {this.context.user.displayName}
          <img src={this.context.user.photoURL} className='nav__user-image' alt =' '/>
        </span>
        <textarea
          required
          maxLength={1000}
          className='review-form__text'
          value={this.state.reviewText}
          onChange={this.handleChange}
          placeholder='Write your honest review here!'
          name='reviewText'
        />
        <span className='error'>{this.state.errorMessage}</span>
        <div className='review-form__buttons'>
          <button className='review-link'
            onClick={this.postReview}
            disabled={this.state.disableForm ? true : false}
            >
            Post Your Review
          </button>
          <button onClick={(event) => {
            this.setState({pickedRating: 0, reviewText: '', errorMessage: null, disableForm: false});
            this.props.toggleReviewForm(event, false)
          }}>Cancel</button>
          <CircularProgressbar styles={styles} percentage={fillPercentage} strokeWidth={15} />
        </div>
      </form>
    )
  }
}

export default NewReviewForm;
