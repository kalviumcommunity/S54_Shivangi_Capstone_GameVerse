const express = require('express');
const { createUser, loginUser, logoutUser, getAllUsers } = require('../handlers/userHandlers');
const authMiddleware = require('../middlewares/authMiddleware');

const userRoute = express.Router();
userRoute.use(express.json());

userRoute.get("/", authMiddleware, getAllUsers);
userRoute.post("/signup", createUser);
userRoute.post("/login", loginUser);

module.exports = userRoute;
