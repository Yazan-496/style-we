import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCheckbox } from '../../svgs';
import { useTranslation } from 'react-i18next';
import Toast from '../../../helpers/Toast';
import { LoaderLogo } from '../../../helpers/Loader/Loading';
import { SwiperSlide } from 'swiper/react';
import store from '../../../store';
import { TransClient } from 'helpers/TransClient';

const PaymentType = ({ setPaymentType, shippingCart, setWalletSelected }) => {
    const { t, i18n } = useTranslation('translation');
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState({});
    const [walletBalance, setWalletBalance] = useState(0);
    const [isWalletEnough, setIsWalletEnough] = useState(false);
    const [selected, setSelected] = useState(null);
    const [selectedWallet, setSelectedWallet] = useState(false);
    const [disableOthers, setDisableOthers] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [paymentArray, setPaymentArray] = useState([]);
    const paymentTypes = useSelector(
        (state) => state.CheckoutReducer?.paymentTypes
    );
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
    const loadingInfo = useSelector((state) => state.AuthReducer.loadingInfo);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const info = JSON.parse(
                localStorage.getItem('CUSTOMER_INFO_STORAGE')
            );
            if (info?.customerInfo?.customer_info?.wallet_balance) {
                setWalletBalance(
                    info?.customerInfo?.customer_info?.wallet_balance
                );
            }
            if (info?.customerInfo) {
                setCustomerInfo(info?.customerInfo);
            }
            // setWalletBalance(10);
        }
    }, [syncInfo]);

    useEffect(() => {
        // console.log(customerInfo, 'customerInfo');
    }, [customerInfo]);
    const handleSelectType = (paymentType) => {
        if (selected === paymentType) {
            setSelected(null);
            setPaymentType(null);
        } else {
            setSelected(paymentType);
            setPaymentType(paymentType);
        }
        // console.log(paymentType);
    };
    useEffect(() => {
        if (walletBalance >= shippingCart?.total) {
            setIsWalletEnough(true);
            if (selectedWallet) {
                setDisableOthers(true);
            } else {
                setDisableOthers(false);
            }
        } else {
            setIsWalletEnough(false);
        }
    }, [isWalletEnough, selectedWallet, shippingCart]);
    useEffect(() => {
        setPaymentArray(paymentTypes);
    }, [paymentTypes]);
    useEffect(() => {
        if (isWalletEnough && selectedWallet) {
            setPaymentType('Wallet');
        } else if (!isWalletEnough && selectedWallet && selected) {
            setPaymentType(selected);
        } else {
            !selected && setPaymentType(null);
        }
    }, [isWalletEnough, selectedWallet]);

    function handleSelectWallet() {
        setSelectedWallet(!selectedWallet);
    }
    const [sitting, setSitting] = useState(null);
    useEffect(() => {
        let sit = JSON.parse(sessionStorage.getItem("SITTING"));
        if (sitting) {
            setSitting(sit)
        } else {
            sit = JSON.parse(sessionStorage.getItem("SITTING"));
            setSitting(sit)
        }
        const unsubscribe = store.subscribe(() => {
            const updatedSitting = JSON.parse(sessionStorage.getItem("SITTING"));
            if (updatedSitting) {
                setSitting(updatedSitting)
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);
    const isShowPayment = (paymentType) => {
        if (paymentType === 'COD') {
            return sitting?.sitting?.show_Cash_payment;
        }
        if (paymentType === 'Telr' && sitting?.sitting?.show_payment_using_cards) {
            return sitting?.sitting?.show_payment_using_cards;
        }
        if (paymentType === 'Wallet') {
            return sitting?.sitting?.return_money_with_wallet;
        }
        if (paymentType === 'Postpay') {
            return sitting && sitting?.sitting?.show_payment_using_post_pay;
        }
    };
    useEffect(() => {
        setWalletSelected(selectedWallet);
    }, [selectedWallet]);

    useEffect(() => {
        if (!isWalletEnough && selectedWallet && !selected) {
            setShowToast({
                show: true,
                message: t('user.wallet_balance_not'),
            });
            setTimeout(() => {
                setShowToast({ show: false, message: '' });
            }, 2000);
        }
    }, [selectedWallet]);
    return (
        <div
            dir={TransClient("user.dir")}
            id="payment__list__wrapper"
            className="indexstyle-sc-1x1njrq-0 OlrHu bg-white p-5"
        >
            <div className="indexstyle-sc-172cmbz-0 kmQwZW">
                <div className="flex justify-between items-center p-4 pay-title">
                    <div className="flex items-center pay-title-left">
                        <span className="flex items-center justify-center w-6 h-6 bg-black rounded-full text-white text-lg font-semibold mr-2 pay-panpal-step notranslate">3</span>
                        <p className="text-lg font-medium text-gray-600 uppercase pay-name">{t("user.payment_type")}</p>
                    </div>
                    <div className="pay-title-right" />
                </div>
                <div className="p-0 pt-4 pay-panpel-content">
                    <div className="pb-4 content-info-pc cursor-pointer">
                        <div className="relative text-left z-0 indexstyle-sc-1dhgsks-0 hyYLQV">
                            <div className="relative indexstylepc-xeg0r6-0 guQywE">
                                <div className="payment-radio-list cursor-pointer">
                                    {paymentArray?.length > 0 && (
                                        <>
                                            {paymentArray.map((paymentType, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${
                                                            disableOthers
                                                                ? ' opacity-50 cursor-not-allowed'
                                                                : ' cursor-pointer'
                                                        } ${
                                                            paymentType === 'Wallet'
                                                                ? ' hidden'
                                                                : ' '
                                                        } ${isShowPayment(paymentType) ? '' : ' hidden'} no-combined-payment`}
                                                    >
                                                        <label
                                                            onClick={() => handleSelectType(paymentType)}
                                                            className="flex items-center justify-between border border-gray-300 rounded p-4 mb-2 cursor-pointer"
                                                        >
                                                            <SvgCheckbox click={selected === paymentType} />
                                                            <div className="flex items-center justify-between w-full main-info">
                                                                <div className="flex items-center main-info-content w-full lg:gap-3">
                                                                    <div className="rounded h-12 flex-shrink-0 main-info-price">
                                                                        <img
                                                                            alt="creditcard"
                                                                            width="100"
                                                                            height="100"
                                                                            className="ml-2.5 object-contain h-full"
                                                                            src={
                                                                                paymentType === 'COD'
                                                                                    ? '/image/catalog/activity/cash.png'
                                                                                    : paymentType === 'Telr'
                                                                                    ? '/image/catalog/activity/Telr.jpg'
                                                                                    : paymentType === 'Postpay'
                                                                                    ? '/image/catalog/activity/postpay.jpeg'
                                                                                    : null
                                                                            }
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col justify-center main-info-title">
                                                                        <span className="text-lg leading-5 text-black first">
                                                                            {paymentType === 'Postpay'
                                                                                ? 'Postpay. Credit/Debit'
                                                                                : TransClient(`main.${paymentType}`)}
                                                                        </span>
                                                                        <span className="text-sm font-normal first">
                                                                            {paymentType === 'COD' ? t('user.discount-10'):' '}
                                                                        </span>
                                                                        <span className="text-sm first">
                                                                            {paymentType === 'Postpay'
                                                                                ? 'Buy Now Pay Later 3 Instalments'
                                                                                : null}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </label>
                                                    </div>
                                                );
                                            })}
                                            <div
                                                className={`${
                                                    walletBalance === 0
                                                        ? ' opacity-50 cursor-not-allowed'
                                                        : ' cursor-pointer'
                                                } no-combined-payment`}
                                            >
                                                <label
                                                    onClick={() => handleSelectWallet()}
                                                    className="flex items-center justify-between border border-gray-300 rounded p-4 mb-2 cursor-pointer"
                                                >
                                                    <SvgCheckbox click={selectedWallet} />
                                                    <div className="flex items-center justify-between w-full pr-7 main-info">
                                                        <div className="flex items-center main-info-content gap-3">
                                                            <div className="rounded mr-3 w-18 h-12 flex-shrink-0 main-info-price">
                                                                <img
                                                                    alt="creditcard"
                                                                    width="100"
                                                                    height="100"
                                                                    className="ml-2.5 object-contain h-full"
                                                                    src="/image/catalog/activity/Wallet.jpg"
                                                                />
                                                            </div>
                                                            <div className="text-sm main-info-title">
                                                                <span className="text-lg leading-5 text-black first">
                                                                    {t('user.wallet')}
                                                                </span>
                                                                {loadingInfo ? (
                                                                    <div className="w-full">
                                                                        <LoaderLogo
                                                                            width={'100%'}
                                                                            height={'100%'}
                                                                            viewBox={'0 0 110 15'}
                                                                            rotate={'200'}
                                                                        />
                                                                    </div>
                                                                ) : (
                                                                    <span className="text-sm font-normal first">
                                                                        (
                                                                        {t('user.wallet_balance_is')}:{' '}
                                                                        {walletBalance} AED)
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="p-5 flex items-center justify-center w-[100%]">
                {showToast?.show && (
                    <Toast message={showToast?.message} timeout={2000} />
                )}
            </div>
        </div>
    );
};
export default PaymentType;
