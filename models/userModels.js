const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    profileUrl: {
        type: String,
        required: true,
    },
    avatarUrl: {
        type: String,
        required: true,
    },
    });

const User = mongoose.model('User', userSchema);

module.exports = User;