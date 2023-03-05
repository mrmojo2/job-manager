import React from 'react'
import { useMyContext } from '../context/AppContext'
import Loading from './Loading'
import SingleJob from './SingleJob'

const JobsContainer = () => {
    const { isLoading, totalJobs, jobs } = useMyContext()


    if (isLoading) {
        return (
            <div className='loading-container'>
                <Loading />
            </div>
        )
    }

    if (jobs.length === 0) {
        return (
            <section className="job-section">
                <h3>No jobs found....</h3>
            </section>
        )
    }

    return (
        <section className='job-section'>
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className='job-container'>
                {jobs.map((job, i) => {
                    return <SingleJob key={i} {...job} />
                })}
            </div>
        </section>
    )
}


export default JobsContainer