const {signupService, findUserByEmailService, findUserByIdService} = require('../services/user.service.js');
const {generateToken} = require('../utils/token');

exports.signup = async(req, res) => {
    try{
        const user = await signupService(req.body);
        res.status(200).json({
            status: 'Success',
            message: 'Successfully created user, Please login',
            data: user
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to create user',
            data: error
        })
    }
}

exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password) return res.status(401).json({
            status: 'Fail',
            message: 'Please provide your credentials',
        })

        const user = await findUserByEmailService(email);
        if(!user)return res.status(401).json({
            status: 'Fail',
            message: 'No user found. Please create an account'
        })

        const isPasswordValid = user.comparePassword(password, user.password);

        if(!isPasswordValid){
            return res.status(403).json({
                status: 'Fail',
                message: 'Password is not correct'
            })
        }
        if(user.status != 'active'){
            return res.status(401).json({
                status: 'Fail',
                message: 'Your account is not active yet '
            })
        }

        const token = generateToken(user);
        const {password: pwd, ...others} = user.toObject();

        res.status(200).json({
            status: 'Success',
            message: 'Successfully login',
            data: {
                user: others,
                token
            }
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to login',
            data: error
        })
    }
}


exports.me = async(req, res) => {
    try{
        const {id} = req.user;
        const user = await findUserByIdService(id);

        if(!user)return res.status(401).json({
            status: 'Fail',
            message: 'No user found. Please create an account'
        })

        const {password: pwd, ...others} = user.toObject()
        
        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the user',
            data: others
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find user',
            data: error
        })
    }
}