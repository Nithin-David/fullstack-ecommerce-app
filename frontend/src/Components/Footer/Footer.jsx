import React from 'react';
import "./Footer.css";
import logo from "../Assets/Frontend_Assets/logo.png";
import whatsapp from "../Assets/Frontend_Assets/whatsapp_icon.png";
import pintrest from "../Assets/Frontend_Assets/pintester_icon.png";
import instagram from "../Assets/Frontend_Assets/instagram_icon.png";

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className="footer-title">
            <img src={logo} alt="logo" />
            <p>CartCraze</p>
        </div>
        <ul className='footer-items'>
            <li>Company</li>
            <li>Products</li>
            <li>Offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className="footer-icons">
            <img src={instagram} alt="" />
            <img src={pintrest} alt="" />
            <img src={whatsapp} alt="" />
        </div>
        <div className='footer-copyright'>
            <hr />
            <p>Copyright @ 20203 - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer