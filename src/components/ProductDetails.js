import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productData from '../data/productData.json';

function ProductDetails({ addToCart, cart, updateCartQuantity, addToWishlist, wishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProduct = productData.find(p => p.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id]);

  const handleIncreaseQuantity = () => {
    updateCartQuantity(product.id, 1);  
  };

  const handleDecreaseQuantity = () => {
    const cartItem = cart.find(item => item.id === product.id);
    if (cartItem.quantity === 1) {
      updateCartQuantity(product.id, -cartItem.quantity);  
    } else {
      updateCartQuantity(product.id, -1);  
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const cartItem = cart.find(item => item.id === product.id);
  const wishlistItem = wishlist.find(item => item.id === product.id);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>

      {cartItem ? (
        <div>
          <button onClick={handleDecreaseQuantity}>-</button>
          <span>{cartItem.quantity}</span>
          <button onClick={handleIncreaseQuantity}>+</button>
        </div>
      ) : (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}

      
      {wishlistItem ? (
        <p>Item is in wishlist</p>
      ) : (
        <button onClick={() => addToWishlist(product)}>Add to Wishlist</button>
      )}

      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
}

export default ProductDetails;
