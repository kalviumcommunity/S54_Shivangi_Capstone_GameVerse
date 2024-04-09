const express = require("express")
const cors = require('cors');
const connectToDB = require("./config/dbConnection");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: 'GET, POST, PATCH, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

app.use(express.json());

connectToDB()
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB', err);
    });

app.get('/', (req, res) => {
    const isConnected = mongoose.connection.readyState === 1;
    res.send(`Database Connection Status: ${isConnected ? 'Connected' : 'Disconnected'}`);
});


app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});