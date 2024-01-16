import SwipedCart from "../../../SwipedCart/desktop";
import React, { useEffect, useState } from "react";
import CartDropDown from "../HeaderWithSearch/cartDropDown";
import { CartSVG, SvgSearch } from "components/svgs";
import { useDispatch, useSelector } from "react-redux";
import Link from "../../../../helpers/Link";
import { useTranslation } from "react-i18next";

const RightBox = ({ openCart, title }) => {
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
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="right-box pr-10 flex items-center justify-center h-28">
      <div className=" h-28">
        <Link
          className=" h-28"
          style={{
            fontSize: 20,
            display: "flex",
            alignItems: "center",
            // lineHeight: 24,
          }}
          href="/"
        >
          {t("user.continue_shipping")}
          <svg
            stroke="#31353C"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            className="scale-x-[-1] ml-3"
            style={{ transform: "rotate(180deg)", marginLeft: 38 }}
          >
            <path d="m20 8-8 8 8 8" strokeWidth={2} />
          </svg>
        </Link>
      </div>
    </div>
  );
};
export default RightBox;
