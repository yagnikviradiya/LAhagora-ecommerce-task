// routes/productRoutes.js
const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.post('/add', productController.addOrUpdateProduct);
router.put('/update/:productId', productController.addOrUpdateProduct);
router.get('/list', productController.getProductsList);
router.get('/get/:productId', productController.getProductById);
router.delete('/remove/:productId', productController.removeProductById);

module.exports = router;
