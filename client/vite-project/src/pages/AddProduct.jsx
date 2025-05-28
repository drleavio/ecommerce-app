import React, { useState } from 'react'
import axios from "axios"

const AddProduct = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: 0,
        images: "",
        category: "",
        brand: "",
        stock: 0,
        color: "",
        size: ""
    })
    const handlechange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);

    }
    const handleClick = async () => {
        try {
            const response = await axios.post("https://ecommerce-app-zz9k.onrender.com/api/addproducts", data)
            console.log(response);

        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div className='w-full h-full flex items-center justify-center flex-col gap-3'>
            <input type="text" name='name' placeholder='product-name' className='border' onChange={(e) => handlechange(e)} />
            <input type="text" name='description' placeholder='description' className='border' onChange={(e) => handlechange(e)} />
            <input type="number" name='price' placeholder='price' className='border' onChange={(e) => handlechange(e)} />
            <input type="text" name='images' placeholder='image-link' className='border' onChange={(e) => handlechange(e)} />
            <select className='border' name='category' onChange={(e) => setData({
                ...data,
                category: e.target.value
            })}>
                <option value="Electronics">Electronics</option>
                <option value="Clothing">Clothing</option>
                <option value="Books">Books</option>
                <option value="Home">Home</option>
                <option value="Beauty">Beauty</option>
                <option value="Food">Food</option>
                <option value="Toys">Toys</option>
                <option value="Other">Other</option>
            </select>
            <input type="text" name='brand' placeholder='brand-name' className='border' onChange={(e) => handlechange(e)} />
            <input type="number" name='stock' placeholder='quantity' className='border' onChange={(e) => handlechange(e)} />
            <input type="text" name='color' placeholder='colors' className='border' onChange={(e) => handlechange(e)} />
            <input type="text" name='size' placeholder='sizes' className='border' onChange={(e) => handlechange(e)} />
            <button onClick={handleClick} className='bg-black text-white'>add</button>
        </div>
    )
}

export default AddProduct