import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false
    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    }
})

export const {setLoading}=authSlice.actions//authSlice will give all the actiosn in which we are removing the setLoading state
export default authSlice.reducer