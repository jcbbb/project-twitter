const { Schema, model } = require('mongoose');

const threadSchema = Schema(
    {
        initiated_by: { type: Schema.Types.ObjectId, required: true },
        thread_id: { type: String, required: true, trim: true },
        participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true },
);

threadSchema.pre('save', async function (next) {
    try {
        !this.participants.includes(initiated_by) && this.participants.push(this.initiated_by);
    } catch (err) {
        next(err);
    }
});

module.exports = model('Thread', threadSchema);
