import Link from "../../helpers/Link";
import { useTranslation } from "react-i18next";
import Coupon from '../PaymentMethod/components/Coupon'
import React from "react";

const CartSmall = ({ itemsInCart, shippingCart }) => {
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="indexstyle-n710l9-0 bhCSmU cart-settlement-panel">
      <p className="title">
        {t("user.shipping_bag")} {t("user.total")}
      </p>
      {shippingCart && shippingCart?.coupon_discount > 0 ? null : <Coupon />}
      <div className="price-list">
        <div className="sub-total-list">
          <p className="item">
            <span className="price-title">{t("user.sub_total")}</span>
            <span className="price-value notranslate">
              {shippingCart?.sub_total_formated}
            </span>
          </p>
          <p className="item">
            <span className="price-title">{t("user.discount")}</span>
            <span className="price-value reduce-price notranslate">
              {shippingCart?.total_discount_on_product_formated}
            </span>
          </p>
          <p className="item">
            <span className="price-title">{t("user.discountt")}{" "}{t("user.couponn")}</span>
            <span className="price-value reduce-price notranslate">
              {shippingCart?.coupon_discount_formated}
            </span>
          </p>
          <p className="item">
            <span className="price-title">{t("user.shipping_cost")}</span>
            <span className="price-value reduce-price notranslate">
              {shippingCart?.total_shipping_cost_formated}
            </span>
          </p>
          {/*<p className="item">*/}
          {/*  <span className="price-title">{t("user.shipping")}</span>*/}
          {/*  <span className="price-value reduce-price">*/}
          {/*    {t("user.calculated")}*/}
          {/*  </span>*/}
          {/*</p>*/}
        </div>
        <p className="total">
          <span className="price-title">{t("user.total")}</span>
          <span className="price-value notranslate">
            {shippingCart?.total_formated}
          </span>
        </p>
      </div>
      <Link href="/payment-method">
        <button
          className="indexstyle-sc-147lzxr-0 iiKxiz proceed-to-checkout-btn"
          title=""
        >
          <div className="children-container">{t("user.proceed_to")}</div>
        </button>
      </Link>
      <div className="discount-tip">* {t("user.final_dis")}</div>
      <div className="hidden footer-supported-cart">
        <div className="support-cart">
          <h2 className="title">{t("user.we_accept")}</h2>
          <div className="flex flex-wrap">
            {" "}
            <img
              alt=""
              src="/image/catalog/activity/EpzeDfnhOHEuSiwe5JGSMn7AOr4PACWfCOPvdpnK.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/CjIOTU4lgSOTAkB1Jz1CvCND3UuBgQjwgpa72o1S.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/3llFxQSNx01654495076.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/s4AQRk7keQg1PL8z6basUcXfrWo3FTTPLoADK8zQ.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/CFSmeEi9CnuQj0Nzawwx34UBJ0IauGezE0eMPbbE.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/r61jbmFv4GzJKO727HLVoERwMj2aaINIrVxPT8hK.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/93RkKE4erOeFWUc5TY53fWwC7uqDfMnN9ctUbykO.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/LYx30ZWHHSFHucQXFeKSs4gigEAQ5diX4WgKaijH.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/GY54JpUUeoNdwJthb4lwKhOmM0BGPArBRnMuqBBt.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/piNgPFlwRlzU4JcvZMDlFnwzFIY0Q8PTxiYSpz4V.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/gdLex5oTmknitDOXUOQvsCdjnvTll5scxGpx8wtJ.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/KIqJG9rrNkRv9WRAskg0RBvx6bgvYrBnUnQFy1dA.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/pwXd4iPx4g1632295698.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/xT6RMPbWhH2clTid3SNr4Yp6J1IwyV6wdojuoSmW.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/zfKDmyJxOgirIoJovUj4qLfkfQT971n8KnmbDeHA.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/6L7bY270lVu3Zb9vskw8syBidYD2wSw6fAFxhzBK.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/oZNipW5me9354Uv8FZJ0ugLaOUFAtvY8tUEEEiph.png"
            />
            <img
              alt=""
              src="/image/catalog/activity/o7WntEy9UAhmILksY3i6e4TxAov2Ly06JhwNS5Rm.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartSmall;
