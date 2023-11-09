const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

// Route to add a product to the cart
router.post('/add', cartController.addToCart);

// Route to remove a product from the cart
router.delete('/remove/:productId', cartController.removeFromCart);

// Route to clear the entire cart
router.delete('/clear', cartController.clearCart);

// Route to get cart data
router.get('/get', cartController.getCartData);

module.exports = router;
