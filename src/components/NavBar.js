/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Route, NavLink } from 'react-router-dom'
import Home from './../img/sidebarbuttons/Home.png'
import Character from './../img/sidebarbuttons/Character.png'

function NavBar () {
  return (
    <div>
      <div className="sidebar">
        {/* <div className="sidebar-bg"></div> */}
        <div className="text-center mt-10 mb-12 z-10">
          <div className="inline-flex mb-8">
              <h1 className="text-white">Abyss</h1>
              <h1 className="text-red-500">Media</h1>
          </div>
          <div>
            <NavLink exact to='/' className="sidebarContent" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> Home</a>
              </div>
            </NavLink>
            <NavLink to='/news' className="sidebarContent" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> News</a>
              </div>
            </NavLink>
            <NavLink to='/69' className="sidebarContent" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> Contact</a>
              </div>
            </NavLink>
            <NavLink to='/totallyfunctionalaboutpage' className="sidebarContent" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> About</a>
              </div>
            </NavLink>
            <NavLink to='/account' className="sidebarContent" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Character" src={Character} />
                <a className=""> Account</a>
              </div></NavLink>
          </div>
        </div>
      </div>
      <div className="navbar p-0 justify-center">
        <div className="text-center mt-2 mb-2 z-10">
          <div>
            <NavLink exact to='/' className="sidebarContent m-0 items-stretch" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 p-0" alt="Home" src={Home} />
              </div>
            </NavLink>
            <NavLink to='/navbarlmfao' className="sidebarContent m-0 items-stretch" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 p-0" alt="Home" src={Home} />
              </div>
            </NavLink>
            <NavLink to='/69' className="sidebarContent m-0 items-stretch" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 p-0" alt="Home" src={Home} />
              </div>
            </NavLink>
            <NavLink to='/pisser' className="sidebarContent m-0 items-stretch" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 p-0" alt="Home" src={Home} />
              </div>
            </NavLink>
            <NavLink to='/account' className="sidebarContent m-0 items-stretch" activeClassName="activeContent">
              <div className="inline-flex">
                <img className="h-8 p-0" alt="Character" src={Character} />
              </div></NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
