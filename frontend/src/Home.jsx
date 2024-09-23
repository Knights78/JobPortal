import React from 'react'
import Navbar from './components/shared/Navbar'
import { Link } from 'react-router-dom'
import Category from './components/Category'
import './Home.css'
import Herosection from './components/Herosection'
import { LatestJobs } from './components/LatestJobs'
import Footer from './components/shared/Footer'
import getAllJob from './hooks/getAllJob'
import UpdateProfileDialog from './components/UpdateProfileDialog'
import { useSelector } from 'react-redux'
import { useState,useEffect } from 'react'
const Home = () => {
  const {user}=useSelector(store=>store.auth)
  //console.log("ROLe",user.role)
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    // Check if the user is logged in with Google
    if (user?.provider === 'google' && !user?.role) {
      setOpenDialog(true); // Automatically open the dialog
    }
    else{
      //console.log("ELSE PART")
      setOpenDialog(false)
    }
  }, [user]);
  getAllJob();//custome hook so all the latest job will be there
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Category/>
        <LatestJobs/>
        <Footer/>

      {/* Automatically open the UpdateProfileDialog if logged in with Google */}
      {user?.provider === 'google' &&  (
        <UpdateProfileDialog 
          open={openDialog} 
          setOpen={setOpenDialog} 
          user={user}
          isGoogleLogin={true} // Pass an additional prop to handle Google logic
        />
      )}
    </div>
    
  )
}

export default Home