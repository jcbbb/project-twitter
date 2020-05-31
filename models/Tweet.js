const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
    tweet: { type: String, required: true },
    authorId: { type: String, required: true },
    comments: [
        {
            body: String,
            authorId: String,
        },
    ],
    retweets: { type: Number },
    likes: { type: Number },
    shares: { type: Number },
});

module.exports = model('Tweet', TweetSchema);
