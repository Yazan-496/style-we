import React, { useEffect, useState } from "react";
import ContactInformation from "../components/ContactInformation";
import ShippingMethod from "../components/ShippingMethod";
import PaymentType from "../components/PaymentType";
import Coupon from "../components/Coupon";
import ShoppingBag from "../components/ShoppingBag";
import { useDispatch, useSelector } from "react-redux";
import { ArrowSvgUp, SearchSVG, SvgLoader } from "../../svgs";
import { useTranslation } from "react-i18next";
import { TransClient } from "helpers/TransClient";
import { showNotification } from "helpers/API";

const Body = ({ shippingCart, itemsInCart, setConfirm }) => {
  const dispatch = useDispatch();
  const [isOpenShoppingBag, setIsOpenShoppingBag] = useState(false);
  const [paymentType, setPaymentType] = useState(null);
  const [isOpenCoupon, setIsOpenCoupon] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [orderNote, setOrderNote] = useState(null);
  const [walletSelected, setWalletSelected] = useState(false);
  useEffect(() => {
      if (paymentType && (typeof addressId == "undefined")) {
        showNotification(
          "error",
          TransClient("user.address"),
          TransClient("user.please_address"),
        )
      } 
  }, [paymentType,addressId]);
  const checkoutLoading = useSelector(
    (state) => state.CheckoutReducer?.checkoutLoading
  );
  const prevAddresses = useSelector(
    (state) => state.CheckoutReducer?.prevAddresses
  );
  const [isOpenAddress, setIsOpenAddress] = useState(true);
  const handleClickShoppingBag = () => {
    setIsOpenShoppingBag(!isOpenShoppingBag);
  };
  const handleClickCoupon = () => {
    setIsOpenCoupon(!isOpenCoupon);
  };
  const handleClickAddress = () => {
    setIsOpenAddress(!isOpenAddress);
  };
  const handleSubmit = () => {
    if (paymentType === "COD") {
      dispatch({
        type: "PLACE_ORDER",
        payload: { paymentType, orderNote, addressId, type: "COD" },
      });
    }
    if (paymentType === "Wallet") {
      dispatch({
        type: "PLACE_ORDER",
        payload: { paymentType, orderNote, addressId , type: "Wallet" },
      });
    }
    else if(paymentType === "Telr"){
      dispatch({
        type: "PLACE_ORDER",
        payload: { paymentType, orderNote, addressId, type: "Telr" },
      });
    }
    else if(paymentType === "Postpay"){
      dispatch({
        type: "PLACE_ORDER",
        payload: { paymentType, orderNote, addressId, type: "postpay" },
      });
    }
      setConfirm(true)
  };
  const { t, i18n } = useTranslation("translation");
  return (
    <section className="payment-method-info w-full flex flex-col lg:flex-row gap-5 bg-gray-50">
      <div className="hidden lg:block payment-method-info-left w-full lg:w-[50%]">
        <ContactInformation
          setAddressId={(addressId) => setAddressId(addressId)}
        />
        <ShippingMethod setOrderNote={(orderNote) => setOrderNote(orderNote)} />
        <PaymentType
          setWalletSelected={(walletSelected) => setWalletSelected(walletSelected)}
          shippingCart={shippingCart}
          setPaymentType={(paymentType) => setPaymentType(paymentType)}
        />
        <div className={`${paymentType && addressId ? "" : "hidden"} p-5`}>
          <button
            onClick={(e) => handleSubmit(e)}
            className={`
              ${
                checkoutLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full text-white  min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
            type="submit"
            disabled={checkoutLoading}
          >
            {checkoutLoading ? (
              <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                <SvgLoader />
              </p>
            ) : (
              t("user.confirm")
            )}
          </button>
        </div>
      </div>
      <div className="hidden lg:block payment-method-info-right w-full lg:w-[50%]">
        {shippingCart && shippingCart?.coupon_discount > 0 ? null : <Coupon />}
        <ShoppingBag paymentType={paymentType}/>
      </div>
      <div className="lg:hidden w-full">
      <div className="cursor-pointer flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200">
        <p
          className="flex items-center text-sm  font-[600]  justify-center"
          onClick={handleClickShoppingBag}
        >
          {!isOpenShoppingBag ? `${TransClient("user.show-order-summary")}` : `${TransClient("user.hide-order-summary")}`}
          <div>
            <ArrowSvgUp rotate={isOpenShoppingBag ? 0 : 180} />
          </div>
        </p>
        <div className="flex flex-col lg:w-[50%]">
          <div className=" w-full flex flex justify-end space-x-2">
            <span className="text-sm">{t("user.total")}:</span>
            <p className="text-sm">{shippingCart?.total_formated ? shippingCart?.total_formated : " ..."}</p>
          </div>
          <div className="w-full flex flex justify-end space-x-2">
            <span className="text-sm">
              {t("user.save")}
              {/* */}:
            </span>
            <p className="e text-sm">
              <del className="text-red-500">
                {shippingCart?.total_discount_on_product_formated || 0}
              </del>
            </p>
          </div>
        </div>
      </div>
      <div
        className={` transition-height duration-300 ${
          isOpenShoppingBag
            ? "h-auto overflow-y-auto overflow-x-hidden"
            : "h-0 overflow-hidden"
        }`}
      >
        <ShoppingBag paymentType={paymentType}/>
      </div>
      <p
        className="cursor-pointer text-xl font-[600] flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200"
        onClick={handleClickAddress}
      >
        {TransClient("user.add_address")}
        <div />
        <div>
          <ArrowSvgUp rotate={isOpenAddress ? 0 : 180} />
        </div>
      </p>
      <div
        className={` transition-height duration-300 ${
          isOpenAddress
            ? "min-h-[220px] overflow-y-auto"
            : "h-0 overflow-hidden"
        }`}
      >
        <ContactInformation
          setAddressId={(addressId) => setAddressId(addressId)}
        />

      </div>
      <ShippingMethod setOrderNote={(orderNote) => setOrderNote(orderNote)} />
      {shippingCart && shippingCart?.coupon_discount > 0 ? null : (
        <>
          <p
            className="cursor-pointer text-2xl font-[700] flex items-center justify-between bg-white p-3 border border-b-[1px] border-gray-200"
            onClick={handleClickCoupon}
          >
            Apply Coupon
            <div />
            <div>
              <ArrowSvgUp rotate={isOpenCoupon ? 0 : 180} />
            </div>
          </p>
          <div
            className={` transition-all duration-200 ${
              isOpenCoupon ? "h-[120px] opacity-1" : "h-0 opacity-0"
            }`}
          >
            {shippingCart && shippingCart?.coupon_discount > 0 ? null : <Coupon />}
          </div>
        </>
      )}
      <PaymentType
        setPaymentType={(paymentType) => setPaymentType(paymentType)}
        setWalletSelected={(walletSelected) => setWalletSelected(walletSelected)}
        shippingCart={shippingCart}
      />
      <div className={`${paymentType && addressId ? "" : "hidden"} p-5`}>
        <button
          onClick={(e) => handleSubmit(e)}
          className={`
              ${
                checkoutLoading ? "cursor-not-allowed " : " cursor-pointer"
              } w-full text-white min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide uppercase transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
          type="submit"
          disabled={checkoutLoading}
        >
          {checkoutLoading ? (
            <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
              <SvgLoader />
            </p>
          ) : (
            t("user.confirm")
          )}
        </button>
      </div>
    </div>
    </section>
  );
};
export default Body;
