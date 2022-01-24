const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new CustomAPIError("No Token Provided", 401);
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRETE);
        const {
            username,
            password
        } = decoded
        req.user = {
            username,
            password
        }
        next();
    } catch (error) {
        throw new CustomAPIError("Token is wrong!", 401);
    }

};

module.exports = authenticationMiddleware