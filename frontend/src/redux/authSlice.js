import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null

    },
    reducers:{
        setLoading:(state,action)=>{
            state.loading=action.payload
        },
        setUser:(state,action)=>{
            state.user=action.payload
        }

    }
})

export const {setLoading,setUser}=authSlice.actions//authSlice will give all the actiosn in which we are removing the setLoading state
export default authSlice.reducer