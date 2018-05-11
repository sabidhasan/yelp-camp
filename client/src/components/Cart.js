import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    user: PropTypes.object,
  };

  render() {
    var renderItems;
    if (this.props.cart.items.length) {
       renderItems = this.props.cart.items.map((item, idx) => {
        return (
            <div key={item.id} className='cart__item'>
              <h1 className='cart__item-title'>
                <a href={`/campground/${item.id}`}>{item.name}</a>
              </h1>
              <img src={item.image} alt='' />
              <p className='cart__item-region'>{[item.region, item.province].filter(a=>!!a).join(', ')} Region</p>
              <span className='cart__item-delete' onClick={() => this.props.removeFromCart(idx)}>×</span>
            </div>
        )
      });
    }

    const userName = this.context.user ? this.context.user.displayName : "Guest";
    const itemLength = this.props.cart.items.length

    return (
      <div className='cart'>
        <h1>{userName}'s Cart</h1>
        <span className='cart__close' onClick={this.props.toggleCart}>×</span>
        <p className='cart_message'>
          You have {itemLength || 'no'} campground{itemLength !== 1 ? 's' : ''} in your cart.
          {itemLength ? '' : ' Add campgrounds to your cart to save them for later.'}
        </p>
        <ReactCSSTransitionGroup
            transitionName="cart-item"
            transitionLeaveTimeout={200}
            transitionEnterTimeout={200}
        >
          {renderItems}
      </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Cart
