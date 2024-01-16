'use client';
import Image from 'next/image';
import Link from 'helpers/Link';
import { createRef } from 'react';
import Slider from 'react-slick';

const Banner = ({ imgArr }) => {
    const sliderRef = createRef();
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        delay: 10000,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    function handleGetUrl(item) {
        // console.log(item);
        const base_url = process.env.NEXT_PUBLIC_BASE_URL;
        let updatedUrl = item.url.replace(
            /https?:\/\/www\.clearance\.ae\/?/g,
            '/'
        );
        if (updatedUrl.includes('www.clearance.ae')) {
            updatedUrl = item.url.replace('www.clearance.ae', '/');
        }
        if (item.resource_type === 'brand') {
            updatedUrl = `/products/brands=${item.resource_id}`;
        }
        if (item.resource_type === 'flash_deals') {
            updatedUrl = `/all-flash-deals`;
        }
        if (item.resource_type === 'product') {
            updatedUrl = `/product/${item.resource_slug}`;
        }
        if (item.resource_type === 'search') {
            updatedUrl = `/products/search_text=${item.search_keyword}`;
        }
        if (item.resource_type === 'category') {
            updatedUrl = `/products/category=${item.resource_slug}`;
        }
        // updatedUrl = updatedUrl.replace("?","");
        return updatedUrl;
    }
    const previous = () => {
        sliderRef.current?.slickPrev();
    };
    const next = () => {
        sliderRef.current?.slickNext();
    };

    // ###### fetching api for banner images
    // useEffect(() => {
    //   fetch("https://staging.clearance.ae/api/v11/main-banner")
    //   .then(response=>response.json())
    //   .then(json => console.log(setBannerImgArr(json.data.main_banners)))
    // }, [])
    // console.log(imgArr);
    return (
        <section className="relative group flex items-center">
            <Slider
                swipeToSlide={true}
                className="w-screen "
                ref={sliderRef}
                {...settings}
            >
                {imgArr.map((item, i) => (
                    <Link
                        // href={
                        //     process.env.NEXT_PUBLIC_BASE_URL
                        //         ? item.url
                        //         : '/product/' + item.url
                        // }
                        href={handleGetUrl(item)}
                        key={item.id}
                        className="relative w-full bg-gray-100 aspect-[40/17] bg-center bg-no-repeat  flex justify-center items-center"
                    >
                        <Image
                            loading={i === 0 ? 'eager' : 'lazy'}
                            // sizes='(max-width: 100vw) 100vw, (max-width: 100vw) 50vw, 33vw'
                            src={item.photo}
                            alt=""
                            fill
                            className="relative z-10 object-contain"
                        />
                    </Link>
                ))}
            </Slider>
            <div className="absolute z-10 w-full justify-between flex group-hover:opacity-100 opacity-0 transition-opacity duration-300 px-3 xl:px-5">
                <button
                    type="button"
                    onClick={previous}
                    className="bg-[#ffffff88] h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 2xl:h-10 2xl:w-10 rounded-full flex justify-center items-center text-gray-800 "
                >
                    <i className="fas fa-chevron-left"></i>
                </button>
                <button
                    type="button"
                    onClick={next}
                    className="bg-[#ffffff88] h-7 w-7 md:h-8 md:w-8 lg:h-9 lg:w-9 2xl:h-10 2xl:w-10 rounded-full flex justify-center items-center text-gray-800 "
                >
                    <i className="fas fa-chevron-right"></i>
                </button>
            </div>
        </section>
    );
};

export default Banner;
