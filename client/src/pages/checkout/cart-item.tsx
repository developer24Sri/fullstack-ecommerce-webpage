import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces";


interface Props {
  data: IProduct;
}

export const CartItem = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } =
    props.data;
  const { getCartItemCount, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);

  const cartItemCount = getCartItemCount(_id);
  return (
    <div className="cartItem">
      <img src={imageURL} />
      <div className="description">
        <p>
          <b>{productName}</b>
        </p>
        <p> Price: ${price}</p>
        <div className="countHandler">
          <button className="decBtn" onClick={() => removeFromCart(_id)}> - </button>
           <span className="item-count">{cartItemCount}</span>
          <button  className="incBtn" onClick={() => addToCart(_id)}> + </button>
        </div>
      </div>
    </div>
  );
};