import React from 'react'
import PropTypes from 'prop-types';

const withLoading = (Component) => {
  class withLoading extends React.Component {
    constructor(props) {
      super(props);
      this.loading = 0;

      this.startLoad = this.startLoad.bind(this);
      this.finishLoad = this.finishLoad.bind(this);
      this.updateLoading = this.updateLoading.bind(this)
    }

    static childContextTypes = {
      startLoad: PropTypes.func,
      finishLoad: PropTypes.func
    }

    getChildContext() {
      return {startLoad: this.startLoad, finishLoad: this.finishLoad}
    }

    startLoad() {
      this.updateLoading(1);
    }

    finishLoad() {
      this.updateLoading(-1);
    }

    updateLoading(num) {
      this.loading += num;
      // Using forceUpdate since this is not a state controlled component
      if ((num == -1 && this.loading == 0) || (num == 1 && this.loading == 1)) {
        this.forceUpdate();
      }
    }

    render() {
      const loadingDiv = (
        <div className='loading-container'>
          <div className='loading__spinner'>
            <div className='loading__center'></div>
          </div>
        </div>
      )
      return (
        <React.Fragment>
          {this.loading ? loadingDiv : null}
          <Component />
        </React.Fragment>
      )
    }
  }
  return withLoading;
}

export default withLoading