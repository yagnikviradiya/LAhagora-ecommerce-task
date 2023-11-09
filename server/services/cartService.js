const cartRepository = require('../repositories/cartRepository');
const { isValidObjectId } = require('mongoose');

module.exports = {
    addToCart: async (userId, products) => {
        return await cartRepository.addToCart(userId, products);
    },

    removeFromCart: async (userId, productId) => {
        if (!isValidObjectId(productId))
            throw new Error('invalid product id');
        return await cartRepository.removeFromCart(userId, productId);
    },

      clearCart: async (userId) => {
        return await cartRepository.clearCart(userId);
      },

      getCartData: async (userId) => {
        return await cartRepository.getCartData(userId);
      },
};
