import React from 'react';
import { slide as Menu } from 'react-burger-menu'
import { Link } from "react-router-dom";

import { getStorageSession } from "../../Helpers"

const SideBar = () => {

  let session = getStorageSession()

    return <>
    <Menu>
        <a id="home" className="menu-item" href="/">Home</a>
        <a id="about" className="menu-item" href="/register">Register</a>
        <a id="contact" className="menu-item" href="/login">Login</a>
    { (session.participationStatus === 1 || session.participationStatus === 2) && <a id="news" className="menu-item" href="/news">News Feed</a>}
    { session.participationStatus === 1 && <a id="contact" className="menu-item" href="/requestlist">Request Participation List</a>}
        {/* <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a> */}
      </Menu>
    </>
}

export default SideBar;