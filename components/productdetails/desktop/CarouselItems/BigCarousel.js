import React, { useEffect, useRef, useState } from "react";
import { BannerLogo } from "helpers/Loader/Loading";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector } from "react-redux";
import CountFlashSale from "../../../Body/desktop/CountFlashSale";
import SmallCarousel from "./SmallCarousel";
import Image from "helpers/image";
import { FaSearchPlus } from 'react-icons/fa';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const BigCarousel = ({ product }) => {
    const [isLightboxOpen, setLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    });
    const productLoading = useSelector(
        (state) => state?.ProductReducer?.productLoading
    );
    const swiperOptions = {
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: true,
        pagination: { clickable: true },
        // pagination: {
        //   el: ".custom-pagination",
        //   clickable: true,
        //   renderBullet: (index, className) => {
        //     return `
        //       <span class="${className} shadow shadow-md w-[75px] h-[100px] flex items-center justify-center">
        //         <img src="${product?.images[index]}" class="" alt="Pagination Image" />
        //       </span>
        //     `;
        //   },
        // },
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
        <div className="bg-[#ffffff88] h-full w-full flex-grow-0 flex-shrink-0 relative overflow-hidden bg-[#ffff] image-swiper_big-swiper__RGlVl w-[422px]">
            <div className="flex h-full lg:flex-row lg:space-x-10">
                <div className="hidden lg:block">
                    <SmallCarousel
                        product={product}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                    />
                </div>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    ref={swiperRef}
                    pagination={{ clickable: true }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                    {...swiperOptions}
                    className=" shadow-lg border-x-2 border-y-2 swiper swiper-initialized swiper-horizontal swiper-pointer-events w-full swiper-backface-hidden"
                >
                    {product?.images?.map((photo, i) => (
                        <SwiperSlide className=" flex items-center justify-center rounded-3xl">
                            <Image
                                className={`w-full object-contain md:object-contain lg:object-contain`}
                                alt={photo}
                                src={photo}
                                loader={true}
                                layout="fill"
                                // quality={40}
                                loading={i === 0 ? "eager" : "lazy"}
                                onClick={() => {
                                    setCurrentImageIndex(i);
                                    setLightboxOpen(true);
                                }}
                            />
                        </SwiperSlide>
                    ))}
                    {product?.flash_deal_details && <CountFlashSale Upper={true} pro={product} />}
                </Swiper>
                {isLightboxOpen && (
                    <Lightbox
                        mainSrc={product?.images[currentImageIndex]}
                        nextSrc={product?.images[(currentImageIndex + 1) % product?.images.length]}
                        prevSrc={product?.images[(currentImageIndex + product?.images.length - 1) % product?.images.length]}
                        onCloseRequest={() => setLightboxOpen(false)}
                        onMovePrevRequest={() => setCurrentImageIndex((currentImageIndex + product?.images.length - 1) % product?.images.length)}
                        onMoveNextRequest={() => setCurrentImageIndex((currentImageIndex + 1) % product?.images.length)}
                    />
                )}
                <div className="absolute top-0 right-0 m-0 cursor-pointer text-gray-500 z-5 p-2 rounded">
                    <FaSearchPlus size={24} onClick={() => setLightboxOpen(true)} />
                </div>
            </div>
        </div>
    );

};
export default BigCarousel;
