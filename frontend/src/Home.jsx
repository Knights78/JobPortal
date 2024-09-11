import React from 'react'
import Navbar from './components/shared/Navbar'
import { Link } from 'react-router-dom'
import Category from './components/Category'
import './Home.css'
import Herosection from './components/Herosection'
import { LatestJobs } from './components/LatestJobs'
import Footer from './components/shared/Footer'
const Home = () => {
  return (
    <div>
        <Navbar/>
        <Herosection/>
        <Category/>
        <LatestJobs/>
        <Footer/>

    </div>
  )
}

export default Home