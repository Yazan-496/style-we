'use client';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import React, { useEffect, useRef, useState } from 'react';
import SlideInOut from 'components/common/SlideInOut';
import Select from 'components/Header/Select';
import SearchField from 'components/base/SearchField';
import { CartSVG } from '../svgs';
import SwipedCart from '../SwipedCart/desktop';
import { usePathname, useRouter } from 'next/navigation';

const MobileHeader = ({ navArr, shippingCart }) => {
    const pathName = usePathname()
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [cartOpened, setCartOpen] = useState(false);
    const [isSearchVisible, setSearchVisible] = useState(false);
    // const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    // const sync = useSelector((store) => store.CartReducer.sync);
    const [shippingBag, setShippingBag] = useState([]);
    const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const languageButtonRef = useRef(null);
    const searchButtonRef = useRef(null);
    const [language, setLanguage] = useState(false);
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(
                JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token
            );
        }
    }, []);
    useEffect(() => {
        show
            ? (document.body.style.overflow = 'hidden')
            : (document.body.style.overflow = 'unset');
    }, [show]);

    useEffect(() => {
        // console.log(shippingCart)
    }, [shippingCart]);
    useEffect(() => {
         setShippingBag(shippingCart?.cart)
    }, [shippingCart]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                searchButtonRef.current &&
                !searchButtonRef.current.contains(event.target)
            ) {
                setSearchVisible(false);
            }
            if (
                languageButtonRef.current &&
                !languageButtonRef.current.contains(event.target)
            ) {
                setLanguage(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    return (
        <>
            <div className="sticky z-20 sm:visible lg:hidden w-full flex flex-row justify-between items-center py-1.5 md:py-4 px-2 md:px-5 top-0 bg-white ">
                <div className="flex flex-row items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        className="group relative p-2 md:p-3 text-xl md:text-2xl"
                    >
                        <i className="fas fa-bars"></i>
                    </button>
                    <Link href={'/'} className="w-32 h-8 md:h-9 relative">
                        <Image
                            src="https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
                            fill
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="flex flex-row items-center text-xl md:text-2xl">
                    <Link
                        href={'/account/login'}
                        className="group relative m-2 md:m-3"
                    >
                        <i className="fa-regular fa-user"></i>
                    </Link>
                    <button
                        type="button"
                        onClick={() => setSearchVisible(!isSearchVisible)}
                        className="p-2 2xl:p-3 text-[#616368] bg-white w-auto"
                    >
                        <i className="fa-solid fa-magnifying-glass text-base"></i>
                    </button>
                    <div ref={languageButtonRef} className="relative ">
                        <button
                            type="button"
                            onClick={() => setLanguage(!language)}
                            className="p-2 2xl:p-3"
                        >
                            <i className="fa-solid fa-globe"></i>
                        </button>
                        {language && (
                            <div className=" w-52 flex flex-col justify-start gap-y-5 absolute top-full right-0 z-10 px-4 pt-5 pb-2 bg-white cartShadow">
                                <p className="text-sm 2xl:text-base font-bold text-black-primary capitalize text-left">
                                    Language
                                </p>
                                <div className="w-full mb-3 bg-white">
                                    <Select />
                                </div>
                            </div>
                        )}
                    </div>
                    {/*<div*/}
                    {/*  className="group flex items-center relative mb-[-4px]"*/}
                    {/*  // onClick={() => openCart()}*/}
                    {/*>*/}
                    {/*    <CartSVG />*/}
                    {/*    /!*{itemsInCart?.length > 0 && (*!/*/}
                    {/*    /!*  <span className="absolute left-[16px] top-[-8px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate">*!/*/}
                    {/*    /!*            {itemsInCart.length}*!/*/}
                    {/*    /!*        </span>*!/*/}
                    {/*    /!*)}*!/*/}
                    {/*    /!*<CartDropDown itemsInCart={navArr} />*!/*/}
                    {/*</div>*/}
                    <div
                        onClick={() => pathName === '/' ? router.push('/payment-method') : setCartOpen(true)}
                        className="relative pt-2"
                    >
                        <CartSVG />
                        {shippingBag?.length > 0 && (
                            <span className="absolute mt-1 left-[16px] top-[-8px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate">
                                {shippingBag.length}
                            </span>
                        )}
                    </div>
                </div>
                {isSearchVisible && (
                    <div
                        ref={searchButtonRef}
                        className="w-full absolute top-full z-10"
                    >
                        <SearchField
                            onFocus={() => setSearchDropdownVisible(true)}
                            onBlur={() => setSearchDropdownVisible(false)}
                        />
                    </div>
                )}
            </div>
            <div
                className={`w-full fixed h-screen top-0 transition-all duration-300 ${
                    show ? 'z-60 bg-white/50 left-0' : '-z-100 -left-full bg-transparent'
                } `}
            >
                <div
                    className={`absolute left-0 top-0 w-[80%] bg-[#f2f2f3] z-100 relative pb-10 transition-all duration-300 ${
                        show ? 'left-0' : '-left-full'
                    } `}
                >
                    <SlideInOut
                        data={navArr}
                        closeActionCb={() => setShow(false)}
                    />
                </div>
            </div>
            <SwipedCart
                shippingCart={shippingCart}
            open={cartOpened}
            close={() => {
                setCartOpen(false);
            }}
        />
        </>
    );
};

export default MobileHeader;
