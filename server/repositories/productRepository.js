const Product = require('../models/product');

module.exports = {
    createProduct: async (productData) => {
        const product = new Product(productData);
        return await product.save();
    },

    getProductById: async (productId) => {
        return await Product.findOne({ _id: productId, isDeleted: false });
    },

    getProductByOwnerId: async (ownerId) => {
        return await Product.findOne({ owner: ownerId, isDeleted: false });
    },

    getProductByName: async (productName, userId) => {
        return await Product.findOne({ name: productName, owner: userId, isDeleted: false });
    },

    updateProduct: async (product) => {
        return await product.save();
    },

    getProductsList: async () => {
        return await Product.find({ isDeleted: false });
    },

    removeProductById: async (productId) => {
        return await Product.updateOne({ _id: productId, isDeleted: true });
    },
};
