import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productData from '../data/productData.json';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');  
  const [maxPrice, setMaxPrice] = useState('');  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

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

  const filteredProducts = products.filter(product => {
    const productMatchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const productMatchesPrice = product.price >= (minPrice === '' ? 0 : minPrice) &&
                                product.price <= (maxPrice === '' ? Infinity : maxPrice);
    return productMatchesSearch && productMatchesPrice;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

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
      <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      {currentProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="product-grid">
          {currentProducts.map(product => (
            <div key={product.id} style={{ border: '1px solid #ddd', padding: '20px' }}>
              <img 
                src={product.image} 
                alt={product.title} 
                style={{ width: '100px', height: '100px', objectFit: 'contain' }} 
              />
              <h3>{product.title}</h3>
              <p>Price: ${product.price}</p>
              <Link to={`/product/${product.id}`}>View Details</Link>
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
