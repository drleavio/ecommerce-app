// pages/ProductDetails.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/useAuth';
import { useCart } from '../context/useCart';
import { toast } from "react-toastify";

const Product = () => {
  const { id } = useParams(); // product id from route
  const { token } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
    const {fetchCart,productId}=useCart()
  // Fetch product by ID
  useEffect(() => {
    axios.get(`https://ecommerce-app-1-gn2p.onrender.com/api/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
      console.log(product);
      
  }, [id]);

  const handleBuyClick = async () => {
    if (!token) {
      alert("Please login first!");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const data = {
        productId: product._id,
        quantity: 1,
      };

      const response = await axios.put("https://ecommerce-app-1-gn2p.onrender.com/api/updatecart", data, config);
      console.log("Cart updated:", response.data);
      toast.success("product added to cart")
      fetchCart()
    } catch (error) {
      console.error("Failed to update cart:", error);
      alert("Something went wrong");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className='w-full h-full flex items-center justify-center flex-col md:flex-row p-10'>
     <div className='w-[30%] flex items-start justify-center'>
        <img className='h-[200px] aspect-square' src={product.images} alt="" />
     </div>
     <div className='w-[70%] flex items-start justify-center flex-col'>
     <h1 className='text-3xl mb-3'>{product.name}</h1>
      <p className='text-gray-600 mb-3'>{product.description}</p>
      <p className='text-xl mb-3'>Price: ₹{product.price}</p>
      {
        productId.includes(product._id)?<Link to="/cart"><button className='bg-black text-white px-3 py-2 rounded-md'>Go to cart</button></Link>: <button  className='bg-black text-white px-3 py-2 rounded-md' onClick={handleBuyClick}>Buy</button>
      }
     </div>
     
    </div>
  );
};

export default Product;
