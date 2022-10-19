const jwt = require('jsonwebtoken');

exports.generateToken = (userInfo) => {
    const payload = {
        id: userInfo._id,
        role: userInfo.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: '7days'
    });

    return token;
}