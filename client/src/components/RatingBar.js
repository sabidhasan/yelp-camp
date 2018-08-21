import React from 'react'
import PropTypes from 'prop-types'

class RatingBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyboard = this.handleKeyboard.bind(this);
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

  render() {
    // for rating of campgrounds
    let initRating = this.props.rating || 0;
    let rating = new Array(5);

    for (var i = 0; i < rating.length; i++) {
      if (initRating <= 0) {
        rating[i] = 0;
      } else if (initRating < 1) {
        rating[i] = initRating;
        initRating = 0;
      } else {
        rating[i] = 1;
        initRating -= 1;
      }
    }
    rating = rating.map((val, idx) => (
        <span
          aria-label={`${idx+1} Star`}
          aria-checked={(Math.floor(val * 10) / 10 * 100) !== 0 ? 'true' : 'false'}
          role='radio'
          key={idx}
          onClick={() => {if (this.props.updateRating) this.props.updateRating(idx + 1)}}
          className={'RatingBar__star star' + (Math.floor(val * 10) / 10 * 100) +
              ` ${this.props.small ? 'RatingBar__star--small' : ''}`
          }
        >
        </span>
      ));
    const role = this.props.updateRating ? 'radiogroup' : ''
    return (
      <div
        className={`RatingBar ${this.props.updateRating ? ' RatingBar--editable' : ''}`}
        aria-label={`Rating: ${this.props.rating} stars out of 5. ${this.props.updateRating ? 'Rating selectable with arrow keys' : ''} `}
        role={role}
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
