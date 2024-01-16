import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';
import Link from 'helpers/Link';
import LanguageDropDown from './languageDropDown';
import AuthDropDown from './authDropDown';
import CartDropDown from './cartDropDown';
import SearchDropDown from './searchDropDown';
import {
    AuthSVG,
    CartSVG,
    LanguageSVG,
    CancelSVG,
    SearchSVG,
} from 'components/svgs';
import { useSelector } from 'react-redux';
const Layout = ({ openCart }) => {
    const [isMouseOn, setIsMouseOn] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [itemsInCart, setItemsInCart] = useState([]);
    const [icon, setIcon] = useState(
        'https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png'
    );
    const sync = useSelector((store) => store.CartReducer.sync);
    const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
    const [token, setToken] = useState(null);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(
                JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token
            );
        }
    }, []);
    useEffect(() => {
        if (token) {
            dispatch({ type: 'GET_ITEMS_CART' });
        }
    }, [token, sync]);
    useEffect(() => {
        if (shippingCart) {
            setItemsInCart(shippingCart?.cart);
        }
    }, [shippingCart]);
    return (
        <>
            <div className="cm-layout-max header flex items-center justify-between py-[18px] mx-auto">
                <div className="left-box relative">
                    <Link href={'/'}>
                        <img
                            className="w-auto h-[40px]"
                            src={icon}
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className="relative flex items-center">
                    <div
                        className="relative"
                        id="searchArea"
                        onMouseLeave={() => {
                            if (!isFocused) {
                                if (
                                    document
                                        ?.getElementById('searchDropDownMenu')
                                        ?.classList?.contains('flex')
                                ) {
                                    document
                                        ?.getElementById('searchDropDownMenu')
                                        ?.classList?.replace('flex', 'hidden');
                                }
                            }
                            setIsMouseOn(false);
                        }}
                        onMouseOver={() => {
                            setIsMouseOn(true);
                        }}
                    >
                        <div className="flex justify-end items-start flex-grow-0 flex-shrink-0 w-[372px]">
                            <div className="flex justify-start items-center flex-grow relative gap-2.5 px-3 py-2.5 rounded-tl-[4px] rounded-bl-[4px] bg-white border border-[#E0E1E3]">
                                <input
                                    onBlur={() => {
                                        setIsFocused(false);
                                        if (
                                            document
                                                ?.getElementById(
                                                    'searchDropDownMenu'
                                                )
                                                ?.classList?.contains('flex') &&
                                            !isMouseOn
                                        ) {
                                            document
                                                ?.getElementById(
                                                    'searchDropDownMenu'
                                                )
                                                ?.classList?.replace(
                                                    'flex',
                                                    'hidden'
                                                );
                                        }
                                    }}
                                    onFocus={() => {
                                        setIsFocused(true);
                                        if (
                                            document
                                                ?.getElementById(
                                                    'searchDropDownMenu'
                                                )
                                                ?.classList?.contains('hidden')
                                        ) {
                                            document
                                                ?.getElementById(
                                                    'searchDropDownMenu'
                                                )
                                                ?.classList?.replace(
                                                    'hidden',
                                                    'flex'
                                                );
                                        }
                                    }}
                                    id="searchInputField"
                                    placeholder="Jacket"
                                    className="flex-auto overflow-hidden outline-none text-[14px] leading-[26px] text-left text-[#868C93] pr-[22px]"
                                />
                                <div>
                                    <CancelSVG />
                                </div>
                            </div>
                            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-[72px] h-12 relative overflow-hidden gap-1 p-3 rounded-tr-[4px] rounded-br-[4px] cursor-pointer bg-[#31353c] hover:bg-[#31353ccc]">
                                <SearchSVG />
                            </div>
                        </div>
                        <div className="hidden" id="searchDropDownMenu">
                            <SearchDropDown />
                        </div>
                    </div>
                    <div className="icons gap-[36px] flex item-center pl-[32px] notranslate">
                        <div
                            className="group language-and-currency-popup relative"
                            onMouseLeave={() => {
                                if (
                                    document
                                        ?.getElementById('currency-dropDownx')
                                        ?.classList?.contains('flex')
                                ) {
                                    document
                                        ?.getElementById('currency-dropDownx')
                                        ?.classList?.replace('flex', 'hidden');
                                    document
                                        ?.getElementById(
                                            'currency-dropDown-arrow'
                                        )
                                        ?.classList?.replace(
                                            'rotate-180',
                                            'rotate-0'
                                        );
                                }
                                if (
                                    document
                                        ?.getElementById('language-dropDownx')
                                        ?.classList?.contains('flex')
                                ) {
                                    document
                                        ?.getElementById('language-dropDownx')
                                        ?.classList?.replace('flex', 'hidden');
                                    document
                                        ?.getElementById(
                                            'language-dropDown-arrow'
                                        )
                                        ?.classList?.replace(
                                            'rotate-180',
                                            'rotate-0'
                                        );
                                }
                            }}
                        >
                            <div className="w-fit">
                                <div className="relative cursor-pointer flex items-center">
                                    <span>
                                        <LanguageSVG />
                                    </span>
                                </div>
                            </div>
                            <LanguageDropDown />
                        </div>
                        <div className="relative group flex items-center">
                            <AuthSVG />
                            <AuthDropDown />
                        </div>
                        <div
                            className="group flex items-center relative mb-[-4px]"
                            onClick={() => openCart()}
                        >
                            <CartSVG />
                            {itemsInCart?.length > 0 && (
                                <span className="absolute left-[16px] top-[-8px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate">
                                    {itemsInCart.length}
                                </span>
                            )}
                            <CartDropDown itemsInCart={itemsInCart} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
