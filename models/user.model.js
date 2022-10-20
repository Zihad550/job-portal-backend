const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')

const {ObjectId} = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for hr'],
        trim: true,
        maxLength: [50, 'Name is too long'],
        lowercase: true,
    },
    email: {
        type: String, 
        validate: [validator.isEmail, 'Provide a valid email'],
        trim: true,
        lowercase: true, 
        unique: true,
        required: [true, 'Please provide an email for hr']
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
        validate: {
            validator: (value) =>  validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowerCase: 3,
                    minNumbers: 1,
                    minUppercase: 1,
                    minSymbols: 1,
                })
            ,
            message: 'Password {VALUE} is not strong enough.'
        }
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function(value){return value === this.password},
            message: 'Passwords don\'t match!',
        }
    },
    jobPosted: [{
        type: ObjectId,
        ref: 'Job'
    }],
    role: {
        type: String,
        enum: ['user', 'hr'],
        default: 'user'
    },
    status: {
        type: String, 
        enum: ['active', 'inactive'],
        default: 'active'
    }
}, {
    timestamps: true,
});

userSchema.pre('save', function(next){
    const password = this.password;
    const hashedPassword = bcryptjs.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
});

userSchema.methods.comparePassword = function(password, hash){
    return bcryptjs.compareSync(password, hash)
};



const User = mongoose.model('User', userSchema);
module.exports = User;