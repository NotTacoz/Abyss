/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Route, NavLink } from "react-router-dom";
import Home from "./../img/sidebarbuttons/Home.png";
import Account from "./../img/sidebarbuttons/Account.png";

class NavBar extends React.Component {
  render() {
    return (
      <div>
        <div className="sidebar">
          <div className="text-center mt-10 mb-12 z-10">
            <div className="inline-flex mb-8">
              <h1 className="text-white">Abyss</h1>
              <h1 className="text-red-500">Media</h1>
            </div>
            <div>
              <NavLink
                exact
                to="/"
                className="sidebarContent"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Home" src={Home} />
                  <a className=""> Home</a>
                </div>
              </NavLink>
              <NavLink
                to="/explore"
                className="sidebarContent"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Home" src={Home} />
                  <a className=""> Explore</a>
                </div>
              </NavLink>
              <NavLink
                to="/notifications"
                className="sidebarContent"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Home" src={Home} />
                  <a className=""> Notifications</a>
                </div>
              </NavLink>
              <NavLink
                to="/account"
                className="sidebarContent"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Account" src={Account} />
                  <a className=""> Account</a>
                </div>
              </NavLink>
              <NavLink
                to="/settings"
                className="sidebarContent"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Home" src={Home} />
                  <a className=""> Settings</a>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="navbar p-0 justify-center">
          <div className="text-center mt-2 mb-2 z-10">
            <div>
              <NavLink
                exact
                to="/"
                className="sidebarContent m-0 items-stretch"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Home" src={Home} />
                </div>
              </NavLink>
              <NavLink
                to="/explore"
                className="sidebarContent m-0 items-stretch"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Explore" src={Home} />
                </div>
              </NavLink>
              <NavLink
                to="/notifications"
                className="sidebarContent m-0 items-stretch"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Notifications" src={Home} />
                </div>
              </NavLink>
              <NavLink
                to="/account"
                className="sidebarContent m-0 items-stretch"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Account" src={Account} />
                </div>
              </NavLink>
              <NavLink
                to="/settings"
                className="sidebarContent m-0 items-stretch"
                activeClassName="activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Settings" src={Home} />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
