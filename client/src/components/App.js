import React, { Component } from 'react';
// TO--DO: IMPORT CSS
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campgrounds: []
    }
  }

  componentDidMount() {
    fetch('/campgrounds')
      .then(res => res.json())
      .then(campgrounds => {
        console.log(campgrounds);
        this.setState({ campgrounds: campgrounds });
      })
    }

  render() {
    return (
      <div>
        <Header />
        <Banner />
        <Campgrounds campgrounds={this.state.campgrounds} />
        <Footer />
      </div>
    );
  }
}

export default App;
