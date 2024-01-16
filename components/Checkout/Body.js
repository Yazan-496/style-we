import Offer from "../CardModal/mobile/ShowItemsInCart/Offer";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCollections from "./CartCollections";
import CartSmall from "./CartSmall";
import { useTranslation } from "react-i18next";

const Body = ({ shippingCart, itemsInCart }) => {
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="cart-page-left-part-content pt-[24px]">
      <div className="free-shipping-block clickable">
        <Offer items={shippingCart} />
      </div>
      <div className="cart-page-title">{t("user.shipping_bag")}</div>
      {itemsInCart?.length < 0 ? (
        <img alt="" src="/image/catalog/activity/cart-loading.png" />
      ) : (
        <CartCollections shippingCart={shippingCart} items={itemsInCart} />
      )}
    </div>
  );
};
export default Body;
