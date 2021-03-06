// Import React and router stuff
import React from 'react';
import { Switch, Route } from 'react-router-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

// Import HOCs
import withAuthentication from './withAuthentication'
import withLocation from './withLocation'
import withLoading from './withLoading'

// Import components
import Header from './Header'
import LoginForm from './LoginForm'
import Cart from './Cart'
import IndexPage from './IndexPage'
import SingleCampground from './SingleCampground'
import DiscoverSVGMap from './DiscoverSVGMap'
import DiscoverPage from './DiscoverPage'
import Search from './Search'
import Footer from './Footer'
import FourOhFour from './FourOhFour'

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
    this.setState({cart: {...this.state.cart, show: !this.state.cart.show}}, () => {
      if (this.state.cart.show) {
        document.querySelector(".Cart__close").focus();
      }
    });
  }

  addToCart(campgroundObject) {
    if (!campgroundObject.name) return;
    // make a copy of the state
    let cartItems = this.state.cart.items.slice();
    // Check if new object is already in array (cant use a Set, as object is mutable)
    if (!cartItems.find(val => val.id === campgroundObject.id)) {
      // Nothign found, so add it
      cartItems.push({
        id: campgroundObject.id,
        name: campgroundObject.name,
        region: campgroundObject.region || '',
        province: campgroundObject.province || '',
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
      <div className='container' role='main'>
        <Header toggleCart={this.toggleCart} toggleLoginForm={this.toggleLoginForm} />

        {this.state.showLoginOverlay ? <LoginForm toggleLoginForm={this.toggleLoginForm} /> : null}

        <ReactCSSTransitionGroup
            transitionName="Cart"
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
            <IndexPage {...routerProps} />
          )} />

          <Route exact path='/campground/:id' render={(routerProps) => (
              <SingleCampground
                addToCart={this.addToCart}
                toggleLoginForm={this.toggleLoginForm}
                {...routerProps}
              />
          )} />

          <Route exact path='/discover' render={(routerProps) => (
            <DiscoverSVGMap {...routerProps} />
          )} />

          <Route exact path='/discover/:province' render={(routerProps) => (
            <DiscoverPage {...routerProps} />
          )} />

          <Route exact path='/search-results' render={(routerProps) => (
            <Search {...routerProps} />
          )}/>

          <Route path='/' render={(routerProps) => (
            <FourOhFour {...routerProps} />
          )} />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withLoading(withAuthentication(withLocation(App)));
