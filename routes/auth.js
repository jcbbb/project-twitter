const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWTSECRET } = require('../config/secrets');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');

const router = Router();

router.post(
    '/signup',
    [
        check('email', 'Incorrect email address').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Incorrect credentials',
                });
            }
            const { email, password } = req.body;

            const canditate = await User.findOne({ email });

            if (canditate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ email, password: hashedPassword });

            await user.save();
            res.status(201).json({ message: 'User created' });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong. Try again' });
        }
    },
);

router.post(
    '/login',
    [
        check('email', 'Please, provide a correct email').normalizeEmail().isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Incorrect credentials',
                });
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password or email' });
            }

            const token = jwt.sign({ userId: user.id }, JWTSECRET, { expiresIn: '1h' });
            res.json({ token, userId: user.id });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong. Try again' });
        }
    },
);
module.exports = router;
