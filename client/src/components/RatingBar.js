import React from 'react'

class RatingBar extends React.Component {
    constructor(props) {
      super(props)
      this.state = {rating: props.rating || 0, updateRating: props.updateRating || undefined}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({rating: nextProps.rating})
    }

    render() {
      // for rating of campgrounds
      let initRating = this.state.rating;
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
      return rating.map((val, idx) => {
        return (
          <span
            key={idx}
            onClick={() => {if (this.state.updateRating) this.state.updateRating(idx + 1)}}
            className={'star star' + (val * 100)}></span>
        );
      });
    }
  }

export default RatingBar
