import Image from "next/legacy/image";
import Product from "./productItem";
import React, { useEffect, useRef, useState } from "react";
import EndsIn from "./endsIn";
import { Swiper, SwiperSlide } from "swiper/react";
import { useTranslation } from "react-i18next";
const Products = ({
  section,
  setProduct,
  setOpenCartModal,
  setCloseCartModal,
}) => {
  const swiperOptions = {
    navigation: true,
    slidesPerView: "auto",
    spaceBetween: 10,
  };
  useEffect(() => {
    const style = document.createElement("style");
    style.innerText = `
      .swiper-button-next:after {
        background-color: transparent;
        color: #585555;
        font-weight: bold;
        width: 15px;
        height: 15px;
      }
      .swiper-button-prev:after {
        background-color: transparent;
        color: #585555;
        font-weight: bold;
        width: 15px;
        height: 15px;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      <p className="pt-4 flex-grow-0 flex-shrink-0 text-[18px] leading-[1.5] font-bold text-center text-[#31353c]">
        {t("main.featured_product")}
      </p>

      <div className="product-list" data-id="570">
        <div className=" relative style_productSwiper__G7kVx">
          <Swiper
            // onSwiper={handleInjectStyles}
            className="flashSwipper swiper5 swiper-initialized swiper-horizontal swiper-pointer-events w-full"
            {...swiperOptions}
          >
            {section?.map((product, index) => {
              return (
                <SwiperSlide
                  key={index}
                  className="swiper-container swiper-container-initialized swiper-container-horizontal"
                  style={{
                    border: "0.5px solid #e1d2d2",
                    borderRadius: "8%",
                    width: "180.333px",
                    marginRight: 0,
                  }}
                >
                  <Product
                    product={product}
                    setProduct={(product) => setProduct(product)}
                    flashSale={false}
                    setOpenCartModal={() => setOpenCartModal(true)}
                    setCloseCartModal={() => setCloseCartModal(false)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Products;
