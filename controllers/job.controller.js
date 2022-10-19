const {createJobService, getJobsByManagerIdService, getJobById, updateJobByIdService} = require('../services/job.service');
const { findUserByIdService } = require('../services/user.service');

exports.createJob = async(req, res) => {
    try{
        const {id} = req.user;
        const user = await findUserByIdService(id);
        if(!user)return res.status(401).json({
            status: 'Fail',
            message: 'No user found. Please create an account'
        })

        const job = await createJobService({...req.body, createdBy: {email: user.email, name: user.name, id}});
        
        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the job',
            data: job
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find user',
            data: error
        })
    }
}

exports.getJobsForManager = async(req, res) => {
    try{
        const {id} = req.user;
        const jobs = await getJobsByManagerIdService(id);
        if(!jobs)return res.status(401).json({
            status: 'Fail',
            message: 'No jobs found'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the jobs',
            data: jobs
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find jobs',
            data: error
        })
    }
}

exports.getJobByIdForHR = async(req, res) => {
    try{
        const id = req.params.id;
        
        const job = await getJobById(id);
        if(!job)return res.status(401).json({
            status: 'Fail',
            message: 'No jobs found'
        })

        if(String(job.createdBy.id) !== String(req.user.id))return res.status(401).json({
            status: 'Fail',
            message: 'You don\'t have access to this job'
        })

        res.status(200).json({
            status: 'Success',
            message: 'Successfully found the job',
            data: job
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to find job',
            data: error
        })
    }
}



exports.updateJobById = async(req, res) => {
    try{
        const id = req.params.id;

        const job = await getJobById(id);
        if(!job)return res.status(401).json({
            status: 'Fail',
            message: 'No jobs found'
        })    

        const result = await updateJobByIdService(id, req.body);
    
        res.status(200).json({
            status: 'Success',
            message: 'Successfully updated',
            data: result
        })
    }catch(error){
        res.status(500).json({
            status: 'Fail',
            message: 'Failed to update the job',
            data: error
        })
    }
}