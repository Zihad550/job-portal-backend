const Job = require('../models/job.model');
const Candidate = require('../models/candidate.model');


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

exports.getJobByIdWithHRDetail = async(id) => {
    const job = await Job.findById(id).populate('createdBy.id')
    return job;
};

exports.updateJobByIdService = async({id, updateDoc}) => {
    const job = await Job.findByIdAndUpdate(id, updateDoc);
    return job;
};

exports.getJobsService = async (filters, queries) => {
    const jobs = await Job
    .find(filters)
    .select(queries.fields)
    .sort(queries.sortBy)

    return  jobs;
}

exports.findCandidateByEmail = async(email) => {
    const candidate = await Candidate.findOne({email});
    return candidate;
}


exports.applyJobService = async(id, candidateInfo) => {
    const job = await Job.findById(id);
    if(!job) return;
    const foundCandidate = await findCandidateByEmail(candidateInfo.email);

    if(foundCandidate){
        if(foundCandidate.jobApplied.some(jobApp => String(jobApp.id) === String(id)))return;
        job.candidates.push(candidate._id);
        foundCandidate.jobApplied.push({title: job.title, id: job._id})
    job.save();
    return;
    }

    const candidate = await Candidate.create(candidateInfo);
    job.candidates.push(candidate._id);
    candidate.jobApplied.push({title: job.title, id: job._id})
    job.save();
    
   
    
};