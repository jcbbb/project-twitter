const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const User = require('../models/User');

const router = Router();

router.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findOne({ _id: id });

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 400 });
        }

        res.status(200).json({
            message: 'Success',
            status: 200,
            user: {
                userId: user._id,
                handle: user.handle,
                name: user.name,
                profileImageUrl: user.profile_image_url,
            },
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

module.exports = router;
