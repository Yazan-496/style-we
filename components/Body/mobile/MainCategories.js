import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { store } from "store";
import { Swiper, SwiperSlide } from "swiper/react";
import Product from "./productItem";
import Link from "../../../helpers/Link";
import { useTranslation } from "react-i18next";
const MainCategories = ({
  section,
  setProduct,
  setOpenCartModal,
  setCloseCartModal,
}) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  useEffect(() => {
    // console.log(section, "section");
  }, [section]);
  const swiperOptions = {
    slidesPerView: "auto",
    spaceBetween: 10,
    navigation: true,
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
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
    }
  }, []);
  const { t, i18n } = useTranslation("translation");
  return (
    <>
      {section?.map((oneCategory, index) => {
        return (
          <div
            key={index}
            className="px-[20px] mx-auto w-full flex flex-col"
            data-id="534"
          >
            <div className="flex justify-between items-center">
              <p className="w-[25%]" />
              <p
                style={{ paddingTop: "20px" }}
                className="flex-grow-0 flex-shrink-0 text-[18px] leading-[1.5] font-bold text-center text-[#31353c]"
              >
                {oneCategory.category}
              </p>
              <Link href={`/products/category=${oneCategory.slug}`}>
                <p
                  style={{ paddingTop: "20px" }}
                  className="flex items-center justify-center flex-grow-0 flex-shrink-0 text-[14px] leading-[1.5] font-[600]text-center text-[#31353c]"
                >
                  {t("main.view_more")}
                  <svg
                    stroke="#31353C"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    className="scale-x-[-1] ml-3"
                  >
                    <path d="m20 8-8 8 8 8" strokeWidth="2"></path>
                  </svg>
                </p>
              </Link>
            </div>
            <div className="flashSwipper swiper2 swiper-initialized swiper-horizontal swiper-pointer-events w-full">
              <Swiper {...swiperOptions}>
                {oneCategory?.products.map((product, index) => (
                  <SwiperSlide
                    style={{
                      border: "0.5px solid #e1d2d2",
                      borderRadius: "8%",
                      width: "180.333px",
                      minWidth: "170.333px",
                      marginRight: 0,
                    }}
                    key={index}
                  >
                    <Product
                      product={product}
                      setProduct={(product) => setProduct(product)}
                      flashSale={false}
                      setOpenCartModal={() => setOpenCartModal(true)}
                      setCloseCartModal={() => setCloseCartModal(false)}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MainCategories;
