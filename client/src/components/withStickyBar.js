import React from 'react'
import PropTypes from 'prop-types'

const withStickyBar = (Component) => {
  class withStickyBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {stickyClass: ''}
      this.scrollListener = this.scrollListener.bind(this)
    }

    static childContextTypes = {
      stickyClass: PropTypes.string,
    }
    getChildContext() {
      return {stickyClass: this.state.stickyClass}
    }

    scrollListener() {
      let scrollClass = window.scrollY > 50 ? 'Header--sticky' : '';
      this.setState({stickyClass: scrollClass})
    }

    componentDidMount() {
      window.addEventListener('scroll', scrollListener)
    }

    componentWillUnmount() {
      window.removeEventListener('scroll', scrollListener)
    }

    render() {
      return <Component {...this.props} />
    }
  }
  return withStickyBar
}

export default withStickyBar
