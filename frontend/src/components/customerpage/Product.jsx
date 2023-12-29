import React, { useContext } from "react";
import { shop_context } from "../../shop-context/ShopContext";

function Product(props) {
  const { id, title, price, img } = props.data;
  const { addToCart, cartItems } = useContext(shop_context);

  const cartItemCount = cartItems[id];

  console.log(cartItems);

  return (
    <div className="product">
      <img src={img} alt="item" />
      <div className="description">
        <p>
          <b>{title}</b>
        </p>
        <p> {price} €</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(id)}>
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
    </div>
  );
}

export default Product;
