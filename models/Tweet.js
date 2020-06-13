const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
    text: { type: String, required: true, trim: true },
    user: { type: Object, required: true },
    date: { type: Date, default: Date.now },
    retweets: { type: Number },
    likes: { type: Number },
    shares: { type: Number },
    comments: [
        {
            body: String,
            authorId: String,
        },
    ],
});

module.exports = model('Tweet', TweetSchema);
