const express = require('express');
const { createUser, loginUser, logoutUser, getAllUsers, updateUser, patchUser, verifyOTP, getInWithGoogle } = require('../handlers/userHandlers');
const authMiddleware = require('../middlewares/authMiddleware');

// Create a router for the user routes
const userRoute = express.Router();

// Use JSON middleware for parsing incoming request bodies
userRoute.use(express.json());

// GET /users - Get all users
userRoute.get("/", getAllUsers);

// POST /users/signup - Create a new user
userRoute.post("/signup", createUser);

// POST /users/google-auth - Login with Google
userRoute.post("/google-auth", getInWithGoogle);

// POST /users/login - User login
userRoute.post("/login", loginUser);

// PUT /users/:id - Update a user with the given ID
userRoute.put("/:id", updateUser);

// PATCH /users/:id - Partially update a user with the given ID
userRoute.patch("/:id", patchUser);

// POST /users/verify - Verify OTP for user registration
userRoute.post('/verify', verifyOTP);

// Export the user router
module.exports = userRoute;

