import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
// import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from "react-router-dom";

const Herosection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchJobHandler = () => {};
  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-xl">
          JOB PORTAL WEBSITE
        </span>
        <h1 className="text-5xl font-bold">
          Finding, Connecting
          <br className="mt-10" /> {/* Adds vertical gap */}
           <span className="text-[#6A38C2] mt-20"> And Building Success</span>
        </h1>

        <p className="text-3xl mt-10 mx-auto">
          Discover a seamless connection between top-tier employers and
          passionate job seekers. Whether you're an employer looking to hire the
          best talent or a student ready to kickstart your career, our platform
          offers tailored opportunities to meet your unique goals
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto my-5">
          <input
            type="text"
            placeholder="Find your dream jobs"
            // onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[#6A38C2]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
