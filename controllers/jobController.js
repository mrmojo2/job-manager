import Job from "../models/Job.js"
import { StatusCodes } from "http-status-codes"
import HttpError from '../error/HttpError.js'
import checkPermission from "../utils/checkPermissions.js"
import mongoose from 'mongoose'

const createJob = async (req, res) => {
    const { position, company } = req.body

    if (!position || !company) {
        throw new HttpError('Please provide all values', StatusCodes.BAD_REQUEST)
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const getAllJobs = async (req, res) => {
    const { search, status, type, sort } = req.query

    const queryObject = {
        createdBy: req.user.userId,
    }

    if (status && status !== 'all') {
        queryObject.status = status;
    }
    if (type && type !== 'all') {
        queryObject.jobType = type;
    }
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' };
    }

    let result = Job.find(queryObject)

    if (sort === 'latest') {
        result = result.sort('-createdAt');
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt');
    }
    if (sort === 'a-z') {
        result = result.sort('position');
    }
    if (sort === 'z-a') {
        result = result.sort('-position');
    }

    const jobs = await result
    res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 })
}
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new HttpError(`No job with id ${jobId}`)
    }

    checkPermission(req.user, job.createdBy)

    await job.remove()
    res.status(200).json({ msg: 'job successfully deleted' })
}
const updateJob = async (req, res) => {
    const { id: jobId } = req.params
    const { position, company, jobLocation } = req.body
    if (!position || !company || !jobLocation) {
        throw new HttpError('lau muji syko bhais?', StatusCodes.BAD_REQUEST)
    }

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new HttpError(`No job with id ${jobId}`)
    }

    checkPermission(req.user, job.createdBy)

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
        new: true,              //returns the updated task not the old 
        runValidators: true,
    })

    res.status(200).json({ msg: 'job successfully updated' })
}
const showStats = async (req, res) => {
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);
    stats = stats.reduce((acc, curr) => {
        const { _id: title, count } = curr;
        acc[title] = count;
        return acc;
    }, {});

    const defaultStats = {
        pending: stats.pending || 0,
        interview: stats.interview || 0,
        declined: stats.declined || 0,
    };

    res.status(200).json(defaultStats)
}

export { createJob, deleteJob, getAllJobs, updateJob, showStats }
