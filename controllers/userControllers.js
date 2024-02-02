const User = require("../models/userModels");

const userControllers = {};

// function to get all users from the users collection
userControllers.getAllUsers = async function (req, res) {
    // swagger.tags = [User Management]

    try {
        const users = await User.find({});
        return res.json(users);
    } catch (err) {
        console.error("Error fetching all users.", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

// function to update a user's profile
userControllers.updateUser = async function (req, res) {
    // swagger.tags = [Users Management]
    try {
        const githubId = req.params.id;
        const { username, displayName, profileUrl, avatarUrl } = req.body;

        updateFields = { username, displayName, profileUrl, avatarUrl };

        const updatedUser = await User.findOneAndUpdate(
            { githubId: githubId },
            updateFields,
            { new: true }
        );

        if (updatedUser) {
            return res.json(`${updatedUser.displayName} has been updated.`);
        } else {
            res.status(404).json({ error: "User not found." });
        }
    } catch (err) {
        console.error("Error updating user profile.", err);
        res.status(500).json({ error: "Internal server error." });
    }
};

module.exports = userControllers;
