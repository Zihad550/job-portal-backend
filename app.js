const express = require('express');
const cors = require('cors');

const app = express()

// middleware
app.use(express.json());
app.use(cors());

// root route
app.get('/', (req, res) => {
    res.send('Welcome to job portal!')
})

module.exports = app;