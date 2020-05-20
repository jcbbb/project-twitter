const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/secrets');

const generateToken = (res, id) => {
    const EXPIRATION = 604800000;
    const token = jwt.sign({ id }, JWTSECRET, {
        expiresIn: '7d',
    });

    return res.cookie('token', token, {
        expires: new Date(Date.now() + EXPIRATION),
        secure: true,
        sameSite: true,
        httpOnly: true,
    });
};

module.exports = generateToken;
