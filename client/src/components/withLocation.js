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

    getChildContext() {
      return {userLocation: this.state.userLocation}
    }

    componentDidMount() {
      fetch('https://ipinfo.io/json')
        .then(res => res.json())
        .then(locData => {
          this.setState({
            userLocation: {latitude: locData.loc.split(',')[0], longitude: locData.loc.split(',')[1]}
          })
        })
        .catch(err => console.log('Could not get location'))
    }

    render() {
      return <Component />
    }
  }
  return withLocation;
}

export default withLocation
