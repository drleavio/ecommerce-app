const express = require('express');
const router = express.Router();
const Product=require("../schema/productSchema");
const connect = require('../db/connectDB');
const Cart=require('../schema/cartSchema');
const checkToken = require('../middleware');


router.post("/addproducts",async(req,res)=>{
  
    const {name,description,price,images,category,brand,stock,ratings,numOfReviews}=req.body;
    try {
        await connect();
        const response=new Product({
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
        if(response){
            return res.json({
                message:"Product added successfully"
            })
        }
    } catch (error) {
        console.log(error);
        
        return res.json({
            message:"error adding product"
        })
    }
   
})

router.get("/products",async(req,res)=>{
    try {
        await connect()
        const response=await Product.find().limit(20);
        return res.json({
            message:"fetched",
            response
        })
    } catch (error) {
        return res.json({
            message:"error fetching"
        })
    }
})

router.put("/updatecart",checkToken, async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
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
        image: product.images[0].url, // or product.image depending on your schema
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

  router.get("/showcart",checkToken,async(req,res)=>{
        const {userId}=req.body;
        try {
            await connect()
            let cart = await Cart.findOne({ user: userId });
            return res.json({
                messgae:"card show success",
                cart
            })
        } catch (error) {
            return res.json({
                message:"error fetching"
            })
        }
  })
  
  

module.exports=router