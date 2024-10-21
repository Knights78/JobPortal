import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
 
  const params = useParams();

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/getApplicants/${params.id}`, {
          withCredentials: true,
        });
       // console.log('INSIDE', res.data.job.application);

        // Assuming `job` is an array with one job, and `application` is an array inside that job
        if (res.data.job && res.data.job.application.length > 0) {
          dispatch(setApplicants(res.data.job)); // Access the first job and its applications
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllApplicants();
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants {applicants?.length}
        </h1>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default Applicants;
