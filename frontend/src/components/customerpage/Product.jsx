import React from "react";
import { useCart } from "../../shop-context/CartProvider";

function Product(props) {
  const { id, title, price, img } = props.data;
  const { addToCart } = useCart();

  function handleAddButton() {
    return addToCart(props);
  }

  return (
    <div className="product">
      <img src={img} alt="img" />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> {price} €</p>
      </div>
      <button className="addToCartBttn" onClick={handleAddButton}>
        {/* Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>} */}
        Add to cart
      </button>
    </div>
  );
}

export default Product;
