// pages/ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
  const { id } = useParams(); // Get dynamic parameter from URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/product/${id}`)
      .then((res) => setProduct(res.data)
      )
      .catch((err) => console.error(err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ₹{product.price}</p>
    </div>
  );
};

export default Product;
