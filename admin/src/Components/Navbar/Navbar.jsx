import React from 'react';
import "./Navbar.css";
import logo from "../../Assets/logo.png"
import adminLogo from "../../Assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="left-nav">
        <img src={logo} alt="logo" />
        <div className="title-nav">
          <h1>CartCraze</h1>
          <p>Admin Panel</p>
        </div>
      </div>
      <div className="right-nav">
        <img className='admin-logo' src={adminLogo} alt="admin logo" />
      </div>
    </div>
  );
}

export default Navbar