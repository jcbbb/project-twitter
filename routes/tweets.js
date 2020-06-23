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
    const { folder } = req.body;
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
        const { tweet } = req.body;
        const user = await User.findById(id);

        const newTweet = new Tweet({
            text: tweet,
            user,
            media: { urls },
        });

        if (!newTweet) {
            return res.status(400).json({ message: 'Unable to create new tweet', status: 400 });
        }

        await newTweet.save();
        res.json({ message: 'Successfully created a new tweet', status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

router.post('/tweet/bookmark', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { tweetId } = req.query;
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

router.get('/bookmarked', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({ message: 'User not found', status: 400 });
        }
        const mongoIds = user.bookmarks.map((id) => new mongoose.Types.ObjectId(id));

        const tweets = await Tweet.find({ _id: { $in: mongoIds } });

        res.json({ message: 'Retrieved bookmarked tweeets', tweets, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Try again' });
    }
});
router.get('/all', async (req, res) => {
    try {
        const tweets = await Tweet.find({}).sort({ _id: -1 }).limit(20);
        res.json({ message: 'Retrieved last 20 tweets', tweets, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
