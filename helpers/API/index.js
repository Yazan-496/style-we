'use client';

import axios from 'axios';
import { getAuthToken, getLangCode } from './utils';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { alertService } from 'components/Alert';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LIVE;

let baseURLocalStorage;
if (typeof window !== 'undefined') {
    baseURLocalStorage = localStorage.getItem('BASE_URL') || baseUrl;
}

const API = axios.create({
    baseURL: baseURLocalStorage, // Replace with your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// const showNotification = (type, message, description) => {
//   console.log("not");
//   return <Toast message={description} timeout={4000} />;
// };
let ids = [];
const CustomLoading = ({ first, middle, last, color }) => (
    <div className="text-nowrap flex ">
        <pre className="text-nowrap">{first}</pre>
        <pre
            className={`font-bold text-nowrap text-${color || 'blue-700'}`}
        >{` ${middle} `}</pre>
        <pre className="text-nowrap">{last}</pre>
    </div>
);
API.interceptors.request.use(async (config) => {
    const token = await getAuthToken();
    const langCode = await getLangCode();
    // console.log(config, 'cccccccccccccccc');
    // console.log('start api');
    var n = config.url?.split('/');
    const message = n[n.length - 1]?.split('?')[0];
    alertService.alert({
        ToastId: `${message}`,
        message: message,
        autoClose: false,
    });
    // ids[message] = toast.loading(
    //     <CustomLoading
    //         color={'blue-700'}
    //         first="Loading"
    //         last="API"
    //         middle={message}
    //     />
    // );

    config.headers.lang = langCode;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    // console.log(token);
    return config;
});

API.interceptors.response.use(
    (response) => {
        // console.log(response, 'stop api');
        var n = response?.config.url?.split('/');
        const message = n[n.length - 1]?.split('?')[0];
        alertService.dismiss({
            ToastId: `${message}`,
        });
        // var n = response?.config.url?.split('/');
        // const message = n[n.length - 1]?.split('?')[0];
        // toast.update(ids[message], {
        //     render: (
        //         <CustomLoading
        //             color={'green-700'}
        //             first=""
        //             last="Success"
        //             middle={message}
        //         />
        //     ),
        //     type: 'success',
        //     isLoading: false,
        //     autoClose: 1000,
        // });
        // Handle successful responses
        if (response?.data?.message?.includes('Redirect')) {
            showNotification('success', 'Request Successful', 'Please Wait');
        }
        const url = response.config.url;
        if (url?.includes('success') || url?.includes('cancel-order')) {
            // console.log(response, "response/success")
            const description = response?.data?.message;
            if (description !== 'Data Got!') {
                showNotification('success', 'Request Successful', description);
                return response;
            }
        }
        if (url?.includes('return_request')) {
            // console.log(response, "response/success")
            const description = response?.data?.data;
            if (description !== 'Data Got!') {
                showNotification('success', 'Request Successful', description);
                return response;
            }
        }
        if (url?.includes('place')) {
            const description = response?.data?.message;
            if (description !== 'Data Got!') {
                showNotification('success', 'Request Successful', description);
                return response;
            }
        }
        if (url?.includes('update-profile' + '')) {
            const description = response?.data?.message;
            if (description !== 'Data Got!') {
                showNotification('success', 'Request Successful', description);
                return response;
            }
        }
        if (url?.includes('cart') || response?.data?.message?.includes('otp')) {
            const description = response?.data?.message;
            if (description !== 'Data Got!') {
                showNotification('success', 'Request Successful', description);
                return response;
            }
        }
        if (
            url?.includes('address') &&
            !response?.data?.message?.includes('Redirect')
        ) {
            // console.log(response.data);
            const description = response.data?.message;
            if (!description?.includes('Got')) {
                showNotification('success', 'Request Successful', description);
            }
            return response;
        }
        const couponLocalStorage = localStorage.getItem('COUPON');
        if (url?.includes('coupon') && !couponLocalStorage) {
            // console.log(response.data?.messages)
            const description = response.data?.messages.includes('Successfully')
                ? response.data?.messages +
                  '  discount:' +
                  response.data?.discount
                : response.data?.messages;
            showNotification('success', 'Request Successful', description);
            return response;
        }
        return response;
    },
    (error) => {
        var n = error?.config.url?.split('/');
        const message = n[n.length - 1]?.split('?')[0];
        alertService.dismiss({
            ToastId: `${message}`,
        });
        // toast.update(ids[message], {
        //     render: (
        //         <CustomLoading
        //             color={'red-700'}
        //             first=""
        //             last="Failed"
        //             middle={message}
        //         />
        //     ),
        //     type: 'error',
        //     isLoading: false,
        //     autoClose: 1000,
        // });
        const url = error?.config?.url;
        if (url?.includes('register')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
        if (url?.includes('address')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
        }
        if (url?.includes('return_request_products')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
        }
        if (url?.includes('pay')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
        }
        if (url?.includes('update-profile')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
        }
        if (url?.includes('order/place')) {
            showNotification(
                'error',
                'Request Failed',
                error?.response?.data?.message ||
                    'An error occurred during the request.'
            );
        }
        // console.log(error, "error");
        if (error.code !== 'ERR_BAD_REQUEST') {
            if (error?.message === 'Network Error') {
                showNotification(
                    'success',
                    'Request Successful',
                    'CHECK INTERNET CONNECTION'
                );
            } else {
                showNotification(
                    'error',
                    'Request Failed',
                    error?.response?.data?.message ||
                        'An error occurred during the request.'
                );
            }
            return Promise.reject(error);
        }
        if (error.message.includes('401')) {
            return Promise.reject(error);
        }
    }
);

const ToastTransition = ({ closeToast, children, ...props }) => {
    const [Opacity, setOpacity] = useState(true);
    const [hidden, setHidden] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpacity(false);
            toast.dismiss();
        }, 3000);

        return () => clearTimeout(timer);
    }, [closeToast, children]);
    useEffect(() => {
        const timer = setTimeout(() => {
            setHidden(true);
            toast.dismiss();
        }, 4000);

        return () => clearTimeout(timer);
    }, [Opacity]);
    return (
        <div className="custom-toast">
            {children}
            <style jsx>{`
                .custom-toast {
                    position: relative;
                    display: ${hidden ? 'none' : 'flex'};
                    align-items: center;
                    justify-content: flex-start;
                    text-align: center;
                    color: #fff;
                    flex-wrap: wrap;
                    padding: 10px;
                    border-radius: 4px;
                    opacity: ${Opacity ? 1 : 0};
                    transition: opacity 300ms;
                    //width: max-content;
                    width: fit-content;
                }
            `}</style>
        </div>
    );
};

export const showNotification = (type, message, description) => {
    const Style = {
        position: 'fixed',
        zIndex: '111111111111',
        top: '50%',
        left: '50%',
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px',
        borderRadius: '4px',
        opacity: '0.8',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transform: 'translate(-50%, 0%)',
        textAlign: 'center',
        // width: 'max-content',
        width: 'fit-content',
    };
    const toastProps = {
        type,
        className: 'toast',
        toastStyle: Style,
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: false,
        newestOnTop: false,
        rtl: false,
        transition: ToastTransition,
        pauseOnHover: false,
        draggable: false,
        progress: false,
    };

    toast(description, { ...toastProps, style: Style });
};
export default API;
