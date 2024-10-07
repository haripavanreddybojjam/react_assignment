import React from 'react';
import './cart.css';
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
  var totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      
    <div className="total-price">
      Total: ${totalPrice.toFixed(2)}
    </div>

    {cart.length === 0 ? (
      <p>Your cart is empty</p>
    ) : (
      <div className="cart-grid">
        {cart.map(item => (
          <div key={item.id} className="cart-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <div>
            <button onClick={() => decreaseQuantity(item.id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item.id)}>+</button>
          </div>
            <div className="cart-actions">
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
              <button onClick={() => moveToWishlist(item)}>Move to Wishlist</button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}

export default Cart;
