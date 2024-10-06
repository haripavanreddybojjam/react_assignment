import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartQuantity = (productId, change) => {
    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: item.quantity + change }
        : item
    ).filter(item => item.quantity > 0));  
  };
  const addToWishlist = (product) => {
    const existingProduct = wishlist.find(item => item.id === product.id);
    if (!existingProduct) {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <Router>
      <div className="App">
      <Navbar cart = {cart}/>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetails 
              addToCart={addToCart} 
              cart={cart} 
              updateCartQuantity={updateCartQuantity} 
              addToWishlist={addToWishlist}
              wishlist={wishlist} 
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
