import { all, delay, fork, put, takeEvery } from '@redux-saga/core/effects';
import { fetchDataError } from '../../actions';
import API from 'helpers/API';
import { RegisterGuestReducer } from '../../actions/auth';
import { persistStore } from 'redux-persist';
import store from 'store/index';
import axios from 'axios';
import Cookies from 'js-cookie';

function generateDeviceId() {
    if (typeof window !== 'undefined') {
        const id = JSON.parse(
            localStorage.getItem('TOKEN_LOCAL_STORAGE')
        )?.deviceId;
        return id;
    }
    return null;
}

//################# Start RegisterGuest #################//
function* fetchRegisterGuestSaga(action) {
    const deviceId = action?.payload?.deviceId;
    const cookie = action?.payload?.cookie;
    try {
        store.dispatch({ type: 'START_LOADING_INFO' });
        if (!deviceId) {
            const Guest = yield API.post(`api/web_v10/auth/register-guest`, {
                device_id: deviceId,
                cookie,
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: Guest?.data?.data?.token,
                        guest: true,
                        deviceId: Guest?.data?.data?.user?.device_id,
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: Guest?.data?.data?.token,
                        guest: true,
                        deviceId: Guest?.data?.data?.user?.device_id,
                    })
                );
            }
        }

        const customerInfo = yield API.get(`api/web_v10/web/customer/info`);
        if (typeof window !== 'undefined') {
            localStorage.setItem(
                'CUSTOMER_INFO_STORAGE',
                JSON.stringify({ customerInfo: customerInfo?.data?.data })
            );
        }
        // console.log(customerInfo);
        if (customerInfo?.data?.data) {
            store.dispatch({ type: 'SYNC_INFO' });
        }
        store.dispatch({ type: 'STOP_LOADING_INFO' });
    } catch (error) {
        // console.log(error);
        yield put(fetchDataError(error));
    }
}

function* fetchCustomerInfoSaga(action) {
    const deviceId = action?.payload?.deviceId;
    try {
        store.dispatch({ type: 'START_LOADING_INFO' });
        const customerInfo = yield API.get(`api/web_v10/web/customer/info`);
        if (typeof window !== 'undefined') {
            localStorage.setItem(
                'CUSTOMER_INFO_STORAGE',
                JSON.stringify({ customerInfo: customerInfo?.data?.data })
            );
        }
        // console.log(customerInfo);
        if (customerInfo?.data?.data) {
            store.dispatch({ type: 'SYNC_INFO' });
        }
        store.dispatch({ type: 'STOP_LOADING_INFO' });
        const code = customerInfo?.errors?.code;
        // console.log(customerInfo, "customerInfo")
        if (code === 'auth-001') {
        }

        // yield put(RegisterGuestReducer({ Guest: Guest?.data }));
    } catch (error) {
        if (error.message.includes('401')) {
            // console.log("401");
            const Guest = yield API.post(`api/web_v10/auth/register-guest`, {
                device_id: deviceId,
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: Guest?.data?.data?.token,
                        guest: true,
                        deviceId: generateDeviceId(),
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: Guest?.data?.data?.token,
                        guest: true,
                        deviceId: generateDeviceId(),
                    })
                );
            }
            store.dispatch({ type: 'START_LOADING_INFO' });
            const newCustomerInfo = yield API.get(`api/web_v10/web/customer/info`);
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'CUSTOMER_INFO_STORAGE',
                    JSON.stringify({
                        customerInfo: newCustomerInfo?.data?.data,
                    })
                );
            }
            // console.log(newCustomerInfo);
            if (newCustomerInfo?.data?.data) {
                store.dispatch({ type: 'SYNC_INFO' });
            }
        }
        store.dispatch({ type: 'STOP_LOADING_INFO' });
        console.log("GET_ITEMS_CART15");
        store.dispatch({ type: 'GET_ITEMS_CART' });
        yield put(fetchDataError(error));
    }
}

