const express = require("express")
const cors = require('cors');

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

app.get('/', (req, res) => {
    res.send('Welcome to GameVerse');
});

app.listen(port, () => {
    console.log(`🚀 Server running on PORT: ${port}`);
});