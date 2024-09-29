import { createSlice } from "@reduxjs/toolkit";
const applicationSlice=createSlice({
    name:"application",
    initialState:{
        loading:false,
        user:null,
        applicants:[]
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        },
        setApplicants:(state,action)=>{
            state.applicants=action.payload
        }

    }
})

export const {setLoading,setUser,setApplicants}=applicationSlice.actions//applicationSlice will give all the actiosn in which we are removing the setLoading state
export default applicationSlice.reducer