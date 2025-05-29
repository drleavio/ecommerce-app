// NavBar.jsx
import React, { useContext } from 'react';
import AuthContext from '../context/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import cart from "../assets/cart.svg";
// import axios from 'axios';
import { useCart } from '../context/useCart';

const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);
  const { cartCount} = useCart();

  const handleClick = () => {
    logout();
    navigate("/");
  };

 

  return (
    <div className='w-full bg-blue-500 py-4 px-5 flex items-center sticky top-0 justify-between '>
      <Link to="/"><div>Shop</div></Link>
      <div className='flex items-center justify-center gap-3'>
        {!token ? (
          <>
            <Link to="/login"><button className='bg-black text-white px-3 flex items-center justify-center py-1 rounded-md'>Login</button></Link>
            <Link to="/signup"><button className='bg-black text-white px-3 flex items-center justify-center py-1 rounded-md'>Signup</button></Link>
          </>
        ) : (
          <>
            <div onClick={handleClick}>Logout</div>
            <Link to="/cart">
            <div className='relative h-[50px] w-[50px] flex items-center justify-center'>
              <div className='absolute top-0 right-0 bg-white rounded-full h-[20px] w-[20px] flex items-center justify-center'>{cartCount}</div>
              <img src={cart} alt="cart" />
            </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
