import React from 'react'

const Cart = (props) => {
  const defaultItems = JSON.parse(localStorage.cart || "[]")
  if (defaultItems.length) {
    var items = defaultItems.map(item => <span>{item}</span>);
  } else {
    var items = <h2>You haven't saved any campgrounds yet.
      Add campgrounds to your 'cart' to save them for later.</h2>
  }
  return (
    <div className='cart'>
      <h1>Cart</h1>
      <span className='cart__close' onClick={props.close}>X</span>
      {items}
    </div>
  )
}

export default Cart
