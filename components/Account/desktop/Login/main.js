import React, { useState, useEffect } from 'react';
import SignupTab from './SignupTab';
import LoginTab from './LoginTab.js';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
const LoginMain = ({
    onNextOTP,
    setIsWhatsapp,
    countries,
    setData,
    onForgotPassword,
    onSwitchToMain,
    customerInfo,
                       sitting,
}) => {
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const { t, i18n } = useTranslation('translation');
    useEffect(() => {
        dispatch({ type: 'RESET_AUTH_RED' });
    }, [tab]);
    return (
        <div className="w-full">
            <p className="relative z-10 pt-10 nav-tabs flex justify-center gap-x-6">
                <span
                    onClick={() => setTab(0)}
                    className={`nav-item font-[700] cursor-pointer  ${
                        tab === 0 ? 'active border-b-2 border-black' : ''
                    }`}
                >
                    {t('user.login')}
                </span>
                <span
                    onClick={() => setTab(1)}
                    className={`nav-item font-[700] cursor-pointer  ${
                        tab === 1 ? 'active border-b-2 border-black' : ''
                    }`}
                >
                    {t('user.register')}
                </span>
            </p>
            <ul className="login-register only-pc-show w-full">
                <div className={`w-full ${tab === 0 ? ' ' : 'hidden'}`}>
                    <LoginTab
                        countries={countries}
                        customerInfo={customerInfo}
                        onForgotPassword={() => onForgotPassword()}
                        onSwitchToMain={() => onSwitchToMain()}
                    />
                </div>
                <div className={`w-full ${tab === 1 ? ' ' : 'hidden'}`}>
                    <SignupTab
                        countries={countries}
                        sitting={sitting}
                        customerInfo={customerInfo}
                        onNextOTP={() => onNextOTP()}
                        setIsWhatsapp={(isWhatsapp) =>
                            setIsWhatsapp(isWhatsapp)
                        }
                        setData={(data) => setData(data)}
                    />
                </div>
            </ul>
        </div>
    );
};
export default LoginMain;
