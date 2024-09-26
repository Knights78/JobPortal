import { createSlice } from "@reduxjs/toolkit";
const companySlice=createSlice({
    name:"company",
    initialState:{
        singleCompany:null,
        companys:[],//this will store all the company's which is fetched 
        searchCompanyByText:"",
    },
    reducers:{
        setCompany:(state,action)=>{
            state.companys=action.payload
        },
        setSingleCompany:(state,action)=>{
            state.singleCompany=action.payload
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        }

    }
})

export const {setCompany,setSingleCompany,setSearchCompanyByText}=companySlice.actions//authSlice will give all the actiosn in which we are removing the setLoading state
export default companySlice.reducer