const { Schema, model } = require('mongoose');

const TweetSchema = new Schema(
    {
        text: { type: String, trim: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        retweet_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        reply_count: { type: Number, default: 0 },
        in_reply_to_tweet_id: { type: Schema.Types.ObjectId, ref: 'Tweet' },
        in_reply_to_user_id: { type: Schema.Types.ObjectId, ref: 'Tweet' },
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
    },
    { timestamps: true },
);

module.exports = model('Tweet', TweetSchema);
