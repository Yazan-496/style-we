import React, { useCallback, useEffect, useState } from 'react';
import Image from 'helpers/image';
import { FacebookSvg, GoogleSvg, HotSearchSVG } from 'components/svgs';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowSvgUp, SvgArrowLeft, SvgLoader } from '../../../svgs';
import { PiEyeThin, PiEyeClosed } from 'react-icons/pi';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@material-ui/core/styles';

const LoginTab = ({ onForgotPassword, countries, customerInfo }) => {
    const [isLoginActive, setIsLoginActive] = useState(false);
    const [tab, setTab] = useState(0);
    const { t, i18n } = useTranslation('translation');
    const authLoading = useSelector((state) => state.AuthReducer?.authLoading);
    const verificationId = useSelector(
        (state) => state.AuthReducer?.verificationId
    );
    const useStyles = makeStyles((theme) => ({
        focused: {
            borderColor: 'gray',
        },
    }));
    const validateNumber = useSelector(
        (state) => state.AuthReducer?.validateNumber
    );
    const classes = useStyles();
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: null,
        phoneNumber: null,
        dial: null,
        password: null,
        emailOrPhone: null,
    });
    const dispatch = useDispatch();
    const [isEmail, setIsEmail] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const authToken = useSelector((state) => state.AuthReducer?.authToken);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phoneNumber') {
            isValidPhoneNumber(value);
        }
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: null,
        }));
    };

    const isValidPhoneNumber = async (number) => {
        // if (number.length > 5) {
        //     dispatch({
        //         type: 'CHECK_NUMBER',
        //         payload: { phoneNumber: `${formData?.dial}${number}` },
        //     });
        // }
        return new Promise((resolve) => {
            resolve(validateNumber);
        });
    };
    useEffect(() => {
        if (formData?.phoneNumber) {
            isValidPhoneNumber(formData?.phoneNumber);
        }
    }, [formData?.dial]);
    const validateFormData = (data) => {
        const errors = {};
        if (!data.phoneNumber && tab === 0) {
            errors.phoneNumber = t('user.phone_number_is_required');
        }
        if (!data.email && tab === 1) {
            errors.email = t('user.email_is_required');
        }
        if (!data.password) {
            errors.password = t('user.password_is_required');
        } else if (data.password.length < 8) {
            errors.password = t('user.password_should_be_at_least_8');
        }
        return errors;
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoginActive(true);


        const validationErrors = validateFormData(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            dispatch({
                type: 'LOGIN',
                payload: {
                    phoneNumber: `${formData.dial}${formData.phoneNumber}`,
                    email: formData.email,
                    password: formData.password,
                    isEmail: tab !== 0,
                },
            });
        }
    };

    useEffect(() => {
        if (authToken) {
            router.push('/');
        }
    }, [authToken]);
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
    useEffect(() => {
        if (!formData?.dial && customerInfo?.country_dial_code) {
            setFormData({
                ...formData,
                dial: customerInfo?.country_dial_code,
            });
        }
        if (!formData?.phoneNumber && customerInfo?.phone !== '0') {
            setFormData({
                ...formData,
                phoneNumber: getPhoneNumber(customerInfo?.phone),
            });
        }
        if (!formData?.email && !customerInfo?.email?.includes('@guest')) {
            setFormData({
                ...formData,
                email: customerInfo?.email,
            });
        }
    }, [customerInfo]);
    useEffect(() => {
    }, [customerInfo]);
    useEffect(() => {
    }, [countries]);
    return (
        <>
            <p className="flex gap-10 justify-center p-5">
                <span
                    onClick={() => setTab(0)}
                    className={`text-lg  font-medium cursor-pointer  ${
                        tab === 0
                            ? 'border-b-2 border-black'
                            :''
                    }`}
                >
                    {t('user.phone_number')}
                </span>
                <span
                    onClick={() => setTab(1)}
                    className={`text-lg font-medium cursor-pointer  ${
                        tab === 1
                        ?'hover:border-b-2'
                        :''
                    }`}
                >
                    {t('user.email')}
                </span>
            </p>
            <li className="w-full flex items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full">
                    <div className="p-4 flex justify-between items-center">
                        <h1 className="cursor-pointer text-lg font-semibold">
                            {/*<SvgArrowLeft />*/}
                        </h1>
                        <h1 className="text-lg font-semibold">
                            {/*{t("user.login")}*/}
                        </h1>
                        <h1 className="text-lg font-semibold"></h1>
                    </div>
                    <div className={`p-4 ${tab === 0 ? '' : 'hidden'}`}>
                        <div className="flex items-center relative">
                            <select
                                name="dial"
                                defaultValue={
                                    formData?.dial
                                }
                                onChange={handleChange}
                                className="appearance-none w-1/5 border rounded-l-md py-2 leading-tight focus:outline-none bg-gray-100"
                            >
                            {countries.map((country, i) => (
                                    country.isAccess && (
                                        <option
                                            key={country.iso}
                                            value={`+${country.phonecode}`}
                                        >
                                            +{country.phonecode}
                                        </option>
                                    )
                                ))}
                                <ArrowSvgUp className="absolute inset-y-0 right-1/5 transform rotate-180 w-5 h-5" />
                            </select>
                            <input
                                type="number"
                                autoComplete="on"
                                name="phoneNumber"
                                onChange={handleChange}
                                defaultValue={formData.phoneNumber}
                                placeholder={t("user.please_enter_your_phone_number")}
                                className="w-4/5 border rounded-r-md px-1 py-2 leading-tight focus:outline-none"
                            />
                        </div>
                        {errors.phoneNumber && (
                            <p className="my-1 w-full bg-red-200 p-1">
                                {errors.phoneNumber}
                            </p>
                        )}
                        </div>
                        <div className={`p-4 ${tab === 1 ? '' : 'hidden'}`}>
                        <div className="flex items-center">
                            <input
                                type="email"
                                autoComplete="on"
                                name="email"
                                onChange={handleChange}
                                defaultValue={formData.email}
                                placeholder={t("user.please_enter_your_email")}
                                className="w-full rounded-md border py-2 px-4 leading-tight focus:outline-none"
                                />
                                </div>
                        {errors.email && (
                            <p className="my-1 w-full bg-red-200 p-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="p-4 ">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="on"
                            name="password"
                            onChange={handleChange}
                            placeholder={t('user.password')}
                            className="w-full rounded-md border py-2 px-4 leading-tight focus:outline-none"
                        />
                        <div
                            className="absolute inset-y-1/2 right-3 transform -translate-y-1/2 cursor-pointer w-6 h-6"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <PiEyeThin size={20} />
                            ) : (
                                <PiEyeClosed size={20} />
                            )}
                        </div>
                    </div>
                    {errors.password && (
                        <p className="my-1 w-full bg-red-200 p-1">
                            {errors.password}
                        </p>
                    )}
                    </div>
                    <p
                        onClick={onForgotPassword}
                        className="cursor-pointer underline hover:font-semibold p-4"
                    >
                        {t('user.forgot_password')}
                    </p>
                    <div className="p-4">
                        <button
                            onMouseDown={() => setIsLoginActive(true)}
                            onMouseUp={() => setIsLoginActive(false)}
                            disabled={authLoading}
                            className={`w-full flex justify-center py-2 rounded-md text-lg font-semibold transition-all duration-200 ${
                                isLoginActive
                                    ? 'border-b-2 border-black'
                                    : 'hover:border-b-2'
                            } ${
                                authLoading
                                    ? 'cursor-not-allowed bg-gray-500 text-center'
                                    : 'bg-black text-white hover:opacity-80'
                            }`}
                            type="submit"
                        >
                            {authLoading ? (
                                <SvgLoader />
                            ) : (
                                t('user.login')
                            )}
                        </button>
                    </div>
                </form>
            </li>
        </>
    );
};
export default LoginTab;
