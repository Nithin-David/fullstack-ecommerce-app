import React from 'react';
import "./Offer.css";
import image from "../Assets/Frontend_Assets/exclusive_image.png";

const Offer = () => {
 
  return (
    <div className='offer-container'>
      <div className="offer">
        <div className="offer-left">
          <div className="offer-headers">
            <p>Exclusive</p>
            <p>Offers For You</p>
          </div>
          <p>ONLY ON BEST SELLERS PRODUCt</p>
          <button className="offer-button">Check Now</button>
        </div>
        <div className="offer-right">
          <img src={image} alt="" />
        </div>
      </div>
    </div>
  );
}


export default Offer;