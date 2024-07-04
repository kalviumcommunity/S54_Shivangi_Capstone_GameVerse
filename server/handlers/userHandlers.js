const jwt = require('jsonwebtoken');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
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


/**
 * Handler to create a user
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - The response with the created user or error message
 */
const createUser = async (req, res) => {
    try {
        // Extracting user data from request body
        const { username, name, email, password } = req.body;

        // Hashing the user password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Checking if user already exists
        const user = await User.find({ $or: [{ username }, { email }] });
        if (user.length === 0) {
            // Creating a new user
            const newUser = new User({
                username,
                name,
                email,
                password: hashedPassword
            });

            // Generating and sending OTP to user's email
            const otp = newUser.generateOTP();
            await sendOTPEmail(email, otp);

            // Saving the new user to the database
            await newUser.save();

            // Generating JWT token for the newly created user
            const token = jwt.sign({
                id: newUser._id,
                username: newUser.username
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            // Returning the created user with the token
            res.status(201).json({
                message: "User created successfully",
                token,
                data: newUser
            });
        } else {
            // Returning an error if user already exists
            res.status(401).json({
                message: "User already exists",
                data: user
            });
        }
    } catch (error) {
        // Logging and returning error if any occurred
        console.error("Error creating user:", error);
        res.status(500).json({
            message: "Error creating user"
        });
    }
};

/**
 * Handler to verify the OTP sent to the user's email
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {Promise<void>} - The response with the verification status
 */
const verifyOTP = async (req, res) => {
    try {
        // Extracting email and OTP from the request body
        const { email, otp } = req.body;

        // Finding the user by email
        const user = await User.findOne({ email });

        if (!user) {
            // Returning an error if user not found
            return res.status(404).json({ message: "User not found" });
        }

        if (user.verifyOTP(otp)) {
            // Setting the Verify field to true and clearing the OTP field
            user.Verify = true;
            user.Otp = null;
            await user.save();

            // Returning a success message with the user data
            res.status(200).json({ message: "OTP verified successfully", data: user });
        } else {
            // Returning an error if the OTP is invalid
            res.status(401).json({ message: "Invalid OTP" });
        }
    } catch (error) {
        // Logging and returning error if any occurred
        console.error("Error verifying OTP:", error);
        res.status(500).json({ message: "Error verifying OTP", error });
    }
};


/**
 * Function to send OTP email
 * @param {string} email - The email address to send the OTP to
 * @param {string} otp - The OTP to send
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully
 */
const sendOTPEmail = async (email, otp) => {
    try {
        // Set up the email options
        const mailOptions = {
            // Set the sender's email address
            from: process.env.WEB_MAILID,
            // Set the recipient's email address
            to: email,
            // Set the email subject
            subject: 'OTP Verification',
            // Set the email body as HTML
            html: `<p>Your OTP for verification is: <strong>${otp}</strong></p>`,
        };

        // Send the email using the transporter
        await transporter.sendMail(mailOptions);
        // Log a success message
        console.log('OTP email sent successfully');
        // Uncomment the following line to log the OTP and recipient email
        // console.log(`OTP email sent to ${email}: ${otp}`);
    } catch (error) {
        // Log and throw any errors that occur
        console.error('Error sending OTP email:', error);
        throw error;
    }
};

/**
 * Function to handle user login
 * @param {Object} req - The request object containing user credentials
 * @param {Object} res - The response object to send the login status
 * @returns {Promise<void>} - A promise that resolves when the login is handled successfully
 */
const loginUser = async (req, res) => {
    try {
        // Extracting username and password from request body
        const { username, password } = req.body;

        // Finding user with the given username
        const user = await User.findOne({ username });

        // Checking if user exists and password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Generating JWT token for the user
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Sending login success response with token
            res.status(200).json({ message: "Login successful", token });
        } else {
            // Sending login failure response if user doesn't exist or password is incorrect
            res.status(401).json({ message: "Invalid username or password" });
        }
    } catch (error) {
        // Logging and sending error response if any error occurs
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Error logging in user", error });
    }
};

/**
 * Function to handle user login with Google
 * @param {Object} req - The request object containing user credentials
 * @param {Object} res - The response object to send the login status
 * @returns {Promise<void>} - A promise that resolves when the login is handled successfully
 */
const getInWithGoogle = async (req, res) => {
    // Extracting user data from request body
    let { username, name, email, password, avatar } = req.body;

    // Hashing the user password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Checking if user already exists
    const user = await User.find({ $or: [{ username }, { email }] });

    if (user.length === 0) {
        // Creating a new user if it doesn't exist
        const newUser = new User({
            username,
            name,
            email,
            password: hashedPassword,
            avatar
        });

        await newUser.save();

        // Generating JWT token for the newly created user
        const token = jwt.sign({
            id: newUser._id,
            username: newUser.username
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Returning the created user with the token
        res.status(201).json({
            message: "User created successfully",
            token,
            data: newUser
        });
    } else {
        // Checking if the provided password matches the user's password
        const user = await User.findOne({ username });

        if (user && await bcrypt.compare(password, user.password)) {
            // Generating JWT token for the user
            const token = jwt.sign({
                id: user._id,
                username: user.username
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            // Returning the login success response with token
            res.status(200).json({
                message: "Login successful",
                token
            });
        } else {
            // Returning an error if the password doesn't match
            res.status(401).json({
                message: "Try logging in using your Username/Password"
            });
        }
    }
}



/**
 * Retrieves all users from the database and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the users are successfully retrieved and sent as a response.
 */
const getAllUsers = async (req, res) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();

        // Send the retrieved users as a JSON response with a status code of 200.
        res.status(200).json(users);
    } catch (error) {
        // Log the error and send an error response with a status code of 500.
        console.error('Error fetching users:', error);
        res.status(500).send('Internal server error');
    }
}


/**
 * Retrieves a user from the database by their ID and sends them as a JSON response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the user is successfully retrieved and sent as a response.
 */
const getUserById = async (req, res) => {
    try {
        // Extract the user ID from the request parameters.
        const { id } = req.params;

        // Find the user with the specified ID in the database.
        const user = await User.findById(id);

        // If the user is found, send it as a JSON response with a status code of 200.
        if (user) {
            res.status(200).json(user);
        }
        // If the user is not found, send a JSON response with a status code of 404 and an error message.
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // If an error occurs while retrieving the user, log the error and send an error response with a status code of 500.
        console.error('Error fetching user:', error);
        res.status(500).json({ message: "Error fetching user", error });
    }
}

/**
 * Updates a user's information in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the user is successfully updated and sent as a response.
 */
const updateUser = async (req, res) => {
    try {
        // Extract the user ID from the request parameters.
        const { id } = req.params;

        // Extract the user's information from the request body and hash the password if provided.
        const { username, name, email, password } = req.body;
        const hashedPassword = password ? crypto.createHash('sha256').update(password).digest('hex') : undefined;

        // Construct the update fields object.
        const updateFields = { username, name, email };
        if (hashedPassword) {
            updateFields.password = hashedPassword;
        }

        // Find the user with the specified ID and update their information in the database.
        const updatedUser = await User.findByIdAndUpdate(id, updateFields, { new: true });

        // If the user is found and updated, send them as a JSON response with a status code of 200.
        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } 
        // If the user is not found, send a JSON response with a status code of 404 and an error message.
        else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // If an error occurs while updating the user, log the error and send an error response with a status code of 500.
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};


/**
 * Updates a user's information in the database.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} A Promise that resolves when the user is successfully updated and sent as a response.
 */
const patchUser = async (req, res) => {
    try {
        // Extract the user ID from the request parameters.
        const { id } = req.params;

        // Extract the fields to be updated from the request body.
        const updateFields = req.body;

        // Hash the password if provided.
        if (updateFields.password) {
            updateFields.password = crypto.createHash('sha256')
                .update(updateFields.password)
                .digest('hex');
        }

        // Find the user with the specified ID and update their information in the database.
        const updatedUser = await User.findByIdAndUpdate(
            id, 
            { $set: updateFields }, 
            { new: true }
        );

        // If the user is found and updated, send them as a JSON response with a status code of 200.
        if (updatedUser) {
            res.status(200).json({ message: "User updated successfully", data: updatedUser });
        } else {
            // If the user is not found, send a JSON response with a status code of 404 and an error message.
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        // If an error occurs while updating the user, log the error and send an error response with a status code of 500.
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Error updating user", error });
    }
};

/**
 * Logout the user by sending a success response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} - A JSON response with a logout message.
 */
const logoutUser = (req, res) => {
    // Send a success response with a logout message.
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { createUser, loginUser, logoutUser, getAllUsers, getUserById, updateUser, patchUser, verifyOTP, getInWithGoogle };
