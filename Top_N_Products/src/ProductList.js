import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          'https://20.244.56.144/test/register',
          {
            access_code: 'zpKKbc',
            email: 'anshgoyal18111354@gmail.com'
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Top Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} alt={product.name} />
            <div>{product.name}</div>
            <div>{product.company}</div>
            <div>{product.category}</div>
            <div>{product.price}</div>
            <div>{product.rating}</div>
            <div>{product.discount}</div>
            <div>{product.availability}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
