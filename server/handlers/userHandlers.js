const User = require('../models/user');
const crypto = require('crypto')
require('dotenv').config()

const createUser = async (req, res) => {
    try {
        const { userName, name, email, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const user = await User.find({ $or: [{ userName: userName }, { email: email }] });
        if (user.length == 0) {
            const newUser = new User({ userName: userName, name: name, email: email, password: hashedPassword });
            await newUser.save();
            res.status(201).json({ message: "User created successfully", data: newUser });

        } else {
            res.status(401).json({ message: "User already exists", data: user });
        }
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
}

const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const user = await User.find({ userName: userName, password: hashedPassword });
        if (user.length) {
            res.status(200).json({ message: "Login successful", data: user });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Error logging in user", error: error });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};


module.exports = { createUser, loginUser, logoutUser, getAllUsers };
