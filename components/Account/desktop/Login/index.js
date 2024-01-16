'use client';
import LoginMain from './main';
import React, {useEffect, useRef, useState} from 'react';
import Link from 'helpers/Link';
import OTP from './OTP';
import { useRouter } from 'next/navigation';
import ForgotPassword from './ForgotPassword';
import { useDispatch, useSelector } from 'react-redux';
import ResetPassword from './ResetPassword';
import store from '../../../../store';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from 'components/Loading';
import { TransClient } from 'helpers/TransClient';

const IndexRegister = () => {
    const [token, setToken] = useState(null);
    const [guest, setGuest] = useState(false);
    const { t, i18n } = useTranslation('translation');
    const [userData, setUserData] = useState(null);
    const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
    const orderStatus = useSelector(
        (state) => state?.CheckoutReducer?.orderStatus
    );

    function formatString(inputString) {
        const removeUnderscores = inputString.replace(/_/g, ' ');

        const formattedString = removeUnderscores
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        return formattedString;
    }

    const handleAction = (status) => {
        // if (token && !guest) {
            // router.push(`/orders-list/${status}`);
        // } else {
        //     onOpen(true);
        // }
    };
    const swiperOptions = {
        navigation: false,
        slidesPerView: 'auto',
        spaceBetween: 10
    };

    function isShow(order) {
        return order?.count_orders > 0;
    }

    useEffect(() => {
        const tok = JSON.parse(
            localStorage.getItem('TOKEN_LOCAL_STORAGE')
        );
        const customer = JSON.parse(
            localStorage.getItem('CUSTOMER_INFO_STORAGE')
        )?.customerInfo?.customer_info;
        setGuest(!(customer?.is_email_verified || customer?.is_phone_verified));
        setToken(tok?.token);
        setUserData(tok?.userData);
        const unsubscribe = store.subscribe(() => {
            const updatedInfo = JSON.parse(
                localStorage.getItem('CUSTOMER_INFO_STORAGE')
            )?.customerInfo?.customer_info;
            if (
                updatedInfo &&
                customer?.is_email_verified !== 'undefined' &&
                customer?.is_phone_verified !== 'undefined'
            ) {
                setGuest(!(customer?.is_email_verified || customer?.is_phone_verified));
            }
        });

        return () => {
            unsubscribe();
        };
    }, [syncInfo]);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
    }, [guest]);

    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
        if (typeof window !== 'undefined') {
            if (window.location?.pathname?.includes("/account/login")) {
                window.location.reload();
            }
            else {
                router.push('/account/login');
                router.refresh();
            }
        }
    }

    const authToken = useSelector((state) => state.AuthReducer?.authToken);
    const [step, setStep] = useState('Main');
    const [isResetPass, setIsResetPass] = useState(false);
    const [isWhatsapp, setIsWhatsapp] = useState(false);
    const [customerInfo, setCustomerInfo] = useState(null);
    const [sitting, setSitting] = useState(null);
    const [countries, setCountries] = useState([]);
    const [data, setData] = useState({
        email: null,
        phoneNumber: null,
        firstName: null,
        password: null,
        confirmPassword: null
    });

    // const [sitting, setSitting] = useState(null);
    // useEffect(() => {
    //   setCountries(sitting?.sitting?.countries)
    // }, [sitting]);
    useEffect(() => {
        let sit = JSON.parse(sessionStorage.getItem('SITTING'));
        if (sit?.sitting?.countries.length > 0) {
            setCountries(sit?.sitting?.countries);
            setSitting(sit?.sitting);
        } else {
            sit = JSON.parse(sessionStorage.getItem('SITTING'));
            if(sit?.sitting?.countries.length > 0 ) {
                setCountries(sit?.sitting?.countries);
                setSitting(sit?.sitting);
            }
        }
        const unsubscribe = store.subscribe(() => {
            const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
            if (updatedSitting?.sitting?.countries.length > 0) {
                setSitting(updatedSitting?.sitting);
                setCountries(updatedSitting?.sitting?.countries);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [syncSitting]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const info = JSON.parse(
                localStorage.getItem('CUSTOMER_INFO_STORAGE')
            );
            if (info?.customerInfo && info?.customerInfo.customer_info) {
                setCustomerInfo(info?.customerInfo.customer_info);
            }
        }
        const unsubscribe = store.subscribe(() => {
            const updatedInfo = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
            if (updatedInfo?.customerInfo && updatedInfo?.customerInfo.customer_info) {
                setCustomerInfo(updatedInfo?.customerInfo.customer_info);
            }
        });
        return () => {
            unsubscribe();
        };
    }, []);

    // useEffect(() => {
    //   const info = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'))
    //
    //   if (
    //     info?.customerInfo &&
    //     info?.customerInfo?.starting_setting &&
    //     info?.customerInfo?.starting_setting?.default_country_dial_code
    //   ) {
    //     const defaultDialCode = info?.customerInfo?.starting_setting?.default_country_dial_code;
    //     setCustomerInfo(defaultDialCode);
    //     setCountries(info?.customerInfo?.starting_setting?.countries);
    //   }
    //   const unsubscribe = store.subscribe(() => {
    //     const updatedInfo = JSON.parse(
    //       localStorage.getItem('CUSTOMER_INFO_STORAGE')
    //     );
    //     if (
    //       updatedInfo?.customerInfo &&
    //       updatedInfo?.customerInfo?.starting_setting &&
    //       updatedInfo?.customerInfo?.starting_setting?.default_country_dial_code
    //     ) {
    //       const defaultDialCode =
    //         updatedInfo?.customerInfo?.starting_setting?.default_country_dial_code;
    //       setCustomerInfo(defaultDialCode);
    //       setCountries(updatedInfo?.customerInfo?.starting_setting?.countries);
    //     }
    //   });
    //
    //   return () => {
    //     unsubscribe();
    //   };
    // }, []);
    useEffect(() => {
    }, [customerInfo, countries]);
    useEffect(() => {
        if (step === 'Register') {
            router.push('/');
            dispatch({ type: 'RESET_AUTH_REDUCER' });
            dispatch({ type: 'CLOSE_MODAL_MOBILE' });
            // setStep("Main");
        }
    }, [step]);
    const onNextOTP = () => {
        setStep('OTP');
    };
    const onNextRegister = () => {
        if (isResetPass) {
            setStep('resetPassword');
        } else {
            setStep('Register');
        }
    };
    const onRegister = () => {
        setStep('Register');
        setIsResetPass(false);
    };
    const onForgotPassword = () => {
        setIsResetPass(true);
        setStep('ForgotPassword');
    };

    const onSwitchToMain = () => {
        dispatch({ type: 'RESET_AUTH_REDUCER' });
        setIsResetPass(false);
        setData({
            email: null,
            phoneNumber: null,
            firstName: null,
            password: null,
            confirmPassword: null
        });
        setStep('Main');
        setIsWhatsapp(false);
    };
    useEffect(() => {
        onSwitchToMain();
    }, []);
    // const myElementRef = useRef();
    //
    // useEffect(() => {
    //     if (myElementRef.current && countries?.length > 0) {
    //         myElementRef.current.click();
    //     }
    // }, [countries]);
    return (
        <>
            {countries?.length === 0 && <Loading />}
            {countries?.length > 0 &&
                <div
                    // ref={myElementRef}
                        className='layout-container flex items-center justify-center h-full w-full lg:w-[480px] px-3 lg:px-0'>
                    {token && !guest ? (
                        <div className='  w-full'>
                            <div
                                className=' indexstyle-sc-1uk1vtd-0 gRmITN h-full hidden lg:flex items-center justify-center'>
                                {step === 'Main' && (
                                    <LoginMain
                                        onNextOTP={() => onNextOTP()}
                                        setIsWhatsapp={(isWhatsapp) => setIsWhatsapp(isWhatsapp)}
                                        onNextRegister={() => onNextRegister()}
                                        onSwitchToMain={() => onSwitchToMain()}
                                        setData={(data) => setData(data)}
                                        data={data}
                                        countries={countries}
                                        sitting={sitting}
                                        customerInfo={customerInfo}
                                        onForgotPassword={onForgotPassword}
                                    />
                                )}
                                {step === 'OTP' && (
                                    <OTP
                                        onNextRegister={() => onNextRegister()}
                                        onSwitchToMain={onSwitchToMain}
                                        data={data}
                                        isWhatsapp={isWhatsapp}
                                        customerInfo={customerInfo}
                                        isResetPass={isResetPass}
                                    />
                                )}
                                {step === 'ForgotPassword' && (
                                    <ForgotPassword
                                        countries={countries}
                                        sitting={sitting}
                                        customerInfo={customerInfo}
                                        onNextOTP={() => onNextOTP()}
                                        setIsWhatsapp={(isWhatsapp) => setIsWhatsapp(isWhatsapp)}
                                        onSwitchToMain={onSwitchToMain}
                                        setData={(data) => setData(data)}
                                    />
                                )}
                                {step === 'resetPassword' && (
                                    <ResetPassword onSwitchToMain={onSwitchToMain} data={data} />
                                )}
                            </div>
                            <div id='root' className='bg-[var(--bg-c-white-fafa)] lg:hidden w-full'>
                                <div className='account'>
                                    <div className='h-11 bg-[var(--bg-c-white-ff)] relative'>
                                        <Link href='/'>
                                            <img
                                                aria-hidden='true'
                                                src="data:image/svg+xml,%3csvg t='1627545563226' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5591' width='200' height='200'%3e%3cpath d='M781.653333 71.281778a50.289778 50.289778 0 0 0-70.599111 0L300.316444 477.866667a48.014222 48.014222 0 0 0 0 69.006222l410.737778 405.845333c19.512889 19.057778 51.143111 19.057778 70.656 0a48.014222 48.014222 0 0 0 0-69.063111L408.177778 512l373.532444-372.451556a47.786667 47.786667 0 0 0 0-68.266666z' fill='%23111111' p-id='5592'%3e%3c/path%3e%3c/svg%3e"
                                                alt='back'
                                                className='absolute w-4 h-4 left-3.75 top-3.25'
                                            />
                                        </Link>
                                        <img
                                            src="data:image/svg+xml,%3csvg t='1627477270527' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='6041' width='200' height='200'%3e%3cpath d='M278.3232 773.2736c13.7216 0 27.392 3.584 39.424 10.752l45.6704 26.88c22.4256 13.2096 36.352 37.1712 36.352 62.6176v77.1072c0 13.5168 11.3664 24.4736 25.2928 24.4736h168.448a24.9344 24.9344 0 0 0 25.344-24.4736v-75.5712c0-26.8288 15.1552-51.5072 39.4752-64.3584l46.9504-24.7808a78.1824 78.1824 0 0 1 74.24 0.8192l69.12 38.6048a26.0608 26.0608 0 0 0 34.56-8.96l84.224-141.2096a23.7056 23.7056 0 0 0 2.5088-18.5856 24.3712 24.3712 0 0 0-11.776-14.848l-67.6352-37.7856a73.1136 73.1136 0 0 1-37.9904-65.1776l1.3312-51.712c0.6656-25.4464 15.1552-49.1008 37.888-61.7984l69.12-38.5536a24.576 24.576 0 0 0 11.776-14.8992 23.7056 23.7056 0 0 0-2.56-18.5856L885.76 212.0704a25.7024 25.7024 0 0 0-34.56-8.96l-67.6864 37.7344a77.7728 77.7728 0 0 1-77.312-0.8704l-45.7216-26.88a73.216 73.216 0 0 1-36.352-62.6176V73.3184a24.9344 24.9344 0 0 0-25.2416-24.4224H430.3872a24.8832 24.8832 0 0 0-25.2928 24.4224v75.6224a73.216 73.216 0 0 1-39.424 64.3584l-46.9504 24.7808a78.336 78.336 0 0 1-74.24-0.8192L175.4112 198.656a25.8048 25.8048 0 0 0-34.6112 8.96L56.5248 348.7232a24.1664 24.1664 0 0 0 9.3184 33.4848l67.6864 37.7856c24.0128 13.4656 38.5024 38.5024 37.888 65.2288l-1.3312 51.712a73.5744 73.5744 0 0 1-37.8368 61.7984l-69.12 38.5536a24.064 24.064 0 0 0-9.216 33.4336l84.2752 141.2096c6.912 11.6224 22.528 15.6672 34.56 8.96l67.6352-37.7856c11.776-6.656 24.8832-9.8304 37.9392-9.8304M593.5616 1024H425.0624c-41.8304 0-75.8272-32.8704-75.8272-73.3696v-77.1072a24.4224 24.4224 0 0 0-12.1344-20.9408l-45.568-26.88a26.4704 26.4704 0 0 0-25.9584-0.256l-67.584 37.7344c-36.1472 20.3776-82.688 8.192-103.5776-26.8288L10.1376 695.1424a72.0384 72.0384 0 0 1 27.7504-100.1472l69.0688-38.6048a24.5248 24.5248 0 0 0 12.6464-20.6336l1.28-51.6608a24.2688 24.2688 0 0 0-12.6976-21.76l-67.584-37.888a72.192 72.192 0 0 1-27.8528-100.1472l84.3264-141.1072c20.9408-35.1232 67.2768-47.104 103.5776-26.88l69.0176 38.6048c7.68 4.1984 17.0496 4.5568 24.832 0.256l46.8992-24.7296a24.576 24.576 0 0 0 13.1584-21.504V73.3184C354.56 32.8704 388.608 0 430.3872 0h168.5504c41.8304 0 75.776 32.8704 75.776 73.3184v77.1584c0 8.4992 4.608 16.4864 12.1856 20.9408l45.568 26.8288a26.112 26.112 0 0 0 25.9072 0.3072l67.584-37.7344c36.1472-20.2752 82.7392-8.192 103.5776 26.8288l84.2752 141.1584c10.1888 16.896 12.8512 36.7616 7.5776 55.6544-5.1712 18.944-17.8176 34.7648-35.328 44.544l-69.0176 38.5536a24.576 24.576 0 0 0-12.6464 20.6848l-1.3312 51.6608a24.576 24.576 0 0 0 12.6976 21.76l67.6352 37.7344c17.5616 9.8304 30.1056 25.6 35.328 44.544 5.2736 18.944 2.56 38.7072-7.5776 55.6544l-84.224 141.2096c-20.9408 35.072-67.584 47.0528-103.5776 26.8288l-69.0688-38.5536a25.856 25.856 0 0 0-24.832-0.256l-46.848 24.7296a24.4736 24.4736 0 0 0-13.2096 21.504v75.5712c0 40.448-33.9968 73.3696-75.8272 73.3696' fill='%23111111' p-id='6042'%3e%3c/path%3e%3cpath d='M516.3008 372.8384c-79.4624 0-144.128 62.464-144.128 139.3664s64.6656 139.4176 144.128 139.4176 144.128-62.5152 144.128-139.4176c0-76.9024-64.6656-139.3664-144.128-139.3664m0 327.68c-107.3152 0-194.6624-84.48-194.6624-188.3136s87.3472-188.2624 194.6624-188.2624 194.6624 84.48 194.6624 188.2624c0 103.8336-87.3472 188.2624-194.6624 188.2624' fill='%23111111' p-id='6043'%3e%3c/path%3e%3c/svg%3e"
                                            alt='Processing'
                                            className='hidden'
                                            aria-hidden='true'
                                        />
                                    </div>
                                    <div className='bg-[var(--bg-c-white-ff)] p-5'>
                                        {token && !guest ? (
                                            <>
                                                <h1 dir={TransClient("user.dir")} className='flex items-center justify-center w-full p-5'>
                                                    {t('user.welcome')} {userData?.f_name || userData?.email}
                                                </h1>
                                                <button
                                                    onClick={handleLogout}
                                                    className='flex items-center justify-center overflow-hidden rounded-full disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-inner group bg-[#31353c] h-10 w-full text-base gap-1 px-3 py-2'
                                                >
                                                    <Link href='/account/login'>
                                                        <div className='text-white truncate group-active:opacity-90'>
                                                            {t('user.logout')}
                                                        </div>
                                                    </Link>
                                                </button>
                                            </>
                                        ) : (
                                            <button className='bg-black/50 text-white'
                                                    // onClick={() => onOpen(true)}
                                            >
                                                <div className='flex items-center justify-center w-full p-5'>
                                                    <div data-statis-click='{"ec":"acount_signin_register"}'
                                                        data-collect-click='{"event_id":"acount_signin_register"}'>
                                                        {t('header.user.signin')}/{t('header.user.register')}
                                                    </div>
                                                </div>
                                            </button>
                                        )}
                                        <div className='flex flex-row mb-3.75 mt-2.5 overflow-hidden'></div>
                                        <div className='hidden bg-black/50 text-white'>
                                            <div
                                                className='text-left leading-4 bg-[var(--c-white-fff1)] text-xs font-normal text-[var(--c-red-f522)] relative overflow-hidden truncate inline-block'>
                                                <p>{t('header.user.register_to_get_5')}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className='account__orderStatus mt-3'>
                                        <Link href={`/orders-list/all`}>
                                            <div
                                                dir={TransClient('user.dir')}
                                                // onClick={() => handleAction('all')}
                                                className='account__orderStatus__title flex justify-between text-sm px-5'
                                            >
                                                <div 
                                                className='account__orderStatus__title__left text-lg text-black'>
                                                    {t('user.my_order')}
                                                </div>
                                                <div
                                                    className='account__orderStatus__title__right'
                                                    aria-hidden='true'
                                                >
                                                    {t('main.all')}
                                                </div>
                                            </div>
                                        </Link>
                                        <Swiper className='account__orderStatus__content px-5' {...swiperOptions}>
                                            {orderStatus?.map((order) => {
                                                return (
                                                    <SwiperSlide
                                                        className={`${isShow(order) ? '' : 'hidden '} flex flex-col w-[70px] justify-center items-center`}
                                                        aria-hidden='true'
                                                    >
                                                        {/*<Link href={`/`}>*/}
                                                        <div className='title--wrapper'>
                                                            <img
                                                                src="data:image/svg+xml,%3csvg t='1627472445452' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='5347' width='200' height='200'%3e%3cpath d='M921.813333 42.666667H102.186667C45.738667 42.666667 0 88.874667 0 145.92v732.16C0 935.082667 45.738667 981.333333 102.186667 981.333333h819.626666C978.261333 981.333333 1024 935.082667 1024 878.08V145.92C1024 88.874667 978.261333 42.666667 921.813333 42.666667m0 38.826666c35.2 0 63.786667 28.885333 63.786667 64.426667v732.16c0 35.541333-28.586667 64.469333-63.786667 64.469333H102.186667A64.213333 64.213333 0 0 1 38.4 878.08V145.92c0-35.541333 28.586667-64.426667 63.786667-64.426667h819.626666' fill='%23141414' p-id='5348'%3e%3c/path%3e%3cpath d='M1024 331.690667H570.496c-28.288 0-51.242667 23.168-51.242667 51.754666v256.810667c0 28.586667 22.954667 51.754667 51.242667 51.754667H1024V331.690667z m-38.4 38.826666v282.709334h-415.104a12.928 12.928 0 0 1-12.842667-12.970667V383.445333c0-7.125333 5.76-12.970667 12.842667-12.970666H985.6z' fill='%23141414' p-id='5349'%3e%3c/path%3e%3cpath d='M749.013333 512c0 26.453333-21.205333 47.914667-47.445333 47.914667-26.154667 0-47.36-21.461333-47.36-47.914667s21.205333-47.914667 47.36-47.914667c26.24 0 47.445333 21.461333 47.445333 47.914667' fill='%23141414' p-id='5350'%3e%3c/path%3e%3c/svg%3e"
                                                                alt='unpaid'
                                                            />
                                                        </div>
                                                        <Link href={`/orders-list/all`}>
                                                        <span
                                                            // onClick={() => handleAction('all')}
                                                            className='w-full break-words text-center'
                                                        >
                                                            {TransClient(`main.${order?.status}`)}
                                                        </span>
                                                        </Link>
                                                        {/*</Link>*/}
                                                        <span
                                                            className='absolute right-0 z-[9999] top-[0] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate'>
                {order.count_orders}
                    </span>
                                                    </SwiperSlide>
                                                );
                                            })}
                                        </Swiper>
                                    </div>
                                    <div 
                                    dir={TransClient('user.dir')}
                                    className='account__orderStatus mt-3'>
                                        <Link href={`/orders-list/address`}>
                                        <div
                                            // onClick={() => handleAction('address')}
                                            className='account__orderStatus__title flex justify-between text-sm px-5 flex justify-between text-sm px-5'>
                                            <div className='account__orderStatus__title__left text-lg text-black'>
                                                {t('user.my_address')}
                                            </div>
                                            <div
                                                className='account__orderStatus__title__right'
                                                aria-hidden='true'
                                            >
                                                {t('main.all')}
                                            </div>
                                        </div>
                                        </Link>
                                    </div>
                                </div>
                                <div 
                                dir={TransClient('user.dir')}
                                className='account-more-service px-5 my-3'>
                                    <div className='more-service-title'>{t('user.more_services')}</div>
                                    <div className='service-items-wrapper my-3'>
                                        <div className='service-items flex justify-between my-1' aria-hidden='true'>
                                            <Link href={`/orders-list/account`}>
                                            <div
                                                // onClick={() => handleAction('account')}
                                                className='service-item-left flex justify-between gap-3'>
                                                <img
                                                    width='16'
                                                    height='16'
                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABYZJREFUaEPtWVtsVFUUXXsehU6xnfaeKSCR0oICtdSPgq9o1Ghi/FDUBMUQEwRR8ENRCf4QP0xIfIsanxEBo0bxETVoiDGBKGIk+NNCC00fSvygvftOB2kHaOfebfY401xKW9oR2k7S8zOTnLPPXus89l77XEKeN8pz/JgkMN47eNYOVFdXFySTycB4gxrOfyQS8RobG3uzY9IEjDE3i8g2IpozkcFnsYnIn0T0EDPvJcuyFhLRHwAK8wG8D2NSRBaTMeZjACsAdBPRahFpmchEiGieiGwFMA3AJ0rgOIDpALYw85MTGXwWm2VZW4joCQAdSsAFoBd3HTO/mw8EjDFrAbwDwFMCkgH9KDO/nycEHgHwnmKdJDAeO2aMGXQHdnqe91w8Hj88HqBG4jMajVaEw+GlnufdT0TXDzxC2Tm+J6L1tm1PmHBaXFxcNmXKlFc8z1tBRGE/Wb0DnwGYCWAxgEim8wQRLbdte7d/sEyvLUpOk6dEUDaSFRtsTJDgnOim12Z01Pdk+3sqF60JEFKFbQ3bBtqUl5fXuq67i4gu0z4RSQE4SETHAKT6tVBZWVkxET1GRM9msvJp13Vv6+rq+rXfUVXNOoDezhV8vx1hbVFrQzqKnK5aeLmLULP+j8CtoLZGBZZusVhMk9a+TJ7ScP9mIBB4vrOzsyM75hw5bYypE5EfiUhX+bjrugu6urpOpJ3Nq5nredguSPfl2CTeF8DKaMuh1vSKoi58qqp3u65spP3QKgIUqLagMWY/gKsBnAFwHzN/N9DpoPWAMeYWAD9lEty4ZGhfslLMa5k5vWMjIqCDLMvaSkSrVCN5njcrHo//k+OS52Kmd/MIgCsA7GPmG4eaZMiKzLKsBUTUlN5mkZWO4+zIBUkuNpZlLSGiAxnfdzuO8+2oCahBZhXmA9jKzA/nAiYXG8uyNhLRC3rtmLlUf3Ml8BGAB0XkN8dx0omjp+rKJUEhnTSn5hLiRW2HDvqNT1XUViLQ5xW2N/014PgeYOZrhnM0bFFvjHkZwNMAmpl5frJy0TIh7MwJuc+IhJZF2uu/TC9IxcKZCAbbIORFwmcqqLmZjTEabe4EsIuZ9XfINiwBn+5uYubq7qraWwmiyS2UKwkC+oi82wtbD+/RORKzF5WGQ2iCwI0U9C6go0dPxmKxr0XkHgC7mfmOnAkYYz7X+AvgZ2a+KeuwIORekiuB3lTwZPRYQ5ffXubMmYpQSKilReO93j0NmSrY6pn5qv9D4G8As0TkDcdxtAIak2ZZliqCtwC4qVTKJBKJxKgvcWlp6Q3BYPAXNdTtdBznmzFB/18O6g/hWqfbtv3hqAkYY34AoOevg5lnA+h/ixkLIpZl7Sei6wAcyRyjQf0PeoljsZi+TnyQWf1nHMd5cSxA+31YlrWUiLK7/hIzbxwMw2Bi7gER2aG6W0QaHMepA9CXvsDzauaGPNpGGJGclgDo96lt9WtINdsQTcVcT1XfRwGIyumVPjGnR+krIrpXTYlok23bmwdO00/AGKP1gMb85ZlBncFg8NqOjo72rFHP6OW0uKEz5cXNzTwUAb+cJrgVEZ+cLikpKQ2Hw3sB1Gbs94jIZsdxNAR7aWIZuTADQInPierzu5j56FnhTguaImwgeOfNxDp7EHSgsK3h0/Mdv57KmtWBQCBV2Fp/jt4qLy+f7nneFwD8gk6LIY2QKf+rhPo5qSFTiwbbtrvP53gM+7U2eBzABgCX+v36CbzKzJsAnBpDYKN1VWCMUU22LpNgJ9+FRruCF2T8UO9Cefu0mPePu+nndRF53XGc9Rdkjy/yJAOf1/P7A0eef2Kqy/+PfL7jStFotCQSieRcLl7ko5+ePplMphKJhL4UpgXi5Jf6sVj14XxM7sB478C/gxZQy20eX58AAAAASUVORK5CYII='
                                                    alt='Processing' />
                                                <div className='service-item-info'>{t('user.my_profile')}</div>
                                            </div>
                                            </Link>
                                            <div onClick={handleAction}
                                                className='service-item-right flex justify-center items-center'>
                                                <img
                                                    width='12'
                                                    height='12'
                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYlJREFUSEu11ctKw0AUBuAz0HjZpc/kpVbXWbSrrgoiiqAWFUUQr1QFURF9gPN3Y2sVRHwS36ObppsjUyYQai4zpc0qIZP/y8yZi6IpXyotv1arzQ0Ggwsi+mXm13H/IxWoVqslEfk2wacATsZBUoEgCGY8z/sSkQUTfA7gyBVJBXRQEATzhULhg4gWTfAVgAMXJBOIIV0iWjLBTQANWyQX0EG64P1+v6uUWjbBdwB2bBArIELCMHwnopIJvgewnYdYAzGkQ0Qr+lkp9cjMm1mIE6CDyuXybLFY7IhIWT+LyHOr1drQt0mQMxBD2iKyakJfAKwnIWMBEeL7/hsRrRmkAaA52otJArsAbicC6Dr4vt8mouEQKaWeTLH/1cG5B6bI8fF/ALCVNpOcgNEZRES5a8EaSAi3Ws1WgN4qwjCML7AbZt7LW8XD+uQ1Sgi/Zub9vO+i95mACY/vP5cADm3DM3tQr9e9Xq/3GW1uSqkzZj52Cc8EKpWK3v9/TODkj8ypH/quQ5HW/g/Un6QZxRTF+AAAAABJRU5ErkJggg=='
                                                    alt='Processing' />
                                            </div>
                                        </div>
                                        <div
                                            className='hidden service-items service-items-last service-items-contact flex justify-between'
                                            aria-hidden='true'
                                        >
                                            <div className='service-item-left flex gap-3'>
                                                <img
                                                    width='16'
                                                    height='16'
                                                    src='data:image/png;base64,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'
                                                    alt='Processing' />
                                                <div className='service-item-info'>{t('user.wishlist')}</div>
                                            </div>
                                            <div className='service-item-right'>
                                                <img
                                                    width='12'
                                                    height='12'
                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYlJREFUSEu11ctKw0AUBuAz0HjZpc/kpVbXWbSrrgoiiqAWFUUQr1QFURF9gPN3Y2sVRHwS36ObppsjUyYQai4zpc0qIZP/y8yZi6IpXyotv1arzQ0Ggwsi+mXm13H/IxWoVqslEfk2wacATsZBUoEgCGY8z/sSkQUTfA7gyBVJBXRQEATzhULhg4gWTfAVgAMXJBOIIV0iWjLBTQANWyQX0EG64P1+v6uUWjbBdwB2bBArIELCMHwnopIJvgewnYdYAzGkQ0Qr+lkp9cjMm1mIE6CDyuXybLFY7IhIWT+LyHOr1drQt0mQMxBD2iKyakJfAKwnIWMBEeL7/hsRrRmkAaA52otJArsAbicC6Dr4vt8mouEQKaWeTLH/1cG5B6bI8fF/ALCVNpOcgNEZRES5a8EaSAi3Ws1WgN4qwjCML7AbZt7LW8XD+uQ1Sgi/Zub9vO+i95mACY/vP5cADm3DM3tQr9e9Xq/3GW1uSqkzZj52Cc8EKpWK3v9/TODkj8ypH/quQ5HW/g/Un6QZxRTF+AAAAABJRU5ErkJggg=='
                                                    alt='Processing' />
                                            </div>
                                        </div>
                                        <div
                                            className='hidden service-items service-items-last service-items-contact'
                                            aria-hidden='true'
                                        >
                                            <div className='service-item-left'>
                                                <img
                                                    width='16'
                                                    height='16'
                                                    src="data:image/svg+xml,%3c%3fxml version='1.0' standalone='no'%3f%3e%3c!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3e%3csvg t='1634179905513' class='icon' viewBox='0 0 1088 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='4577' xmlns:xlink='http://www.w3.org/1999/xlink' width='212.5' height='200'%3e%3cdefs%3e%3cstyle type='text/css'%3e%3c/style%3e%3c/defs%3e%3cpath d='M515.392 979.392H141.952A78.08 78.08 0 0 1 64 901.376V78.08C64 35.072 98.944 0 141.952 0h701.184c43.008 0 78.08 35.072 78.08 78.08v362.88a25.984 25.984 0 1 1-52.032 0V78.08a25.984 25.984 0 0 0-26.048-26.048H141.952a26.048 26.048 0 0 0-25.984 26.048v823.296c0 14.336 11.648 26.048 25.984 26.048h373.44a25.984 25.984 0 0 1 0 51.968' fill='%23111111' p-id='4578'%3e%3c/path%3e%3cpath d='M750.72 269.632H235.072a26.048 26.048 0 0 1 0-52.096h515.648a25.984 25.984 0 0 1 0 52.096M590.976 508.416h-355.84a26.048 26.048 0 0 1 0-52.032h355.84a26.048 26.048 0 0 1 0 52.032M466.048 755.776h-231.04a26.048 26.048 0 0 1 0-52.096h231.04a26.048 26.048 0 0 1 0 52.096' fill='%23111111' p-id='4579'%3e%3c/path%3e%3cpath d='M620.608 744.64c0-88.96 72.32-161.28 161.344-161.28 88.96 0 161.28 72.32 161.28 161.28 0 88.96-72.32 161.28-161.28 161.28-88.96 0-161.28-72.32-161.28-161.28m427.648 234.88l-101.376-101.312a211.264 211.264 0 0 0 48.32-133.568 213.568 213.568 0 0 0-213.312-213.312 213.568 213.568 0 0 0-213.312 213.312 213.632 213.632 0 0 0 213.312 213.312 211.2 211.2 0 0 0 127.744-43.52l101.824 101.952a26.112 26.112 0 0 0 36.8 0 26.112 26.112 0 0 0 0-36.8' fill='%23F5222D' p-id='4580'%3e%3c/path%3e%3c/svg%3e"
                                                    alt='Processing' />

                                                <Link href={`/orders-list/all`}>
                                                    <div
                                                        // onClick={() => handleAction('all')}
                                                        className='service-item-info'>
                                                    {t('user.wishlist')}
                                                </div>
                                                </Link>
                                            </div>
                                            <div className='service-item-right'>
                                                <img
                                                    width='12'
                                                    height='12'
                                                    src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYlJREFUSEu11ctKw0AUBuAz0HjZpc/kpVbXWbSrrgoiiqAWFUUQr1QFURF9gPN3Y2sVRHwS36ObppsjUyYQai4zpc0qIZP/y8yZi6IpXyotv1arzQ0Ggwsi+mXm13H/IxWoVqslEfk2wacATsZBUoEgCGY8z/sSkQUTfA7gyBVJBXRQEATzhULhg4gWTfAVgAMXJBOIIV0iWjLBTQANWyQX0EG64P1+v6uUWjbBdwB2bBArIELCMHwnopIJvgewnYdYAzGkQ0Qr+lkp9cjMm1mIE6CDyuXybLFY7IhIWT+LyHOr1drQt0mQMxBD2iKyakJfAKwnIWMBEeL7/hsRrRmkAaA52otJArsAbicC6Dr4vt8mouEQKaWeTLH/1cG5B6bI8fF/ALCVNpOcgNEZRES5a8EaSAi3Ws1WgN4qwjCML7AbZt7LW8XD+uQ1Sgi/Zub9vO+i95mACY/vP5cADm3DM3tQr9e9Xq/3GW1uSqkzZj52Cc8EKpWK3v9/TODkj8ypH/quQ5HW/g/Un6QZxRTF+AAAAABJRU5ErkJggg=='
                                                    alt='Processing' />
                                            </div>
                                        </div>
                                        <a>
                                            <Link href={`/orders-list/wish-list`}>
                                            <div
                                                // onClick={() => handleAction('wish-list')}
                                                className='service-items service-items-last flex justify-between my-1'
                                                aria-hidden='true'
                                            >
                                                <div className='service-item-left flex gap-3'>
                                                    <img
                                                        width='16'
                                                        height='16'
                                                        src='data:image/png;base64,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'
                                                        alt='Processing' />
                                                    <div className='service-item-info'>{t('user.wishlist')}</div>
                                                </div>
                                                <div className='service-item-right'>
                                                    <img
                                                        width='12'
                                                        height='12'
                                                        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAYlJREFUSEu11ctKw0AUBuAz0HjZpc/kpVbXWbSrrgoiiqAWFUUQr1QFURF9gPN3Y2sVRHwS36ObppsjUyYQai4zpc0qIZP/y8yZi6IpXyotv1arzQ0Ggwsi+mXm13H/IxWoVqslEfk2wacATsZBUoEgCGY8z/sSkQUTfA7gyBVJBXRQEATzhULhg4gWTfAVgAMXJBOIIV0iWjLBTQANWyQX0EG64P1+v6uUWjbBdwB2bBArIELCMHwnopIJvgewnYdYAzGkQ0Qr+lkp9cjMm1mIE6CDyuXybLFY7IhIWT+LyHOr1drQt0mQMxBD2iKyakJfAKwnIWMBEeL7/hsRrRmkAaA52otJArsAbicC6Dr4vt8mouEQKaWeTLH/1cG5B6bI8fF/ALCVNpOcgNEZRES5a8EaSAi3Ws1WgN4qwjCML7AbZt7LW8XD+uQ1Sgi/Zub9vO+i95mACY/vP5cADm3DM3tQr9e9Xq/3GW1uSqkzZj52Cc8EKpWK3v9/TODkj8ypH/quQ5HW/g/Un6QZxRTF+AAAAABJRU5ErkJggg=='
                                                        alt='Processing' />
                                                </div>
                                            </div>
                                            </Link>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className=' indexstyle-sc-1uk1vtd-0 gRmITN h-full flex items-center justify-center'>
                            {step === 'Main' && (
                                <LoginMain
                                    onNextOTP={() => onNextOTP()}
                                    setIsWhatsapp={(isWhatsapp) => setIsWhatsapp(isWhatsapp)}
                                    onNextRegister={() => onNextRegister()}
                                    onSwitchToMain={() => onSwitchToMain()}
                                    setData={(data) => setData(data)}
                                    data={data}
                                    sitting={sitting}
                                    countries={countries}
                                    customerInfo={customerInfo}
                                    onForgotPassword={onForgotPassword}
                                />
                            )}
                            {step === 'OTP' && (
                                <OTP
                                    onNextRegister={() => onNextRegister()}
                                    onSwitchToMain={onSwitchToMain}
                                    data={data}
                                    isWhatsapp={isWhatsapp}
                                    customerInfo={customerInfo}
                                    isResetPass={isResetPass}
                                />
                            )}
                            {step === 'ForgotPassword' && (
                                <ForgotPassword
                                    countries={countries}
                                    sitting={sitting}
                                    customerInfo={customerInfo}
                                    onNextOTP={() => onNextOTP()}
                                    setIsWhatsapp={(isWhatsapp) => setIsWhatsapp(isWhatsapp)}
                                    onSwitchToMain={onSwitchToMain}
                                    setData={(data) => setData(data)}
                                />
                            )}
                            {step === 'resetPassword' && (
                                <ResetPassword onSwitchToMain={onSwitchToMain} data={data} />
                            )}
                        </div>
                    )}
                </div>
            }
        </>

    );
};
export default IndexRegister;
