// context/CartContext.js
import { createContext, useEffect, useState, useContext } from 'react';
import AuthContext from './useAuth';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { token } = useContext(AuthContext)
    const [cartCount, setCartCount] = useState(0);
    const [productId, setProductId] = useState([])
    const [cartId, setCartId] = useState("")
    const [data, setData] = useState([])
    const fetchCart = async () => {
        if (!token) return;
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const response = await axios.get("https://ecommerce-app-1-gn2p.onrender.com/api/showcart", config);
            console.log(response.data.cart, "response");
            if (response.data.cart) {
                setCartId(response.data.cart._id)
                setCartCount(response.data.cart.totalItems || 0);
                setProductId(
                    response.data?.cart?.items?.map((item) => item.product) || []
                );

                console.log(productId);
            } else {

            }

        } catch (err) {
            console.error("Error fetching cart", err);
        }
    };
    useEffect(() => {
        fetchCart();
    }, [token]);
    return (
        <CartContext.Provider value={{ cartCount, fetchCart, productId, cartId, setCartId, data, setData }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
