import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import productData from '../data/productData.json';
import './ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productData);
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {products.map(product => (
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
    </div>
  );

}

export default ProductList;
