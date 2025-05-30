import React, { useContext, useEffect, useState } from 'react';
import { useCart } from '../context/useCart';
import AuthContext from '../context/useAuth';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from "@emailjs/browser";
import Modal from '../components/Modal';

const Checkout = () => {
  const { cartId,fetchCart } = useCart();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const {data}=useCart()
  const [loading,setLoading]=useState(false);

  const [datas, setDatas] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    cityStateZip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    price:data.totalPrice
  });

  useEffect(() => {
    if (!token) {
      alert("Please login");
    //   navigate("/");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatas((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
   
      
      const response = await axios.post(
        `http://localhost:3001/api/checkout/${cartId}`,
        datas,
        config
      );
  
    await sendScoreToEmail(response.data.order.email,response.data.order._id,response.data.order.name)
      
    //   toast.success("Order placed successfully!");
      fetchCart()
      navigate("/thanks"); // redirect to home or success page
      setLoading(false)
    } catch (error) {
      console.error(error);
      toast.error("Checkout failed. Please try again.");
    }
  };
  const sendScoreToEmail = async (email, id, price,cost,name) => {
    try {
      const response = await emailjs.send(
        "service_cqniqu7", // Replace with EmailJS Service ID
        "template_2svf0tm" ,
        {
          user_email: email,
          order_id: id,
          name:name
        },
        "o9JN8ASBxMAKQ1NIE"// ✅ Replace with your EmailJS Public Ke
      );
      console.log(response,"mail");
      
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
    
    


  return (
    <>
    <div className='h-full w-full flex items-center justify-center'>
        {
            loading && <Modal/>
        }
      <form
        onSubmit={handleSend}
        className='flex items-center justify-center flex-col gap-3 w-full max-w-md'
      > 
        <label className='w-full'>Name</label>
        <input type="text" name='name' value={data.name} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>Email</label>
        <input type="email" name='email' value={data.email} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>Phone number</label>
        <input type="tel" name='phone' value={data.phone} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>Address</label>
        <input type="text" name='address' value={data.address} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>City, State, Zip code</label>
        <input type="text" name='cityStateZip' value={data.cityStateZip} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>Card Number</label>
        <input type="text" name='cardNumber' value={data.cardNumber} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>Expiry date</label>
        <input type="text" name='expiryDate' value={data.expiryDate} className='border w-full p-2 rounded-md' onChange={handleChange} required />

        <label className='w-full'>CVV</label>
        <input type="text" name='cvv' value={data.cvv} className='border w-full p-2 rounded-md' onChange={handleChange} required />
            <div>Amount to pay: {datas.price}</div>
        <button type="submit" className='w-full bg-black px-4 py-2 rounded-md text-white mt-4'>Purchase</button>
      </form>
    </div>
   
    </>
  );
};

export default Checkout;
