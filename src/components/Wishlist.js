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
    <div>
      <h2>Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        wishlist.map(item => (
          <div key={item.id}>
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <button onClick={() => moveToCart(item)}>Move to Cart</button>
            <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Wishlist;
