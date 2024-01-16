import Image from "helpers/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "helpers/Link";
import { usePathname } from "next/navigation";
import Cookie from 'js-cookie';
import { TransClient } from "helpers/TransClient";
import CustomShoppingIcon from "components/icons/CustomShoppingIcon";
import AddToCardModal from "components/card-modal/desktop";
import { useDispatch, useSelector } from 'react-redux';
import { HeartSVG, SvgLoader } from "components/svgs";
import store from "store";
import CountFlashSale from "./CountFlashSale";
import RedeemComment from "components/common/RedeemComment";

const NewProduct = (props) => {
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
        onCLose,
        url,
        flashSale,
        imgVariantSmall,
        product
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
    let loading = useSelector((store) => store.LanguageReducer.loading);
    const AddOrRemoveHeart = useSelector(
        (store) => store.ProductReducer.AddOrRemoveHeart
    );
    const lang_code = store.getState().LanguageReducer.langCode;
    const [openModal, setOpenModal] = useState(false);
    const [loadingRedeem, setLoadingRedeem] = useState(false);
    const [showRedeem, setShowRedeem] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);
    const [timers, setTimers] = useState({});
    let [translations, setTranslations] = useState(
        store.getState().LanguageReducer.data[lang_code]
    );

    const redeemProductIds = JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
    useEffect(() => {
        if (product?.id){
            const isProductIdInRedeem = redeemProductIds.includes(product.id);
            if (isProductIdInRedeem) {
                setShowRedeem(true);
            } else {
                setShowRedeem(false)
            }
        }
    }, [product]);
    useEffect(() => {
        setTranslations(store.getState().LanguageReducer.data[lang_code]);
    }, [loading]);
    const dispatch = useDispatch();
    const handleClickCart = () => {
        setOpenModal(true);
        dispatch({
            type: 'PRODUCT_CART',
            payload: {
                id: product.id,
            },
        });
        setAddedToCart(true);
    };

    const [check, setCheck] = useState(product?.is_favourite);
    const handleRedeem = async () => {
        setLoadingRedeem(true)
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setShowRedeem(true)
        // Start Add Product ID To REDEEM_PRODUCTS
        const redeemProductIds = JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
        const isProductIdInRedeem = redeemProductIds.includes(product.id);

        if (!isProductIdInRedeem) {
            const updatedProductIds = [...redeemProductIds, product.id];
            localStorage.setItem('REDEEM_PRODUCTS_IDS', JSON.stringify(updatedProductIds));
        }
        // End Add Product ID To REDEEM_PRODUCTS
        const coupon = localStorage.getItem('COUPON');
        if(coupon) {
            dispatch({ type: "APPLY_COUPON", payload: coupon });
        }
        setLoadingRedeem(false)
    }
    function setFavorite() {
        dispatch({
            type: 'FAVORITE_PRODUCT',
            payload: { id: product?.id, isFavorite: check },
        });
        setCheck(!check);
        if(typeof refresh !== "undefined") {
            setRefresh(!refresh)
        }
    }

    useEffect(() => {
        if (product?.is_favourite || typeof product?.is_favourite === 'undefined') {
            setCheck(true);
        }
    }, [product]);
    useEffect(() => {
        // if (
        //   AddOrRemoveHeart?.filter((HeartedProduct) => {
        //     return HeartedProduct === product-details?.id;
        //   })?.length > 0
        // ) {
        //   setCheck(true);
        // } else {
        //   // if (product-details?.is_favourite) {
        //   setCheck(false);
        //   // }
        // }
    }, [AddOrRemoveHeart]);

    function getColor(offer_price, price) {
        const num = 100 - parseInt((offer_price * 100) / price);
        switch (true) {
            case 0 < num && num < 39:
                return 'bg-green-600';
            case 38 < num && num < 74:
                return 'bg-yellow-400';
            case 73 < num && num < 89:
                return 'bg-orange-600';
            case 88 < num && num < 101:
                return 'bg-red-600';
            default:
                return '';
        }
    }

    return (
        <div className={`boxShadow group relative border border-ash ${groupClass}`}>
            <div
                onClick={() => setFavorite()}
                className="absolute top-2 right-2 p-2 z-10 md:z-50 lg:z-50 flex items-center justify-center bg-gray-100 rounded-full"
            >
                <HeartSVG check={check} />
            </div>

            {100 - parseInt((product?.offer_price * 100) / product?.price) > 0 && (
                <div
                    className={`absolute z-10 left-0 style_discountTag__LG3NB z-0 text-sm rounded ${getColor(
                        product?.offer_price,
                        product?.price
                    )} `}
                >
          <span className={`style_discountTagInner__xrve6 notranslate`}>
            -{100 - parseInt((product?.offer_price * 100) / product?.price)} %
          </span>
                </div>
            )}
        <Link
            onClick={onCLose}
            href={product?.slug ? `/product/${product?.slug}` : `#`}
            className={`flex flex-col relative bg-white`}
        >
        <div className={`absolute z-10 left-[39px] ${100 - parseInt((product?.offer_price * 100) / product?.price) > 70 ? "block" : "hidden"}`}>
            <img width="20" src='/image/catalog/activity/fire.jpg' alt="fire" />
        </div>
            <div
                className={`w-full h-52 md:h-[278px] lg:h-80 3xl:h-[324px] overflow-hidden relative group ${imgClass}`}
            >
                <Image
                    src={product?.thumbnail || product?.image}
                    alt={product?.name}
                    fill
                    loading={"lazy"}
                    // objectFit="contain"
                    // sizes="(max-width: 222px) 222px"
                    className={`group-hover:transform group-hover:scale-110 transition-transform duration-300 ${imgVariantSmall ? "object-contain" : "object-cover"
                    }`}
                />
                {flashSale && <div className='absolute w-full bottom-0 left-0'><CountFlashSale pro={product} /></div>}
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
            </div>
        </Link>
    <div
        onClick={handleClickCart}
        className="z-10 top-[40%]
        sm:hidden
         hidden lg:group-hover:flex
          items-center justify-center
           h-[56px] w-auto lg:min-w-[191px]
            2xl:min-w-[220px] max-w-[calc(100%-24px)]
             px-3 absolute left-1/2 -translate-x-1/2
              cursor-pointer rounded-[50px]
               bg-[#ebebeb] undefined"
        style={{ minWidth: '118px', height: '40px' }}
    >
        <p className="text-center text-base leading-4 text-black whitespace-normal 2xl:whitespace-nowrap">
            {TransClient('main.add_to_pag')}
        </p>
    </div>
    <Link onClick={onCLose} className="flex items-center justify-center block w-full" shallow href={product?.slug ? `/product/${product?.slug}` : `#`}>
        <div className=" bg-white flex flex-row w-full text-center items-center justify-center">
            <div className=" w-full text-center">
                <div className=" flex flex-wrap component__product-price notranslate product-item with-origin">
                    <div className=" px-1 w-full flex flex-col items-center justify-center component__product-price-special">
                        <h3 className=" flex-1 text-center w-full text-sm cm-goods-list-title text-gray">
                            {product?.name}
                        </h3>
                        {showRedeem ?
                            <div className = " flex flex-row gap-1 justify-between items-center">
                                <div className=" flex flex-col w-full sm:justify-start justify-center items-center">
                                    <del
                                        className=" component__product-price-number text-red-500 text-sm"
                                        id="custom-product-item-price"
                                    >
                                        {product?.offer_price_formatted}
                                    </del>
                                    <del className=" component__product-price-origin config__origin-price text-gray-500 text-xs line-through">
                                        {product?.price_formatted}
                                    </del>
                                </div>

                            </div>
                            :
                            <div className = " flex flex-row gap-1 justify-between items-center">
                                <div className=" flex flex-col w-full sm:justify-start justify-center items-center">
                                    <div
                                        className=" component__product-price-number text-red-500 text-sm"
                                        id="custom-product-item-price"
                                    >
                                        {product?.offer_price_formatted}
                                    </div>
                                    <div className=" truncate component__product-price-origin config__origin-price text-gray-500 text-xs line-through">
                                        {product?.price_formatted}
                                    </div>
                                </div>

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </Link>
    {((showRedeem == "False" || showRedeem == false) && product?.redeem_price_formatted !== "0.00 AED" && product?.redeem_price !== 0) ?
        <div class="product-price text-center font-roboto font-bold text-16px flex gap-2 justify-center mt-2 relative z-10 bg-white w-full pt-3 pb-3">
            <a href="https://www.clearance.ae/product/classic-design-wooden-blower-metal-nozzle-with-hanging-strap-zDGf16"></a>
            <button onClick={handleRedeem} class="bg-gray-300 h-fit ring-2 ring-gray-300 btn btn-whatsapp element-center btn-gap-right inline-block font-normal text-4b566b text-center select-none border border-transparent px-1 py-10px text-0.9375rem leading-1.5 rounded transition duration-0.25s ease-in-out">
                <span class="text-black text-14px">{loadingRedeem ? <SvgLoader /> : TransClient("user.redeem")}</span>
            </button>
            <div class="h-fit bg-green-500 border-4ade7f mb-18px mr-6 px-0 rounded">{product?.redeem_discount_rate?.toFixed(0)}%</div>
        </div>
        :
        ""
    }
    {showRedeem && (product?.redeem_price !==0) && <div class=" relative z-10 bg-white w-full pt-3">
        <RedeemComment
            productName={product?.name} 
            showRedeem={showRedeem} 
            product_redeem_price={product?.redeem_price} 
            product_redeem_discount_rate_toFixed={product?.redeem_discount_rate?.toFixed(0)}
            redeemProductIds={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).length > 0 ? redeemProductIds.join(", ") : "None"}
            isProductIdInRedeem={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).includes(product.id) ? "True" : "False"}            
        />
        <div class="flex flex-column items-center justify-center">
            <div class="col-4">
                <span class="bg-gray-100 text-accent h3 font-[600] text-sm text-green-500">{product?.redeem_price_formatted}</span>
            </div>
        </div>
        <div class="col-6 flex justify-center">
            <div class="text-accent font-[600] text-accent text-green-500">
                {TransClient("user.redeem_applied")}
            </div>
        </div>
    </div>}
    <div
        onClick={() => handleClickCart()}
        className="absolute z-10 lg:hidden bottom-0 right-0 p-2 z-0 flex items-center justify-center rounded-full"
    >
        <CustomShoppingIcon className=""/>
    </div>
    {
        <AddToCardModal
            show={openModal}
            onClose={() => {
                setOpenModal(false);
                dispatch({
                    type: 'REMOVE_PRODUCT_CART',
                    payload: null,
                });
            }}
            close={openModal}
            product={product}
        />
    }
    </div>
    );
};

export default NewProduct;
