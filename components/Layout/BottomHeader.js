'use client';
import { Popover } from '@headlessui/react';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import { Swiper, SwiperSlide } from 'swiper/react';
import React, { createRef, useState } from 'react';
import SubCategory from 'components/common/SubCategory';
import { useEffect } from 'react';
import Slider from 'react-slick';

const BottomHeader = ({ bottomHeaderArr }) => {
    const [subCategories, setSubCategories] = useState([]);
    const [index, setIndex] = useState(0);
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
    }, []);
    const sliderRef = createRef();
    const settings = {
        dots: false,
        infinite: false,
        autoplay: false,
        slidesToShow: 8,
        slidesToScroll: 4,
        variableWidth: true
    };
    return (
        <div className="sm:hidden border-b relative lg:flex flex-row items-center justify-center text-[#000000] font-bold uppercase w-screen lg:gap-x-4 xl:gap-x-5 2xl:gap-x-8 3xl:gap-x-10 text-[13px] xl:text-sm 2xl:text-base 3xl:text-lg">
            <div className="md:text-center lg:text-center">
                <Swiper
                    spaceBetween={30}
                    loop={false}
                    slidesPerView={8}
                    {...settings}
                    className='categorySlider peer flex'
                >
                    {/*<Slider*/}
                    {/*    className="w-screen"*/}
                    {/*    ref={sliderRef}*/}
                    {/*    {...settings}*/}
                    {/*>*/}
                    {bottomHeaderArr.map((item, id) => (
                        <SwiperSlide className='w-fit px-3 mr-0' key={id}>
                            <Link
                                href={`/products/category=${item?.slug}&page=1`}
                                onMouseEnter={() => {
                                    if (isDesktop) {
                                        setSubCategories(item.sub_category);
                                        setIndex(id);
                                    }
                                }}
                                className="hover-link py-4 w-max"
                            >
                                {item?.name}
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {subCategories.length ? (
                    <div className="absolute top-full border-t peer-hover:visible hover:visible invisible flex transition-all flex-row justify-center items-start gap-x-10 pt-10 pb-[52px] z-40 bg-white w-screen">
                        {subCategories.map((item, i) => (
                            <SubCategory
                                key={item.id}
                                heading={item.name}
                                itemArr={item.childes}
                                slug={item?.slug}
                                categorySlug={bottomHeaderArr[index]}
                                headingClass="!text-sm !capitalize !mb-4"
                            />
                        ))}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default BottomHeader;
