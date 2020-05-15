const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const TempUserSchema = new Schema({
    email: { type: String, unique: true },
    verificationCode: { type: String },
    createdAt: { type: Date, expires: '1h', default: Date.now },
});

TempUserSchema.pre('save', async function (next) {
    try {
        this.verificationCode = await bcrypt.hash(this.verificationCode, 10);
    } catch (err) {
        return next(err);
    }
});

TempUserSchema.methods.compareCode = function (candidateCode) {
    return bcrypt.compare(candidateCode, this.verificationCode);
};

module.exports = model('TempUser', TempUserSchema);
