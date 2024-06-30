const jwt = require('jsonwebtoken');
const User = require('../models/user');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.WEB_MAILID,
        pass: process.env.WEB_PASS,
    },
});


// Handler to create a user
const createUser = async (req, res) => {
    try {
        const { username, name, email, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const newUser = new User({ username, name, email, password: hashedPassword });
        // Generate OTP and save to user
        const otp = newUser.generateOTP();
        // Send OTP to user via email
        await sendOTPEmail(email, otp);

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: "User created successfully", token, data: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user" });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body; 
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verifyOTP(otp)) {
            user.Verify = true;
            user.Otp = null;
            await user.save();
            res.status(200).json({ message: "OTP verified successfully", data: user });
        } else {
            res.status(401).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP", error });
    }
};


// Function to send OTP email
const sendOTPEmail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.WEB_MAILID,
            to: email,
            subject: 'OTP Verification',
            html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully');
        // console.log(`OTP email sent to ${email}: ${otp}`);
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const user = await User.findOne({ username, password: hashedPassword });
        if (user) {
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: "Login successful", token });
        } else {
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Error logging in user", error });
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

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: "Error fetching user", error });
    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, name, email, password } = req.body;
        const hashedPassword = password ? crypto.createHash('sha256').update(password).digest('hex') : undefined;

        const updateFields = { username, name, email };
        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

const patchUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;

        if (updateFields.password) {
            updateFields.password = crypto.createHash('sha256').update(updateFields.password).digest('hex');
        }

        const updatedUser = await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { createUser, loginUser, logoutUser, getAllUsers, getUserById, updateUser, patchUser, verifyOTP };
