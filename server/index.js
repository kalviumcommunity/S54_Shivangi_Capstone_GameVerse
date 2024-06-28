const express = require("express")
const cors = require('cors');
const connectToDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const userRoute = require('./routes/userRoute');
const gameRoute = require("./routes/gameRoute");


const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors({
    origin: ['http://localhost:5173', 'https://game-verse-iota.vercel.app'],
    methods: 'GET, POST, PATCH, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization, X-Additional-Info',
    credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, X-Additional-Info');
    next();
})

connectToDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.get('/check', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.send(`Database Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}`);
});

app.get("/", (req, res) => {
    res.send("Welcome To GameVerse")
})

app.use("/api/users", userRoute);
app.use("/api/games", gameRoute)

app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});