import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const QTY = ({
    product,
    setQtyState,
    qtyState,
    selectedSize,
    isSizeRequired,
}) => {
    const handleSetQtyState = (type) => {
        if (type === 'decrease') {
            const dec = qtyState > 1 ? qtyState - 1 : qtyState;
            setQtyState(dec);
        }
        if (type === 'increase') {
            const inc =
                qtyState + 1 <=
                (isSizeRequired ? selectedSize?.qty : product?.current_stock)
                    ? qtyState + 1
                    : qtyState;
            setQtyState(inc);
        }
    };
    useEffect(() => {
        setQtyState(1);
    }, [selectedSize, product]);
    useEffect(() => {
        if (isSizeRequired) {
        }
    }, [isSizeRequired]);
    const { t, i18n } = useTranslation('translation');
    return (
        product && (
            <div
                id="components-product-options-quick-shop"
                className={`components-product-options`}
            >
                <div
                    className="components-product-options__wrap"
                    id="option-mark-size"
                >
                    <div className="components-product-options__label">
                        Quantity:
                    </div>
                    <div
                        id="components-product-options__size-wrap"
                        className="components-product-options__content swiper-container notranslate"
                    >
                        <div className="flex flex-grow-0 flex-shrink-0 relative rounded-l-[5px] h-[28px]">
                            <button
                                // disabled={Quantities[item.id] === 1}
                                onClick={(e) => handleSetQtyState('decrease')}
                                className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] cursor-pointer rounded-l-[5px] w-[32px] h-[28px]"
                            >
                                <svg
                                    viewBox="0 0 31 30"
                                    fill="#222222"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                >
                                    <path d="M23 15.938h.938v-1.876H23v1.876ZM8 14.062h-.938v1.876H8v-1.876Zm15 0H8v1.876h15v-1.876Z" />
                                </svg>
                            </button>
                            <div className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] border-x-0 overflow-hidden w-[36px]">
                                <input
                                    className="appearance-none focus:outline-none focus:ring hide-arrows text-center text-[#31353c] leading-none border-none outline-none h-full rounded-l-[5px] text-base"
                                    type="number"
                                    id="quantity"
                                    min={1}
                                    //   max={selectedSize?.qty}
                                    value={qtyState}
                                    //   onChange={(e) =>
                                    //     handleQuantityChange(e?.target?.value, item)
                                    //   } // Pass the item object to the handler
                                />
                            </div>
                            <button
                                disabled={
                                    (isSizeRequired && !selectedSize) ||
                                    (isSizeRequired === 'undefined' &&
                                        selectedSize === null)
                                }
                                onClick={(e) => handleSetQtyState('increase')}
                                className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] cursor-pointer rounded-r-[5px] w-[32px] h-[28px]"
                            >
                                <svg
                                    viewBox="0 0 31 30"
                                    fill="#222222"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={20}
                                    height={20}
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.438 7.5v-.938h-1.875V14.063H7.062v1.874H14.563V23.438h1.874V15.937H23.938v-1.874H16.437V7.5Z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
export default QTY;
