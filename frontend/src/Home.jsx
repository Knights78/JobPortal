import React from 'react'
import Navbar from './components/shared/Navbar'
import { Link } from 'react-router-dom'
import './Home.css'
const Home = () => {
  return (
    <div>
        {/* <Navbar/> */}
        <div className="App">
      <header className="App-header">
        <nav>
          <a href="/" className='title'>JobPortal</a>
          <a href="/">HOME</a>
          <a href="/">CANDIDATES</a>
          <a href="/">EMPLOYERS</a>
          <a href="/">JOBS</a>
          <a href="/">PAGES</a>
         <Link to='/login'> <a >LOGIN</a></Link>
         <Link to='/signup'> <a className='reg'>REGISTER</a></Link>
        </nav>
        <div className="hero-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRB6SEDzv9QQfNiQGxipl5q6SzLrUP50oAjnw&s" alt="Hero Image" />
          </div>
        <div className="hero">
          <h1>Secure Your Career Path. You're Worth It.</h1>
          <p>Empowering Ambitious Job Seekers with Comprehensive Tools and Resources to Discover, Apply, and Secure Their Dream</p>
          <div className="search-bar">
            <input type="text" placeholder="Job Title Keywords" />
            <button>FIND JOBS</button>
          </div>
          <div className="stats">
            {/* <div className="stat">
              <span className="icon"><img src="https://i.imgur.com/tG2N78K.png" alt="Icon" /></span>
              <h2>586k+</h2>
              <p>Active Workers</p>
            </div>
            <div className="stat">
              <span className="icon"><img src="https://i.imgur.com/lH2eD4n.png" alt="Icon" /></span>
              <h2>586k+</h2>
              <p>Companies</p>
            </div>
            <div className="stat">
              <span className="icon"><img src="https://i.imgur.com/qS76QzL.png" alt="Icon" /></span>
              <h2>586k+</h2>
              <p>Countries</p>
            </div> */}
          </div>
        </div>
      </header>
    </div>
    </div>
  )
}

export default Home