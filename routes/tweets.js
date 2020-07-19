const { Router } = require('express');
const { bucket } = require('../config/gcs');
const { v4 } = require('uuid');
const mongoose = require('mongoose');
const path = require('path');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');
const multer = require('multer');

const router = Router();
const fileTypes = /image\/jpg|image\/png|image\/jpeg|image\/webp|image\/svg/;

const upload = multer({
    limits: {
        fileSize: 10 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (fileTypes.test(file.mimetype)) {
            return cb(null, true);
        }
        cb(new Error('Invalid mime type. Only jpg, svg, webp, jpeg, png are allowed'));
    },
});

router.post('/tweet/create', verifyToken, upload.any(), async (req, res) => {
    const { folder, text, in_reply_to_user_id = null, in_reply_to_tweet_id = null } = req.body;
    const urls = [];

    if (req.files.length) {
        await new Promise((resolve) => {
            req.files.forEach((file, index, arr) => {
                const fileUpload = bucket.file(`${folder}/${v4()}${path.extname(file.originalname)}`);

                const stream = fileUpload.createWriteStream({
                    predefinedAcl: 'publicRead',
                    metadata: {
                        contentType: file.mimetype,
                    },
                });

                stream.on('error', (error) => {
                    return res
                        .status(400)
                        .json({ message: 'Something went wrong while uploading file', error, status: 400 });
                });

                stream.on('finish', async () => {
                    const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
                    urls.push(url);
                    if (urls.length === arr.length) resolve();
                });

                stream.end(file.buffer);
            });
        });
    }

    try {
        const { id } = req.user;
        if(in_reply_to_tweet_id) {
            const counter = in_reply_to_tweet_id ? 1 : 0;
            await Tweet.updateOne({_id: in_reply_to_tweet_id}, {$inc: { reply_count: counter } })
        }

        const tweet = new Tweet({
            text,
            in_reply_to_user_id,
            in_reply_to_tweet_id,
            user: id,
            media: { urls },
        });

        if (!tweet) {
            return res.status(400).json({ message: 'Unable to create new tweet', status: 400 });
        }

        await tweet.save();
        res.json({ message: 'Successfully created a new tweet', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

router.delete('/tweet/destroy/:tweetId', verifyToken, async (req, res) => {
    try {
        const { tweetId } = req.params;

        const deleted = await Tweet.deleteOne({ _id: tweetId });
        if (deleted.n < 1) {
            return res.status(400).json({ message: 'Delete unsuccessfull', status: 400 });
        }
        res.json({ message: 'Deleted successfully', status: 200, deleteTweetId: tweetId });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.post('/tweet/bookmark/:tweetId', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { tweetId } = req.params;
        const user = await User.findById(id);

        if (user.bookmarks.includes(tweetId)) {
            await User.updateOne({ _id: id }, { $pull: { bookmarks: tweetId } });
            return res.json({ message: 'Removed bookmark', status: 200, tweetId });
        }

        await User.updateOne({ _id: id }, { $addToSet: { bookmarks: tweetId } });
        res.json({ message: 'Added bookmark', status: 200, tweetId });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.post('/tweet/react/:tweetId', verifyToken, async (req, res) => {
    try {
        const { tweetId } = req.params;
        const { reaction } = req.body;
        const counter = reaction === 'Like' ? 1 : -1;
        const likedBoolean = reaction === 'Like' ? true : false;
        const updatedTweet = await Tweet.updateOne({ _id: tweetId }, { $inc: { like_count: counter }, $set: {liked: likedBoolean} });
        if(!updatedTweet.nModified) {
            return res.status(400).json({message: 'Unable to react to tweet', status: 400});
        }
        res.json({ message: 'Reacted', status: 200, counter, reaction });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});
router.delete('/tweet/bookmark/destroyAll', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        await User.updateOne({ _id: id }, { $set: { bookmarks: [] } });
        res.json({ message: 'Cleared all bookmarks', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.get('/bookmarked', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 400 });
        }
        const mongoIds = user.bookmarks.map((id) => new mongoose.Types.ObjectId(id));

        const tweets = await Tweet.find({ _id: { $in: mongoIds } }).populate('user');

        res.json({ message: 'Retrieved bookmarked tweeets', tweets, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.get('/tweet/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const tweet = await Tweet.findById(id).populate('user');

        if (!tweet) {
            return res.status(400).json({ message: 'Tweet not found', status: 400 });
        }

        res.json({ message: 'Tweet found', status: 200, tweet });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});

router.get('/tweet/:replyToId/replies', async(req, res) => {
    try {
        const { replyToId } = req.params;
        const replies = await Tweet.find({ in_reply_to_tweet_id: replyToId }).populate('user');
        res.json({ message: `Retrieved replies for ${replyToId}`, replies, status: 200});
    } catch(e) {

    }
})

router.get('/all', async (req, res) => {
    try {
        const tweets = await Tweet.find({ in_reply_to_tweet_id: null }).sort({ _id: -1 }).limit(20).populate('user');
        res.json({ message: 'Retrieved last 20 tweets', tweets, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
