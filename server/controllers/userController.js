const userService = require('../services/userService');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { config } = require('dotenv');
config();

// VALIDATION SCHEMA
const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string(),
    country: Joi.allow(),
    isStoreOwner: Joi.boolean(),
    storeName: Joi.allow(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});


module.exports = {
    registerUser: async (req, res) => {
        try {
            const userData = req.body;

            // Validate the request parameters
            const { error } = userSchema.validate(userData);
            if (error) {
                return res.status(500).json({ message: error.details[0].message });
            }

            // If customer then remove store name if add
            if (!userData?.isStoreOwner) delete userData.storeName;

            // Hash the user's password
            const saltRounds = 10;
            userData.password = await bcrypt.hash(userData.password, saltRounds);

            const user = await userService.registerUser(userData);
            res.status(200).json({ message: 'User registered successfully', data: user, status: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const userCredentials = req.body;
            // Validate the login request
            const { error } = loginSchema.validate(userCredentials);
            if (error) {
                return res.status(500).json({ message: error.details[0].message });
            }
            const { email, password } = userCredentials;

            // Find the user by email
            const user = await userService.findUserByEmail(email);

            if (!user) {
                return res.status(401).json({ message: 'User not found' });
            }

            // Compare the password provided with the stored hashed password
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            // Generate and send an authentication token (JWT)
            const token = jwt.sign({ userId: user._id, isStoreOwner: user.isStoreOwner }, process.env.SECRET_KEY);
            const roal = user?.isStoreOwner ? "storeOwner" : "customer"
            res.status(200).json({ message: 'Login successful', token, roal });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Login failed' });
        }
    },
};