function* RegisterGuestWatch() {
    yield takeEvery('REGISTER_GUEST', fetchRegisterGuestSaga);
    yield takeEvery('FETCH_CUSTOMER_INFO', fetchCustomerInfoSaga);
}

//################# End RegisterGuest #################//
//################# Start CHECK_NUMBER #################//

function* fetchCheckNumberSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const phoneNumber = action?.payload?.phoneNumber;
    try {
        const data = yield API.get(
            `api/web_v10/phone/check-existence/${phoneNumber}`
        );
        // console.log(data)
        if (data?.data?.isSuccessful) {
            store.dispatch({ type: 'STOP_LOADING_AUTH' });
            store.dispatch({ type: 'VALIDATE_NUMBER_FOUND' });
        } else {
            store.dispatch({ type: 'STOP_LOADING_AUTH' });
            store.dispatch({ type: 'VALIDATE_NUMBER' });
        }
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* CheckNumberWatch() {
    yield takeEvery('CHECK_NUMBER', fetchCheckNumberSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchCheckEmailSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const email = action?.payload?.email;
    try {
        const data = yield API.get(`api/web_v10/email/check-existence/${email}`);
        if (data?.data?.isSuccessful) {
            store.dispatch({ type: 'VALIDATE_EMAIL' });
            store.dispatch({ type: 'STOP_LOADING_AUTH' });
        }
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* CheckEmailWatch() {
    yield takeEvery('CHECK_EMAIL', fetchCheckEmailSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchSendOTPSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const phoneNumber = action?.payload?.phoneNumber;
    const whatsapp = action?.payload?.whatsapp ? 1 : 0;
    try {
        const data = yield API.get(
            `api/web_v10/phone/send_otp?phone=${phoneNumber}&is_via_whatsapp=${whatsapp}`
        );
        // console.log(data?.data?.data?.verificationId);
        if (data?.data?.data?.verificationId) {
            store.dispatch({
                type: 'SET_VERIFICATION_ID',
                payload: data?.data?.data?.verificationId,
            });
        }
        store.dispatch({
            type: 'SET_PHONE_NUMBER',
            payload: phoneNumber,
        });
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* SendOTPWatch() {
    yield takeEvery('SEND_OTP', fetchSendOTPSaga);
}

//################# End CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchVerifyOTPSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const otp = action?.payload?.otp;
    const verificationId = store.getState().AuthReducer.verificationId;
    try {
        const data = yield API.get(
            `api/web_v10/phone/verify_otp?verificationId=${verificationId}&otp=${otp}`
        );
        const idToken = data?.data?.data?.id_token;
        if (idToken) {
            store.dispatch({
                type: 'SET_AUTH_ID_TOKEN',
                payload: idToken,
            });
        } else {
        }
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* VerifyOTPWatch() {
    yield takeEvery('VERIFY_OTP', fetchVerifyOTPSaga);
}

//################# Start CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchVerifyGuestSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const idToken = action?.payload?.idToken;
    try {
        const response = yield API.post(
            `api/web_v10/auth/firebase/verify-guest-phone`,
            {
                id_token: idToken,
            }
        );
        const oldToken = JSON.parse(
            localStorage.getItem('TOKEN_LOCAL_STORAGE')
        )?.token;
        const userData = JSON.parse(
            localStorage.getItem('TOKEN_LOCAL_STORAGE')
        )?.userData;
        const token = response?.data?.token;
        // console.log;
        const code = response?.data?.code;
        if (code === 'user-exists') {
            store.dispatch({
                type: 'SET_AUTH_TOKEN',
                payload: token,
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: response?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: response?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
            }
        } else if (code === 'user-verified') {
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: oldToken,
                        guest: false,
                        userData: userData,
                        deviceId: generateDeviceId(),
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: oldToken,
                        guest: false,
                        userData: userData,
                        deviceId: generateDeviceId(),
                    })
                );
            }
        }
        store.dispatch({
            type: 'FETCH_CUSTOMER_INFO',
            payload: { generateDeviceId },
        });
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* VerifyGuestWatch() {
    yield takeEvery('VERIFY_GUEST', fetchVerifyGuestSaga);
}

//################# Start CHECK_NUMBER #################//

function* fetchLoginSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const phoneNumber = action?.payload?.phoneNumber;
    const email = action?.payload?.email;
    const password = action?.payload?.password;
    const isEmail = action?.payload?.isEmail;
    const deviceId = generateDeviceId();
    try {
        const data = isEmail
            ? yield API.post(`api/web_v10/auth/email/login`, {
                  email: email,
                  device_id: deviceId,
                  password: password,
              })
            : yield API.post(`api/web_v10/auth/phone/login`, {
                  phone: phoneNumber,
                  device_id: deviceId,
                  password: password,
              });
        const token = data?.data?.data?.token;
        if (token) {
            store.dispatch({
                type: 'SET_AUTH_TOKEN',
                payload: token,
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: data?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: data?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
            }
            store.dispatch({
                type: 'FETCH_CUSTOMER_INFO',
                payload: { generateDeviceId },
            });
            store.dispatch({ type: 'STOP_LOADING_AUTH' });
        } else {
        }
        // store.dispatch({ type: "STOP_LOADING_AUTH" });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* LoginWatch() {
    yield takeEvery('LOGIN', fetchLoginSaga);
}

//################# Start CHECK_NUMBER #################//

function* fetchRegisterSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const idToken = action?.payload?.idToken;
    const data = action?.payload?.data;
    const deviceId = generateDeviceId();
    // console.log(data, "data");
    // console.log(deviceId, "deviceId");
    try {
        // console.log("register");
        const response = yield API.post(`api/web_v10/auth/register`, {
            f_name: data?.firstName,
            l_name: data?.firstName,
            email: data?.email,
            phone: data?.phoneNumber,
            id_token: idToken,
            device_id: deviceId,
            password: data?.password,
            country_dial_code: data?.dial,
        });
        // console.log(response, "response");
        const token = response?.data?.data?.token;
        if (token) {
            store.dispatch({
                type: 'SET_AUTH_TOKEN',
                payload: token,
            });
            if (typeof window !== 'undefined') {
                localStorage.setItem(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: response?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
                Cookies.set(
                    'TOKEN_LOCAL_STORAGE',
                    JSON.stringify({
                        token: token,
                        guest: false,
                        userData: response?.data?.data?.user,
                        deviceId: generateDeviceId(),
                    })
                );
            }
            store.dispatch({
                type: 'FETCH_CUSTOMER_INFO',
                payload: { generateDeviceId },
            });
        } else {
        }
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* RegisterWatch() {
    yield takeEvery('REGISTER', fetchRegisterSaga);
}

//################# Start CHECK_NUMBER #################//
//################# Start CHECK_NUMBER #################//

function* fetchResetPasswordSaga(action) {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    const idToken = action?.payload?.idToken;
    const phoneNumber = action?.payload?.phoneNumber;
    const password = action?.payload?.password;
    const email = action?.payload?.email;
    const isEmail = action?.payload?.isEmail;
    const country_dial_code = action?.payload?.dial;
    API.defaults.headers['Authorization'] = `Bearer ${idToken}`;
    try {
        const response = !isEmail
            ? yield API.post(`api/web_v10/phone/reset-password`, {
                  phone_number: phoneNumber,
                  password: password,
                  id_token: idToken,
                  country_dial_code,
              })
            : yield API.post(`api/web_v10/phone/reset-password/email`, {
                  phone_number: phoneNumber,
                  password: password,
                  id_token: idToken,
              });
        // console.log(response, "response");
        const isSuccessful = response?.data?.isSuccessful;
        if (isSuccessful) {
            store.dispatch({
                type: 'SUCCESS_RESET_PASSWORD',
            });
        }
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    } catch (error) {
        console.log(error);
        store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
}

function* ResetPasswordWatch() {
    yield takeEvery('RESET_PASSWORD', fetchResetPasswordSaga);
}

//################# Start CHECK_NUMBER #################//

function* fetchLogoutSaga() {
    store.dispatch({ type: 'START_LOADING_AUTH' });
    store.dispatch({
        type: 'SET_AUTH_TOKEN',
        payload: null,
    });
    if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
        const cookies = Cookies.get();
        for (const cookie in cookies) {
            Cookies.remove(cookie);
        }
    }
    // if (typeof window !== 'undefined') {
    //     store.dispatch({ type: 'START_LOADING_AUTH' });
    //
    //     localStorage.removeItem('COUPON');
    //     localStorage.removeItem('COUPON_CODES');
    //     if (localStorage.getItem('TOKEN_LOCAL_STORAGE')) {
    //         const localStorageData = JSON.parse(
    //             localStorage.getItem('TOKEN_LOCAL_STORAGE')
    //         );
    //
    //         delete localStorageData.token;
    //         localStorageData.guest = true;
    //         localStorage.setItem(
    //             'TOKEN_LOCAL_STORAGE',
    //             JSON.stringify(localStorageData)
    //         );
    //         Cookies.set(
    //             'TOKEN_LOCAL_STORAGE',
    //             JSON.stringify(localStorageData)
    //         );
    //     }
    // }
    // const cookie = cookieCutter.get('clearence_session');
    // const register = yield store.dispatch({
    //     type: 'REGISTER_GUEST',
    //     payload: { generateDeviceId, cookie },
    // });
    // if (register) {
    //     store.dispatch({
    //         type: 'FETCH_CUSTOMER_INFO',
    //         payload: { generateDeviceId },
    //     });
    // }
    store.dispatch({ type: 'STOP_LOADING_AUTH' });
}

function* LogoutWatch() {
    yield takeEvery('LOGOUT', fetchLogoutSaga);
}

function* updateProfileSaga(action) {
    const data = action.payload?.data;
    const password = data?.password;
    const country_dial_code = data?.dial;
    yield store.dispatch({ type: 'START_LOADING_AUTH' });
    yield store.dispatch({ type: 'START_LOADING_CHECKOUT' });
    try {
        const profile = API.post(`api/web_v10/customer/update-profile`, data);
        if (profile) {
            store.dispatch({ type: 'START_DELAY' });
            yield delay(2000);
            yield store.dispatch({ type: 'STOP_LOADING_AUTH' });
            store.dispatch({
                type: 'FETCH_CUSTOMER_INFO',
                payload: { generateDeviceId },
            });
        }
    } catch (e) {
        store.dispatch({ type: 'START_DELAY' });
        yield delay(2000);
        yield store.dispatch({ type: 'STOP_LOADING_CHECKOUT' });
        yield store.dispatch({ type: 'STOP_LOADING_AUTH' });
    }
    store.dispatch({ type: 'START_DELAY' });
    yield delay(2000);
    yield store.dispatch({ type: 'STOP_LOADING_CHECKOUT' });
    yield store.dispatch({ type: 'STOP_LOADING_AUTH' });
}

function* updateProfileWatch() {
    yield takeEvery('UPDATE_PROFILE', updateProfileSaga);
}

//################# End CHECK_NUMBER #################//
export function* AuthSaga() {
    yield all([fork(RegisterGuestWatch)]);
    yield all([fork(updateProfileWatch)]);
    yield all([fork(CheckNumberWatch)]);
    yield all([fork(CheckEmailWatch)]);
    yield all([fork(SendOTPWatch)]);
    yield all([fork(VerifyOTPWatch)]);
    yield all([fork(LoginWatch)]);
    yield all([fork(RegisterWatch)]);
    yield all([fork(LogoutWatch)]);
    yield all([fork(VerifyGuestWatch)]);
    yield all([fork(ResetPasswordWatch)]);
}
