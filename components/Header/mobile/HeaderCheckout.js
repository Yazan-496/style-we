import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import Link from 'helpers/Link';
import { LoaderLogo } from 'helpers/Loader/Loading';
import { useDispatch, useSelector } from 'react-redux';
import ModalFilters from '../../CollectionBody/mobile/ModalFilters';
import ModalSearch from './ModalSearch';
import { SvgArrowLeft } from '../../svgs';
import { useTranslation } from 'react-i18next';
import LogoBox from '../desktop/HeaderWithoutSearch/LogoBox';

const HeaderCheckout = ({ title }) => {
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
    'https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png'
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

  const { t, i18n } = useTranslation('translation');
  const handleBack = () => {
    router.push('/account/login');
  };
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
          <div className="border h-auto border-b-[1px] border-gray-200 p-5 flex items-center justify-between home-nav-bar">
            <a onClick={handleBack}>
              <SvgArrowLeft />
            </a>
            {/*</Link>*/}
            <div className="flex flex-row items-center gap-x-2 justify-center">
              <Link href="/">
                  <img
                    alt=""
                    style={{
                      height: '25px',
                    }}
                    className="w-auto"
                    src={icon}
                  />
              </Link>
            </div>
            <h1 className="text-center font-[600]">
              {title ? title : t('user.order_confirmation')}
            </h1>
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
      </header>
    </>
  );
};
export default HeaderCheckout;
