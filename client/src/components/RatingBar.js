import React from 'react'
import PropTypes from 'prop-types'

class RatingBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyboard = this.handleKeyboard.bind(this);
    this.makeRatingArray = this.makeRatingArray.bind(this);
  }

  handleKeyboard(e) {
    if (!this.props.updateRating) return;
    if (e.key === 'ArrowRight' && this.props.rating < 5) {
      this.props.updateRating(this.props.rating + 1);
    } else if (e.key === 'ArrowLeft' && this.props.rating > 0) {
      this.props.updateRating(this.props.rating - 1);
    }
  }

  componentDidMount() {
    const elem = document.querySelector('.RatingBar--editable');
    if (!elem) return;
    elem.addEventListener('keydown', this.handleKeyboard);
  }

  componentWillUnmount() {
    const elem = document.querySelector('.RatingBar--editable');
    if (!elem) return;
    elem.removeEventListener('keydown', this.handleKeyboard);
  }

  makeRatingArray(initRating) {
    // for rating of campgrounds
    let rating = new Array(5);

    for (var i = 0; i < rating.length; i++) {
      if (initRating <= 0) {
        rating[i] = 0;
      } else if (initRating < 100) {
        rating[i] = Math.round(initRating / 10) * 10;
        initRating = 0;
      } else {
        rating[i] = 100;
        initRating = Math.round(initRating - 100);
      }
    }
    return rating
  }

  render() {
    const initRating = (Math.round(this.props.rating * 10) * 10) || 0;
    let rating = this.makeRatingArray(initRating);
    rating = rating.map((val, idx) => (
        <span
          aria-label={`${idx+1} Star`}
          aria-checked={val !== 0 ? 'true' : 'false'}
          role='radio'
          key={idx}
          onClick={() => {if (this.props.updateRating) this.props.updateRating(idx + 1)}}
          className={`RatingBar__star star${val}` +
              `${this.props.small ? ' RatingBar__star--small' : ''}`
          }
        >
        </span>
    ));
    return (
      <div
        className={`RatingBar ${this.props.updateRating ? ' RatingBar--editable' : ''}`}
        aria-label={`Rating: ${this.props.rating} stars out of 5. ${this.props.updateRating ? 'Rating selectable with arrow keys' : ''} `}
        role='radiogroup'
        tabIndex={this.props.updateRating ? '0' : null}
      >
        {rating}
      </div>
    )
  }
}

RatingBar.propTypes = {
  updateRating: PropTypes.func,
  rating: PropTypes.number,
  small: PropTypes.bool
}

export default RatingBar
