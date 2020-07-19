const { Schema, model } = require('mongoose');

const TweetSchema = new Schema(
    {
        text: { type: String, trim: true },
        user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        retweet_count: { type: Number, default: 0 },
        like_count: { type: Number, default: 0 },
        reply_count: { type: Number, default: 0 },
        in_reply_to_tweet_id: { type: Schema.Types.ObjectId, ref: 'Tweea', default: null },
        in_reply_to_user_id: { type: Schema.Types.ObjectId, ref: 'User', default: null },
        liked: { type: Boolean, default: false },
        retweeted: { type: Boolean, default: false },
        media: {
            urls: { type: Array },
            urls_count: { type: Number, default: 0 },
        },
    },
    { timestamps: true },
);

TweetSchema.pre('save', async function (next) {
    this.media.urls_count = this.media.urls.length;
    next();
});

module.exports = model('Tweet', TweetSchema);
