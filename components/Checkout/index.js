import Header from "./Header";
import Body from "./Body";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartSmall from "./CartSmall";
import LoadingComponent from "../LoadingComponent/mobile";

const Checkout = () => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const cartLoading = useSelector((store) => store.CartReducer.cartLoading);
  const sync = useSelector((store) => store.CartReducer.sync);
  const dispatch = useDispatch();
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
    }
  }, []);
  useEffect(() => {
    if (token) {
      dispatch({ type: "GET_ITEMS_CART" });
    }
  }, [token, sync]);
  useEffect(() => {
    // console.log(token, "token");
  }, [token]);
  useEffect(() => {
    if (shippingCart) {
      setItemsInCart(shippingCart?.cart);
    }
  }, [shippingCart, dispatch]);
  useEffect(() => {
    if (cartLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [cartLoading, dispatch]);
  return (
    <div className="layout-container">
      <div className="indexstyle-sc-188xtxu-0 hqtAzk my-cart-wrapper w-full  bg-gray-50">
        <Header />
        {/* {cartLoading && <LoadingComponent />} */}
        <div className="flex w-full items-center justify-center space-x-10">
          <Body shippingCart={shippingCart} itemsInCart={itemsInCart} />
          <CartSmall shippingCart={shippingCart} itemsInCart={itemsInCart} />
        </div>
      </div>
    </div>
  );
};
export default Checkout;
