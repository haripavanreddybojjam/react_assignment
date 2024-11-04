import React, { useState, useEffect } from 'react';
import './cart.css';
import axios from 'axios';
function Cart({ cart, setCart, addToWishlist }) {


  const increaseQuantity = async (id) => { 
    try {
      // Send request to the backend to increase quantity
      await axios.post('/api/cart/add', { productId: id, quantity: 1 });
  
      // Update the local cart state
      setCart(
        cart.map(item => 
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } catch (error) {
      console.error('Error increasing quantity:', error);
    }
  };

  const decreaseQuantity = async (id) => {
    const item = cart.find(item => item._id === id);
    if (!item) return;
  
    if (item.quantity === 1) {
      removeFromCart(id); // Remove from cart if quantity reaches 1
    } else {
      try {
        // Send request to the backend to decrease quantity
        await axios.post('/api/cart/add', { productId: id, quantity: -1 });
  
        // Update the local cart state
        setCart(
          cart.map(item =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } catch (error) {
        console.error('Error decreasing quantity:', error);
      }
    }
  };
  const removeFromCart = async (id) => {
    try {
      // Send request to the backend to remove the product from the cart
      await axios.post('/api/cart/remove', { productId: id });
  
      // Update the local cart state
      setCart(cart.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const moveToWishlist = async (item) => {
    try {
      // Add the item to wishlist in the backend
      await axios.post('/api/wishlist/add', { productId: item._id });
      
      // Remove the item from the cart in the backend and locally
      removeFromCart(item._id);
  
      // Add to wishlist locally (assuming addToWishlist only updates state)
      addToWishlist(item);
    } catch (error) {
      console.error('Error moving item to wishlist:', error);
    }
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
          <div key={item._id} className="cart-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Total: ${item.price * item.quantity}</p>
            <div>
            <button onClick={() => decreaseQuantity(item._id)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => increaseQuantity(item._id)}>+</button>
          </div>
            <div className="cart-actions">
              <button onClick={() => removeFromCart(item._id)}>Remove from Cart</button>
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
