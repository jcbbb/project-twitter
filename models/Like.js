const { Schema, model } = require('mongoose');

const likeSchema = new Schema(
    {
        user_id: { type: Schema.Types.ObjectId, required: true },
        tweet_id: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true },
);

module.exports = model('Like', likeSchema);
