const CustomAPIError = require('../errors/custom-error');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const {
        username,
        password
    } = req.body

    // kinds of Validation:
    // 1- mongoose validation
    // 2- Joi
    // 3- check in the controllers 

    if (!username || !password) {
        throw new CustomAPIError("Please provide Email & Password", 400);
    }

    const token = jwt.sign({
        username,
        password
    }, process.env.JWT_SECRETE, {
        expiresIn: '30d'
    })

    res.status(200).json({
        msg: "user created",
        token
    })

};

const dashboard = async (req, res) => {
    console.log(req.user);
    const luckyNumber = Math.floor(Math.random() * 100);
    res.status(200).json({
        msg: `Hello ${req.user.username}`,
        secrete: `Here is authorized data, you'r lucky number is ${luckyNumber}`
    });
};

module.exports = {
    login,
    dashboard
}