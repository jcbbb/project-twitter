const { Schema, model } = require('mongoose');

const threadSchema = Schema(
    {
        initiated_by: { type: Schema.Types.ObjectId, required: true },
    },
    { timestamps: true },
);

module.exports = model('Thread', threadSchema);
