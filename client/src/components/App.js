import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import AddCampground from './AddCampground'
import Footer from './Footer'



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campgrounds: [],
      highlightedCampgrounds: [],
      quote: undefined
    }

    this.addNewCampground = this.addNewCampground.bind(this);
    this.newRandoms = this.newRandoms.bind(this);
  }

  addNewCampground(campground) {
    this.setState({ campgrounds: campground })
  }

  newRandoms(number = 10) {
    // return 'number' random from campgrounds array, or entire array if needed
    // copy array, and check if request is too long
    const campgrounds = this.state.campgrounds.slice();
    if (number >= campgrounds.length || number <= 0) return campgrounds;

    // taken keeps track of which is done
    let taken = [];
    let ret = [];
    do {
      //pick a new random
      const elem = Math.floor(Math.random() * campgrounds.length);
      //if it is a new campground, then add to ret array
      if (taken.indexOf(elem) === -1) {
        taken.push(elem);
        ret.push(campgrounds[elem]);
      }
    } while (ret.length < number);
    // return ret;
    this.setState({ highlightedCampgrounds: ret })
  }

  componentDidMount() {
    fetch('/campgrounds')
      .then(res => res.json())
      .then(campgrounds => {
        this.setState({ campgrounds: campgrounds });
        //gerate new highlighted campgrounds
        this.newRandoms(8);
      });

      fetch('/quote')
        .then(res => res.json())
        .then(quote => this.setState({quote: quote[0]}));
    }

  render() {
    return (
      <div className="container">
        <Header />

        <Switch>
          <Route exact path='/' render={(routerProps) => {
            return (
              <React.Fragment>
                <Banner {...routerProps} quote={this.state.quote} />
                <Campgrounds {...routerProps} campgrounds={this.state.highlightedCampgrounds} newRandoms={this.newRandoms} />
              </React.Fragment>
            )
          }} />
        </Switch>

        <Footer />

      </div>
    );
  }
}

export default App;
