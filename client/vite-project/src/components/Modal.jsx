import React from "react";

const Modal = () => {


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-green-100 rounded-2xl shadow-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
        
        <div>Verifying your payment...</div>  
        </div>
       
      </div>
    </div>
  );
};

export default Modal;
