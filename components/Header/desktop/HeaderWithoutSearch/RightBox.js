import SwipedCart from "../../../SwipedCart/desktop";
import React, { useEffect, useState } from "react";
import CartDropDown from "../HeaderWithSearch/cartDropDown";
import { CartSVG, SvgSearch } from "components/svgs";
import { useDispatch, useSelector } from "react-redux";

const RightBox = ({ openCart }) => {
  const [itemsInCart, setItemsInCart] = useState([]);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(JSON.parse(localStorage.getItem("TOKEN_LOCAL_STORAGE"))?.token);
    }
  }, []);
  const sync = useSelector((store) => store.CartReducer.sync);
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
  return (
    <div className="right-box">
      <div className="cursor-pointer open-search mt-[5px] mr-[8px]">
        <SvgSearch />
      </div>
      <div
        className="group flex items-center relative mb-[-4px]"
        onClick={() => openCart()}
      >
        <CartSVG />
        {itemsInCart?.length > 0 && (
          <span className="absolute left-[16px] top-[-8px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate">
            {itemsInCart.length}
          </span>
        )}

        {<CartDropDown itemsInCart={itemsInCart} />}
      </div>
    </div>
  );
};
export default RightBox;
