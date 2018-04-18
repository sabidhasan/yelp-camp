import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'
import SingleCampground from './SingleCampground'



class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: undefined
    }
    // this.newRandoms = this.newRandoms.bind(this);
  }

  // newRandoms() {
  //   // Reset the state, then add 10 new campgrounds to it
  //   this.setState({ campgrounds: [] }, () => {
  //     for (var i = 0; i < 8; i++) {
  //       fetch('/campground')
  //         .then(res => res.json())
  //         .then(cg => {
  //           let x = this.state.campgrounds.slice();
  //           x.push(cg)
  //           this.setState({ campgrounds: x });
  //       })
  //     }
  //   })
  // }

  componentDidMount() {
    // Get quote
    fetch('/quote')
      .then(res => res.json())
      .then(quote => this.setState({quote: quote[0]}));
  }

  render() {
    return (
      <div className="container">
        <Header />
        {/* ROUTES:
          1. /
          2. /campground/id
          3. /addreview => campground POST in backend
        */}
        <Switch>
          <Route exact path='/' render={(routerProps) => {
            return (
              <React.Fragment>
                <Banner {...routerProps} quote={this.state.quote} />
                <Campgrounds {...routerProps} //campgrounds={this.state.campgrounds}
                  //newRandoms={this.newRandoms}
                />
              </React.Fragment>
            );
          }} />

          <Route exact path="/campground/:id" render={(routerProps) => {
              return <SingleCampground {...routerProps} />
          }} />

        </Switch>

        <Footer />

      </div>
    );
  }
}

export default App;
