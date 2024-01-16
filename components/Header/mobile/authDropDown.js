import Image from "next/legacy/image";
import Link from "helpers/Link";
import { useEffect, useReducer, useRef, useState } from "react";
import { store } from "store";
import { useSelector } from "react-redux";

const AuthDropDown = (props) => {
  let loading = useSelector((store) => store.LanguageReducer.loading);
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  useEffect(() => {
    setTranslations(store.getState().LanguageReducer.data[lang_code]);
  }, [loading]);
  return (
    <>
      <div className="iofgjofdpgjidfojg absolute translate-x-[50%] z-50 top-full justify-center items-center max-w-[280px] min-w-[240px] hidden group-hover:flex right-[50%]">
        <div className="flex flex-col items-center w-full">
          <div className="flex w-full relative asdaswwww">
            <svg
              width="16"
              height="8"
              viewBox="0 0 16 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0"
              preserveAspectRatio="xMidYMid meet"
            >
              <path d="M8 0L16 8H0L8 0Z" fill="white"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center items-center gap-4 self-stretch flex-grow-0 flex-shrink-0 relative p-4 rounded bg-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
            <button className="flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow h-10 w-full text-base gap-1 px-3 py-2">
              <a href="/account/login">
                <div className="inline-block truncate opacity-1 group-active:opacity-90">
                  {translations.header.user.signin} /
                  {translations.header.user.register}
                </div>
              </a>
            </button>
            <div className="self-stretch flex-grow-0 flex-shrink-0 w-full text-[14px] leading-[17px] text-center text-[#9999A4]">
              {translations.header.user.or_sign_in}
            </div>
            <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-10 overflow-hidden">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M36 18C36 8.05887 27.9411 0 18 0C8.05887 0 0 8.05887 0 18C0 26.9843 6.58238 34.431 15.1875 35.7813V23.2031H10.6172V18H15.1875V14.0344C15.1875 9.52313 17.8748 7.03125 21.9864 7.03125C23.9558 7.03125 26.0156 7.38281 26.0156 7.38281V11.8125H23.7459C21.5099 11.8125 20.8125 13.2 20.8125 14.6235V18H25.8047L25.0066 23.2031H20.8125V35.7813C29.4177 34.431 36 26.9843 36 18Z"
                  fill="#1877F2"
                ></path>
                <path
                  d="M25.0066 23.2031L25.8047 18H20.8125V14.6235C20.8125 13.2 21.5098 11.8125 23.7459 11.8125H26.0156V7.38281C26.0156 7.38281 23.9557 7.03125 21.9864 7.03125C17.8748 7.03125 15.1875 9.52313 15.1875 14.0344V18H10.6172V23.2031H15.1875V35.7813C16.1039 35.9251 17.0432 36 18 36C18.9568 36 19.896 35.9251 20.8125 35.7813V23.2031H25.0066Z"
                  fill="white"
                ></path>
              </svg>
            </div>
            <div className="self-stretch flex-grow-0 flex-shrink-0 h-px bg-[#e0e1e3]"></div>
            <Link 
              href="/account/orderlist"
              rel="nofollow"
              className="self-stretch flex-grow-0 flex-shrink-0 w-full text-base leading-[21px] text-left text-[#5d626a] hover:font-[700]"
            >
              {translations.header.user.my_order}
            </Link>
            <Link 
              href="/account/coupon"
              rel="nofollow"
              className="self-stretch flex-grow-0 flex-shrink-0 w-full text-base leading-[21px] text-left text-[#5d626a] hover:font-[700]"
            >
              {translations.header.user.my_coupons}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthDropDown;
