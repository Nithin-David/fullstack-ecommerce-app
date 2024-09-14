import React from "react";
import "./Hero.css";
import hand from "../Assets/Frontend_Assets/hand_icon.png";
import arrow from "../Assets/Frontend_Assets/arrow.png";
import heroImage from "../Assets/Frontend_Assets/hero_image.png"

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left-section">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hand-container">
          <div className="hand-image">
            <p>new</p>
            <img src={hand} alt="" />
          </div>
            <p>collections</p>
            <p>for everyone</p>
        </div>
        <button className="button-collection">
          <p> Latest Collection</p>
          <img src={arrow} alt="" />
        </button>
      </div>
      <div className="hero-right-section">
        <img src={heroImage} alt="" />
      </div>
    </div>
  );
};

export default Hero;
