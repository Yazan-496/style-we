import Header from "./Header";
import Body from "./Body";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComponent/mobile";

const PaymentMethodBody = ({setConfirm}) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    const sync = useSelector((state) => state?.CartReducer?.sync);
    const [updatedCart, setUpdatedCart] = useState(shippingCart);
    useEffect(() => {
        setUpdatedCart(shippingCart);
    }, [sync, shippingCart]);
  const cartLoading = useSelector((store) => store.CartReducer.cartLoading);
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
    if (updatedCart) {
      setItemsInCart(updatedCart?.cart);
    }
  }, [updatedCart, dispatch]);
  useEffect(() => {
    if (cartLoading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [cartLoading, dispatch]);
  return (
    <div className="layout-container">
      <div className="bg-white lg:mx-auto my-8 lg:px-24 bg-gray-50 w-full">
        {/* <Header /> */}
        {/* {cartLoading && <LoadingComponent />} */}
        <div className="flex w-full items-center justify-center space-x-10">
          <Body setConfirm={() => setConfirm(true)} shippingCart={updatedCart} itemsInCart={itemsInCart} />
        </div>
      </div>
    </div>
  );
};
export default PaymentMethodBody;
