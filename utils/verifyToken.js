const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/secrets');

const verifyToken = (req, res, next) => {
    const token = req.cookies.token || '';

    try {
        if (!token) {
            return res
                .status(401)
                .json({ message: "Authorization cookies don't exist", status: 401 });
        }
        const decrypt = jwt.verify(token, JWTSECRET);

        req.user = {
            id: decrypt.id,
        };
        next();
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
};

module.exports = verifyToken;
