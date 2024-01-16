import Items from "./Items";
import React from "react";
import { useTranslation } from "react-i18next";

const CartCollection = ({ shippingCart, items }) => {
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="cart-collections">
      <div className="cart-collections-title">
        <div className="item-title item-Products">{t("user.products")}</div>
        <div className="item-title" />
        <div className="item-title item-Qty">{t("user.qty")}</div>
        <div className="item-title item-Total Price">
          {t("user.total_price")}
        </div>
      </div>
      {items?.length > 0 && <Items shippingCart={shippingCart} items={items} />}
    </div>
  );
};
export default CartCollection;
