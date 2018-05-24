import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import XButton from './XButton'

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }

  static contextTypes = {
    user: PropTypes.object,
  };

  render() {
    let renderItems;
    if (this.props.cart.items.length) {
       renderItems = this.props.cart.items.map((item, idx) => {
        return (
            <div key={item.id} className='Cart__item'>
              <h2 className='Cart__item-title'>
                <a className='Cart__item-link bold' href={`/campground/${item.id}`}>{item.name}</a>
              </h2>
              <img className='Cart__item-photo' src={item.image} alt='' />
              <p className='Cart__item-region'>
                {[item.region, item.province].filter(a=>!!a).join(', ')} Region
              </p>
              <XButton
                className='Cart__item-delete bold'
                onClick={() => this.props.removeFromCart(idx)}
              />
            </div>
        )
      });
    }

    const userName = this.context.user ? this.context.user.displayName : "Guest";
    const itemLength = this.props.cart.items.length

    return (
      <div className='Cart'>
        <h1 className='Cart__header'>{userName}'s Cart</h1>
        <XButton className='Cart__close bold' onClick={this.props.toggleCart} />

        <p className='Cart__message'>
          You have {itemLength || 'no'} campground{itemLength !== 1 ? 's' : ''} in your cart.
          {itemLength ? '' : ' Add campgrounds to your cart to save them for later.'}
        </p>
        <ReactCSSTransitionGroup
            transitionName='Cart__items'
            transitionLeaveTimeout={200}
            transitionEnterTimeout={200}
            className='Cart__items'
        >
          {renderItems}
      </ReactCSSTransitionGroup>
      </div>
    )
  }
}

export default Cart
