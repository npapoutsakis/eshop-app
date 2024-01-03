import { PencilSimple, Trash } from "phosphor-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../api/seller";
import "./SellerProduct.css";

function SellerProduct(props) {
  const navigate = useNavigate();
  const { id, img, title, price, quantity } = props.data;

  function handleEdit() {
    navigate("/seller/myproducts/edit");
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
        <p>Price: {price} €</p>
        <p>Quantity: {quantity}</p>
      </div>
      <div className="icons-container">
        <div className="icons">
          <PencilSimple size={32} className="icon" onClick={handleEdit} />
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
