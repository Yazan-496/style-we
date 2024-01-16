import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import StarList from "./StarList";
import SizeSelectDropDown from "./SizeSelectDropDown";
import Link from "helpers/Link";
import { usePathname } from "next/navigation";
import Cookie from 'js-cookie';

const FlashSaleCard = (props) => {
    const {
        img,
        preSaleImgSticker,
        discount,
        text,
        text2,
        salePrice,
        price,
        review,
        btnText,
        groupClass,
        imgClass,
        btnClass,
        colorImg,
        actionCb,
        url,
        check,
        imgVariantSmall,
    } = props;

    const [selectSize, setSelectSize] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const path = usePathname();
    let local = process.env.NEXT_PUBLIC_LANG;
    if (typeof window !== 'undefined') {
        local = Cookie.get('lang');
    }
    const selectedImg = colorImg ? colorImg[selectedColorIndex] : img;
    const sizeSelectRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sizeSelectRef.current &&
                !sizeSelectRef.current.contains(event.target)
            ) {
                setSelectSize(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <Link
            href={ "/product/" + url}
            className={`w-[170px] boxShadow flex flex-col relative bg-white border border-ash ${groupClass}`}
        >
            <div
                className={`w-full h-52 md:h-[278px] lg:h-80 3xl:h-[324px] overflow-hidden relative group ${imgClass}`}
            >
                <Image
                    src={selectedImg}
                    alt="img"
                    fill
                    loading={"lazy"}
                    // objectFit="contain"
                    // sizes="(max-width: 222px) 222px"
                    className={`group-hover:transform group-hover:scale-110 transition-transform duration-300 ${imgVariantSmall ? "object-contain" : "object-cover"
                        }`}
                />
                {discount && (
                    <span className="absolute top-3 bg-red-400 text-white px-1 py-0.5 text-xs lg:text-sm 3xl:text-base">
                        -{discount}%
                    </span>
                )}
                {check && (
                    <span className="absolute top-1 right-1 text-center bg-black-primary/80 h-7 w-7 rounded text-white px-1 py-0.5 text-xs lg:text-sm 3xl:text-base">
                        <i className="fa-solid fa-check"></i>
                    </span>
                )}
                {preSaleImgSticker && (
                    <span className="h-10 w-8 lg:h-[52px] lg:w-[42px] absolute right-0">
                        <Image src={preSaleImgSticker} alt="" fill />
                    </span>
                )}
                {/* {process.env.NEXT_PUBLIC_MODE !== "prod" && (
            <div
              onClick={(e) => {
                e.preventDefault();
                actionCb?.();
              }}
              className={`hidden md:block group-hover:opacity-100 opacity-0 text-center py-2.5 lg:py-3.5 w-[130px] md:w-[140px] lg:w-[160px] 2xl:w-[220px] px-3 absolute left-1/2 -translate-x-1/2 bottom-12 rounded-full bg-white/90 uppercase ${btnClass}`}
            >
              {local === "en" ? " add to bag" : "أضف الى الحقيبة"}
            </div>
          )} */}
            </div>
            <div className="flex w-full flex-col justify-start items-start self-stretch flex-1 gap-1.5 py-1.5 px-1">
                <p className="line-clamp-1 text-xs lg:text-sm">{text}</p>
                <div className="flex flex-wrap justify-start items-center gap-2">
                    <span className="text-sm md:text-base xl:text-lg 3xl:text-xl text-red-400 font-bold">
                        {salePrice} AED
                    </span>
                    {price && (
                        <span className="text-xs lg:text-sm font-normal text-[#868C93] line-through ">
                            {price} AED
                        </span>
                    )}
                </div>
                {text2 && (
                    <span className="px-1 rounded-sm text-red-400 bg-[#FEF2F2] font-normal !font-[Helvetica] text-xs">
                        {text2}
                    </span>
                )}
                {colorImg && (
                    <div className="flex justify-start gap-x-1">
                        {colorImg.map((item, id) => (
                            <div
                                key={id}
                                className={`h-6 w-6 flex justify-center items-center border  rounded-full bg-white ${id === selectedColorIndex
                                        ? "border-black-primary"
                                        : "border-transparent"
                                    }`}
                                onClick={() => setSelectedColorIndex(id)}
                            >
                                <span className="h-[18px] w-[18px] rounded-full overflow-hidden relative">
                                    <Image alt="" fill src={item} />
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                {review && <StarList review={review} />}
            </div>
            {btnText && (
                <div className="relative" ref={sizeSelectRef}>
                    <div
                        onClick={() => {
                            setSelectSize(!selectSize);
                        }}
                        className="w-full text-sm ring-1 ring-ash bg-white py-1 px-2 text-gray capitalize"
                    >
                        {btnText}
                        <i className="fa-solid fa-chevron-down text-xs ml-1"></i>
                    </div>
                    {selectSize && <SizeSelectDropDown />}
                </div>
            )}
        </Link>
    );
};

export default FlashSaleCard;
