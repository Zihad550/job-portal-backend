const User = require('../models/user.model');

exports.signupService = async(userInfo) => {
    const user = await User.create(userInfo);
    return user;
}

exports.findUserByEmailService = async(email) => {
    const user = await User.findOne({email});
    return user;
}

exports.findUserByIdService = async(id) => {
    const user = await User.findById(id);
    return user;
}