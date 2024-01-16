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
        <button type='button' className='text-sm flex text-yellow-500 flex-row justify-start items-center gap-x-1'>
            {star.map((item, id) => (<i key={id} className={`${item}`}></i>))}
            <p className="pl-1 text-gray hover:underline">({review})</p>
        </button>);
};

export default FlashSaleCard;
