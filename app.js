const express = require('express');
const cors = require('cors');

const app = express();

// routes import
const userRoute = require('./routes/user.route');
const jobRoute = require('./routes/job.route');
const managerRoute = require('./routes/manager.route');
const adminRoute = require('./routes/admin.route');

// middleware
app.use(express.json());
app.use(cors());
app.use(express.static('public'))

// root route
app.get('/', (req, res) => {
    res.send('Welcome to job portal!')
})

// routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/jobs', jobRoute);
app.use('/api/v1/manager', managerRoute);
app.use('/api/v1/admin', adminRoute);

module.exports = app;