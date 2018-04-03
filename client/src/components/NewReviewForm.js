import React from 'react'
import RatingBar from './RatingBar'

class NewReviewForm extends React.Component {
  constructor(props) {
    super(props);
    //editable is whether or not the form is shown
    //editFormToggle is a parent function that toggles the editable
    this.state = {
      editable: props.editable,
      editFormToggle: props.editFormToggle,
      pickedRating: 0,
      reviewText: ''
    }
    // This function sets picked rating for new review
    this.updatePickedRating = this.updatePickedRating.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // When state is updated in parent
    this.setState({editable: nextProps.editable});
  }

  handleChange(event) {
    // change handle for text area
    this.setState({reviewText: event.target.value})
  }

  updatePickedRating(newRating) {
    console.log('updated');
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
          className='review-form__text'
          value={this.state.reviewText}
          onChange={this.handleChange}
          placeHolder='Add some review stuff here!'
        />

        <div className='review-form__buttons'>
          <button onClick={(e) => {e.preventDefault(); console.log(this.state)}}>Submit</button>
          <button onClick={this.state.editFormToggle}>Cancel</button>
        </div>
      </form>
    )
  }
}

  // constructor(props) {
  //
  //
  // }

//   render(props) {
//     console.log(props);
//

//   }
// }

export default NewReviewForm;
