const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const User = require('../models/User');
const Tweet = require('../models/Tweet');

const router = Router();

router.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById({ _id: id });

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
                bio: user.bio,
                website: user.website,
                location: user.location,
                joined: user.createdAt,
                followers: user.followers,
                following: user.following,
                profileImageUrl: user.profile_image_url,
                bannerImageUrl: user.banner_image_url,
            },
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.post('/user/profile/update', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { name, bio, website, location } = req.body;

        const user = await User.updateOne({ _id: id }, { name, bio, website, location });

        if (!user) {
            return res.status(400).json({ message: "Couldn't update the profile", status: 400 });
        }

        res.status(200).json({
            message: 'Updated',
            status: 200,
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});
router.get('/user/tweets', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;

        const tweets = await Tweet.find({ authorId: id }).sort({ _id: -1 });
        const user = await User.findById({ _id: id });

        if (!tweets) {
            return res.status(400).json({ message: 'Tweets not found', status: 400 });
        }
        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 400 });
        }

        res.json({
            message: 'Success',
            status: 200,
            tweets,
            user,
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.get('/who-to-follow', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const users = await User.find({ _id: { $ne: id } })
            .sort({ _id: -1 })
            .limit(3);

        if (!users) {
            return res.status(400).json({ message: 'No users found to follow', status: 400 });
        }

        res.json({ users, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

router.post('/search/:handle', async (req, res) => {
    try {
        const { handle } = req.params;
        const regex = new RegExp(escapeRegex(handle), 'gi');

        const users = await User.find({ $or: [{ handle: regex }, { name: regex }] });

        if (users.length === 0) {
            return res.status(400).json({ message: 'User is not found', status: 400 });
        }
        res.json({ message: 'Found users', users, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.post('/follow/:userToFollowId', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { userToFollowId } = req.params;

        const user = await User.findOne({ _id: id });
        if (user.following.includes(userToFollowId)) {
            await User.updateOne({ _id: id }, { $pull: { following: userToFollowId } });
            return res.json({ message: 'Updated following count', status: 200 });
        }

        const updatedUser = await User.updateOne(
            { _id: id },
            { $addToSet: { following: userToFollowId } },
        );

        if (!updatedUser) {
            return res
                .status(400)
                .json({ message: 'Failed to upadte following count', status: 400 });
        }

        res.json({ message: 'Updated following count', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

module.exports = router;
