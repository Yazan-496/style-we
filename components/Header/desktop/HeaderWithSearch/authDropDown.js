import Link from 'helpers/Link';
import React, { useEffect, useState } from 'react';
import { persistor, store } from 'store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { PersistGate } from 'redux-persist/integration/react';
import { TransClient } from '../../../../helpers/TransClient';

const AuthDropDown = (props) => {
    // const { t, i18n } = useTranslation("translation");
    const [token, setToken] = useState(null);
    const [guest, setGuest] = useState(null);
    const [userData, setUserData] = useState(null);
    const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
            setGuest(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.guest);
            setUserData(
                JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'))?.customerInfo
                    ?.customer_info
            );
        }
    }, [syncInfo]);
    const dispatch = useDispatch();
    const router = useRouter();

    function handleLogout() {
        dispatch({ type: 'LOGOUT' });
        if (typeof window !== 'undefined') {
            if (window.location?.pathname === '/account/login') {
                window.location.reload();
            } else {
                router.refresh();
                // router.push('/account/login');
                window.location.href = '/account/login';
            }
        }
    }

    return (
        <>
            <div dir={TransClient('user.dir')}
                className='iofgjofdpgjidfojg absolute translate-x-[50%] z-50 top-full justify-center items-center max-w-[280px] min-w-[240px] hidden group-hover:flex right-[50%]'>
                <div className='flex flex-col items-center w-full'>
                    <div className='flex w-full relative asdaswwww'>
                        <svg
                            width='16'
                            height='8'
                            viewBox='0 0 16 8'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                            className='flex-grow-0 flex-shrink-0'
                            preserveAspectRatio='xMidYMid meet'
                        >
                            <path d='M8 0L16 8H0L8 0Z' fill='white'></path>
                        </svg>
                    </div>
                    <div
                        className='flex flex-col justify-center items-center gap-4 self-stretch flex-grow-0 flex-shrink-0 relative p-4 rounded bg-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]'>
                        {token && !guest ? (
                            <>
                                {' '}
                                <h1>
                                    {TransClient('user.welcome')} {userData?.f_name}{' '}
                                </h1>
                                <Link
                                    href="#"
                                    onClick={handleLogout}
                                    className='flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow text-base gap-1 bg-gray-500 block rounded text-white p-1  w-full mb-3'
                                >
                                    {/*<Link href="/">*/}
                                    {/*<a>*/}
                                    <div className='inline-block truncate opacity-1 group-active:opacity-90'>
                                        {TransClient('user.logout')}
                                    </div>
                                    {/*</a>*/}
                                    {/*</Link>*/}
                                </Link>
                            </>
                        ) : (
                            <button
                                className='flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-10 w-full text-base gap-1 px-3 py-2'>
                                <Link href='/account/login'>
                                    {/*<a>*/}
                                    <div
                                        className='inline-block truncate bg-black text-white opacity-1 group-active:opacity-90 p-1 rounded'>
                                        {TransClient('header.user.signin')} /{TransClient('header.user.register')}
                                    </div>
                                    {/*</a>*/}
                                </Link>
                            </button>
                        )}
                        <div className='self-stretch flex-grow-0 flex-shrink-0 h-px bg-[#e0e1e3]'></div>
                        <Link
                            href='/orders-list/all'
                            rel='nofollow'
                            className={`${token ? "" : "pointer-events-none "} 
                                self-stretch flex-grow-0 flex-shrink-0 w-full text-base
                                leading-[21px] text-left text-[#5d626a] hover:font-[700]`}
                        >
                            {TransClient('user.my_order')}
                        </Link>
                        <Link
                            href='/orders-list/account'
                            rel='nofollow'
                            className={`${token ? "" : "pointer-events-none "} self-stretch flex-grow-0 flex-shrink-0 
                                w-full text-base leading-[21px] text-left text-[#5d626a] hover:font-[700]`}
                        >
                            {TransClient('user.my_profile')}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

const AuthDropDownWithRedux = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <AuthDropDown />
        </PersistGate>
    </Provider>
);

export default AuthDropDownWithRedux;
