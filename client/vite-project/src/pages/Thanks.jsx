import React, { useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/useAuth";

const Thanks = () => {
  const navigate = useNavigate();
  const {token}=useContext(AuthContext);
  useEffect(()=>{
    if(!token){
        alert("please sign in");
        return
    }
  },[token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-blue-100 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
        className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-green-500 flex justify-center mb-4"
        >
          <CheckCircle size={72} strokeWidth={1.5} />
        </motion.div>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Thank You!
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 mb-6"
        >
          Your order has been placed successfully. We’ll send you a confirmation email shortly.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition"
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Thanks;
