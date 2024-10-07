import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productData from '../data/productData.json';
import './ProductList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

function ProductList({addToCart, updateCartQuantity, addToWishlist, cart, wishlist, setWishlist, searchTerm }) {
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');  
  const [maxPrice, setMaxPrice] = useState('');  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };
  const [wishlistToggle, setWishlistToggle] = useState({});

  useEffect(() => {
    setProducts(productData);
  }, []);
  const handleMinPriceChange = (e) => {
    const value = e.target.value;
    setMinPrice(value === '' ? '' : Math.max(0, Number(value)));  
  };

  const handleMaxPriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value === '' ? '' : Math.max(0, Number(value)));  
  };
  const handleWishlistToggle = (product) => {
    setWishlistToggle((prev) => ({
      ...prev,
      [product.id]: !prev[product.id]
    }));
    if (!wishlistToggle[product.id]) {
      addToWishlist(product);
    } else {
      removeFromWishlist(product.id);
    }
  };

  const filterBySearchTerm = (product) => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  };
  const filterByPrice = (product) => {
    return product.price >= (minPrice === '' ? 0 : minPrice) && 
           product.price <= (maxPrice === '' ? Infinity : maxPrice);
  };
  const filteredProducts = products.filter(product => filterBySearchTerm(product) && filterByPrice(product));
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const isInCart = (productId) => {
    return cart.find((item) => item.id === productId);
  };
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const getPageNumbers = () => {
    const maxPagesToShow = 5; 
    let startPage = Math.max(1, currentPage - 2);  
    let endPage = Math.min(totalPages, currentPage + 2);  

    if (currentPage <= 2) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage >= totalPages - 2) {
      startPage = Math.max(1, totalPages - (maxPagesToShow - 1));
    }

    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));
  return (
    <div className="product-page">
    <div className="sidebar">
        <h3>Filter by Price</h3>
        <label>
          Min Price:
          <input
            type="number"
            value={minPrice}
            placeholder="Min"
            onChange={handleMinPriceChange}
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            value={maxPrice}
            placeholder="Max"
            onChange={handleMaxPriceChange}
          />
        </label>
      </div>
    <div className="main-content">
      <h2>Products</h2>
      
      {currentProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-grid">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
          <Link to={`/product/${product.id}`} key={product.id} className="product-link">

            <img className='product-image'
              src={product.image} 
              alt={product.title} 
            />
          

            <h3>{product.title}</h3>
            <p>Price: ${product.price}</p>
            </Link>
            
      <FontAwesomeIcon 
        icon={wishlistToggle[product.id] ? solidHeart : regularHeart} 
        size="2x" 
        className={wishlistToggle[product.id] ? 'wishlist-heart active' : 'wishlist-heart'}
        onClick={() => handleWishlistToggle(product)}
      />
      {isInCart(product.id) ? (
        <div>
          <button onClick={() => updateCartQuantity(product.id, -1)}>-</button>
          <span>{isInCart(product.id).quantity}</span>
          <button onClick={() => updateCartQuantity(product.id, 1)}>+</button>
        </div>
      ) : (
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      )}
            
          </div>
        ))}
      </div>
    )}
      <div className="pagination-container">
          <div className="current-page-info">
            <p>Page {currentPage} of {totalPages}</p>
          </div>

          <div className="pagination">
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            {getPageNumbers().map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={number === currentPage ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <span>...</span>
            )}
            <button onClick={goToNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
    </div>
    </div>
  );

}

export default ProductList;
