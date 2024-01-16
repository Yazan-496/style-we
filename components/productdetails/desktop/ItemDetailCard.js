import React, { useEffect, useState } from 'react';
import HTMLRenderer from 'helpers/HTMLRenderer';
import Sizes from '../../Body/desktop/Sizes';
import QTY from '../../Body/desktop/qty';
import { SvgLoader } from '../../svgs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import CountFlashSale from '../../Body/desktop/CountFlashSale';
import { useRouter } from 'next/navigation';
import store from '../../../store';
import { TransClient } from 'helpers/TransClient';
import { HeartSVG } from 'components/svgs';
import RedeemComment from 'components/common/RedeemComment';

const ItemDetailCard = ({
    details,
    product,
    loadingProvider,
    setSelectedSize,
    selectedSize,
    setIsSizeRequired,
    showToast,
    isSizeRequired,
    setQtyState,
    qtyState,
    addToCart,
}) => {
        const [check, setCheck] = useState(product?.is_favourite);
        function setFavorite() {
          dispatch({
              type: 'FAVORITE_PRODUCT',
              payload: { id: product?.id, isFavorite: check },
          });
          setCheck(!check);
        }
        const syncWishlist = useSelector(
            (state) => state?.ProductReducer?.sync
        );
        const WishListReducer = useSelector(
            (state) => state?.ProductReducer?.WishList
        );
        useEffect(() => {
            dispatch({
              type: 'GET_FAVORITE_PRODUCTS',
            });
        }, [syncWishlist]);

        useEffect(() => {
          if (product?.is_favourite || typeof product?.is_favourite === 'undefined') {
              setCheck(true);
          }
          router.refresh();
        }, []);
        useEffect(() => {
            const updatedCheck = WishListReducer.some((item) => item.id === product?.id);
            setCheck(updatedCheck);
        }, [WishListReducer, product]);
        const [addedToCart, setAddedToCart] = useState(false);
        const [loadingRedeem, setLoadingRedeem] = useState(false);
        const [isRedeem, setisRedeem] = useState(product?.redeem_price !== 0);
        const [showRedeem, setShowRedeem] = useState(false);
        const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
        const syncFetchCart = useSelector((state) => state?.CartReducer?.sync);
        const [updatedCart, setUpdatedCart] = useState(shippingCart);
        useEffect(() => {
            const isProductInCart = shippingCart?.cart?.some(item => item.product_id === product.id);
            setAddedToCart(isProductInCart);
        }, [syncFetchCart, shippingCart]);
    const productLoading = useSelector(
        (state) => state?.CartReducer?.cartLoading
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
        setisRedeem(product?.redeem_price !== 0)
    }, [product]);
    const handleAddToCart = () => {
        // Remove Product From Session Storage If Existing 
        const recentlyViewedProducts = JSON.parse(sessionStorage.getItem('RECENTLY_PRODUCT')) || [];
        const updatedProducts = recentlyViewedProducts.filter(item => item.id !== product.id);
        sessionStorage.setItem('RECENTLY_PRODUCT', JSON.stringify(updatedProducts));
        addToCart(product);
    };
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
    const router = useRouter();
    const [offerPriceState, setOfferPriceState] = useState('');
    const [priceState, setPriceState] = useState('');
    const [buy, setBuy] = useState(false);
    function handleBuy() {
        setBuy(true);
        addToCart(product);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if (product && selectedSize) {
            setOfferPriceState(selectedSize?.offer_price_formated);
            setPriceState(selectedSize?.price_formated);
        } else {
            setOfferPriceState(product?.offer_price_formatted);
            setPriceState(product?.price_formatted);
        }
    }, [product, selectedSize]);
    useEffect(() => {
        if (addedToCart && buy) {
            dispatch({ type: 'RESET_ADDED_TO_CART' });
            dispatch({ type: 'START_LOADING_PRODUCT' });
            router.push('/payment-method');
        }
    }, [buy, addedToCart]);
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
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
    const [setting, setSetting] = useState(null);
    const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
    useEffect(() => {   
        let sit = JSON.parse(sessionStorage.getItem('SITTING'));
        if (sit?.sitting) {
            setSetting(sit?.sitting);
        } else {
            sit = JSON.parse(sessionStorage.getItem('SITTING'));
            if(sit?.sitting ) {
                setSetting(sit?.sitting);
            }
        }
        const unsubscribe = store.subscribe(() => {
            const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
            if (updatedSitting?.sitting) {
                setSetting(updatedSitting?.sitting);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [syncSitting]);
    const { t, i18n } = useTranslation('translation');
    return (
        <div className="flex flex-col w-full min-h-[100%] relative gap-6">
            <RedeemComment
                productName={product?.name} 
                showRedeem={showRedeem} 
                product_redeem_price={product?.redeem_price} 
                product_redeem_discount_rate_toFixed={product?.redeem_discount_rate?.toFixed(0)}
                redeemProductIds={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).length > 0 ? redeemProductIds.join(", ") : "None"}
                isProductIdInRedeem={(JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || []).includes(product.id) ? "True" : "False"}            
            />
            <div className="h-full flex flex-col">
                <div className="relative flex justify-center p-4 w-full">
                    {product?.flash_deal_details && (
                        <CountFlashSale Upper={true} h={0} pro={product} />
                    )}
                </div>
                <div className="gap-x-2 flex items-center flex-shrink-0 flex-grow-0">
                    <h1
                        className="break-words cm-goods-detail-title-1 leading-6 line-clamp-3"
                        title="Faux Denim Shirt Collar Casual Loose Denim Dress"
                    >
                        {product?.name}
                    </h1>
                </div>
                {((showRedeem == "False" || showRedeem == false) && product?.redeem_price_formatted !== "0.00 AED" && product?.redeem_price !== 0) ? 
                    <div class="product-price text-center font-roboto font-bold text-16px flex gap-2 mt-2">
                        <a href="https://www.clearance.ae/product/classic-design-wooden-blower-metal-nozzle-with-hanging-strap-zDGf16"></a>
                        <button onClick={handleRedeem} class="bg-gray-300 ring-2 ring-gray-300 lg:h-fit btn btn-whatsapp element-center btn-gap-right inline-block font-normal text-4b566b text-center select-none border border-transparent px-5 py-10px text-0.9375rem leading-1.5 rounded transition duration-0.25s ease-in-out">
                            <span class="text-black text-14px">{loadingRedeem ? <SvgLoader /> : TransClient("user.redeem")}</span>
                        </button>
                        <div class="h-fit bg-green-500 border-4ade7f mb-18px mr-6 px-2 rounded">{product?.redeem_discount_rate?.toFixed(2)}% {TransClient("user.extra_discount")}</div>
                    </div> 
                    :
                    ""
                }
                        {showRedeem && (product?.redeem_price !==0) && <div class="mb-3">
                        <div class="col-12">
                            <span class="text-accent font-[600] text-accent text-green-500">
                                {TransClient("user.redeem_applied")}
                            </span>
                        </div>
                        <div class="row">
                            <div class="col-4">
                            <span class="bg-gray-100 text-accent h3 font-[600] text-2xl text-green-500">{product?.redeem_price_formatted}</span>
                            </div>
                        </div>
                    </div>}
                <div className="flex flex-col mt-4">
                    <div className="flex flex-col gap-2 relative">
                        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
                                {showRedeem ? 
                                    <div className="flex gap-4  ">
                                        <del
                                            className="text-red-600 font-[600] text-2xl"
                                            id="custom-product-detail-price"
                                        >
                                            {offerPriceState}
                                        </del>
                                        <del className="text-red-600 flex justify-center items-center component__product-price-origin notranslate cm-goods-detail-price">
                                            {priceState}
                                        </del>{' '}
                                    </div>
                                :
                                    <div className="flex gap-4  ">
                                        <span
                                            className="text-red-600 font-[600] text-2xl"
                                            id="custom-product-detail-price"
                                        >
                                            {offerPriceState}
                                        </span>
                                        <p className="flex justify-center items-center component__product-price-origin notranslate cm-goods-detail-price line-through">
                                            {priceState}
                                        </p>{' '}
                                    </div>
                                }
                            </div>
                            {100 -
                                parseInt(
                                    (product?.offer_price * 100) /
                                        product?.price
                                ) >
                                0 && (
                                <div
                                    className={`relative top-0 style_discountTag__LG3NB_mobile z-5 ${showRedeem && (product?.redeem_price !==0) ? "bg-green-500" : getColor(
                                        product?.offer_price,
                                        product?.price
                                    )} `}
                                >
                                    <span className={`style_discountTagInner__xrve6_mobile notranslate`}>
                                        {showRedeem && product?.redeem_price !== 0
                                            ? `-${product?.redeem_discount_rate?.toFixed(2)}%`
                                            : `-${100 - parseInt((product?.offer_price * 100) / product?.price)}%`}
                                    </span>

                                </div>
                            )}
                        </div>
                        <div className="empty:hidden">
                            <div className="max-w-full flex relative justify-start items-center">
                                <div className="max-w-full flex items-center"></div>
                            </div>
                            <Sizes
                                product={product}
                                showToast={showToast}
                                selectedSize={selectedSize}
                                setSelectedSize={(selectedSize) =>
                                    setSelectedSize(selectedSize)
                                }
                                setIsSizeRequired={(isSizeRequired) =>
                                    setIsSizeRequired(isSizeRequired)
                                }
                                isShow={true}

                            />
                            <div className="flex flex-col justify-start gap-y-2">
                                <QTY
                                    product={product}
                                    isSizeRequired={isSizeRequired}
                                    selectedSize={selectedSize}
                                    qtyState={qtyState}
                                    setQtyState={(qtyState) =>
                                        setQtyState(qtyState)
                                    }
                                />

                                {offerPriceState && (
                                    <div
                                        className={`${
                                            setting
                                                ?.show_payment_using_post_pay
                                                ? ''
                                                : 'hidden'
                                        } main-info pr-[15px]`}
                                    >
                                        <div className="flex items-start justify-start pl-[15px] space-x-2">
                                            <div className="w-40 h-15 ">
                                                <img
                                                    className="w-full h-full object-contain"
                                                    alt="creditcard"
                                                    src="/image/catalog/activity/postpay.jpeg"
                                                />
                                            </div>
                                            <div
                                                className={`flex flex-col space-x-2`}
                                            >
                                                <span className="pl-2 text-green-400">
                                                    Postpay. Credit/Debit
                                                </span>
                                                <span className="text-green-400">
                                                    Buy{' '}
                                                    {(
                                                        (parseInt(
                                                            offerPriceState
                                                        ) *
                                                            qtyState) /
                                                        3
                                                    )?.toFixed(1)}{' '}
                                                    Now Pay Later 3 Instalments
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="max-w-full flex relative justify-start items-center">
                                <div className="max-w-full flex items-center">
                                    {details && (
                                        <HTMLRenderer
                                            htmlContent={product?.details}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex relative justify-center self-stretch flex-grow-0 flex-shrink-0 gap-4 bottom-0 left-0  purchase-btn mt-2 sticky pt-2 bg-white bg-opacity-95 flex-grow items-end">
                    {product?.in_stock ? (
                    <button
                        disabled={loadingProvider}
                        onClick={handleAddToCart}
                        className="flex justify-center items-center overflow-hidden rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
                    >
                        <div className="bg-black/80 py-5 h-full flex justify-center items-center w-full rounded inline-block truncate opacity-1 group-active:opacity-90">
                            {loadingProvider ? (
                                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                    <SvgLoader />
                                </p>
                            ) : (
                                <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                                    {t('user.add_to_cart')}
                                </p>
                            )}
                        </div>
                    </button>
                         ) : (
                    <div
                        disabled={loadingProvider}
                        className="flex justify-center items-center overflow-hidden rounded disabled:opacity-80 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-12 gap-1"
                    >
                        <div className="bg-black/50 py-5 h-full flex justify-center items-center w-full rounded inline-block truncate opacity-1 group-active:opacity-90">
                            {loadingProvider ? (
                                <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                    <SvgLoader />
                                </p>
                            ) : (
                                <p className="text-white flex-grow-0 flex-shrink-0 text-lg font-bold">
                                    {t('user.out_of_stock')}
                                </p>
                            )}
                        </div>
                    </div>
                        )}
                    {product?.in_stock ? (
                    
                    <button
                        onClick={handleBuy}
                        className="flex w-[20%] justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-second border h-12 px-3"
                    >
                        <div className="inline-block truncate opacity-1 group-active:opacity-90">
                            {t('user.buy_now')}
                        </div>
                    </button>
                        ) : (
                    <div className="flex items-center justify-center m-5">
                      <HeartSVG
                        check={check}
                        onClick={setFavorite}
                        className={`cursor-pointer ${check ? 'text-red-500' : 'text-gray-400'}`}
                      />
                    </div>
                        )}
                </div>
            </div>
        </div>
    );
};
export default ItemDetailCard;
