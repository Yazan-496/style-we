import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import Coupon from './Coupon';
import store from '../../../store';
import { useRouter } from 'next/navigation';
import { TransClient } from 'helpers/TransClient';

const ShoppingBag = ({ paymentType }) => {
    const router = useRouter();
    const { t, i18n } = useTranslation('translation');
    const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    const syncFetchCart = useSelector((state) => state?.CartReducer?.sync);
    const [updatedCart, setUpdatedCart] = useState(shippingCart);
    useEffect(() => {
        setUpdatedCart(shippingCart);
    }, [syncFetchCart, shippingCart]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.setTimeout(() => {
                router.refresh();
            }, 1000);
        }
    }, []);
    return (
        <div dir={TransClient("user.dir")} className="indexstyle-sc-7b8xmr-0 exaipq bg-white mt-3 rounded">
            <div className="indexstyle-sc-172cmbz-0 kmQwZW">
                <div className="flex justify-between items-center py-4 px-3 pay-title">
                    <div className="flex items-center pay-title-left">
                        <p className="text-uppercase text-[16px] font-medium text-[#484c52] leading-5 pay-name">
                            {t('user.shipping_bag')} {t('user.total')}
                        </p>
                    </div>
                    <div className="pay-title-right" />
                </div>
                <div className="px-3 py-4 pay-panpel-content">
                    <div className="pb-3 price-info">
                        <div className="flex flex-col w-full total-info-box">
                            <p className="flex justify-between items-center  pt-4 mb-4 total-info-item total-active">
                                <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                    {t('user.sub_total')}：
                                </span>
                                <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                    {updatedCart?.sub_total_formated}
                                </span>
                            </p>
                            <p className="flex justify-between items-center  pt-4 mb-4 total-info-item total-active">
                                <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                    {t('user.shipping_cost')} ：
                                </span>
                                <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                    {updatedCart?.total_shipping_cost_formated}
                                </span>
                            </p>
                            {/* <p className="flex justify-between items-center  pt-4 mb-4 total-info-item total-active discount-price">
                                <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                    {t('user.discount')}：
                                </span>
                                <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                    {
                                        updatedCart?.total_discount_on_product_formated
                                    }
                                </span>
                            </p> */}
                            <p className="flex justify-between items-center  pt-4 mb-4 total-info-item total-active discount-price">
                                <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                    {t('user.coupon_discount')}
                                </span>
                                <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                    {updatedCart?.coupon_discount_formated}
                                </span>
                            </p>
                            {paymentType === 'COD' && (
                                <p className="flex justify-between items-center  pt-4 mb-4 total-info-item total-active discount-price">
                                    <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                        {t('cash_on_delivery')}
                                    </span>
                                    <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                        {updatedCart?.cod_cost_formated}
                                    </span>
                                </p> )
                            }
                            {/*<p className="total-info-item discount-price">*/}
                            {/*  <span className="title">Shipping：</span>*/}
                            {/*  <span className="price notranslate">*/}
                            {/*    Calculated at next step*/}
                            {/*  </span>*/}
                            {/*</p>*/}
                            <p className="flex justify-between items-center border-t border-[hsla(0,0%,59%,.2)] pt-4 mb-4 total-info-item total-active">
                                <span className="text-[#5d626a] text-[14px] font-light leading-[17px] font-helvetica title">
                                    {t('user.total')}：
                                </span>
                                <span className="text-[#222] ml-2.5 text-[14px] font-light leading-[16px] font-helvetica price">
                                    {paymentType === 'COD'
                                        ? updatedCart?.total_cash_formated
                                        : updatedCart?.total_formated}
                                </span>
                            </p>
                        </div>
                        <div className="flex items-center justify-center h-9.5 mb-3.5 relative total-save-prcie">
                            <span
                                className="absolute inset-0 bg-center bg-contain bg-no-repeat total-save-img"
                                style={{
                                    backgroundImage:
                                        'url(/checkout-static/images/pc-save-icon.png)',
                                    backgroundColor: 'rgba(255,172,58,.05)',
                                }}
                            ></span>
                            <p className="total-save-txt">{t('user.save')} </p>
                            <p>
                                <del className="price text-red-600">
                                    {updatedCart?.total_discount_on_product}
                                </del>
                                {t('user.for_you')}
                            </p>
                        </div>
                        {/*<div className="flash-sale-checkout-tip">*/}
                        {/*  The stock of flash deals is limited, and the final discounts on*/}
                        {/*  the stock of goods actually paid shall prevail*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ShoppingBag;
