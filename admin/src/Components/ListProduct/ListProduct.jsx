import React, { useEffect, useState } from 'react';
import "./ListProduct.css";
import crossIcon from "../../Assets/cross_icon.png"

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState(null);

  const fetchAllProducts = async () => {
    await fetch("http://localhost:4000/getallproducts", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      body: null,
    }).then((res) => res.json()).then((data) => {setAllProducts(data)
      console.log(data);
    });
  };

  useEffect(() => {
    fetchAllProducts();
  },[]);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });
    await fetchAllProducts();
  }

  return (
    <div className="productlist-cont">
      <h1>All Products</h1>
      <div className="product-lists-titles">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="product-list-cont">
        {allProducts
          ?.slice()
          .reverse()
          .map((item, index) => {
            return (
              <>
                <div key={index} className="product-lists">
                  <img className="product-img" src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.old_price}</p>
                  <p>${item.new_price}</p>
                  <p>{item.category}</p>
                  <img onClick={() => {removeProduct(item.id)}} className="remove" src={crossIcon} alt="" />
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </div>
  );
}

export default ListProduct