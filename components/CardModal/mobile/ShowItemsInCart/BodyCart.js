import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShowItemsInCart from "components/CardModal/mobile/ShowItemsInCart";
import AlsoLike from "./AlsoLike";
import LoadingComponent from "../../../LoadingComponent/mobile";

const BodyCart = ({ items, recentlyProduct, setPriceForFree }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const sync = useSelector((store) => store.CartReducer.sync);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
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
    <div
      className="  pb-[85px] page-identity-cart layout editing-v-1"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom))" }}
    >
      {/* {cartLoading && <LoadingComponent />} */}
      <div className="components-ajax-cart">
        {itemsInCart?.length > 0 ? (
          <ShowItemsInCart
            setPriceForFree={(priceForFree) => setPriceForFree(priceForFree)}
            items={itemsInCart}
            shippingCart={shippingCart}
          />
        ) : !itemsInCart?.length > 0 && !cartLoading ? (
          <div className="components-ajax-cart-show-now pt-[80px]">
            <i className="iconfont icon-icon_cart" />
            <div className="components-ajax-cart-show-now__empty">
              Your cart is empty
            </div>
          </div>
        ) : null}
      </div>
      {/*{recentlyProduct?.length > 0 && (*/}
      <AlsoLike recentlyProduct={recentlyProduct} itemsInCart={itemsInCart} />
      {/*)}*/}
    </div>
  );
};
export default BodyCart;
