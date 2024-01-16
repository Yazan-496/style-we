import Image from "next/legacy/image";
import Link from "helpers/Link";
import { store } from "store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LanguageDropDown = (props) => {
  const lang_code = store.getState().LanguageReducer.langCode;
  let [translations, setTranslations] = useState(
    store.getState().LanguageReducer.data[lang_code]
  );
  const handleChangeLanguage = (langCode) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("langCode", langCode);
    }
    store.dispatch({ type: "SET_LANGUAGE", payload: langCode });
    setTranslations(store.getState().LanguageReducer.data[langCode]);
  };
  return (
    <>
      <div className="hidden absolute group-hover:flex">
        <div className="w-[320px] relative top-full bg-white rounded z-[10]">
          <div className="flex flex-col justify-center items-center w-[320px] absolute left-[-279px] top-[-1px] z-[10] pt-[10px] iofgjofdpgjidfojg">
            <div className="dropdown-lang-wrapper w-[320px] px-[16px] pt-[20px] pb-[8px] bg-white relative cursor-pointer">
              <div className="text-[16px] w-[100%] font-[700] text-[#31353C] leading-[24px] mb-[16px] notranslate truncate">
                {translations.header.language.language}
              </div>
              <ul className="domain-list flex flex-wrap overflow-hidden">
                <li className="mb-[15px] mr-[24px] hover:bg-[#FAFAFA]">
                  <Link
                    className="text-[#000] flex items-center hover:underline"
                    rel=""
                    href="/"
                  >
                      <div className="w-[20px] mr-[5px]">
                        <img
                          className="block h-[20px] w-[20px]"
                          alt=""
                          src="/image/catalog/activity/oixSYi4ZhW1642056776.png"
                        />
                      </div>
                      <span className="text-[14px] leading-[17px] text-[#31353C]">
                        {translations.header.language.Français}
                      </span>
                  </Link>
                </li>
                <li className="mb-[15px] mr-[24px] hover:bg-[#FAFAFA]">
                  <Link 
                    href="/"
                    className="text-[#000] flex items-center hover:underline"
                    rel=""
                  >
                      <div className="w-[20px] mr-[5px]">
                        <img
                          className="block h-[20px] w-[20px]"
                          alt=""
                          src="/image/catalog/activity/IH5xGRYUrN1665382331.png"
                        />
                      </div>
                      <span className="text-[14px] leading-[17px] text-[#31353C]">
                        {translations.header.language.Deutsch}
                      </span>
                  </Link>
                </li>
              </ul>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  d="M5 9.52414L8.63636 13.3337L15 6.66699"
                  stroke="#31353C"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>

              <select
                defaultValue={lang_code}
                onChange={(e) => handleChangeLanguage(e.target.value)}
                className="minimal lang-wrapper notranslate min-w-[100%] min-h-[30px] relative flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 gap-2 p-3 bg-white border border-[#CED0D3] rounded-[2px] hover:border-[#5D626A]"
              >
                <option value="en">English</option>
                <option
                  className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]"
                  value="ae"
                >
                  {translations.header.language.arabic}
                </option>
              </select>
            </div>
            <div className="flex flex-col w-[320px] justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4 px-4 py-4 bg-white">
              <div className="text-[16px] self-stretch flex-grow-0 flex-shrink-0 w-[100%] font-bold text-left text-[#31353c] truncate">
                {translations.header.language.currency}
              </div>
              <div className="relative w-[100%]">
                <div
                  onClick={() => {
                    if (
                      document
                        ?.getElementById("currency-dropDownx")
                        ?.classList?.contains("hidden")
                    ) {
                      document
                        ?.getElementById("currency-dropDownx")
                        ?.classList?.replace("hidden", "flex");
                      document
                        ?.getElementById("currency-dropDown-arrow")
                        ?.classList?.replace("rotate-0", "rotate-180");
                    } else {
                      document
                        ?.getElementById("currency-dropDownx")
                        ?.classList?.replace("flex", "hidden");
                      document
                        ?.getElementById("currency-dropDown-arrow")
                        ?.classList?.replace("rotate-180", "rotate-0");
                    }
                  }}
                  className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-11 gap-2 p-3 bg-white border border-[#CED0D3] rounded-[2px] hover:border-[#5D626A] cursor-pointer"
                >
                  <div className="flex justify-center items-center flex-grow relative gap-2">
                    <div className="flex-grow w-48 text-[16px] text-left text-[#31353c]">
                      USD
                      <span className="text-[#31353c] text-[16px] ml-[8px]">
                        $
                      </span>
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      id="currency-dropDown-arrow"
                      className="flex-grow-0 flex-shrink-0 w-6 h-6 relative rotate-0"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path d="M6 9L12 15L18 9" stroke="#5D626A"></path>
                    </svg>
                  </div>
                </div>
                <div
                  id="currency-dropDownx"
                  className="hidden iofgjofdpgjidfojg flex-col justify-start items-start w-full left-0 absolute top-auto max-h-[208px] overflow-auto bg-white"
                >
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA] bg-[#f2f2f3] hover:bg-[#f2f2f3]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      USD
                    </div>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-grow-0 flex-shrink-0 w-5 h-5 relative"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <path
                        d="M5 9.52414L8.63636 13.3337L15 6.66699"
                        stroke="#31353C"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      AED
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      AUD
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      CAD
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      CNY
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      EUR
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      PLN
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      GBP
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      HKD
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      JPY
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      MXN
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      MYR
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      NZD
                    </div>
                  </div>
                  <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-[12px] h-[47px] cursor-pointer hover:bg-[#FAFAFA]">
                    <div className="flex-grow-0 flex-shrink-0 text-[16px] text-left text-[#31353c]">
                      TWD
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageDropDown;
