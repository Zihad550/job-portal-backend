const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types; 

const jobSchema = mongoose.Schema({
    title: String,
    position: String,
    salary: Number,
    posted: Date,
    endDate: Date,
    candidates: {
        type: ObjectId,
        ref: 'Candidate'
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;