"use client";
import Image from "helpers/image";
import Link from "helpers/Link";
import React, { useEffect, useRef, useState } from "react";
import CartSideBar from "components/common/CartSideBar";
import { useCart } from "components/context/CartContext";
import SearchField from "components/base/SearchField";
import Select from "../Header/Select";
import { usePathname, useRouter } from "next/navigation";
import AuthDropDown from "../Header/desktop/HeaderWithSearch/authDropDown";
import { CartSVG } from "../svgs";
import { useSelector } from "react-redux";
import SwipedCart from '../SwipedCart/desktop';
import Cookie from 'js-cookie';

const MiddleHeader = ({shippingCart}) => {
    const pathName = usePathname()
    const router = useRouter()
    const [showDropDown, setShowDropDown] = useState(false);
    const [language, setLanguage] = useState(false);
    const [user, setUser] = useState(false);
    const { isCartOpen, setIsCartOpen } = useCart();
    const languageButtonRef = useRef(null);
    const userButtonRef = useRef(null);
    // const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    const [shippingBag, setShippingBag] = useState([]);
    const [isSearchDropdownVisible, setSearchDropdownVisible] = useState(false);
    const path = usePathname();
    let local = process.env.NEXT_PUBLIC_LANG;
    if (typeof window !== 'undefined') {
        local = Cookie.get('lang');
    }
    useEffect(() => {
        setShippingBag(shippingCart?.cart);
    }, [shippingCart]);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                languageButtonRef.current &&
                !languageButtonRef.current.contains(event.target)
            ) {
                setLanguage(false);
            }
            if (
                userButtonRef.current &&
                !userButtonRef.current.contains(event.target)
            ) {
                setUser(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [cartOpened, setCartOpen] = useState(false);
    useEffect(() => {
        cartOpened
            ? (document.body.style.overflow = "hidden")
            : (document.body.style.overflow = "unset")
    }, [cartOpened]);
    return (
        <div
            className='hidden lg:flex flex-row justify-between items-center lg:py-4 2xl:py-5 lg:px-6 xl:px-8 2xl:px-12 3xl:px-[60px]'>
            <Link href={'/'} className='w-32 h-10 relative lg:w-40 2xl:w-44 3xl:w-[200px]'>
                <Image src='https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png' fill
                       alt='logo' />
            </Link>
            <div className='flex brightness-full flex-row items-center gap-x-5 xl:gap-x-6 3xl:gap-x-8'>
                <div className='brightness-full w-[372px] relative'>
                    <SearchField onFocus={() => setSearchDropdownVisible(true)}
                                 onBlur={() => setSearchDropdownVisible(false)} />
                </div>
                <div
                    className='flex flex-row items-center gap-x-2 xl:gap-x-3.5 2xl:gap-x-4 3xl:gap-x-5 text-xl 2xl:text-2xl'>
                    <div ref={languageButtonRef} className='relative '>
                        <button type='button' onClick={() => setLanguage(!language)} className='p-2 2xl:p-3'>
                            <i className='fa-solid fa-globe'></i>
                        </button>
                        {language && (
                            <div
                                className=' w-80 flex flex-col justify-start gap-y-5 absolute top-full right-0 z-50 px-4 pt-5 pb-2 bg-white cartShadow'>
                                <p className='text-sm 2xl:text-base font-bold text-black-primary capitalize text-left'>
                                    {local === 'en' ? 'Language' : 'لغة'}
                                </p>
                                <div className='w-full mb-3 bg-white'>
                                    <Select />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="group relative">
                        <button
                            type="button"
                            onClick={() => {
                                setShowDropDown(!showDropDown);
                            }}
                            ref={userButtonRef}
                            className="relative p-2 2xl:p-3"
                        >
                            <i className="fa-regular fa-user"></i>
                        </button>
                        <div className="absolute z-50 left-1/2 transform -translate-x-1/2 hidden group-hover:block 2xl:block" style={{display: showDropDown ? 'block' : 'none'}}>
                            <AuthDropDown />
                        </div>
                    </div>
                </div>
                <div
                    onClick={() => pathName === '/' ? router.push('/payment-method') : setCartOpen(true)}
                    className='relative pt-2'
                >
                    <CartSVG />
                    {shippingBag?.length > 0 && (
                        <span
                            className='absolute mt-1 left-[16px] top-[-8px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate'>
                                {shippingBag.length}
                            </span>
                    )}
                </div>
            </div>
            <CartSideBar value={isCartOpen} setCart={setIsCartOpen} />
            <SwipedCart
                shippingCart={shippingCart}
                open={cartOpened}
                close={() => {
                    setCartOpen(false);
                }}
            />
        </div>
    );
};

export default MiddleHeader;
