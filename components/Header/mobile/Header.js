import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Link from 'helpers/Link';
import { LoaderLogo } from 'helpers/Loader/Loading';
import { useDispatch, useSelector } from 'react-redux';
const HeaderMobile = ({
  openSideBar,
  loading,
  collection,
  categories,
  handleOpenSearchModal,
  handleCloseSearchModal,
}) => {
  const router = useRouter();
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsSticky(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [icon, setIcon] = useState(
    "https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
  );

  const [isMain, setIsMain] = useState(true);
  useEffect(() => {
    // console.log(router);
    return () => {
      router.asPath !== '/' && setIsMain(false);
    };
  }, [router]);
  const [hideHeader, setHideHeader] = useState(false);
  const [itemsInCart, setItemsInCart] = useState([]);
  const shippingCart = useSelector((store) => store.CartReducer.shippingCart);
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
    }
  }, []);
  const sync = useSelector((store) => store.CartReducer.sync);
  useEffect(() => {
    if (token) {
      dispatch({ type: 'GET_ITEMS_CART' });
    }
  }, [token, sync]);
  useEffect(() => {
    if (shippingCart) {
      setItemsInCart(shippingCart?.cart);
    }
  }, [shippingCart, dispatch]);
  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const isScrolledDown = scrollTop > 0;
      setHideHeader(isScrolledDown);
    }, 200);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header>
        <div
          style={{
            zIndex: 101,
            position: 'relative',
            backgroundColor: 'white!important',
          }}
        >
          <div className="home-nav-bar">
            <div className="flex flex-row justify-center items-center space-x-4 truncate">
              <div
                className={`${
                  isMain ? 'hidden' : 'relative left-0 components-nav-bar__back'
                } `}
              >
                <Link href="/">
                  <i className="pb-[5px] iconfont icon-c_icon_left show" />
                </Link>
              </div>
              <div
                onClick={() => {
                  openSideBar();
                }}
                className="person components-header-nav-icon-btn"
                id="header-nav-icon"
              >
                <i className="iconfont icon-icon_header_nav"></i>
              </div>
            </div>
            <Link href="/">
              {!icon ? (
                <div className="w-full  flex items-center justify-center text-center">
                  <LoaderLogo
                    width={100}
                    height={30}
                    viewBox={'0 0 400 100'}
                    rotate={'200'}
                  />
                </div>
              ) : (
                <img src={icon} alt="site logo" className="logo" />
              )}
            </Link>
            <div className="right-wrap">
              <Link className="person" href="/account/login">
                  <i className="iconfont icon-icon_header_me">
                    <p
                      className="person-count notranslate"
                      style={{ display: 'none' }}
                    ></p>
                  </i>
              </Link>
              <div onClick={handleOpenSearchModal}>
                <a
                  className="components-header-search-icon-btn v1-icon"
                  id="header-search-icon"
                >
                  <i className="iconfont icon-icon_header_search"></i>
                </a>
              </div>
              {/*</Link>*/}
              <Link className="bag notranslate v1-icon" href="#">
                  {itemsInCart?.length > 0 && (
                    <span className="absolute left-[16px] top-[-5px] flex justify-center items-center h-[16px] min-w-[16px] px-1 gap-2.5 py-px rounded-[40px] bg-red-600 text-xs text-white notranslate">
                      {itemsInCart.length}
                    </span>
                  )}
                  <i className="iconfont icon-icon_header_cart"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default HeaderMobile;
