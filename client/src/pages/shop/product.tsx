import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { IProduct } from "../../models/interfaces";

interface Props {
  product: IProduct;
}

export const Product = (props: Props) => {
  const { _id, productName, description, price, stockQuantity, imageURL } = props.product;
  const { addToCart, getCartItemCount } = useContext(ShopContext);
  const cartItemCount = getCartItemCount(_id);

  return (
    <div className="product">
      <img src={imageURL} alt={productName} />
      <div className="description">
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>${price}</p>
      </div>
      <button className="addToCartBttn" onClick={() => addToCart(_id)}>
        <i className="fas fa-shopping-cart"></i> {/* Cart Icon */}
        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
      </button>
      <div className="stockQuantity">
        {stockQuantity === 0 && <h1><i className="fas fa-exclamation-circle"></i> OUT OF STOCK</h1>} {/* Out of Stock Icon */}
      </div>
    </div>
  );
};
