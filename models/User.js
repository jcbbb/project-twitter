const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        handle: { type: String, required: true, unique: true, trim: true },
        bio: { type: String },
        location: { type: String },
        website: { type: String },
        verified: false,
        profile_image_url: {
            type: String,
            default: 'https://storage.googleapis.com/twitter-doom/default-profile-normal.jpg',
        },
        banner_image_url: { type: String },
        followers: { type: Array },
        following: { type: Array },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true },
        password: { type: String, required: true },
    },
    { timestamps: true },
);

const randomNumber = () => Math.floor(100000 + Math.random() * 900000);

userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, 10);
        this.handle = `@${this.handle}${randomNumber()}`.replace(/ +/g, '');
    } catch (err) {
        return next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = model('User', userSchema);
