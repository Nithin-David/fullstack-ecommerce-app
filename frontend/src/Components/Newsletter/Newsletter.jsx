import React from 'react';
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className='newsletter-container'>
        <h2>Get Exclusive Offers On Your Email.</h2>
        <p>Subscribe to out newsletter and stay update.</p>
        <div className='newsletter-input'>
            <input type="email" name='email' placeholder='Enter your email..!'/>
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default Newsletter