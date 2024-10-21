import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import { Job } from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

// const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];

const JobPage = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    //console.log(allJobs)
    //console.log("searched query",searchedQuery)
    const [filterJobs, setFilterJobs] = useState(allJobs);
    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                // Case-insensitive matching
                const query = searchedQuery.trim().toLowerCase();  // Trim and convert to lowercase
                return job.title.toLowerCase().includes(query) ||
                    job.description.toLowerCase().includes(query) ||
                    job.location.toLowerCase().includes(query);
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);
    //console.log("Filtered Jobs",filterJobs)
    return (
        <div>
            <Navbar />
            <div className='w-full max-w-[90%] mt-20 mx-auto'>
                <div className='flex gap-8 mt-2'>
                    <div className='w-40% mr-9'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? <span>Job not found</span> : (
                            <div className='flex-1 h-[90vh] overflow-y-auto pb-8'>
                                <div className='grid grid-cols-3 gap-5'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default JobPage
