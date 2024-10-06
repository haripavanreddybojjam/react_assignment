import React from 'react';

function Cart({ cart, setCart, addToWishlist }) {
  const increaseQuantity = (id) => { 
    setCart(
      cart.map(item => 
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    const item = cart.find(item => item.id === id);
    if (item.quantity === 1) {
      removeFromCart(id);
    } else {
      setCart(
        cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const moveToWishlist = (item) => {
    addToWishlist(item);  
    removeFromCart(item.id); 
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <div>
              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>
            </div>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
            <button onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
          </div>
        ))
      )}
      <p>
        Total Price: $
        {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
      </p>
    </div>
  );
}

export default Cart;
