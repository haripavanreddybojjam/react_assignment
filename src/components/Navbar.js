import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function Navbar({cart, searchTerm, setSearchTerm }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>HR Store</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/wishlist">Wishlist</Link>
        </li>
      </ul>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="cart-container">
        <Link to="/cart">
          <div className="cart-icon-wrapper">
            <FontAwesomeIcon icon={faShoppingCart} size="2x" />
            {cart.length > 0 && <span className="cart-notification"></span>}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
