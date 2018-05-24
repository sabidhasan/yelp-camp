import React from 'react'
import PropTypes from 'prop-types';

const withLoading = (Component) => {
  class withLoading extends React.Component {
    constructor(props) {
      super(props);
      this.loading = 0;
      this.state = {callers: []}

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

    startLoad(caller) {
      console.log('starting');
      this.updateLoading(1, caller);
    }

    finishLoad(caller) {
      this.updateLoading(-1, caller);
    }

    updateLoading(num, caller) {
      this.loading += num;
      // Using forceUpdate since this is not a state controlled component
      if ((num == -1 && this.loading == 0) || (num == 1 && this.loading == 1)) {
        this.forceUpdate();
      }
    }

    render() {
      const loadingDiv = (
        <div className='withLoading flex-center'>
          <div className='withLoading__spinner flex-center'>
            <div className='withLoading__spinner-center'></div>
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
