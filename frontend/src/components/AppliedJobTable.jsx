import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)
  console.log(allAppliedJobs.length)

  const getBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'bg-green-400 text-sm' // Green for accepted
      case 'rejected':
        return 'bg-red-400 text-sm' // Red for rejected
      case 'pending':
        return 'bg-gray-400 text-sm' // Grey for pending
      default:
        return 'bg-blue-400 text-sm' // Default color if status doesn't match
    }
  }

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
            allAppliedJobs.length <= 0 ? <span>You haven't applied for any job yet.</span> :
              allAppliedJobs.map((appliedJob) => (
                <TableRow key={appliedJob.id}>
                  <TableCell className='text-xl'>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                  <TableCell className='text-xl'>{appliedJob.job?.title}</TableCell>
                  <TableCell className='text-xl'>{appliedJob.job?.company?.name}</TableCell>
                  <TableCell className="text-right text-xl">
                    <Badge className={getBadgeColor(appliedJob.status)}>{appliedJob.status.toUpperCase()}</Badge>
                  </TableCell>
                </TableRow>
              ))
          }
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobTable
