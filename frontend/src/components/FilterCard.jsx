import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend", "Backend", "FullStack"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    // This effect will update the searchedQuery based on the selectedValue
    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    // Handle clicks outside the radio buttons to reset the filter
    const handleCardClick = (e) => {
        // Check if the clicked element is NOT part of the radio group items (filter options)
        if (!e.target.closest('.radio-option')) {
            setSelectedValue('');  // Reset filter selection
            dispatch(setSearchedQuery(''));  // Reset the query in the store
        }
    };

    return (
        <div className='w-full bg-white p-3 rounded-md' onClick={handleCardClick}>
            <h1 className='font-bold text-2xl'>Filter Jobs</h1>
            <hr className='mt-3 mb-5' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-xl'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2 radio-option' key={idx}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className='text-xl' htmlFor={itemId}>{item}</Label>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
