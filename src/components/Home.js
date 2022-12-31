import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import './Home.css'

function Home() {
  const inactiveLink = {
    background: "#E9ECEF",
    color: "#6C757D",
  };

  const activeLink = {
    background: "#6C757D",
    color: "white",
    fontWeight: "bolder"
  };

  return (
    <div className=' home    mb-5 '>
      <div className='mb-2'>Test</div>
      <ul className="nav nav-tabs ">
        <li className="present nav-item ">
          <NavLink className="nav-link " style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }} to="/Present">Today</NavLink>
        </li>
        <li className="analytics nav-item   mx-4 ">
          <NavLink className="nav-link " style={({ isActive }) => {
            return isActive ? activeLink : inactiveLink;
          }} to="/Analytics">Analytics</NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  )
}
export default Home