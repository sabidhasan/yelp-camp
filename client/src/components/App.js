import React from 'react';
// TO--DO: IMPORT CSS
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import AddCampground from './AddCampground'
import Footer from './Footer'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campgrounds: []
    }

    this.addNewCampground = this.addNewCampground.bind(this);
  }

  addNewCampground(campground) {
    this.setState({ campgrounds: campground })
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
      <div className="container">
        <Header />
        <Banner />
        <Campgrounds campgrounds={this.state.campgrounds} />
        <AddCampground onSuccess={this.addNewCampground}/>
        <Footer />
      </div>
    );
  }
}

export default App;
