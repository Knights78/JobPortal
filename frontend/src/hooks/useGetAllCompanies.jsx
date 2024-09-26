import React from "react";
import { useEffect } from "react";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import axios from "axios"
import { setCompany } from "@/redux/companySlice";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
const useGetAllCompanies=()=>{
    //console.log("CALLEd")
    const dispatch=useDispatch()
    
       // console.log("ISNSNSNS")
       useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getCompany`,{
                    withCredentials:true
                });
                //console.log('called');
                if(res.data.success){
                    dispatch(setCompany(res.data.companies));
                    toast.success(res.data.message)
                }
                else{
                    toast.success(res.data.message)
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
    }
   

export default useGetAllCompanies