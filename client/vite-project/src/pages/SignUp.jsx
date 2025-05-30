import axios from 'axios'
import React, { useState,useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/useAuth';
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate=useNavigate();
    const {token}=useContext(AuthContext)
    const [loading,setLoading]=useState(false)
    const [data,setData]=useState({
        username:"",
        password:""
    })
    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const handleclick=async(e)=>{
        e.preventDefault();
        setLoading(true)
        const response=await axios.post("http://localhost:3001/auth/signup",data);
        toast.success("signedup successfully")
        navigate('/login')
        console.log(response);
        setLoading(false)
    }
     useEffect(() => {
           if(token){
            navigate("/")
           }
    
        }, [])
  return (
    <div className='h-full w-full flex items-center justify-center'>
            <div className='flex items-center justify-center flex-col bg-white px-20 gap-5 py-10 rounded-2xl'>
                <h1 className='text-4xl'>SignUp</h1>
                <input type="text" name='username' onChange={(e)=>handleChange(e)} placeholder='username' className='w-[350px] border border-gray-300 p-2 rounded-xl'/>
                <input type="text" name='password' onChange={(e)=>handleChange(e)} placeholder='password'className='w-[350px] border border-gray-300 p-2 rounded-xl' />
                <button className='w-full bg-black text-white p-2 rounded-xl' onClick={(e)=>handleclick(e)}>{loading?"signingup...":"Signup"}</button>
                <p>Already have an account? please <Link to="/login">Login</Link></p>
            </div>
    </div>
  )
}

export default SignUp