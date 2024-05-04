const User = require('../models/userModel');

require('dotenv').config()

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
}

module.exports = {getAllUsers}