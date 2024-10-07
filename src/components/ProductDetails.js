import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productData from '../data/productData.json';
import './productDetails.css';

function ProductDetails({ addToCart, cart, updateCartQuantity, addToWishlist, wishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const [isInWishlist, setIsInWishlist] = useState(false);

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
  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
    } else {
      addToWishlist(product);
      setIsInWishlist(true);
    }
  };
  if (!product) {
    return <p>Loading...</p>;
  }

  const cartItem = cart.find(item => item.id === product.id);
  const wishlistItem = wishlist.find(item => item.id === product.id);

  return (
    <div className="product-details">
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image} alt={product.title} />
      </div>

      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <p className="product-price">Price: ${product.price}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-actions">
          {cartItem ? (
            <div className="cart-quantity">
              <button onClick={() => updateCartQuantity(product.id, -1)}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => updateCartQuantity(product.id, 1)}>+</button>
            </div>
          ) : (
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}

          <button 
            className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`} 
            onClick={handleAddToWishlist}
          >
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </button>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>
          Back to Products
        </button>
      </div>
    </div>
  </div>
  );
}

export default ProductDetails;
