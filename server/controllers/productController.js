// controllers/productController.js
const productService = require('../services/productService');
const Joi = require('joi');
const fs = require('fs');
const { isValidObjectId } = require('mongoose');

// VALIDATION SCHEMA
const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().required(),
    quantity: Joi.number().required(),
    image: Joi.string().required(),
});

module.exports = {
    addOrUpdateProduct: async (req, res) => {
        try {
            req.body.image = req.fileurl
            const { name, description, price, quantity, image } = req.body;
            const { userId } = req.user
            // Validate the product data
            const { error } = productSchema.validate({ name, description, price, quantity, image });
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }

            let product;
            const reqData = {
                name,
                image, // Store the image path
                description,
                price,
                quantity,
                owner: userId,
            }
            if (!req?.params?.productId) {
                // File is included, it's an add operation
                product = await productService.addProduct(reqData, userId, req.file);
            } else {
                // No file, it's an update operation
                const productId = req.params.productId; // Assuming you pass the product ID in the URL
                product = await productService.updateProduct(productId, reqData);
            }

            res.status(201).json({ message: 'Product added/updated successfully', product });
        } catch (error) {

            // If there's an error, check if an image file was uploaded and delete it
            if (req.file) {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error('Error deleting image file:', err);
                    }
                });
            }
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    getProductsList: async (req, res) => {
        try {
            const products = await productService.getProductsList(req?.user?.isStoreOwner, req?.user?.userId);
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to retrieve the product list' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const productId = req?.params?.productId;

            if (!isValidObjectId(productId))
                throw new Error('invalid product id');

            const product = await productService.getProductById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(404).json({ message: 'Product fetched successfully', product })
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    removeProductById: async (req, res) => {
        try {

            const productId = req?.params?.productId;

            if (!isValidObjectId(productId))
                throw new Error('invalid product id');

            const product = await productService.removeProductById(productId);

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.json({ message: 'Product removed successfully', product });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

};
