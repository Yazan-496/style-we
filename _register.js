'use client';

import cookieCutter from 'cookie-cutter';
import {useDispatch, useSelector} from 'react-redux';
import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import store from './store';
import API from './helpers/API';
import Cookies from 'js-cookie';
import {fetchShippingCart, startCartLoading, stopCartLoading} from './store/actions/cart';

const Register = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [startingSitting, setStartingSitting] = useState(null)
    const [deviceId, setDeviceId] = useState(null);
    const [done, setDone] = useState(false);
    const [userInfo, setUserInfo] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const APISitting = "api/web_v10/web/home/startingSettings";
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);
    const fetchSitting = async () => {
        if (!startingSitting){
            const sitting = await API.get(APISitting)
            sessionStorage.setItem(
                "SITTING",
                JSON.stringify({sitting: sitting.data?.data['starting-setting']})
            );
            store.dispatch({type: "SYNC_SITTING"})
            setStartingSitting(sitting.data?.data['starting-setting'])
        }
    }
    useEffect(() => {
        if (token && !startingSitting) {
            const sitting = JSON.parse(sessionStorage.getItem('SITTING'));
            fetchSitting()
        } else {
            setToken(Cookies.get(
                'TOKEN_LOCAL_STORAGE'
            ))
        }
    }, [token, startingSitting]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const local = localStorage.getItem('BASE_URL');
            if (!local) {
                localStorage.setItem(
                    'BASE_URL',
                    process.env.NEXT_PUBLIC_BASE_URL_LIVE
                );
            } else {
            }
        }
    }, []);

    function generateDeviceId() {
        if (typeof window !== 'undefined') {
            const id = JSON.parse(
                localStorage.getItem('TOKEN_LOCAL_STORAGE')
            )?.deviceId;
            setDeviceId(id);
            return id;
        }
        return null;
    }

    async function fetchRegisterGuest(deviceId, cookie) {
        try {
            store.dispatch({type: 'START_LOADING_INFO'});
            if (!deviceId) {
                const Guest = await API.post(`api/web_v10/auth/register-guest`, {
                    device_id: deviceId,
                    cookie
                });
                if (typeof window !== 'undefined') {
                    localStorage.setItem(
                        'TOKEN_LOCAL_STORAGE',
                        JSON.stringify({
                            token: Guest?.data?.data?.token,
                            guest: true,
                            deviceId: Guest?.data?.data?.user?.device_id
                        })
                    );
                    setToken(Guest?.data?.data);
                    Cookies.set(
                        'TOKEN_LOCAL_STORAGE',
                        JSON.stringify({
                            token: Guest?.data?.data?.token,
                            guest: true,
                            deviceId: Guest?.data?.data?.user?.device_id
                        })
                    );
                }
                if (Guest) {
                    await fetchCustomerInfo(deviceId);
                }
            }
            return true;
        } catch (error) {
        }
    }

    async function fetchCustomerInfo(deviceId) {
        try {
            const customerInfo = await API.get(`api/web_v10/web/customer/info`);
            if (customerInfo?.data?.data) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem(
                        'CUSTOMER_INFO_STORAGE',
                        JSON.stringify({customerInfo: customerInfo?.data?.data})
                    );
                }
                store.dispatch({type: 'SYNC_INFO'});

        }
        // store.dispatch({type: 'START_LOADING_INFO'});
        } catch (e) {
            localStorage.clear();
            sessionStorage.clear();
            const cookies = Cookies.get();
            for (const cookie in cookies) {
                Cookies.remove(cookie);
            }
            const cookie = await getCookieAsync();
            await RegisterAsGuest(cookie)
        }
        store.dispatch({type: 'STOP_LOADING_INFO'});
        // const code = customerInfo?.errors?.code;
        // if (code === 'auth-001') {
        // }

        // yield put(RegisterGuestReducer({ Guest: Guest?.data }));

    }

    const RegisterAsGuest = async (cookie) => {
        // if (!user && done) {
        const deviceId = generateDeviceId();
        if (!deviceId) {
            const doneReg = await fetchRegisterGuest(null, cookie);
            if (doneReg) {
                setUserInfo(true);
            }
        } else {
            await fetchCustomerInfo(deviceId);
        }
        // }
    };

    async function fetchItemsCart() {
        startCartLoading();
        try {
            const shippingCart = await API.get(`api/web_v10/cart/cart_shipping`);
            fetchShippingCart({shippingCart: shippingCart?.data});
            store.dispatch({
                type: 'PAYMENT_TYPES',
                payload: shippingCart?.data?.data?.available_payment_method
            });
            stopCartLoading();
        } catch (error) {
            stopCartLoading();
        }
    }


    const getCookieAsync = async () => {
        return cookieCutter.get('clearence_session');
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const cookie = await getCookieAsync();
                await RegisterAsGuest(cookie);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const Token = JSON.parse(
                localStorage.getItem('TOKEN_LOCAL_STORAGE')
            )?.token;
            setUser(Token);
            setDone(true);
        }
    }, []);
    const sync = useSelector((state) => state?.CartReducer?.sync);

    useEffect(() => {
        if (userInfo) {
            fetchItemsCart();
            router.refresh();
        }
    }, [userInfo]);

    return <></>;
};

export default Register;
