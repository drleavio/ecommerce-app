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
        <div>
            {
                product.map((obj, ind) => {
                    return <Link key={ind} to={`/products/${obj._id}`}>
                        <div >
                            <div>{obj.brand}</div>
                            <div>{obj.category}</div>
                        </div>
                    </Link>
                })
            }
        </div>
    )
}

export default Dashboard