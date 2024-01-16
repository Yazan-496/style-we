"use client";
import React, { useEffect } from "react";
import RightSideChat from "components/common/RightSideChat";
import Header from "components/Header/desktop";
import FlashSale from "components/FlashSale/desktop";
import Footer from "components/Footer/desktop";
import { useDispatch, useSelector } from "react-redux";
const FlashSaleDesktop = () => {
  const dispatch = useDispatch();
  const mainPageData = useSelector((state) => state.mainReducer.mainPageData);
  const flashSale = useSelector((state) => state.FlashSaleReducer.flashSale);
  const flashSaleProducts = useSelector(
    (state) => state.FlashSaleReducer.flashSaleProducts
  );
  const offset = useSelector((state) => state.FlashSaleReducer.offset);
  useEffect(() => {
    dispatch({
      type: "GET_FLASH_SALE_PAGINATION",
      payload: { offset },
    });
  }, [offset]);
  return (
    <div className="relative w-full lg:min-w-[1024px]">
      {/*<Annousement />*/}
      {/*<FloatingLeft />*/}
      {/*<RightSideChat />*/}
      {/* <Header collection={true} categories={mainPageData?.categories} /> */}
      <FlashSale flashSaleProducts={flashSaleProducts} />
      {/*<RelatedSearches />*/}
      {/* <Footer /> */}
      {/* <RightSideChat /> */}
      <div id="modal-root" />
    </div>
  );
};

export default FlashSaleDesktop;
