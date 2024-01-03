import React from "react";
import { useCart } from "../../shop-context/CartProvider";

function Product(props) {
  const { id, title, price, img } = props.data;
  const { cart, addToCart } = useCart();

  const productInCart = cart.find((item) => item.id === id);
  const cartItemCount = productInCart ? productInCart.quantity : 0;

  function handleAddButton() {
    return addToCart(props.data);
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
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
}

export default Product;
