import React from 'react';

function Wishlist({ wishlist, setWishlist, addToCart }) {
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  const moveToCart = (item) => {
    addToCart(item);  
    removeFromWishlist(item.id);  
  };

  return (
    <div className="wishlist-grid">
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map(item => (
          <div key={item.id} className="wishlist-card">
            <img src={item.image} alt={item.name} className="product-image" />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <div className="wishlist-actions">
              <button onClick={() => moveToCart(item)}>Move to Cart</button>
              <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
