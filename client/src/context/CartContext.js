// CartContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Api } from '../services/Api';
import ApiEndpoints from '../services/ApiEndpoints';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState({ cart: [], totalPrice: "" });

    // Fetch current cart data when the CartProvider is initialized
    const fetchCartData = async () => {
        try {
            const response = await Api.get(ApiEndpoints.cart.get);
            const data = response?.data?.data;
            setCartItems(data || []);
        } catch (error) {
            setCartItems([]);
            console.error('Error fetching cart data:', error);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, []);

    const addToCart = async (productId) => {
        try {
            const products = [
                {
                    "productId": productId,
                    "quantity": 1
                }
            ];
            const response = await Api.post(ApiEndpoints.cart.add, { products });
            fetchCartData();
        } catch (error) {
            console.error('Error adding item to cart:', error);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            const response = await Api.delete(`${ApiEndpoints.cart.removeById}${productId}`);
            fetchCartData();
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await Api.delete(ApiEndpoints.cart.clear);
            fetchCartData();
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };
