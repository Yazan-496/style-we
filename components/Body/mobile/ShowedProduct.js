import CartModalDetail from "./CartModalDetail";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import image from "../../../helpers/image";

const ShowedProduct = ({ showedProduct, openShowedProduct, onClose }) => {
  const swiperOptions = {
    navigation: false,
    pagination: { clickable: true },
    slidesPerView: "auto",
    spaceBetween: 10,
  };
  return (
    <div className="h-100">
      <div
        className={`modal-overlay-showed-product ${
          openShowedProduct ? "open" : ""
        } `}
      >
        <div
          className={` modal-content-showed-product ${
            openShowedProduct ? "open" : ""
          } `}
        >
          <button
            onClick={() => onClose(false)}
            className={`sticky object-cover top-10 left-[90%] z-10 flex items-center justify-center rounded-full`}
          >
            <i className="w-7 bg-gray-200 text-white rounded-full iconfont icon-install_icon_close" />
          </button>
          <Swiper
            className="object-contain w-full h-full"
            style={{
              width: "100%",
              height: "100%",
              top: "-5px",
            }}
            {...swiperOptions}
          >
            {showedProduct?.images?.map((image, i) => {
              return (
                <SwiperSlide
                  key={i}
                  className="object-contain w-full h-full swiper-slide swiper-slide-active"
                >
                  <img
                    className="object-contain w-full h-full"
                    src={image}
                    alt={showedProduct?.name}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default ShowedProduct;
