const { Schema, model } = require('mongoose');

const messageSchema = Schema({
    thread_id: { type: Schema.Types.ObjectId, required: true, ref: 'Thread' },
    sender_id: { type: String, required: true },
    draft_message_text: { type: String, required: true },
    message_text: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
});

module.exports = model('Message', messageSchema);
