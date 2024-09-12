import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
const FilterCard = () => {
    
const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi ", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer","Data Science"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]
  return (
    <div className='w-full bg-white p-3 rounded-md'>
    <h1 className='font-bold text-2xl'>Filter Jobs</h1>
    <hr className='mt-3 mb-5' />
    <RadioGroup >
        {
            fitlerData.map((data, index) => (
                <div>
                    <h1 className='font-bold text-xl'>{data.fitlerType}</h1>
                    {
                        data.array.map((item, idx) => {
                            // const itemId = `id${index}-${idx}`
                            return (
                                <div className='flex items-center space-x-2 my-2 '>
                                    <RadioGroupItem   value={item}/>
                                    <Label className='text-xl'>{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
    </RadioGroup>
</div>
  )
}

export default FilterCard