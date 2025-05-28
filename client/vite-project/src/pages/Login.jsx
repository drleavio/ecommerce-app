import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AuthContext from '../context/useAuth';

const Login = () => {
    const navigate = useNavigate();
    const { token, setTokenState } = useContext(AuthContext)
    const [data, setData] = useState({
        username: "",
        password: ""
    })
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleclick = async (e) => {
        e.preventDefault();
        const response = await axios.post("https://ecommerce-app-zz9k.onrender.com/auth/signin", data);
        console.log(response.data.token);
        setTokenState(response.data.token)
        navigate('/')
    }
    useEffect(() => {
        console.log(token);

    }, [])
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col bg-white px-20 gap-5 py-10 rounded-2xl'>
                <h1 className='text-4xl'>Login</h1>
                <input type="text" name='username' placeholder='username' className='w-[350px] border border-gray-300 p-2 rounded-xl' onChange={(e) => handleChange(e)} />
                <input type="password" name='password' placeholder='password' className='w-[350px] border border-gray-300 p-2 rounded-xl' onChange={(e) => handleChange(e)} />
                <button className='w-full bg-black text-white p-2 rounded-xl' onClick={(e) => handleclick(e)}>Login</button>
                <p>Don't have an account? please <Link to="/signup">SignUp</Link></p>
            </div>
        </div>
    )
}

export default Login