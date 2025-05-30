const express = require('express');
const router = express.Router();
const Product = require("../schema/productSchema");
const connect = require('../db/connectDB');
const Cart = require('../schema/cartSchema');
const Order=require('../schema/orderSchema')
const checkToken = require('../middleware');
const nodemailer = require("nodemailer");

require('dotenv').config();




router.post("/addproducts", async (req, res) => {

  const { name, description, price, images, category, brand, stock, color, size } = req.body;
  try {
    await connect();
    const response = new Product({
      name,
      description,
      price,
      images,
      category,
      brand,
      stock,
      color,
      size
    })
    await response.save();
    if (response) {
      return res.json({
        message: "Product added successfully"
      })
    }
  } catch (error) {
    console.log(error);

    return res.json({
      message: "error adding product"
    })
  }

})

router.get("/products", async (req, res) => {
  try {
    await connect()
    const response = await Product.find().limit(20);
    return res.json({
      message: "fetched",
      response
    })
  } catch (error) {
    return res.json({
      message: "error fetching"
    })
  }
})

router.put("/updatecart", checkToken, async (req, res) => {
  const userId=req.userId;
  const { productId, quantity } = req.body;

  if (!userId || !productId || quantity == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await connect();
    const product = await Product.findById(productId);
    //   console.log(product.images[0].url,"product");

    if (!product) return res.status(404).json({ error: "Product not found" });

    let cart = await Cart.findOne({ user: userId });

    const itemData = {
      product: product._id,
      name: product.name,
      image: product.images, // or product.image depending on your schema
      price: product.price,
      quantity: quantity,
    };

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: quantity > 0 ? [itemData] : [],
      });
    } else {
      const itemIndex = cart.items.findIndex(
        item => item.product.toString() === productId
      );

      if (itemIndex > -1) {
        if (quantity > 0) {
          cart.items[itemIndex].quantity = quantity;
        } else {
          cart.items.splice(itemIndex, 1);
        }
      } else if (quantity > 0) {
        cart.items.push(itemData);
      }
    }
    cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/showcart", checkToken, async (req, res) => {
  const userId = req.userId;
  // console.log(userId,"user");
  
  try {
    await connect()
    let cart = await Cart.findOne({ user: userId });
    // console.log(cart);
    
    return res.json({
      messgae: "card show success",
      cart
    })
  } catch (error) {
    return res.json({
      message: "error fetching"
    })
  }
})

router.get("/product/:id", async (req, res) => {
  const { id } = req.params;


  try {
    await connect();

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});


router.post("/checkout/:id", checkToken, async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  await connect();
  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  console.log(id,userId,"check");
  
  try {
    const {
      name,
      email,
      phone,
      address,
      cityStateZip,
      cardNumber,
      expiryDate,
      cvv,
      price
    } = req.body;
    // const productList=await Cart.findById(id);
    // console.log(productList.items,"list");
    
    const newOrder = new Order({
      user: userId,
      cart: cart.items.map(item => ({
        productId: item.product,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image:item.image
      })),
      name,
      email,
      phone,
      address,
      cityStateZip,
      cardNumber,
      expiryDate,
      cvv,
      price
    });
   
    const savedOrder = await newOrder.save();
    await Cart.deleteOne({ user: userId });
    // await sendScoreToEmail(email,id,price) 
    const timer=setTimeout(()=>{
      res.json({ message: "Order placed successfully", order: savedOrder,status:"success" });
    },3000) 

    return ()=>clearTimeout(timer)

  } catch (error) {
    console.error("Checkout failed:", error);
    res.status(500).json({ message: "Checkout failed", error });
  }
});

router.get("/orderdetails",checkToken,async(req,res)=>{
    const userId=req.userId;
    try {
      const response=await Order.find({user:userId});
      const productdetails=await Cart.find({user:userId})
      console.log(typeof(response));
      
      if(response){
        return res.json({
          message:"order details sent successfully",
          response
        })
      }
    } catch (error) {
      return res.json({
        message:"error fetching order details"
      })
    }
    
    
})

module.exports = router;




module.exports = router