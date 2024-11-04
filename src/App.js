import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  // const [cart, setCart] = useState(() => {
  //   const savedCart = localStorage.getItem('cart');
  //   return savedCart ? JSON.parse(savedCart) : [];
  // });
  // const [wishlist, setWishlist] = useState(() => {
  //   const savedWishlist = localStorage.getItem('wishlist');
  //   return savedWishlist ? JSON.parse(savedWishlist) : [];
  // });
  // useEffect(() => {
  //   localStorage.setItem('cart', JSON.stringify(cart));
  // }, [cart]);

  // useEffect(() => {
  //   localStorage.setItem('wishlist', JSON.stringify(wishlist));
  // }, [wishlist]);
  const [searchTerm, setSearchTerm] = useState('');
  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       const response = await axios.get('/api/cart');
  //       setCart(response.data.products);  // Load cart items directly from DB
  //       console.log(response.data)
  //     } catch (error) {
  //       console.error('Error fetching cart:', error);
  //     }
  //   };

  //   const fetchWishlist = async () => {
  //     try {
  //       const response = await axios.get('/api/wishlist');
  //       setWishlist(response.data.products);  // Load wishlist items directly from DB
  //     } catch (error) {
  //       console.error('Error fetching wishlist:', error);
  //     }
  //   };

  //   fetchCart();
  //   fetchWishlist();
  // }, []);
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartResponse = await axios.get('/api/cart');
        const cartItems = cartResponse.data.products;

        // Fetch full product details for each cart item
        const detailedCartItems = await Promise.all(
          cartItems.map(async (item) => {
            const productId = item.productId._id || item.productId;
            const productResponse = await axios.get(`/api/products/${productId}`);
            return { ...productResponse.data, quantity: item.quantity }; // Combine product details with quantity
          })
        );

        setCart(detailedCartItems);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    const fetchWishlist = async () => {
      try {
        const wishlistResponse = await axios.get('/api/wishlist');
        const wishlistItems = wishlistResponse.data.products;

        // Fetch full product details for each wishlist item
        const detailedWishlistItems = await Promise.all(
          wishlistItems.map(async (item) => {
            const productId = item.productId._id || item.productId;
            const productResponse = await axios.get(`/api/products/${productId}`);
            return productResponse.data; // Return product details only
          })
        );

        setWishlist(detailedWishlistItems);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchCart();
    fetchWishlist();
  }, []);
  const addToCart = async (product) => {
    try {
      await axios.post('/api/cart/add', { productId: product._id, quantity: 1 });
      setCart(prevCart => {
        const existingProduct = prevCart.find(item => item._id === product._id);
        return existingProduct
          ? prevCart.map(item => 
              item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item)
          : [...prevCart, { ...product, quantity: 1 }];
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Update quantity in cart
  const updateCartQuantity = async (productId, change) => {
    try {
      const cartItem = cart.find(item => item._id === productId);
  
      if (!cartItem) return; // If the product isn't in the cart, do nothing
  
      const newQuantity = cartItem.quantity + change;
  
      if (newQuantity <= 0) {
        // If quantity reaches 0 or below, remove the item from the cart
        await axios.post('/api/cart/remove', { productId });
        setCart(cart.filter(item => item._id !== productId)); // Remove from local state
      } else {
        // Otherwise, update the quantity in the backend
        await axios.post('/api/cart/add', { productId, quantity: change });
        setCart(
          cart.map(item =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error);
    }
  };
  

  // Add product to wishlist
  const addToWishlist = async (product) => {
    try {
      await axios.post('/api/wishlist/add', { productId: product._id });
      setWishlist(prevWishlist => {
        const existingProduct = prevWishlist.find(item => item._id === product._id);
        return existingProduct ? prevWishlist : [...prevWishlist, product];
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  return (
    <Router>
      <div className="App">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cart = {cart}/>
        <Routes>
        <Route path="/" element={<ProductList 
              addToCart={addToCart} 
              cart={cart} 
              updateCartQuantity={updateCartQuantity} 
              addToWishlist={addToWishlist}
              setWishlist={setWishlist}
              wishlist={wishlist}
              searchTerm={searchTerm} />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetails 
              addToCart={addToCart} 
              cart={cart} 
              updateCartQuantity={updateCartQuantity} 
              addToWishlist={addToWishlist}
              wishlist={wishlist} 
              setWishlist ={setWishlist}
              searchTerm={searchTerm}
            />} 
          />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} addToWishlist={addToWishlist} />} />
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} addToCart={addToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
