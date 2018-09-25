import React from 'react'
import PropTypes from 'prop-types';
import fetchLocation from '../services/fetchLocation'

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

    async componentDidMount() {
      this.context.startLoad(this.constructor.name);
      // See if data is in localStorage
      var location = localStorage.location !== 'undefined' && JSON.parse(localStorage.location);

      if ((!location) || (!location.loc) || ((Date.now() - location.time) > 8e7)) {
        //Fetch location
        try {
          location = await fetchLocation();
          location.time = Date.now();
        } catch(e) {
          console.log('Could not get location...');
          return;
        } finally {
          this.context.finishLoad(this.constructor.name);
        }
        // Write data
        localStorage.location = JSON.stringify(location);
      }

      const lat = location.loc.split(',')[0];
      const lon = location.loc.split(',')[1];

      this.setState({
          userLocation: {latitude: lat, longitude: lon}
        }, () => this.context.finishLoad(this.constructor.name)
      );
    }

    render() {
      return <Component />
    }
  }
  return withLocation;
}

export default withLocation
