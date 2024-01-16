"use client";
import React, { useEffect, useState } from "react";
import Header from "components/Header/desktop";
import Footer from "components/Footer/desktop";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import Checkout from "components/Checkout";
import RightSideChat from "components/common/RightSideChat";

const ShippingBag = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state?.ProductReducer?.loading);
  const mainPageData = useSelector((state) => state.mainReducer.mainPageData);
  const mainCategories = useSelector(
    (state) => state.mainReducer.mainPageData?.categories
  );

  useEffect(() => {
    if (!mainCategories?.length > 0) {
      dispatch({
        type: "GET_SECTIONS_SAGA",
      });
      dispatch({ type: "GET_ITEMS_CART" });
    }
  }, [mainCategories]);
  const product = useSelector((state) => state?.ProductReducer?.Product);
  return (
    <>
      <Head>
        <title>Shipping Bag</title>
      </Head>
      <div className="relative min-w-[1024px]">
        <Header checkout={true} categories={mainPageData?.categories} />
        <div className="mt-[140px]">
          <Checkout />
        </div>
        <Footer />
        {/* <RightSideChat /> */}
      </div>
      <div id="modal-root"></div>
    </>
  );
};

export default ShippingBag;
