import React from 'react'
import PropTypes from 'prop-types'

const withStickyBar = (Component) => {
  class withStickyBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {stickyClass: ''}
    }

    static childContextTypes = {
      stickyClass: PropTypes.string,
    }
    getChildContext() {
      return {stickyClass: this.state.stickyClass}
    }

    componentDidMount() {
      window.addEventListener('scroll', () => {
        let scrollClass = window.scrollY > 50 ? 'sticky' : '';
        this.setState({stickyClass: scrollClass})
      })
    }

    render() {
      return <Component {...this.props} />
    }
  }
  return withStickyBar
}

export default withStickyBar
