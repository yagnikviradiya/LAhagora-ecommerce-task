const cartService = require('../services/cartService');

module.exports = {
    addToCart: async (req, res) => {
        try {
            const userId = req.user.userId;
            const { products } = req.body;

            const cart = await cartService.addToCart(userId, products);

            res.json({ status: true, data: cart });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const userId = req.user.userId;
            const productId = req?.params?.productId;
console.log(productId,'productId');
            const cart = await cartService.removeFromCart(userId, productId);

            res.json({ status: true, data: cart });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    clearCart: async (req, res) => {
        try {
            const userId = req.user.userId;

            await cartService.clearCart(userId);
            res.json({ message: 'Cart cleared successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },

    getCartData: async (req, res) => {
        try {
            const userId = req.user.userId;

            const cartData = await cartService.getCartData(userId);

            res.json({ status: true, data: cartData } );
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    },
};
