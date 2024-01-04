// AddProduct.jsx

import React, { useState } from "react";
import { addProduct } from "../../api/seller";
import "./AddProduct.css";

function AddProduct() {
  const [formData, setFormData] = useState({
    title: "",
    img: null,
    imgURL: "",
    price: "",
    quantity: "",
    user_product: localStorage.getItem("username"),
  });

  function handleInputChange(e) {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        img: file,
        imgURL: URL.createObjectURL(file),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  async function handleSubmit() {
    try {
      // i have to reform the data for the api
      const newDataForm = formData;
      newDataForm.img = newDataForm.imgURL;

      delete newDataForm.imgURL;

      await addProduct(formData);
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }

  return (
    <div className="add-product-container">
      <h2 className="form-heading">Add Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="img" className="form-label">
            Image:
          </label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleInputChange}
            className="form-input"
          />
          <span>Or</span>
          <label htmlFor="imgURL" className="form-label">
            Image URL:
          </label>
          <input
            type="text"
            id="imgURL"
            name="imgURL"
            value={formData.imgURL}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        {formData.img && (
          <div className="form-group">
            <img
              src={formData.imgURL}
              alt="Product Preview"
              className="image-preview"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="price" className="form-label">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity" className="form-label">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">
            Add Product!
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
