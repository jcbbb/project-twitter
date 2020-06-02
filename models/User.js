const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    bio: { type: String },
    location: { type: String },
    website: { type: String },
    profile_image_url: {
        type: String,
        default: 'https://storage.cloud.google.com/twitter-doom/default-profile-normal.jpg',
    },
    profile_banner_url: { type: String },
    followers: { type: Array },
    following: { type: Array },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        this.handle = `@${this.handle}${randomNumber()}`;
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
