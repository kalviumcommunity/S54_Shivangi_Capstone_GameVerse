// Importing necessary modules
const express = require("express");
const cors = require('cors');
const connectToDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const gameRoute = require("./routes/gameRoute");
const chatbotRoute = require("./routes/chatbotRoute");
const path = require('path');

// Creating an instance of the Express application
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables from .env file
require('dotenv').config();

// Configure the view engine and views directory for rendering HTML files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Enable Cross-Origin Resource Sharing (CORS) for the specified origins
app.use(cors({
    origin: ['http://localhost:5173', 'https://game-verse-iota.vercel.app', 'game-verse-new.firebaseapp.com'],
    methods: 'GET, POST, PATCH, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Additional-Info',
    credentials: true,
}));

// Parse incoming request bodies as JSON
app.use(express.json());

// Connect to MongoDB using the provided connection string
connectToDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

// Route to check the database connection status
app.get('/check', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.send(`Database Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}`);
});

// Home route
app.get("/", (req, res) => {
    res.send("Welcome To GameVerse");
});

// Route to render the OTP verification page
app.get("/verify/:otp", (req, res) => {
    const { otp } = req.params;
    res.render('verify-otp', { otp });
});

// Mount the user routes at the "/api/users" path
app.use("/api/users", userRoute);

// Mount the game routes at the "/api/games" path
app.use("/api/games", gameRoute);

// Mount the chatbot routes at the "/genai" path
app.use("/genai", chatbotRoute);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});
