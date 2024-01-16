'use client';
import { useState } from 'react';
import { LoaderCategory } from 'helpers/Loader/Loading';
import { Link } from 'react-feather';
import {
  AuthSVG,
  CartSVG,
  LanguageSVG,
  CancelSVG,
  SearchSVG,
  TrendingSearchSVG,
} from 'components/svgs';
import TopBanner from 'components/Header/mobile/TopBanner';

const InitialMobileHeader = () => {
  const [load, setLoad] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1]);
  return (
    <div>
      {/*<TopBanner />*/}
      <div
        style={{
          zIndex: 101,
          position: 'relative',
          backgroundColor: 'white!important',
        }}
      >
        <div className="home-nav-bar">
          <div className="flex flex-row justify-center items-center space-x-4 truncate">
            <div>
              {/* <Link href="/">
                <i className="pb-[5px] iconfont icon-c_icon_left show" />
              </Link> */}
            </div>
            <div
              className="person components-header-nav-icon-btn"
              id="header-nav-icon"
            >
              <i className="iconfont icon-icon_header_nav"></i>
            </div>
          </div>

          <div className="w-full  flex items-center justify-center text-center">
            <img
              src="https://www.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
              alt="site logo"
              className="logo"
            />
          </div>

          <div className="right-wrap">
            <a className="person">
              <i className="iconfont icon-icon_header_me">
                <p
                  className="person-count notranslate"
                  style={{ display: 'none' }}
                ></p>
              </i>
            </a>

            {/*<Link href="/">*/}
            <div>
              <a
                className="components-header-search-icon-btn v1-icon"
                id="header-search-icon"
              >
                <i className="iconfont icon-icon_header_search"></i>
              </a>
            </div>
            {/*</Link>*/}

            <a className="bag notranslate v1-icon">
              <i className="iconfont icon-icon_header_cart"></i>
            </a>
          </div>
        </div>
      </div>

      {/* <div
        id="slide-nav-categories"
        className="w-max min-w-full flex justify-center items-center py-0 pr-8 coltragap"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <LoaderCategory
            key={i}
            width={100}
            height={30}
            viewBox={'0 0 290 80'}
          />
        ))}
      </div> */}
      {/* <div className="pt-[10px] flex flex-row space-x-4">
        {load.map((one, i) => {
          return (
            <div key={i}>
              <LoaderCategory
                width={'100%'}
                height={30}
                viewBox={'0 0 100% 810'}
              />
            </div>
          );
        })}
      </div> */}
    </div>
  );
};

export default InitialMobileHeader;
