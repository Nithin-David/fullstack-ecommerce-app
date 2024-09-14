import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};

  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }

  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [all_products, setAllProducts] = useState([]);

useEffect(() => {
      fetch("http://localhost:4000/getallproducts")
      .then(res => res.json())
      .then(data => setAllProducts(data));

         if (localStorage.getItem("auth-token")) {
           fetch("http://localhost:4000/getcart", {
             method: "POST",
             headers: {
               Applicaton: "application/form-data",
               "auth-token": `${localStorage.getItem("auth-token")}`,
               "Content-Type": "application/json",
             },
             body: "",
           })
             .then((res) => res.json())
             .then((data) => setCartItems(data));
         } 
},[]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if(localStorage.getItem("auth-token")){
      fetch("http://localhost:4000/addtocart",{
        method: "POST",
        headers: {
          Applicaton: 'application/form-data',
          'auth-token': `${localStorage.getItem("auth-token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({itemId: itemId})
      })
      .then(res => res.json())
      .then(data => alert(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removecart", {
        method: "POST",
        headers: {
          Applicaton: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((res) => res.json())
        .then((data) => alert(data));
    }
  };

  const getAllTotal = () => {
    let total = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(itemId)
        );
        total += itemInfo.new_price * cartItems[itemId];
      }
    }
    return total;
  };

  const getTotalCartItems = () => {
    let count = 0;
    for (let itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        count += cartItems[itemId];
      }
    }
    return count;
  }

  const contextValue = {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getAllTotal,
    getTotalCartItems
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
