const Candidate = require('../models/candidate.model');
const User = require('../models/user.model');

exports.getAllCandidateService = async() => {
    const candidates = await Candidate.find({});
    return candidates;
}

exports.getCandidateByIdService = async(id) => {
    const candidate = await Candidate.findById(id);
    return candidate;
}

exports.getAllHRsService = async() => {
    const hrs = await User.find({role: 'hr'});
    return hrs;
}

 
exports.makeAdminService = async(id) => {
    const newAdmin = await User.findByIdAndUpdate(id, {role: 'hr'})
}