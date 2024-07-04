const express = require('express');
const { createUser, loginUser, logoutUser, getAllUsers, updateUser, patchUser, verifyOTP, getInWithGoogle } = require('../handlers/userHandlers');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoute = express.Router();
userRoute.use(express.json());

userRoute.get("/", getAllUsers);
userRoute.post("/signup", createUser);
userRoute.post("/google-auth", getInWithGoogle)
userRoute.post("/login", loginUser);
userRoute.put("/:id", updateUser); 
userRoute.patch("/:id", patchUser);
userRoute.post('/verify', verifyOTP);

module.exports = userRoute;
