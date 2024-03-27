import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.post(
            'https://20.244.56.144/test/register',
            {
              access_code: 'zpKKbc',
              email: 'anshgoyal18111354@gmail.com'
              //Product_id:'match.params.id'
            }
        );
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [match.params.id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <div>{product.company}</div>
      <div>{product.category}</div>
      <div>{product.price}</div>
      <div>{product.rating}</div>
      <div>{product.discount}</div>
      <div>{product.availability}</div>
    </div>
  );
};

export default ProductDetail;
