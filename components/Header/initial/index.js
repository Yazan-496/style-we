'use client';
import {
  AuthSVG,
  CartSVG,
  LanguageSVG,
  CancelSVG,
  SearchSVG,
  TrendingSearchSVG,
} from 'components/svgs';
import { LoaderCategory } from 'helpers/Loader/Loading';
import TopBanner from '../desktop/TopBanner';

const InitialHeader = () => {
  return (
    <>
      {/*<TopBanner />*/}
      <div className="shadow-lg pr-6 pt-[3px]">
        <div
          className={`overflow-hidden w-full z-[50]
    `}
        >
          <div
            className={`header flex items-center justify-between py-[18px] mx-auto`}
          >
            <div className="pl-[30px] w-[200px] left-box-logo flex">
              <img
                className="cursor-pointer w-[200px] h-[40px]"
                src="https://backend-live.clearance.ae/storage/company/2023-02-06-63e08deba2852.png"
                alt="logo"
              />
            </div>
            <div className="relative pl-[40%] mr-9">
              <div className=" relative" id="searchArea">
                <div className="flex justify-end items-start flex-grow-0 flex-shrink-0 w-[380px]">
                  <div className="flex justify-start items-center flex-grow relative gap-2.5 px-3 py-2.5 rounded-tl-[4px] rounded-bl-[4px] bg-white border border-[#E0E1E3]">
                    <input
                      id="searchInputField"
                      autoComplete="off"
                      className="flex-auto overflow-hidden outline-none text-[14px] leading-[26px] text-left text-[#868C93] pr-[22px]"
                    />
                    <div id="clearButton">
                      <CancelSVG />
                    </div>
                  </div>

                  <div className="text-white flex justify-center items-center flex-grow-0 flex-shrink-0 w-[72px] h-[45px] relative overflow-hidden gap-1 p-3 rounded-tr-[4px] rounded-br-[4px] cursor-pointer bg-[#31353c] hover:bg-[#31353ccc]">
                    <SearchSVG />
                  </div>
                </div>
                {
                  <div className="hidden" id="searchDropDownMenu">
                    <TrendingSearchSVG />
                  </div>
                }
              </div>
            </div>
            <div className="right-box flex items-center justify-end  pr-[40px] gap-[36px]">
              <div className="icons relative cursor-pointer flex items-center gap-[36px]">
                <span>
                  <LanguageSVG />
                </span>
              </div>
              <div className="relative group flex items-center">
                <AuthSVG />
                {/* <AuthDropDown /> */}
              </div>
              <div className="group flex items-center relative mb-[-4px]">
                <CartSVG />
              </div>
            </div>
          </div>
        </div>
        <div
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
        </div>
      </div>
    </>

  );
};

export default InitialHeader;
