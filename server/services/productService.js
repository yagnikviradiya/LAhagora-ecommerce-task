const { isValidObjectId } = require('mongoose');
const productRepository = require('../repositories/productRepository');
const fs = require('fs');

module.exports = {
    addProduct: async (productData, userId, file) => {
        const existingProduct = await productRepository.getProductByName(productData?.name, userId);
        if (existingProduct) {
            if (existingProduct && existingProduct.image) {
                // Remove the new image if it exists
                if (file) {
                    fs.unlink(file.path, (err) => {
                        if (err) {
                            console.error('Error deleting image file:', err);
                        }
                    });
                }
            }
            throw new Error('product already exist');
        }

        return await productRepository.createProduct(productData);
    },

    updateProduct: async (productId, productData) => {
        if (!isValidObjectId(productId))
            throw new Error('invalid product id');
        const existingProduct = await productRepository.getProductById(productId);

        if (!existingProduct) {
            throw new Error('Product not found');
        } else if (existingProduct && existingProduct.image) {
            // Remove the old image if it exists
            const splitStr = existingProduct.image?.split('/')

            let imagePath = splitStr?.length ? splitStr[splitStr?.length - 1] : null
            if (imagePath)
                imagePath = `public/uploads/${imagePath}`;
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image file:', err);
                }
            });
        }


        // Update the product with the new data
        existingProduct.name = productData.name;
        existingProduct.description = productData.description;
        existingProduct.price = productData.price;
        existingProduct.quantity = productData.quantity;
        existingProduct.image = productData.image;

        return await productRepository.updateProduct(existingProduct);
    },

    getProductsList: async (isStoreOwner, userId) => {
        if (isStoreOwner)
            return await productRepository.getProductByOwnerId(userId);
        return await productRepository.getProductsList();
    },

    getProductById: async (productId) => {
        return await productRepository.getProductById(productId);
    },

    removeProductById: async (productId) => {
        return await productRepository.removeProductById(productId);
      },
};
