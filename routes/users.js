const { Router } = require('express');
const verifyToken = require('../utils/verifyToken');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Like = require('../models/Like');
const mongoose = require('mongoose');

const router = Router();

router.get('/user/profile', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;

        const user = await User.findById(id, { password: 0 });

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 400 });
        }

        res.status(200).json({
            message: 'Success',
            status: 200,
            user,
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.post('/user/profile', async (req, res) => {
    try {
        const { handle } = req.query;

        const user = await User.findOne({ handle }, { password: 0 });

        if (!user) {
            return res.status(400).json({ message: 'Profile not found', status: 400 });
        }
        res.status(200).json({
            message: 'Profile found',
            status: 200,
            user,
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
        const { userId, type } = req.query;
        const liked = await Like.find({ user_id: userId });
        const likedTweetIds = liked.map((tweet) => tweet.tweet_id);
        const mongoUserId = new mongoose.Types.ObjectId(userId);
        let tweets;

        switch (type) {
            case 'with_media':
                tweets = await Tweet.aggregate()
                    .match({
                        user: mongoUserId,
                        'media.urls_count': { $gt: 0 },
                        in_reply_to_tweet_id: null,
                    })
                    .limit(20)
                    .sort({ _id: -1 })
                    .addFields({
                        liked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: likedTweetIds,
                                            as: 'likedTweet',
                                            cond: {
                                                $eq: ['$$likedTweet', '$_id'],
                                            },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    })
                    .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'user' })
                    .unwind('$user');
                break;
            case 'with_likes':
                tweets = await Tweet.aggregate()
                    .match({ user: mongoUserId, in_reply_to_tweet_id: null })
                    .limit(20)
                    .sort({ _id: -1 })
                    .addFields({
                        liked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: likedTweetIds,
                                            as: 'likedTweet',
                                            cond: {
                                                $eq: ['$$likedTweet', '$_id'],
                                            },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    })
                    .match({ liked: true })
                    .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'user' })
                    .unwind('$user');
                break;
            default:
                tweets = await Tweet.aggregate()
                    .match({ user: mongoUserId, in_reply_to_tweet_id: null })
                    .limit(20)
                    .sort({ _id: -1 })
                    .addFields({
                        liked: {
                            $gt: [
                                {
                                    $size: {
                                        $filter: {
                                            input: likedTweetIds,
                                            as: 'likedTweet',
                                            cond: {
                                                $eq: ['$$likedTweet', '$_id'],
                                            },
                                        },
                                    },
                                },
                                0,
                            ],
                        },
                    })
                    .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'user' })
                    .unwind('$user');
                break;
        }

        res.json({
            message: 'Success',
            status: 200,
            tweets,
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.get('/who-to-follow', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;

        // Get users excluding current user and users the current user is already following
        const users = await User.find({ $and: [{ _id: { $ne: id } }, { followers: { $ne: id } }] })
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
            return res.status(400).json({ message: 'Users arent not found', status: 400 });
        }
        res.json({ message: 'Found users', users, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

router.get('/user/followers', async (req, res) => {
    const { handle, list } = req.query;

    const user = await User.findOne({ handle });
    if (!user) {
        return res.status(400).json({ message: 'User not found', status: 400 });
    }

    const mongoIds = user[list].map((id) => new mongoose.Types.ObjectId(id));

    const users = await User.find({ _id: { $in: mongoIds } });

    res.json({ users, status: 200 });
});

router.post('/user/follow/:userToFollowId', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { userToFollowId } = req.params;

        // Remove userId from followers field -- Toggle effect
        const followingUser = await User.findOne({ _id: userToFollowId });
        if (followingUser.followers.includes(id)) {
            await User.updateOne({ _id: userToFollowId }, { $pull: { followers: id } });
            await User.updateOne({ _id: id }, { $pull: { following: userToFollowId } });
            return res.json({ message: 'Updated followers count', status: 200 });
        }

        // Remove userId from following field -- Toggle effect
        const user = await User.findOne({ _id: id });
        if (user.following.includes(userToFollowId)) {
            await User.updateOne({ _id: id }, { $pull: { following: userToFollowId } });
            await User.updateOne({ _id: userToFollowId }, { $pull: { followers: id } });
            return res.json({ message: 'Updated following count', status: 200 });
        }

        // Update followers field for user to be followed
        const updatedFollowingUser = await User.updateOne({ _id: userToFollowId }, { $addToSet: { followers: id } });

        // Update following field for current user
        const updatedUser = await User.updateOne({ _id: id }, { $addToSet: { following: userToFollowId } });

        if (!updatedUser && !updatedFollowingUser) {
            return res.status(400).json({ message: 'Failed to upadte following count', status: 400 });
        }

        res.json({
            message: 'Updated following count for current user and followers count for following user',
            status: 200,
        });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again', status: 500 });
    }
});

module.exports = router;
