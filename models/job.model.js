const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types; 
const validator = require('validator');

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true, 
        trim: true,
    },
    jobType:{
        type: String,
        required: true,
        trim: true,
        enum: {
            values: ['full-time', 'part-time', 'contract', 'internship'],
            message: 'job type can not be {VALUE}, must be full-time/part-time/contract/internship',
        }
    },
    location: {
        country: {type: String, required: true},
        city: {type: String, required: true},
    },
    salary: {
        min: {type: Number, required: true, min: 0},
        max: {type: Number, required: true, min: 0},
    },
    posted: {
        type: Date,
        default: new Date()
    },
    deadline: {
        type: Date,
        required: true,
    },
    candidates: {
        type: ObjectId,
        ref: 'Candidate'
    },
    createdBy: {
        name: {
            type: String, required: true, trim: true, lowercase: true,
        },
        email: {
            type: String, required: true, trim: true, lowercase: true, validate: [validator.isEmail, 'Please provide an valid email']
        },
        id: {
            type: ObjectId,
        ref: 'User'
        }
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;