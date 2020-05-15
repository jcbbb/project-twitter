const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { JWTSECRET } = require('../config/secrets');
const User = require('../models/User');
const TempUser = require('../models/TempUser');

const router = Router();

const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

router.post('/email/check', async (req, res) => {
    try {
        const { email } = req.body;

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({ message: 'Email is already taken', status: 400 });
        }
        res.status(200).json({ message: 'Email is not taken', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.post('/email/verify', async (req, res) => {
    try {
        const { email, verificationCode } = req.body;
        const candidate = await TempUser.findOne({ email });

        if (!candidate) {
            return res.status(400).json({ message: "User doesn't exist", status: 400 });
        }
        const isMatch = await candidate.compareCode(verificationCode);

        if (!isMatch) {
            return res.status(400).json({ message: "Code doesn't match", isMatch, status: 400 });
        }
        res.status(200).json({ message: 'Code matched', isMatch, status: 200 });
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.post('/tempuser', async (req, res) => {
    try {
        const { email } = req.body;
        const candidate = await TempUser.findOne({ email });
        const verificationCode = randomNumber();
        if (candidate) {
            return res.status(400).json({ message: 'Temporary user already exists', status: 400 });
        }

        const unverifiedUser = new TempUser({ email, verificationCode });

        await unverifiedUser.save();
        res.status(201).json({ message: 'Temprorary user created', verificationCode, status: 201 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again.' });
    }
});
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
            const { email, password, name } = req.body;

            const canditate = await User.findOne({ email });

            if (canditate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({ email, password, username: name });

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

            const isMatch = await user.comparePassword(password);

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
