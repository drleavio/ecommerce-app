import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const Dashboard = () => {
    const [product, setProduct] = useState([]);
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:3001/api/products");
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
                        <div className='border border-gray-300 p-3 '>
                        <div><img className='h-[300px] aspect-square' src={obj.images} alt="" /></div>
                            <div className='text-2xl'>{obj.brand}</div>
                        </div>
                    </Link>
                })
            }
        </div>
        </div>
    )
}

export default Dashboard