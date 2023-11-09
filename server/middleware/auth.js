const { config } = require('dotenv');
const jwt = require('jsonwebtoken');
config();

const authenticateJWT = (req, res, next) => {
    const token = req.header('x-auth-token'); 
    if (!token) {
        return res.status(401).json({ message: 'Authentication error: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication error: Invalid token' });
    }
};

module.exports = authenticateJWT;
