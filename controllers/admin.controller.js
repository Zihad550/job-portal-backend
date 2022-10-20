const {getAllCandidateService, getCandidateByIdService, getAllHRsService, makeAdminService} = require('../services/admin.service.js');
const {findUserByIdService} = require('../services/user.service');

exports.getAllCandidate = async(req, res) => {
    try{
        const candidates = await getAllCandidateService();

        if(!candidates)return res.status(401).json({
            status: 'Fail',
            message: 'No candidates found.'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the candidates',
            data: candidates
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find candidates',
            data: error
        })
    }
}

exports.getCandidateById = async(req, res) => {
    try{
        const candidate = await getCandidateByIdService(req.params.id);

        if(!candidate)return res.status(401).json({
            status: 'Fail',
            message: 'No candidate found.'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the candidate',
            data: candidate
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find candidate',
            data: error
        })
    }
}

exports.getAllHrs = async(req, res) => {
    try{
        const hrs = await getAllHRsService();

        if(!hrs)return res.status(401).json({
            status: 'Fail',
            message: 'No hrs found.'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the hrs',
            data: hrs
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find hrs',
            data: error
        })
    }
}


exports.makeAdmin = async(req, res) => {
    try{

        const {id} = req.user;
        const admin = await findUserByIdService(id);
        if(!admin)return res.status(401).json({
            status: 'Fail',
            message: 'Please try again later.'
        })

        const hr = await makeAdminService(req.params.id);

        if(!hr)return res.status(401).json({
            status: 'Fail',
            message: 'No hrs found.'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully updated the hr to admin',
            data: hr
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to update the hr to admin',
            data: error
        })
    }
}