const { Router } = require('express');
const Tweet = require('../models/Tweet');
const User = require('../models/User');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.post('/tweet/create', verifyToken, async (req, res) => {
    try {
        const { id } = req.user;
        const { tweet } = req.body;
        const user = await User.findById(id);

        const newTweet = new Tweet({
            text: tweet,
            user,
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

router.get('/all', async (req, res) => {
    try {
        const tweets = await Tweet.find({}).sort({ _id: -1 }).limit(20);
        res.json({ message: 'Retrieved last 20 tweets', tweets, status: 200 });
    } catch (e) {
        return res.status(500).json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
