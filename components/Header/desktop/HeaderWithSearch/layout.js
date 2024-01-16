import Image from 'next/legacy/image';
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { SvgMenu } from 'components/svgs';
import { LoaderLogo } from 'helpers/Loader/Loading';
import ContentLoader from 'react-content-loader';
import { useRouter } from 'next/navigation';
const Layout = ({ loading, openCart }) => {
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const [icon, setIcon] = useState(
    'https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png'
  );
  const dispatch = useDispatch();
  const sync = useSelector((store) => store.CartReducer.sync);
  const searchResult = useSelector(
    (store) => store.ProductReducer.searchResult
  );
  const searchValue = useSelector((store) => store.ProductReducer.search_value);
  const searchLoading = useSelector(
    (store) => store.ProductReducer.searchLoading
  );
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
    }
  }, []);

  useEffect(() => {
    if (token) {
    }
  }, [token, sync]);

  useEffect(() => {
    if (shippingCart) {
      setItemsInCart(shippingCart?.cart);
    }
  }, [shippingCart, dispatch]);

  const handleSearch = (e) => {
    if (e) {
      dispatch({ type: 'SET_SEARCH_REDUCER', payload: e });
      dispatch({ type: 'SEARCH', payload: e });
    } else {
      dispatch({ type: 'CLEAR_SEARCH' });
      dispatch({ type: 'SET_SEARCH_REDUCER', payload: null });
    }
  };

  const handleClear = () => {
    if (typeof window !== 'undefined') {
      // const clearButton = document.getElementById("clearButton");
      dispatch({ type: 'SET_SEARCH_REDUCER', payload: null });
      const myInput = document.getElementById('searchInputField');
      myInput.value = '';
      // clearButton.addEventListener("click", function () {
      //    // Set the value property to an empty string
      // });
      handleSearch(null);
    }
  };
  const router = useRouter();

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      handleSearch(searchValue);
      const sanitizedSearchValue = searchValue?.replace(/\//g, '');
      const route = `/products/search_text=${sanitizedSearchValue}`;
      router.push(route);
    }
  }
  
  return (
    <div
      className={`header flex items-center justify-between py-[18px] mx-auto`}
    >
      <div className="pl-[30px] w-[200px] left-box-logo flex">
        <Link href={'/'}>
          {!icon ? (
            <LoaderLogo
              width={130}
              height={60}
              viewBox={'0 0 900 300'}
              rotate={'200'}
            />
          ) : (
            <img
              className="cursor-pointer w-[200px] h-[40px]"
              src={icon}
              alt="logo"
            />
          )}
        </Link>
      </div>
      <div className="relative pl-[40%]">
        <div
          className=" relative"
          id="searchArea"
          onMouseLeave={() => {
            if (typeof window !== 'undefined') {
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
            }
          }}
          onMouseOver={() => {
            setIsMouseOn(true);
          }}
        >
          <div className="flex justify-end items-start flex-grow-0 flex-shrink-0 w-[372px]">
            <div className="flex justify-start items-center flex-grow relative gap-2.5 px-3 py-2.5 rounded-tl-[4px] rounded-bl-[4px] bg-white border border-[#E0E1E3]">
              <input
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  if (typeof window !== 'undefined') {
                    setIsFocused(false);
                    if (
                      document
                        ?.getElementById('searchDropDownMenu')
                        ?.classList?.contains('flex') &&
                      !isMouseOn
                    ) {
                      document
                        ?.getElementById('searchDropDownMenu')
                        ?.classList?.replace('flex', 'hidden');
                    }
                  }
                }}
                onFocus={() => {
                  if (typeof window !== 'undefined') {
                    setIsFocused(true);
                    if (
                      document
                        ?.getElementById('searchDropDownMenu')
                        ?.classList?.contains('hidden')
                    ) {
                      document
                        ?.getElementById('searchDropDownMenu')
                        ?.classList?.replace('hidden', 'flex');
                    }
                  }
                }}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                id="searchInputField"
                autoComplete="off"
                className="flex-auto overflow-hidden outline-none text-[14px] leading-[26px] text-left text-[#868C93] pr-[22px]"
              />
              <div
                id="clearButton"
                onClick={() => {
                  handleClear();
                  setIsFocused(false);
                }}
              >
                <CancelSVG />
              </div>
            </div>
            <Link
              href={`/products/search_text=${searchValue?.replace(/\//g, '')}`}
            >
              <div
                onClick={() => handleSearch(searchValue)}
                className="text-white h-[auto] flex justify-center items-center flex-grow-0 flex-shrink-0 w-[72px] h-12 relative overflow-hidden gap-1 p-3 rounded-tr-[4px] rounded-br-[4px] cursor-pointer bg-[#31353c] hover:bg-[#31353ccc]"
              >
                <SearchSVG />
              </div>
            </Link>
          </div>
          {
            <div className="hidden" id="searchDropDownMenu">
              <SearchDropDown
                handleSearch={(value) => handleSearch(value)}
                searchResult={searchResult}
              />
            </div>
          }
        </div>
      </div>
      <div className="right-box pr-[60px] ">
        <div className="icons gap-[36px] flex item-center pl-[32px] notranslate">
          <div
            className="group language-and-currency-popup relative"
            onMouseLeave={() => {
              if (typeof window !== 'undefined') {
                if (
                  document
                    ?.getElementById('currency-dropDownx')
                    ?.classList?.contains('flex')
                ) {
                  document
                    ?.getElementById('currency-dropDownx')
                    ?.classList?.replace('flex', 'hidden');
                  document
                    ?.getElementById('currency-dropDown-arrow')
                    ?.classList?.replace('rotate-180', 'rotate-0');
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
                    ?.getElementById('language-dropDown-arrow')
                    ?.classList?.replace('rotate-180', 'rotate-0');
                }
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

            {!loading && <CartDropDown itemsInCart={itemsInCart} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
