const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
