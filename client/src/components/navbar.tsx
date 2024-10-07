import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStore, faUserCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { IShopContext, ShopContext } from "../context/shop-context";

export const Navbar = () => {
  const { availableMoney, isAuthenticated, setIsAuthenticated } =
    useContext<IShopContext>(ShopContext);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="navbar">
      <div className="navbarTitle">
        <FontAwesomeIcon icon={faStore} size="2x" />
        <h1>Vat Shop</h1>
      </div>
      <div className="navbarLinks">
        {isAuthenticated && (
          <>
            <Link to="/">
              <FontAwesomeIcon icon={faUserCircle} /> Shop
            </Link>
            <Link to="/purchased-items">
              <FontAwesomeIcon icon={faShoppingCart} /> Purchases
            </Link>
            <Link to="/checkout">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
            <Link to="/auth" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Link>
            <span className="money">${availableMoney.toFixed(2)}</span>
          </>
        )}
      </div>
    </div>
  );
};
