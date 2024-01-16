import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LoaderImage } from "helpers/Loader/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import SmallCarousel from "./SmallCarousel";
import CountFlashSale from "../../../Body/desktop/CountFlashSale";
import Image from 'helpers/image';
import { Navigation, Autoplay } from 'swiper/modules';

const BigCarousel = ({ product }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  });
  const swiperOptions = {
    slidesPerView: 1.5,
    spaceBetween: 10,
    navigation: true,
    pagination: {
      el: ".custom-pagination",
      clickable: true,
      renderBullet: (index, className) => {
        return `
          <span class="${className} shadow shadow-md w-[75px] h-[100px] flex items-center justify-center">
            <img src="${product?.images[index]}" class="" alt="Pagination Image" />
          </span>
        `;
      },
    },
  };
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const slideToIndex = (index) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.slideTo(index);
    }
  };

  useEffect(() => {
    slideToIndex(activeIndex);
  }, [activeIndex]);
  return (
    <div className="h-full flex-grow-0 flex-shrink-0 relative overflow-hidden bg-[#ffff] image-swiper_big-swiper__RGlVl w-[422px]">
      {loading ? (
        <LoaderImage />
      ) : (
        <div className="h-full flex flex-col lg:flex-row space-x-10">
          <div className="">
            <SmallCarousel
              product={product}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          </div>
          <Swiper
              modules={[Navigation]}
              navigation={true}
            ref={swiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            {...swiperOptions}
            className="h-full shadow-lg	 swiper swiper-initialized swiper-horizontal swiper-pointer-events w-full h-full swiper-backface-hidden"
          >
            {product?.images?.map((photo, i) => {
              return (
                <SwiperSlide className="shadow-lg rounded-3xl	border-x-2 border-y-2">
                  <div
                    key={i}
                    className="shadow-lg h-full swiper-slide"
                    // style={{ minHeight: "500px" }}
                  >
                    <Image
                      className="shadow-md rounded-3xl h-full w-full object-cover"
                      alt={photo}
                      // sizes="100vw"
                      src={photo}
                      layout="fill"
                      // width={300}
                      loading="eager"
                      quality={50}
                      // height={500}
                    />
                    {product?.flash_deal_details && (
                      <CountFlashSale Upper={true} pro={product} />
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
      {/* Custom pagination container */}
    </div>
  );
};
export default BigCarousel;
