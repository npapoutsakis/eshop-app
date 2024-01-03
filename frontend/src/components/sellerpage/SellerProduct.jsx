import { FloppyDisk, PencilSimple, Trash } from "phosphor-react";
import React, { useState } from "react";
import { deleteProduct, updateProduct } from "../../api/seller";
import "./SellerProduct.css";

function SellerProduct(props) {
  const {
    id,
    img,
    title,
    price: originalPrice,
    quantity: originalQuantity,
  } = props.data;

  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(originalPrice);
  const [quantity, setQuantity] = useState(originalQuantity);

  function handleEdit() {
    setIsEditing(true);
  }

  async function handleUpdate() {
    const updatedData = {
      price: price,
      quantity: quantity,
    };

    try {
      await updateProduct(id, updatedData);
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating product", error);
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(id);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product", error);
    }
  }

  return (
    <div className="product">
      <img src={img} alt="img" />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        {!isEditing && (
          <>
            <p>Price: {price} €</p>
            <p>Quantity: {quantity}</p>
          </>
        )}
        {isEditing && (
          <>
            <p>
              Price:
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />{" "}
              €
            </p>
            <p>
              Quantity:
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </p>
          </>
        )}
      </div>
      <div className="icons-container">
        <div className="icons">
          {!isEditing ? (
            <PencilSimple size={32} className="icon" onClick={handleEdit} />
          ) : (
            <FloppyDisk
              size={32}
              className="icon update-button"
              onClick={handleUpdate}
            />
          )}

          <Trash
            size={32}
            className="icon delete-button"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default SellerProduct;
