/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
// eslint-disable-next-line no-unused-vars
import { Route, NavLink } from "react-router-dom";
import Home from "./../../img/sidebarbuttons/Home.png";
import Account from "./../../img/sidebarbuttons/Account.png";
import Notifications from "./../../img/sidebarbuttons/Notifications.png";
import Settings from "./../../img/sidebarbuttons/Settings.png";
import NewPost from "./../../img/sidebarbuttons/NewPost.png";

class NavbarNotSignedIn extends React.Component {
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
                to="/account"
                className="sidebarContent activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 pr-3" alt="Account" src={Account} />
                  <a className=""> Account</a>
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="navbar p-0 justify-center">
          <div className="text-center mt-2 mb-2 z-10">
            <div>
              <NavLink
                to="/account"
                className="sidebarContent m-0 items-stretch activeContent"
              >
                <div className="inline-flex">
                  <img className="h-8 p-0" alt="Account" src={Account} />
                </div>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NavbarNotSignedIn;
