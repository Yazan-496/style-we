import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ArrowSvgUp,
    SvgArrow,
    SvgArrowLeft,
    SvgCheckbox,
    SvgLoader,
    WhatsappSvg,
} from '../../../svgs';
import { RiMessage2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import store from '../../../../store';

const ForgotPassword = ({
    onNextOTP,
    onSwitchToMain,
    setData,
    setIsWhatsapp,
    countries,
    sitting
}) => {
    const { t, i18n } = useTranslation('translation');
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const validateNumberFound = useSelector(
        (state) => state.AuthReducer?.validateNumberFound
    );
    const validateEmail = useSelector(
        (state) => state.AuthReducer?.validateEmail
    );
    const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
    const verificationId = useSelector(
        (state) => state.AuthReducer?.verificationId
    );
    const [formData, setFormData] = useState({
        emailOrPhone: null,
        phoneNumber: null,
        email: null,
        dial: null,
        isEmail: false,
    });
    const [errors, setErrors] = useState({});
    const [isWhatsappSMS, setIsWhatsappSMS] = useState({
        isWhatsapp: 1,
        isSMS: 1,
    });

    const checkIfWhatsappOrSMS = (phoneCode) => {
        const country = countries.find(
            (item) => item.phonecode === parseInt(phoneCode.replace('+', ''))
        );
        if (country) {
            setIsWhatsappSMS({
                isWhatsapp: country.otp_by_whatsapp,
                isSMS: country.otp_by_sms,
            });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'dial') {
            checkIfWhatsappOrSMS(value);
            setFormData({
                ...formData,
                [e.target.name]: value,
            });
            setErrors({
                ...errors,
                [name]: null,
            });
            const selectedCountry = countries.find(country => `+${country.phonecode}` === value);
            if (selectedCountry) {
                setShowWhatsappButton(selectedCountry.otp_by_whatsapp === 1);
                setShowSMSButton(selectedCountry.otp_by_sms === 1);
            }
        }
        if (name === 'phoneNumber') {
            isValidPhoneNumber(value);
        }
        // if (name === 'email') {
        //     isValidEmail(value);
        // }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
    };
    const validateInput = (value) => {
        if (/^[+\d\s_-]+$/.test(value)) {
            const formattedValue = value.replace(/[+\s_-]/g, '');

            setFormData((prevFormData) => ({
                ...prevFormData,
                phoneNumber: formattedValue,
                email: '',
                isEmail: false,
            }));
        } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: value,
                phoneNumber: '',
                isEmail: true,
            }));

            // isValidEmail(value);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                email: '',
                phoneNumber: '',
                isEmail: null,
            }));
        }
    };

    const handleSubmit = async (e, whatsapp, email) => {
        const validationErrors = validateFormData(formData);
        setIsWhatsapp(whatsapp);
        e.preventDefault();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // if (validateNumberFound || validateEmail) {
            dispatch({
                type: 'SEND_OTP',
                payload: {
                    phoneNumber: `${formData.dial}${formData.phoneNumber}`,
                    whatsapp: whatsapp,
                    isEmail: tab !== 0,
                    email: formData.email,
                }
            });
        // if (Object.keys(validationErrors).length > 0) {
        //     setErrors(validationErrors);
        // } else {
        //     if (validateNumberFound || validateEmail) {
        //         dispatch({
        //             type: 'SEND_OTP',
        //             payload: {
        //                 phoneNumber: `${formData.dial}${formData.phoneNumber}`,
        //                 whatsapp: whatsapp,
        //                 isEmail: tab !== 0,
        //                 email: formData.email,
        //             },
        //         });
        //     } else if (!validateNumberFound) {
        //         dispatch({ type: 'INVALIDATE_NUMBER' });
        //         setErrors({
        //             ...errors,
        //             phoneNumber: 'Phone Number Already Exists',
        //         });
        //     } else if (!validateEmail) {
        //         dispatch({ type: 'INVALIDATE_EMAIL' });
        //         setErrors({ ...errors, email: 'Email Already Exists' });
        //     }
        }
    };

    const validateFormData = (data) => {
        const errors = {};

        if (!data.phoneNumber && tab === 0) {
            errors.phoneNumber = t('user.phone_number_is_required');
        }
        if (!data.email && tab === 1) {
            errors.email = t('user.email_is_required');
        }
        return errors;
    };

    // const isValidEmail = async (email) => {
    //     if (email) {
    //         dispatch({
    //             type: 'CHECK_EMAIL',
    //             payload: { email: email },
    //         });
    //     }
    //     return new Promise((resolve) => {
    //         resolve(validateEmail);
    //     });
    // };
    const isValidPhoneNumber = async (number) => {
        // if (number.length > 5) {
        //     dispatch({
        //         type: 'CHECK_NUMBER',
        //         payload: { phoneNumber: `${formData?.dial}${number}` },
        //     });
        // }
        return new Promise((resolve) => {
            resolve(validateNumberFound);
        });
    };

    useEffect(() => {
        if (formData?.phoneNumber) {
            isValidPhoneNumber(formData?.phoneNumber);
        }
    }, [formData?.dial]);
    useEffect(() => {
        if (verificationId) {
            setData(formData);
            onNextOTP();
        }
    }, [verificationId]);
    const getPhoneNumber = useCallback(
        (phone) => {
            const formattedPhoneNumber = phone?.startsWith('00')
                ? phone?.substring(2)
                : phone;
            const phoneCodeToSearch = formattedPhoneNumber?.substring(0, 3);

            const foundCountry = countries.find(
                (country) => country?.phonecode === parseInt(phoneCodeToSearch)
            );
            const phoneNumberWithoutCode = formattedPhoneNumber?.replace(
                foundCountry?.phonecode,
                ''
            );
            setFormData({
                ...formData,
                dial: foundCountry?.phonecode,
            });
            return phoneNumberWithoutCode;
        },
        [countries]
    );
    const [customerInfo, setCustomerInfo] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const info = JSON.parse(
                localStorage.getItem('CUSTOMER_INFO_STORAGE')
            );
            if (info?.customerInfo && info?.customerInfo.customer_info) {
                setCustomerInfo(info?.customerInfo.customer_info);
            }
            if (info?.customerInfo && info?.customerInfo.customer_info) {
                setCustomerInfo(info?.customerInfo.customer_info);
            }
        }
    }, []);
    useEffect(() => {
        setFormData({
            ...formData,
            dial: customerInfo?.country_dial_code,
            email: !customerInfo?.email?.includes('@guest')
                ? customerInfo?.email
                : null,
            phoneNumber:
                customerInfo?.phone !== '0'
                    ? getPhoneNumber(customerInfo?.phone)
                    : null,
        });
    }, [customerInfo]);
    const [showSMSButton, setShowSMSButton] = useState(countries[0]?.otp_by_sms == 1);
    const [showWhatsappButton, setShowWhatsappButton] = useState(countries[0]?.otp_by_whatsapp === 1);
    return (
        <>
            <li className="w-[90%] flex items-center justify-center">
                <form
                    className="indexstyle-sc-1dc6l7e-0 hIdWHO"
                    onSubmit={(e) => handleSubmit(e, false, false)}
                >
                    <div className="p-4 register-header flex flex-row items-center justify-between">
                        <h1
                            onClick={onSwitchToMain}
                            className="cursor-pointer register-title font-[600] text-lg"
                        >
                            <SvgArrowLeft />
                        </h1>
                        <h1 className="register-title font-[600] text-lg">
                            {t('user.forgot_password')}
                        </h1>
                        <h2></h2>
                    </div>
                    <p className="flex gap-x-10 justify-center p-5">
                        <span
                            onClick={() => setTab(0)}
                            className={`text-lg  font-[500] cursor-pointer  ${
                                tab === 0
                                    ? 'active border border-l-0 border-r-0 border-t-0 border-b-[1px] border-b-[#000]'
                                    : ''
                            }`}
                        >
                            {t('user.phone_number')}
                        </span>
                        {/* <span
                            onClick={() => setTab(1)}
                            className={`text-lg font-[500] cursor-pointer  ${
                                tab === 1
                                    ? 'active border border-l-0 border-r-0 border-t-0 border-b-[1px] border-b-[#000]'
                                    : ''
                            }`}
                        >
                            {t('user.email')}
                        </span> */}
                    </p>
                    <div className={` ${tab === 0 ? ' ' : 'hidden'} p-4`}>
                        <label
                            id="phoneNumber"
                            className={` indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-first`}
                        >
                            <div className="flex items-center">
                                <select
                                    name="dial"
                                    // value={formData?.dial}
                                    defaultValue={
                                        formData?.dial ||
                                        (countries.length > 0 && countries[0]?.phonecode)
                                    }
                                    onChange={handleChange}
                                    className="appearance-none h-full bg-gray-50 border-r-0 w-[20%] border border-gray-300 rounded-l rounded-r-none py-2 leading-tight focus:outline-none"
                                >
                                    {countries.map((country, i) => {
                                        return (
                                            country.isAccess && (
                                                <option
                                                    defaultChecked={i === 0}
                                                    key={country.iso}
                                                    value={
                                                        '+' + country.phonecode
                                                    }
                                                >
                                                    +{country.phonecode}
                                                </option>
                                            )
                                        );
                                    })}
                                </select>
                                <div className="absolute inset-y-0 right-[80%] flex items-center pointer-events-none">
                                    <ArrowSvgUp rotate={180} />
                                </div>
                                <input
                                    type="number"
                                    autoComplete="on"
                                    name="phoneNumber"
                                    onChange={handleChange}
                                    defaultValue={formData.phoneNumber}
                                    value={formData.phoneNumber}
                                    placeholder="Enter your phone number"
                                    className="w-[80%] rounded-r rounded-l-none border border-l-0 border-gray-300 py-2 px-4 leading-tight focus:outline-none"
                                />
                            </div>
                            {/* Display any errors related to the phone number input */}
                            {errors.phoneNumber && (
                                <small className=" w-full bg-red-200">
                                    {errors.phoneNumber}
                                </small>
                            )}
                        </label>
                    </div>
                    <div className={` ${tab === 1 ? ' ' : 'hidden'} p-4`}>
                        <label
                            id="email"
                            className={` indexstyle-sc-1p4nwz9-0 fSxngv flex flex-col w-full iIBTwB-first`}
                        >
                            <div className="flex items-center relative">
                                <input
                                    type="email"
                                    autoComplete="on"
                                    name="email"
                                    onChange={handleChange}
                                    defaultValue={formData.email}
                                    // value={formData.email}
                                    placeholder="Enter your Email"
                                    className="w-[100%] rounded-r rounded-l-none border border-gray-300 py-2 px-4 leading-tight focus:outline-none"
                                />
                            </div>
                            {/* Display any errors related to the phone number input */}
                            {errors.email && (
                                <small className="w-full bg-red-200">
                                    {errors.email}
                                </small>
                            )}
                        </label>
                    </div>
                    {tab === 1 ? (
                        <div className="p-2">
                            <button
                                onClick={(e) => handleSubmit(e, false, true)}
                                className={`
              ${
                  authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
              } w-full min-h-[48px] hover:opacity-[0.8] text-white transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[9px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
                                type="submit"
                                disabled={
                                    authLoading ||
                                    (!formData.email && tab === 0)
                                }
                            >
                                {authLoading ? (
                                    <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                        <SvgLoader />
                                    </p>
                                ) : (
                                    t('user.send_otp_via_email')
                                )}
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="p-2">
                                <button
                                    className={`text-white ${
                                        showWhatsappButton
                                            ? ''
                                            : 'hidden '
                                    }
      ${
          authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
      } gap-2 flex items-center justify-center text-white w-full min-h-[48px] hover:opacity-[0.8] transition-opacity tracking-wide transition-duration-1000 leading-5 pr-[9px] font-[600] flex items-center justify-center text-lg p-2 bg-green-500 text-[var(--c-gray-rgb255255)] rounded
    `}
                                    type="submit"
                                    disabled={
                                        authLoading ||
                                        (!formData.phoneNumber && tab === 1)
                                    }
                                    onClick={(e) =>
                                        handleSubmit(e, true, false)
                                    }
                                >
                                    <WhatsappSvg />
                                    {authLoading ? (
                                        <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                            <SvgLoader />
                                        </p>
                                    ) : (
                                        t('user.send_otp_via_whatsapp')
                                    )}
                                    <p className="w-6 flex-grow-0 flex-shrink-0 text-lg font-bold"></p>
                                </button>
                            </div>
                            <div className="p-2">
                                <button
                                    disabled={
                                        authLoading ||
                                        (!formData.phoneNumber && tab === 1)
                                    }
                                    onClick={(e) =>
                                        handleSubmit(e, false, false)
                                    }
                                    className={`text-white ${
                                        showSMSButton ? '' : 'hidden '
                                    }
              ${
                  authLoading ? 'cursor-not-allowed ' : ' cursor-pointer'
              } w-full min-h-[48px] hover:opacity-[0.8] text-white gap-x-2 transition-opacity tracking-wide transition-duration-1000 leading-4 pr-[40px] font-[600] flex items-center justify-center text-lg p-4 bg-[rgb(49,53,60)] text-[var(--c-gray-rgb255255)]
            `}
                                    type="submit"
                                >
                                    <p className="">
                                        <RiMessage2Line size={30} />
                                    </p>
                                    {false ? (
                                        <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                            <SvgLoader />
                                        </p>
                                    ) : (
                                        t('user.send_otp_via_phone_number')
                                    )}
                                </button>
                            </div>
                        </>
                    )}
                </form>
            </li>
        </>
    );
};
export default ForgotPassword;
