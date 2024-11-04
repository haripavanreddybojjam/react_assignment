import React from 'react';
import './wishlist.css';
import axios from 'axios';
function Wishlist({ wishlist, setWishlist, addToCart }) {
  const removeFromWishlist = async (id) => {
    try {
      // Send request to remove the product from the wishlist in the backend
      await axios.post('/api/wishlist/remove', { productId: id });

      // Update the local wishlist state
      setWishlist(wishlist.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const moveToCart = async (item) => {
    try {
      // Add the item to the cart in the backend
      await axios.post('/api/cart/add', { productId: item._id, quantity: 1 });

      // Remove the item from the wishlist in the backend
      await removeFromWishlist(item._id);

      // Add item to cart locally (assuming addToCart only updates local state)
      addToCart(item);
    } catch (error) {
      console.error('Error moving item to cart:', error);
    }
  };

  return (
    <div className="wishlist-grid">
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map(item => (
          <div key={item._id} className="wishlist-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <div className="wishlist-actions">
              <button onClick={() => moveToCart(item)}>Move to Cart</button>
              <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
