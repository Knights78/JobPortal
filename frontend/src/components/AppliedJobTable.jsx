import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
const AppliedJobTable = () => {
  const allAppliedJobs=[1,2,3,4]
  return (
    <div>
    <Table className='ml-2 max-w-6xl'>
        <TableCaption className='text-2xl'>A list of your applied jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead className='text-lg'>Date</TableHead>
                <TableHead className='text-lg'>Job Role</TableHead>
                <TableHead className='text-lg'>Company</TableHead>
                <TableHead className="text-right text-lg">Status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                allAppliedJobs.length <= 0 ? <span>You haven't applied any job yet.</span> : allAppliedJobs.map((appliedJob) => (
                    <TableRow >
                        <TableCell className='text-xl' >appliedJob?.createdAt?.split("T")[0]</TableCell>
                        <TableCell className='text-xl'>appliedJob.job?.title</TableCell>
                        <TableCell className='text-xl'>appliedJob.job?.company?.name</TableCell>
                        <TableCell className="text-right text-xl"><Badge className='bg-red-400 text-sm'>appliedJob.status.toUpperCase()</Badge></TableCell>
                    </TableRow>
                ))
            }
        </TableBody>
    </Table>
</div>
  )
}

export default AppliedJobTable