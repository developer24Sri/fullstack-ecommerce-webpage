import React, { useContext } from "react";
import { ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext(ShopContext);
  const totalAmount = getTotalCartAmount();

  const { products } = useGetProducts();

  const navigate = useNavigate();

  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {products.map((product: IProduct) => {
          if (getCartItemCount(product._id) !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <p className="subTot">Subtotal: ${totalAmount}</p> {/* Moved subtotal above buttons */}
          <div className="button-container"> {/* Added a container for buttons */}
            <button className="continue-btn" onClick={() => navigate("/")}>Continue Shopping</button>
            <button className="checkout-btn" onClick={() => checkout(localStorage.getItem("userID"))}>Checkout</button>
          </div>
        </div>
      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};