import React from 'react'
// eslint-disable-next-line no-unused-vars
import { Route, Link } from 'react-router-dom'
import Home from './img/sidebarbuttons/Home.png'
import Login from './img/sidebarbuttons/Login.png'
function NavBar () {
  return (
    <div>
      <div className="sidebar">
        <div className="sidebar-bg"></div>
        <div className="text-center mt-10 mb-12 z-10">
          <div className="inline-flex mb-8">
              <h1 className="">Genshin</h1>
              <h1 className="text-red-500">Mains</h1>
          </div>
          <div>
            <Link to='/' className="sidebarContent activeContent" style={{ color: 'white' }}>
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> Home</a>
              </div>
            </Link>
            <Link to='/' className="sidebarContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> News</a>
              </div>
            </Link>
            <Link to='/' className="sidebarContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> Contact</a>
              </div>
            </Link>
            <Link to='/' className="sidebarContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Home" src={Home} />
                <a className=""> About</a>
              </div>
            </Link>
            <Link to='/login' className="sidebarContent">
              <div className="inline-flex">
                <img className="h-8 pr-3" alt="Login" src={Login} />
                <a className=""> Login</a>
              </div></Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
