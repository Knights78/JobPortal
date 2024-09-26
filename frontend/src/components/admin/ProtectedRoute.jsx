import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const ProtectedRoute = ({children}) => {
    const {user}=useSelector(store=>store.auth)
    //console.log(user)
    const navigate=useNavigate()
    useEffect(()=>{
        if(user==null || user?.role!=='recruiter')
        {
            navigate('/')
        }
    },[])
  return (
    <>
    {children}
    </>
  )
}

export default ProtectedRoute