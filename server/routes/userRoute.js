const express = require('express');
const {createUser, loginUser, logoutUser, getAllUsers} = require('../handlers/userHandlers');


const userRoute = express.Router();
userRoute.use(express.json())

userRoute.get("/", getAllUsers);
// userRoute.post("/signup", createUser);
// userRoute.post("/login", loginUser);
// userRoute.post("/logout", logoutUser)

module.exports = userRoute;