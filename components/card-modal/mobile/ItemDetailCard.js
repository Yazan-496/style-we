import React, { useEffect, useState } from 'react';
import Sizes from '../../Body/mobile/Sizes';
import HTMLRenderer from '../../../helpers/HTMLRenderer';
import QTY from 'components/Body/desktop/qty';
import { useSelector } from 'react-redux';
import store from '../../../store';
const ItemDetailCard = ({
    details,
    product,
    setSelectedSize,
    selectedSize,
    setIsSizeRequired,
    isSizeRequired,
    setQtyState,
    qtyState,
    showToast,
}) => {
    const [offerPriceState, setOfferPriceState] = useState('');
    const [priceState, setPriceState] = useState('');
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
    useEffect(() => {
        // console.log(setting, 'setting');
    }, [setting]);
    useEffect(() => {
        if (product && selectedSize) {
            setOfferPriceState(selectedSize?.offer_price_formated);
            setPriceState(selectedSize?.price_formated);
        } else {
            setOfferPriceState(product?.offer_price_formatted);
            setPriceState(product?.price_formatted);
        }
    }, [product, selectedSize]);

    return (
        <div className="flex flex-col w-full min-h-[100%] relative gap-6">
            <div>
                <div className="py-5 flex items-center flex-shrink-0 flex-grow-0">
                    <h1
                        className="break-words w-full cm-goods-detail-title-1 leading-6 line-clamp-2"
                        title="Faux Denim Shirt Collar Casual Loose Denim Dress"
                    >
                        {product?.name}
                    </h1>
                </div>
                <div className="flex flex-col mt-4">
                    <div className="flex flex-col gap-2 relative">
                        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
                            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
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
                            {100 -
                                parseInt(
                                    (product?.offer_price * 100) /
                                        product?.price
                                ) >
                                0 && (
                                <div
                                    className={` relative top-0 style_discountTag__LG3NB_mobile z-5 ${getColor(
                                        product?.offer_price,
                                        product?.price
                                    )} `}
                                >
                                    <span
                                        className={`style_discountTagInner__xrve6_mobile notranslate`}
                                    >
                                        -
                                        {100 -
                                            parseInt(
                                                (product?.offer_price * 100) /
                                                    product?.price
                                            )}{' '}
                                        %
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className="empty:hidden">
                            <div className="max-w-full flex relative justify-start items-center">
                                <div className="max-w-full flex items-center"></div>
                            </div>
                            <Sizes
                                showToast={showToast}
                                product={product}
                                selectedSize={selectedSize}
                                setSelectedSize={(selectedSize) =>
                                    setSelectedSize(selectedSize)
                                }
                                setIsSizeRequired={(isSizeRequired) =>
                                    setIsSizeRequired(isSizeRequired)
                                }
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
                                        } main-info pl-[15px]`}
                                    >
                                        <div className="flex items-center justify-start space-x-2">
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
                                                <span className="text-green-400 pl-2">
                                                    Postpay. Credit/Debit
                                                </span>
                                                <span className="text-green-400">
                                                    Buy Now{' '}
                                                    {(
                                                        (parseInt(
                                                            offerPriceState
                                                        ) *
                                                            qtyState) /
                                                        3
                                                    )?.toFixed(1)}{' '}
                                                    Pay Later 3 Instalments
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
            </div>
        </div>
    );
};
export default ItemDetailCard;
