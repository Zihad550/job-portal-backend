const Job = require('../models/job.model');

exports.createJobService = async(jobInfo) => {
    const job = await Job.create(jobInfo);
    return job;
};

exports.getJobsByManagerIdService = async(id) => {
    const jobs = await Job.find({'createdBy.id': id});
    return jobs;
};

exports.getJobById = async(id) => {
    const job = await Job.findById(id);
    return job;
};

exports.updateJobByIdService = async({id, updateDoc}) => {
    const job = await Job.findByIdAndUpdate(id, updateDoc);
    return job;
};

exports.getAllJobsForCandidateService = async() => {
    const jobs = await Job.find({});
    return jobs;
}

