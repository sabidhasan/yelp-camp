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
import withAuthentication from './withAuthentication'
import Cart from './Cart'
import DiscoverSVGMap from './DiscoverSVGMap'
import DiscoverPage from './DiscoverPage'

class App extends React.Component {
  constructor(props) {
    super(props);
    // Load the items from localStorage
    let cartItems = JSON.parse(localStorage.cart || "[]");
    this.state = {
      showLoginOverlay: false,
      cart: {show: false, items: cartItems}
    }
    this.toggleLoginForm = this.toggleLoginForm.bind(this)
    this.toggleCart = this.toggleCart.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
    this.writeToLocalStorage = this.writeToLocalStorage.bind(this)
  }

  toggleCart() {
    // const newCartState = status ? status : !this.state.cart.show;
    console.log(this.state.cart);
    this.setState({cart: {...this.state.cart, show: !this.state.cart.show}});
  }

  addToCart(campgroundObject) {
    if (!campgroundObject.name || !campgroundObject.region || !campgroundObject.province || !campgroundObject.image) return;
    // make a copy of the state
    let cartItems = this.state.cart.items.slice();
    // Check if new object is already in array (cant use a Set, as object is mutable)
    if (!cartItems.find(val => val.id === campgroundObject.id)) {
      // Nothign found, so add it
      cartItems.push({
        id: campgroundObject.id,
        name: campgroundObject.name,
        region: campgroundObject.region,
        province: campgroundObject.province,
        image: campgroundObject.image[0] || ''
      });
    }
    this.setState({cart: {...this.state.cart, items: cartItems}}, () => {
      // Show the cart - should be closed so toggle will show it
      this.toggleCart();
      this.writeToLocalStorage();
    });

  }

  removeFromCart(id) {
    // remove index from cart if it exists
    let currentItems = this.state.cart.items.slice()
    currentItems.splice(id, 1);
    this.setState({cart: {show: true, items: currentItems}}, () => {
      this.writeToLocalStorage();
    });
  }

  writeToLocalStorage() {
    localStorage.cart = JSON.stringify(this.state.cart.items);
  }

  toggleLoginForm() {
    this.setState({showLoginOverlay: !this.state.showLoginOverlay});
  }

  render() {
    return (
      <div className="container">
        <Header toggleCart={this.toggleCart} toggleLoginForm={this.toggleLoginForm} />

        {this.state.showLoginOverlay ? <LoginForm toggleLoginForm={this.toggleLoginForm} /> : null}

        <ReactCSSTransitionGroup
            transitionName="cart"
            transitionEnterTimeout={450}
            transitionLeaveTimeout={450}>
          {this.state.cart.show ?
          <Cart
            key={0}
            cart={this.state.cart}
            toggleCart={this.toggleCart}
            removeFromCart={this.removeFromCart}
          /> : null}
        </ReactCSSTransitionGroup>

        <Switch>
          <Route exact path='/' render={(routerProps) => (
              <React.Fragment>
                <Banner {...routerProps} />
                <LandingText {...routerProps} />
                <Campgrounds {...routerProps} />
              </React.Fragment>
          )} />

          <Route exact path='/campground/:id' render={(routerProps) => (
              <SingleCampground
                addToCart={this.addToCart}
                toggleLoginForm={this.toggleLoginForm}
                {...routerProps}
              />
          )} />

          <Route exact path='/discover'>
            <DiscoverSVGMap />
          </Route>

          <Route exact path='/discover/:province' render={(routerProps) => (
            // <h1>path provs</h1>
            <DiscoverPage {...routerProps} />
          )} />

        </Switch>

        <Footer />

      </div>
    );
  }
}

export default withAuthentication(App);
