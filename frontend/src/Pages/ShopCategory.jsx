import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext';
import dropdown from "../Components/Assets/Frontend_Assets/dropdown_icon.png";
import Item from "../Components/Items/Item";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
const {all_products} = useContext(ShopContext);

  return (
    <div className="shopcat-container">
      <img src={props.banner} alt="banners" />
      <div className="category-details">
        <div className="cat-numbers">
          <div className='cat-product'>
            <span>Showing 1-12</span> out of 36 products
          </div>
          <div className="category-sort">
            <p>Sort by</p>
            <img src={dropdown} alt="down arrow" />
          </div>
        </div>

        <div className="cat-items">
          {all_products.map((item, index) => {
            if (props.category === item.category) {
              return (
                <Item
                  key={index}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <div className="explore-button">Explore more...</div>
      </div>
    </div>
  );
}

export default ShopCategory