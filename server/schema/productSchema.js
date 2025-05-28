const mongoose=require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    max: [99999, 'Price cannot exceed 99999']
  },
  images: [
    {
      url: { type: String, required: false }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please select category for this product'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty', 'Food', 'Toys', 'Other']
  },
  brand: {
    type: String,
    default: 'Generic'
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    max: [9999, 'Stock cannot exceed 9999'],
    default: 0
  },
  color:[
    {
        tag:{type:String}
    }
  ],
  size:[
    {
        tag:{type:String}
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
