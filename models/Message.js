const { Schema, model } = require('mongoose');

const messageSchema = Schema(
    {
        thread_id: { type: Schema.Types.ObjectId, required: true },
        sender_id: { type: Schema.Types.ObjectId, required: true },
        message_text: { type: String },
    },
    { timestamps: true },
);

module.exports = model('Chat', messageSchema);
