import { createSlice } from "@reduxjs/toolkit";
const jobSlice=createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],//this will be for the admin page where he will create all the jobs for the admin page
        searchJobByText:"",
        allAppliedJobs:[],
        searchedQuery:"",
        singleAdminJob:null
    },
    reducers:{
        setAllJob:(state,action)=>{
            state.allJobs=action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob=action.payload
        },
        setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs:(state,action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        },
        setSingleAdminJob:(state,action)=>{
            state.singleAdminJob=action.payload
        }
    }
})
export const {setAllJob,setSingleJob,setAllAdminJobs,setSearchJobByText,setAllAppliedJobs,setSearchedQuery,setSingleAdminJob}=jobSlice.actions
export default jobSlice.reducer