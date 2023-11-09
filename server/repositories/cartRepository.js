// const Cart = require('../models/cart');
const { isValidObjectId } = require('mongoose');
const Product = require('../models/product');
const User = require('../models/user');
const cartService = require('../services/cartService');

module.exports = {
    addToCart: async (userId, products) => {
        try {
            const user = await User.findOne({ _id: userId });

            if (!user) {
                throw new Error('User not found');
            }

            // Process each product and update the user's cart
            for (const product of products) {
                const { productId, quantity } = product;

                if (!isValidObjectId(productId))
                    throw new Error('invalid product id');

                if (!productId || !quantity) {
                    continue; // Skip invalid entries
                }

                const productDoc = await Product.findOne({ _id: productId });

                if (!productDoc) {
                    continue; // Skip invalid products
                }

                // Check if the store has enough quantity
                if (productDoc.quantity < quantity) {
                    throw new Error('Insufficient product quantity');
                }

                // Add the product to the cart and decrease the store's quantity
                user.cart.push({ product: productId, quantity });
                productDoc.quantity -= quantity;
                await productDoc.save();
            }

            await user.save();
            return user.cart;
        } catch (error) {
            throw error;
        }
    },

    removeFromCart: async (userId, reqProductId) => {
        try {
            console.log(userId, 'userId');
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            const cart = [...user?.cart]
            if (!cart?.length)
                throw new Error('Cart is empty');



            const productDoc = await Product.findOne({ _id: reqProductId });

            if (!productDoc) {
                user.cart = user.cart.filter((product) => product?.product !== reqProductId)
            } else {
                user.cart = user.cart.map((product) => {
                    if (product.quantity == 1) {
                        return null
                    }
                    product.quantity -= 1
                    return product;
                })
                productDoc.quantity += 1
            }
            console.log(user.cart.filter((product) => (product !== null)), 'user.cart.filter((product) => product !== null)');
            user.cart = user.cart.filter((product) => product !== null)
            await productDoc.save();
            await user.save();
            return user.cart;
        } catch (error) {
            throw error;
        }
    },

    clearCart: async (userId) => {
        try {
            console.log(userId, 'userId');
            const user = await User.findOne({ _id: userId });
            if (!user) {
                throw new Error('User not found');
            }
            user.cart = []
            await user.save();
            return user.cart;
        } catch (error) {
            throw error;
        }
    },

    getCartData: async (userId) => {
        try {
            const user = await User.findOne({ _id: userId }).populate('cart.product');
            if (!user) {
                throw new Error('User not found');
            }
            const cart = user?.cart
            if (!cart?.length)
                throw new Error('Cart is empty');
            const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
            console.log(totalPrice);
            let cartData = { cart, totalPrice }
            return cartData;
        } catch (error) {
            throw error;
        }
    },
};
