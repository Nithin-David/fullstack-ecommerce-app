import React, { useContext } from 'react';
import "./ProductDisplay.css";
import starIcon from "../Assets/Frontend_Assets/star_icon.png";
import starDullIcon from "../Assets/Frontend_Assets/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';


const ProductDisplay = (Props) => {
  const {addToCart} =  useContext(ShopContext);

     const product = Props.product;
  return (
    <div className="product-details">
      <div className="prod-images">
        <div className="left-images">
          <img src={product.image} alt="product images" />
          <img src={product.image} alt="product images" />
          <img src={product.image} alt="product images" />
          <img src={product.image} alt="product images" />
        </div>
        <div className="right-main-image">
          <img src={product.image} alt="product images" />
        </div>
      </div>

      <div className="prod-right">
        <h2>{product.name}</h2>
        <div className="prod-star-rating">
          <img src={starIcon} alt="star" />
          <img src={starIcon} alt="star" />
          <img src={starIcon} alt="star" />
          <img src={starIcon} alt="star" />
          <img src={starDullIcon} alt="stardull" />
          <p>(122)</p>
        </div>
        <div className="prod-prices">
          <p className="prod-old-price">${product.old_price}</p>
          <p className="prod-new-price">${product.new_price}</p>
        </div>
        <div className="prod-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, sequi.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit ipsa
          tenetur sint beatae itaque et ipsam voluptates cumque eligendi
          architecto.
        </div>
        <div className="prod-sizes">
          <p>Select Size</p>
          <div className="size-list">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => {addToCart(product.id)}} className="cart-button">ADD TO CART</button>
        <div className="prod-cat">
          <p>
            <span>Category:</span> women, T-shirt, Crop Top
          </p>
          <p>
            <span>Tags:</span> Modern, Latest
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDisplay