import React, { useState } from 'react';
import "./AddProduct.css";
import uploadImg from "../../Assets/upload_area.svg";

const AddProduct = () => {
const [image, setImage] = useState(false);
const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    old_price: '',
    new_price: '',
    category: 'women',
})

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

  const handleChanges = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value });
  }

  const addData = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if(responseData.success){
        product.image = responseData.img_url;
        console.log(product);

        await fetch("http://localhost:4000/addproduct", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }).then((res) => res.json()).then((data) => {
          data.product? alert("Product added successfully"): alert("Failed")
        })
    }
  }

  return (
    <div className="add-product-cont">
      <div className="product-title">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={handleChanges}
          type="text"
          name="name"
          placeholder="Enter title"
        />
      </div>
      <div className="product-prices">
        <div className="old-price-cont">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={handleChanges}
            type="text"
            name="old_price"
            placeholder="Type here..."
          />
        </div>
        <div className="new-price-cont">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={handleChanges}
            type="text"
            name="new_price"
            placeholder="Type here..."
          />
        </div>
      </div>
      <div className="product-item-field">
        <p>Product Category</p>
        <select value={productDetails.category}
        onChange={handleChanges} name="category" className="add-product-list">
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="product-image-field">
        <label htmlFor="upload-image">
          <img src={image ? URL.createObjectURL(image) : uploadImg} alt="" />
        </label>
        <input
          onChange={handleImageChange}
          type="file"
          id="upload-image"
          name="image"
          hidden
        />
      </div>
      <button onClick={() => addData()}>Add</button>
    </div>
  );
}

export default AddProduct