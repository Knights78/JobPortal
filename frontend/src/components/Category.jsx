import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
const Category = () => {
    const category = [
        "Frontend Developer",
        "Backend Developer",
        "Data Science",
        "Graphic Designer",
        "FullStack Developer",
        "Machine Learning",
        "Video Editing",
        "Articial Intelligence"
    ]
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => 
                prevIndex === category.length - 1 ? 0 : prevIndex + 1
            );
        }, 2000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [category.length]);
    const [currentIndex, setCurrentIndex] = useState(0);
    
  return (
    <div>
    <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className='ml-4 flex transition-transform duration-500 ease-out' style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {
                category.map((cat, index) => (
                    <CarouselItem className="md:basis-1/2 lg-basis-1/3 pl-4">
                        <Button  variant="outline" className="rounded-full text-lg px-6 py-3">{cat}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
</div>
  )
}

export default Category