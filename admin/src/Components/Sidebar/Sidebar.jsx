import React from 'react';
import "./Sidebar.css";
import { SlBasketLoaded } from "react-icons/sl";
import { IoIosListBox } from "react-icons/io";
import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <Link
        to={"/addproduct"}
        style={{ textDecoration: "none", color: "black" }}>
        <div className="add-product">
          <SlBasketLoaded />
          <p>Add Product</p>
        </div>
      </Link>
      <Link
        to={"/getallproducts"}
        style={{ textDecoration: "none", color: "black" }}>
        <div className="product-list">
          <IoIosListBox />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar