const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

// db connection
mongoose.connect(process.env.DB_URL).then(() => {
    console.log('===========================================')
    console.log('Database connection is successful')
    console.log('===========================================')
})

// server
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log('App is running on port ', port)
})