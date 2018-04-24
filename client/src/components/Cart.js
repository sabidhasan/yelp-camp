import React from 'react'

class Cart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const currentItems = JSON.parse(localStorage.cart || "[]")
    if (currentItems.length) {
      var items = currentItems.map((item, idx) => {
        return (
          <div key={item.id} className='cart__item'>
            <h1><a href={`/campground/${item.id}`}>{item.name}</a></h1>
            <p>{item.region}, {item.province}</p>
          </div>
        )
      });
    } else {
      var items = <h2>You haven't saved any campgrounds yet.
        Add campgrounds to your 'cart' to save them for later.</h2>
    }

    return (
      <div className={`cart${this.props.show ? ' cart-show' : ''}`}>
        <h1>Cart</h1>
        <span className='cart__close' onClick={() => this.props.toggleCart(null)}>X</span>
        {items}
      </div>
    )
  }

}

export default Cart
