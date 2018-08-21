import React from 'react'
import PropTypes from 'prop-types';

const withLoading = (Component) => {
  class withLoading extends React.Component {
    constructor(props) {
      super(props);
      this.loading = 0;
      this.times = {};

      this.startLoad = this.startLoad.bind(this);
      this.finishLoad = this.finishLoad.bind(this);
      this.updateLoading = this.updateLoading.bind(this)
      this.handleKeydown = this.handleKeydown.bind(this)
    }

    static childContextTypes = {
      startLoad: PropTypes.func,
      finishLoad: PropTypes.func
    }

    handleKeydown(e) {
      e.preventDefault();
    }

    componentDidMount() {
      window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
      window.removeEventListener('keydown', this.handleKeydown);
    }

    getChildContext() {
      return {startLoad: this.startLoad, finishLoad: this.finishLoad}
    }

    startLoad(caller, method) {
      // console.log('starting', caller, "'s ", method);
      this.times[caller] = Date.now();
      this.updateLoading(1, caller);
    }

    finishLoad(caller, method) {
      // console.log('ending', caller, '\'s', method, ' took ', Date.now() - this.times[caller]);
      this.updateLoading(-1, caller);
    }

    updateLoading(num, caller) {
      this.loading += num;
      // Using forceUpdate since this is not a state controlled component
      if ((num === -1 && this.loading === 0) || (num === 1 && this.loading === 1)) {
        this.forceUpdate();
      }
    }

    render() {
      if (!this.loading) {
        window.removeEventListener('keydown', this.handleKeydown);
      }
      const loadingDiv = (
        <div
          className='withLoading flex-center'
          role='dialog'
          aria-labelledby='withLoading__accessibility-text'
          aria-live='polite'
          aria-relevant='all'
        >
          <h1
            id='withLoading__accessibility-text'
            className='withLoading__accessibility-text'
          >
            App Loading... Please wait
          </h1>
          <div className='withLoading__spinner flex-center' aria-hidden='true'>
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
