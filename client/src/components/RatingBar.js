import React from 'react'

class RatingBar extends React.Component {
    constructor(props) {
      super(props)
    //   this.state = {
    //     rating: props.rating || 0,
    //     // updateRating: props.updateRating || undefined
    //   }
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({rating: nextProps.rating})
    // }

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
            key={idx}
            onClick={() => {if (this.props.updateRating) this.props.updateRating(idx + 1)}}
            className={'RatingBar__star star' + (Math.floor(val * 10) / 10 * 100) +
                ` ${this.props.small ? 'RatingBar__star--small' : ''}`
            }
          >
          </span>
        ));
      return <div className={`RatingBar ${this.props.updateRating ? ' RatingBar--editable' : ''}`}>{rating}</div>
    }
  }

export default RatingBar
