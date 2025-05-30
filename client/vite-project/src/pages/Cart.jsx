import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/useAuth'
import { useCart } from '../context/useCart';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

const Cart = () => {
    const {token}=useContext(AuthContext);
    const {fetchCart,data,setData}=useCart()
    console.log(data,"data");
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    
    const fetchcart=async()=>{
        const response=await axios.get("http://localhost:3001/api/showcart",config)
        setData(response.data.cart)
    }
    const removeItem = async (id) => {
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
            productId: id,
            quantity: 0,
          };
    
          const response = await axios.put("http://localhost:3001/api/updatecart", data, config);
        //   console.log("Cart updated:", response.data);
          toast.success("product removed from cart")
          fetchcart()
          fetchCart()
        } catch (error) {
          console.error("Failed to update cart:", error);
          alert("Something went wrong");
        }
      };
    useEffect(()=>{
        
        fetchCart();
        fetchcart()
        
    },[])
  return (
    <div className='w-[100%]'>
        {
            !data ? <div>cart is empty</div>:
            <>
        
        <div className='w-[100%] flex items-center justify-between px-3 py-2'>
        <div>Total Items: {data.totalItems}</div>
        <div>Total price: {data.totalPrice}</div>
        </div>
        <div className='gap-2'>
            {
                data.items?.map((val,ind)=>{
                    return <div key={ind} className='border border-gray-300 p-3 flex items-start justify-start gap-10'>
                        <img className='h-[100px] aspect-square' src={val.image} alt="fig" />
                        <div className='flex flex-col gap-3'>
                        <div>model: {val.name}</div>
                        <div>Quantity: {val.quantity}</div>
                        </div>
                        <div>
                        <button className='bg-black text-white px-3 py-2 rounded-md' onClick={()=>removeItem(val.product)}>remove</button>
                        </div>
                    </div>
                })
            }
        </div>
        <div className='p-4'>
        <Link to="/checkout"><button className='bg-black text-white px-3 py-2 rounded-md'>Checkout</button></Link>
        </div>
        </>
}
    </div>
  )
}

export default Cart