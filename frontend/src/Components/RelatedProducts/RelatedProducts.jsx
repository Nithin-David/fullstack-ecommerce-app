import React from 'react';
import "./RelatedProducts.css";
import Item from "../Items/Item";
import dataProduct from "../Assets/Frontend_Assets/data";

const RelatedProducts = () => {
  return (
    <div className="related-product">
      <p>RELATED PRODUCTS</p>
      <hr />
      <div className="reated-prod-items">
        {dataProduct.map((item, index) => {
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
        })}
      </div>
    </div>
  );
}

export default RelatedProducts