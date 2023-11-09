const User = require('../models/user');

module.exports = {
    
    findByEmail: async (email) => {
        return await User.findOne({ email });
    },

    createUser: async (userData) => {
        const user = new User(userData);
        return await user.save();
    },
};