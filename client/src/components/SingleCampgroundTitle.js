import React from 'react'

class SingleCampgroundTitle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {stickyClass: ''}
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      let scrollClass = window.scrollY > 50 ? 'sticky' : '';
      this.setState({stickyClass: scrollClass})
    })
  }

  render() {
    return (<h1 className={`singleCampground__title ${this.state.stickyClass}`}>
      {this.props.name}
      <span className='singleCampground__region'>
        {this.props.region} Region
      </span>
    </h1>)
  }
}

export default SingleCampgroundTitle
