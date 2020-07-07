import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Redirect } from "react-router-dom";

import { getStorageSession } from "../../Helpers"

const SideBar = (props) => {

  let session = getStorageSession()

  let handleLogout = () => {
    sessionStorage.clear();
    return <Redirect to="/" />
  }

  return <>
    <Menu>
      <a id="home" className="menu-item" href="/">Home</a>
      {(session.participationStatus === 1 || session.participationStatus === 2) && <a id="news" className="menu-item" href="/news">News Feed</a>}
      {session.participationStatus === 1 && <a id="contact" className="menu-item" href="/requestlist">Request Participation List</a>}
      {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}

      <a className="menu-item" onClick={handleLogout} href="/">Logout</a>
    </Menu>
  </>
}

export default SideBar;