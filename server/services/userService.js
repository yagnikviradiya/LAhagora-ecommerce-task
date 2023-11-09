const userRepository = require('../repositories/userRepository');

module.exports = {
    registerUser: async (userData) => {
        // Check if the email is already in use
        const existingUser = await userRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email is already in use');
        }
        // Create and save the user
        return await userRepository.createUser(userData);
    },

    findUserByEmail: async (email) => {
        return await userRepository.findByEmail(email);
    },
};
