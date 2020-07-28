const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const TempUser = require('../models/TempUser');
const generateToken = require('../utils/generateToken');
const verifyToken = require('../utils/verifyToken');

const env = process.env.NODE_ENV || 'dev';
const config = require(`../config/${env}`);
const Mailgun = require('mailgun-js');

const mailgun = new Mailgun({
    apiKey: config.mgApiKey,
    domain: 'verify.juraev.codes',
});
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
        const msg = {
            from: 'Twitter Doom <verify@twitter-doom.com>',
            to: email,
            subject: `Verification code - ${verificationCode}`,
            template: 'verify',
            'v:code': verificationCode,
        };

        await tempUser.save();
        await mailgun.messages().send(msg);
        res.status(201).json({ message: 'Temprorary user created and verification code is sent', status: 201 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again.' });
    }
});
router.post(
    '/signup',
    [
        check('email', 'Incorrect email address').normalizeEmail().isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
        check('verificationCode', 'Verification code cannot be empty, less than 6 characters and should be numeric')
            .notEmpty()
            .isLength({ min: 6 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array,
                    message: 'Provide valid inputs',
                });
            }
            const { email, password, name, verificationCode } = req.body;
            const tempUserCandidate = await TempUser.findOne({ email });
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            if (!tempUserCandidate) {
                return res
                    .status(400)
                    .json({ message: 'User with email was not granted a verification code before. Please try again' });
            }
            const isMatch = tempUserCandidate.compareCode(verificationCode);
            if (!isMatch) {
                return res.status(400).json({
                    message: "The verification code you provided didn't match our records. Please try again",
                });
            }

            const user = new User({ email, password, name, handle: name });

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
                    status: 400,
                });
            }
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ message: 'User not found', status: 400 });
            }

            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(400).json({ message: 'Incorrect password or email', status: 400 });
            }

            await generateToken(res, user._id, user.handle, user.name);
            res.json({ message: 'Successful login', status: 200, user });
        } catch (e) {
            res.status(500).json({ message: 'Something went wrong. Try again' });
        }
    },
);

router.post('/logout', verifyToken, async (req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'Logged out', status: 200 });
});

module.exports = router;
