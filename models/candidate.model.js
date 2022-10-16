const mongoose = require('mongoose');
const validator = require('validator');
const {ObjectId} = mongoose.Schema.Types;

const candidateSchema = mongoose.Schema({
    info: {
        name: {
            type: String,
            required: [true, 'Please provide a name for candidate'],
            trim: true,
            lowercase: true,
            maxLength: [50, 'Name is too long'],
        },
        email: {
            type: String,
            required: [true, 'Please provide a email for candidate'],
            trim: true,
            lowercase: true,
            validate: [validator.isEmail, 'Provide a valid email']
        },
        phone: {
            type: String,
            require: [true, 'Please provide a phone number for candidate'],
            trim: true,
            validate: [validator.isMobilePhone, 'Please provide a valid contact number']
        },
        location: {
            country: String,
            city: String,
        }
    },
    jobApplied: [{
        title: String,
        id: {
            type: ObjectId,
            ref: 'Job'
        }
    }]
})

const Candidate = mongoose.model('Candidate', candidateSchema);

module.exports = Candidate;