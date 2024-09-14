import React, { useContext } from 'react';
import "./CartItems.css";
import { ShopContext } from '../../Context/ShopContext';
import Close from "../Assets/Frontend_Assets/cart_cross_icon.png";

const CartItems = () => {
const {all_products, cartItems, removeFromCart, getAllTotal} = useContext(ShopContext);

  return (
    <div className='cart-items'>
        <div className="cart-titles">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
       {all_products.map((item, index) => {
        if(cartItems[item.id] > 0){
            return (
              <>
                <div key={index} className="cart-details cart-titles">
                  <img className='cart-image' src={item.image} alt="product" />
                  <p className='cart-name'>{item.name}</p>
                  <p>${item.new_price}</p>
                  <button>{cartItems[item.id]}</button>
                  <p>${item.new_price * cartItems[item.id]}</p>
                  <img
                  className='close-icon'
                    onClick={() => {
                      removeFromCart(item?.id);
                    }}
                    src={Close}
                    alt="close icon"
                  />
                </div>
                <hr />
              </>
            );
        }else{
            return null;
        }
       })}

       <div className='cart-bottom'>
        <div className="cart-price-details">
          <p className='cart-totals'>Cart Totals</p>
          <div className='total-detail'>
            <div className='total-onebyone'><p>Subtotal</p><p>${getAllTotal()}</p></div>
            <div className='total-onebyone'><p>Shipping Fee</p><p>free</p></div>
            <div className='total-onebyone all-total'><p>Total</p><p>${getAllTotal()}</p></div>
          </div>
          <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo">
          <p>If you have promocode. Enter it here!</p>
          <div className="promo-input-container">
            <input className='promo-input' type="text" placeholder="Enter Promocode" />
            <button className='promo-button'>APPLY</button>
          </div>
        </div>
       </div>
    </div>
  )
}

export default CartItems