const { Schema, model } = require('mongoose');

const TweetSchema = new Schema({
    text: { type: String, trim: true },
    user: { type: Object, required: true },
    date: { type: Date, default: Date.now },
    retweet_count: { type: Number, default: null },
    like_count: { type: Number, default: null },
    reply_count: { type: Number, default: null },
    in_reply_to_tweet_id: { type: Number, default: null },
    in_reply_to_user_id: { type: Number, default: null },
    liked: { type: Boolean, default: false },
    retweeted: { type: Boolean, default: false },
    media: {
        urls: { type: Array },
    },
    comments: [
        {
            body: String,
            authorId: String,
        },
    ],
});

module.exports = model('Tweet', TweetSchema);
