import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './productDetails.css';
import axios from 'axios';

function ProductDetails({ addToCart, cart, updateCartQuantity, addToWishlist, wishlist, setWishlist }) {
  const { id } = useParams(); // Extract product ID from route parameters
  const [product, setProduct] = useState(null);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const navigate = useNavigate();

  // Fetch product data from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data); // Set product details
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    setIsInWishlist(wishlist.some(item => item._id === id));
  }, [wishlist, id]);

  const handleIncreaseQuantity = () => {
    updateCartQuantity(product._id, 1);
  };

  const handleDecreaseQuantity = () => {
    const cartItem = cart.find(item => item._id === product._id);
    if (cartItem.quantity === 1) {
      updateCartQuantity(product._id, -cartItem.quantity);
    } else {
      updateCartQuantity(product._id, -1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
  };
  const handleAddToWishlist = async () => {
    if (!isInWishlist) {
      try {
        // Add the item to the wishlist in the backend
        await axios.post('/api/wishlist/add', { productId: product._id });
        setWishlist([...wishlist, product]); // Add to local wishlist state
        setIsInWishlist(true); // Update state to reflect the item is in the wishlist
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    } else {
      try {
        // Remove the item from the wishlist in the backend
        await axios.post('/api/wishlist/remove', { productId: product._id });
        setWishlist(wishlist.filter(item => item._id !== product._id)); // Remove from local wishlist state
        setIsInWishlist(false); // Update state to reflect the item is no longer in the wishlist
      } catch (error) {
        console.error('Error removing from wishlist:', error);
      }
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  const cartItem = cart.find(item => item._id === product._id);

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
              <button onClick={() => updateCartQuantity(product._id, -1)}>-</button>
              <span>{cartItem.quantity}</span>
              <button onClick={() => updateCartQuantity(product._id, 1)}>+</button>
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
