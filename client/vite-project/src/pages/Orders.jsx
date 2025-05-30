import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import { useCart } from '../context/useCart'
import AuthContext from '../context/useAuth';

const Orders = () => {
    const {token}=useContext(AuthContext);
    const [data,setData]=useState([]);
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
     
    const fetchOrders=async()=>{
        const response=await axios.get("http://localhost:3001/api/orderdetails",config);
        console.log(response);
        setData(response.data.response);
    }
    useEffect(()=>{
        if(!token){
            alert("please login")
            return
        }
        fetchOrders();
    },[])
  return (
    <div className='w-full h-full'>
        <div>
            {   !data ?<div>No ordered placed</div>:
                data?.map((obj,ind)=>{
                    return <div className='border border-gray-300' key={ind}>
                        <div className='p-4'>
                            {
                                obj.cart.map((val,index)=>{
                                    return <div className='p-4 flex items-center justify-between' key={index}>
                                        <img className='h-[50px] aspect-square' src={val.image} alt="" />
                                        <div>
                                        <div>name: {val.name}</div>
                                        <div>price: {val.price}</div>
                                        <div>quantity: {val.quantity}</div>
                                        </div>
                                    </div>
                                })
                            }
                            <div>Address: {obj.address}</div>
                            <div>Name: {obj.name}</div>
                            <div>Email: {obj.email}</div>
                            <div>Phone: {obj.phone}</div>
                            <div>ordered placed at: {obj.updatedAt}</div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Orders