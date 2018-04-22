import React from 'react'
import RatingBar from './RatingBar'

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);
    //editable is whether or not the form is shown
    //editFormToggle is a parent function that toggles the editable
    this.state = {
      editable: props.editable,
      campgroundID: props.campgroundID,
      // toggleReviewForm: props.toggleReviewForm,
      // addNewComment: props.addNewComment,
      pickedRating: 0,
      reviewText: '',
      errorMessage: null
    }
    // This function sets picked rating for new review
    this.updatePickedRating = this.updatePickedRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // When state is updated in parent
    this.setState({editable: nextProps.editable});
  }

  postReview(event) {

    // authUser.getIdToken()
    // .then(token => {
    //   fetch('/verifyUser', {
    //     method: 'post',
    //     body: JSON.stringify({'userID': token}), //JSON.stringify(token.json),
    //     headers: {
    //       'Accept': 'application/json, text/plain, */*',
    //       'Content-Type': 'application/json'
    //     }
    //   })
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    // })



    event.preventDefault();
    //TO--DO: check for logged in user
    if (!this.state.reviewText) {
      this.setState({errorMessage: 'No review text entered!'});
    } else if (this.state.reviewText.length < 10) {
      this.setState({errorMessage: 'Review too short'})
    } else if (this.state.pickedRating === 0) {
      this.setState({errorMessage: 'Please pick a rating'})
    } else {
      //post to server
      fetch('/comment', {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: this.state.campgroundID,
          author: 'Jane Doe',
          pickedRating: this.state.pickedRating,
          reviewText: this.state.reviewText})
      })
      .then(res => {
        console.log('res');
        if (!res.ok) throw Error(res.statusText);
        return res.json();
      })
      .then(data => {
        this.props.addNewComment(data);
        //hide the form
        this.setState({pickedRating: 0, reviewText: '', errorMessage: null})
        this.props.toggleReviewForm(null, false);
      })
      .catch(err => {
        this.setState({errorMessage: 'Could not post review at this time. Try again'});
        console.log(err);
      })
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
    if (!this.state.editable) return null;
    return (
      <form className='review-form'>
        <span className='review-form__picker rating'>
          <RatingBar rating={this.state.pickedRating} updateRating={this.updatePickedRating} />
        </span>
        <textarea
          required
          className='review-form__text'
          value={this.state.reviewText}
          onChange={this.handleChange}
          placeholder='Add some review stuff here!'
          name='reviewText'
        />
        <span className='error'>{this.state.errorMessage}</span>
        <div className='review-form__buttons'>
          <button className='review-link' onClick={this.postReview}>Post Your Review</button>
          <button onClick={(event) => {
            this.setState({pickedRating: 0, reviewText: '', errorMessage: null});
            this.props.toggleReviewForm(event, false)
          }}>Cancel</button>
        </div>
      </form>
    )
  }
}

export default NewReviewForm;
