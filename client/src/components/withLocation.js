import React from 'react'
import PropTypes from 'prop-types';

const withLocation = (Component) => {
  class withLocation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {userLocation: null}
    }

    static childContextTypes = {
      userLocation: PropTypes.object,
    }

    static contextTypes = {
      startLoad: PropTypes.func,
      finishLoad: PropTypes.func
    }

    getChildContext() {
      return {userLocation: this.state.userLocation}
    }

    componentDidMount() {
      this.context.startLoad(this.constructor.name);
      fetch('https://ipinfo.io/json')
        .then(res => res.json())
        .then(locData => {
          this.setState({
            userLocation: {latitude: locData.loc.split(',')[0], longitude: locData.loc.split(',')[1]}
          }, () => this.context.finishLoad(this.constructor.name))
        })
        .catch(err => {
          console.log('Could not get location')
          this.context.finishLoad(this.constructor.name);
        })
    }

    render() {
      return <Component />
    }
  }
  return withLocation;
}

export default withLocation
