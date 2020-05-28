const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const TempUser = require('../models/TempUser');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');

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
            await TempUser.deleteOne({ email });
        }

        const tempUser = new TempUser({ email, verificationCode });

        await tempUser.save();
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

            const user = new User({ email, password, name });

            await user.save();
            await generateToken(res, user.id);
            res.status(201).json({ message: 'User created', status: 201 });
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
                    status: 200,
                });
            }
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found', status: 400 });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: 'Incorrect password or email', status: 400 });
            }

            await generateToken(res, user.id);
            res.json({ message: 'Successful login', userId: user.id, status: 200 });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong. Try again' });
        }
    },
);

router.post('/logout', verifyToken, async (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logged out', status: 200 });
});

router.get('/me', verifyToken, async (req, res) => {
    res.json({ message: 'Authorization cookie is verified', status: 200 });
});
module.exports = router;
