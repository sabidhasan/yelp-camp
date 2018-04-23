// Import React and router stuff
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Import components
import Header from './Header'
import Banner from './Banner'
import Campgrounds from './Campgrounds'
import Footer from './Footer'
import SingleCampground from './SingleCampground'
import LandingText from './LandingText'
import LoginForm from './LoginForm'
import AuthenticationHOC from './AuthenticationHOC'
import Cart from './Cart'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginOverlay: false,
      cart: {show: false, items: []}
    }
    this.toggleLoginForm = this.toggleLoginForm.bind(this)
    this.toggleCart = this.toggleCart.bind(this)
    this.addtoCart = this.addtoCart.bind(this)
  }

  toggleCart(event, status) {
    const newCartState = status ? status : !this.state.cart.show;
    console.log(newCartState);
    this.setState({
      cart: {...this.state.cart, show: newCartState}
    });
  }

  addtoCart(campgroundID) {
    let cart = JSON.parse(localStorage.cart || "[]");
    cart.push(campgroundID)
    localStorage.cart = JSON.stringify(cart)
    console.log(localStorage);
  }

  toggleLoginForm() {
    const newLoginState = !this.state.showLoginOverlay;
    this.setState({showLoginOverlay: newLoginState});
  }

  render() {
    // this.addtoCart(new Date())
    return (
      <div className="container">
        <Header toggleCart={this.toggleCart} toggleLoginForm={this.toggleLoginForm} />

        {this.state.showLoginOverlay ?
          <LoginForm toggleLoginForm={this.toggleLoginForm} />
          : null
        }

        <ReactCSSTransitionGroup
            transitionName="cart"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}
        >
          {this.state.cart.show ?
          <Cart close={this.toggleCart} />
          : null
          }
        </ReactCSSTransitionGroup>

        <Switch>
          <Route exact path='/' render={(routerProps) => {
            return (
              <React.Fragment>
                <Banner {...routerProps} />
                <LandingText {...routerProps} />
                <Campgrounds {...routerProps} />
              </React.Fragment>
            );
          }} />

          <Route exact path="/campground/:id" render={(routerProps) => {
              return <SingleCampground toggleCart={this.toggleCart} toggleLoginForm={this.toggleLoginForm} {...routerProps} />
          }} />
        </Switch>

        <Footer />

      </div>
    );
  }
}

export default AuthenticationHOC(App);
