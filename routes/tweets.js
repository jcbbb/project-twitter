const { Router } = require('express');
const Tweet = require('../models/Tweet');
const verifyToken = require('../utils/verifyToken');

const router = Router();

router.post('/tweet/create', verifyToken, async (req, res) => {
    try {
        const { tweet, userId } = req.body;

        const newTweet = new Tweet({
            text: tweet,
            authorId: userId,
        });

        if (!newTweet) {
            return res.status(400).json({ message: 'Unable to create new tweet', status: 400 });
        }

        await newTweet.save();
        res.json({ message: 'Successfully created a new tweet', status: 200 });
    } catch (e) {
        return res
            .status(500)
            .json({ message: 'Something went wrong. Please try again.', status: 500 });
    }
});

module.exports = router;
