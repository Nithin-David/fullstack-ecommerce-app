import React from 'react';
import "./Breadcrums.css";
import arrow_icon from "../Assets/Frontend_Assets/breadcrum_arrow.png";

const Brudcrums = (props) => {
const {product} = props;
 
  return (
    <div className='breadcrums-container'>
      Home <img src={arrow_icon} alt="" /> Shop <img src={arrow_icon} alt="" /> {product.category} <img src={arrow_icon} alt="" /> {product.name}
    </div>
  )
}

export default Brudcrums