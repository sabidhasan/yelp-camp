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
    this.addToCart = this.addToCart.bind(this)
  }

  toggleCart(event, status) {
    const newCartState = status ? status : !this.state.cart.show;
    this.setState({
      cart: {...this.state.cart, show: newCartState}
    });
  }

  addToCart(campgroundObject) {
    // Get existing array
    let cart = JSON.parse(localStorage.cart || "[]");
    // Check if new object is already in array (cant use a Set, as object is mutable)
    if (!cart.find(val => val.id === campgroundObject.id)) {
      // Nothign found, so add it
      cart.push({
        id: campgroundObject.id,
        name: campgroundObject.name,
        region: campgroundObject.region,
        province: campgroundObject.province
      });
      localStorage.cart = JSON.stringify(cart);
    }
    // Force show the cart
    this.toggleCart(null, true);
  }

  toggleLoginForm() {
    const newLoginState = !this.state.showLoginOverlay;
    this.setState({showLoginOverlay: newLoginState});
  }

  render() {
    return (
      <div className="container">
        <Header toggleCart={this.toggleCart} toggleLoginForm={this.toggleLoginForm} />

        {this.state.showLoginOverlay ?
          <LoginForm toggleLoginForm={this.toggleLoginForm} />
          : null
        }

        {/* <ReactCSSTransitionGroup
            transitionName="cart"
            transitionEnterTimeout={600}
            transitionLeaveTimeout={600}
        > */}
          {/* <Cart toggleCart={this.toggleCart} /> */}
          {/* {this.state.cart.show ? */}
          <Cart show={this.state.cart.show} key={0} toggleCart={this.toggleCart} />
          {/* null */}
          {/* } */}
        {/* </ReactCSSTransitionGroup> */}

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
              return <SingleCampground addToCart={this.addToCart} toggleLoginForm={this.toggleLoginForm} {...routerProps} />
          }} />
        </Switch>

        <Footer />

      </div>
    );
  }
}

export default AuthenticationHOC(App);
