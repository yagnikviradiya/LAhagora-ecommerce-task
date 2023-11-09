const mongoose = require('mongoose');

// Create a User schema
const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },  
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    // Additional fields for Store Owners
    isStoreOwner: {
      type: Boolean,
      default: false,
    },
    storeName: {
      type: String,
    },
    // Additional fields for Customers
    country: {
      type: String,
    },
    cart: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 0,
        },
      },
    ],
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
