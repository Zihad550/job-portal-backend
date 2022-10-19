const express = require('express');
const cors = require('cors');

const app = express();

// routes import
const userRoute = require('./routes/user.route');

// middleware
app.use(express.json());
app.use(cors());

// root route
app.get('/', (req, res) => {
    res.send('Welcome to job portal!')
})

// routes
app.use('/api/v1/user', userRoute);

module.exports = app;