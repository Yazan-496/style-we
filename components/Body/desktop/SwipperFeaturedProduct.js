import Product from "./productItem";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
const SwipperFeaturedProduct = ({ section }) => {
  const swiperOptions = {
    slidesPerView: 6,
    spaceBetween: 10,
    navigation: true,
  };
  return (
    <div className="relative">
      <div className="flashSwipper swiper2 swiper-initialized swiper-horizontal swiper-pointer-events w-full">
        <Swiper {...swiperOptions}>
          {section.map((product, index) => (
            <SwiperSlide
              style={{ border: "0.5px solid #e1d2d2", borderRadius: "8%" }}
              key={index}
            >
              <Product product={product} flashSale={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default SwipperFeaturedProduct;
