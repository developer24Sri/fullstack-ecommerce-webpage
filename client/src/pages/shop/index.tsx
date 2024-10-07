import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Product } from "./product";

import "./styles.css";
import { useGetProducts } from "../../hooks/useGetProducts";

export const ShopPage = () => {
  const [cookies, _] = useCookies(["access_token"]);

  const { products } = useGetProducts();

  if (!cookies.access_token) {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="shop">
      <div className="products">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};