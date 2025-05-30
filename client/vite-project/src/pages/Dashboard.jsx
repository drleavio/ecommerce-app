import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";


const Dashboard = () => {
    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        const response = await axios.get("https://ecommerce-app-1-gn2p.onrender.com/api/products");
        console.log(response.data.response);
        setProduct(response.data.response)
    }
    useEffect(() => {
        fetchProducts();
    }, [])
    return (
        <div className='w-full flex items-center justify-center p-4 '>
     
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 h-[100%]'>
            {
                product.map((obj, ind) => {
                    return <Link key={ind} to={`/products/${obj._id}`}>
                         <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 120 }}
                                className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
                              >
                        <div className='border border-gray-300 p-3 '>
                        <div><img className='h-[300px] aspect-square' src={obj.images} alt="" /></div>
                            <div className='text-2xl'>{obj.brand}</div>
                        </div>
                        </motion.div>
                    </Link>
                })
            }
        </div>
        </div>
    )
}

export default Dashboard