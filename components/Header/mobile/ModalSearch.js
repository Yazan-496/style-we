import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  HotSearchSVG,
  SvgArrowLeft,
  TrendingSearchSVG,
  CancelSVG,
} from "components/svgs";
import Link from "helpers/Link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import store from "../../../store";
const ModalSearch = ({ handleCloseSearchModal }) => {
  const dispatch = useDispatch();
  const [recentSearches, setRecentSearches] = useState([]);
  const searchResult = useSelector(
    (store) => store.ProductReducer.searchResult
  );
  const searchValue = useSelector((store) => store.ProductReducer.search_value);
  const searchLoading = useSelector(
    (store) => store.ProductReducer.searchLoading
  );
  const handleSearch = (e) => {
    if (e) {
      dispatch({ type: "SET_SEARCH_REDUCER", payload: e });
      dispatch({ type: "SEARCH", payload: e });
    } else {
      dispatch({ type: "CLEAR_SEARCH" });
      dispatch({ type: "SET_SEARCH_REDUCER", payload: null });
    }
  };
  const handleClear = () => {
    if (typeof window !== "undefined") {
      // const clearButton = document.getElementById("clearButton");
      dispatch({ type: "SET_SEARCH_REDUCER", payload: null });
      const myInput = document.getElementById("searchInputField");
      myInput.value = "";
      // clearButton.addEventListener("click", function () {
      //    // Set the value property to an empty string
      // });
      handleSearch(null);
    }
  };
  function handleSelectRecentSearch(value) {
    // console.log(value, "value");
    if (value) {
      handleSearch(value);
      dispatch({ type: "SET_SEARCH_REDUCER", payload: value });
    }
  }
  useEffect(() => {
    const recent = JSON.parse(localStorage.getItem("RECENT_SEARCH"));
    setRecentSearches(recent);

    const unsubscribe = store.subscribe(() => {
      const updatedRecent = JSON.parse(localStorage.getItem("RECENT_SEARCH"));
      if (updatedRecent) {
        setRecentSearches(updatedRecent);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const router = useRouter();
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      handleSearch(searchValue);
      const sanitizedSearchValue = searchValue?.replace(/\//g, "");
      const route = `/products/search_text=${sanitizedSearchValue}`;
      router.push(route);
      handleCloseSearchModal();
    }
  }
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="z-50 w-full h-full bg-white overflow-y-auto">
      <div className="flex items-center space-x-4 justify-center pt-5 pb-5 px-5 w-full sticky top-0 z-50 bg-white ">
        <button
          className="font-[500] relative text-xl"
          onClick={handleCloseSearchModal}
        >
          <SvgArrowLeft />
        </button>
        <div className="flex justify-start items-center flex-grow relative gap-2.5 py-2.5 rounded-tl-[4px] rounded-bl-[4px] bg-white ">
          <input
            onKeyPress={handleKeyPress}
            value={searchValue}
            autoComplete="off"
            onChange={(e) => handleSearch(e.target.value)}
            id="searchInputField"
            className="inp border-none h-5 flex items-center justify-center flex-auto overflow-hidden outline-none text-[14px] leading-[26px] text-left text-[#868C93] pr-[22px]"
          />
          <div
            id="clearButton"
            onClick={() => {
              handleClear();
            }}
            className="absolute right-0 top-[2px]"
          >
            <CancelSVG />
          </div>
        </div>
        <Link href={`/products/search_text=${searchValue?.replace(/\//g, "")}`}
          onClick={() => {
            handleCloseSearchModal();
          }}
        >
          <span className="font-[700] text-xl">{t("user.search")}</span>
        </Link>
      </div>
      <div className="p-4">
        <div className="overflow-y-auto h-auto max-h-100 overflow-x-hidden z-[1] top-auto flex flex-col justify-start items-start gap-6 bg-white rounded-[4px] mt-[2px] w-full">
          {searchLoading ? (
            <div className=" w-full flex h-20 items-center justify-center">
              {/* <LoadingComponent /> */}
              ""
            </div>
          ) : (
            searchValue &&
            searchResult.map((searchRes) => {
              return (
                <div className="w-full border-b border-b-[#a3a3a347]">
                  <Link
                    href={`/products/search_text=${searchRes?.name?.replace(
                      /\//g,
                      ""
                    )}`}
                    onClick={() => {
                      handleCloseSearchModal();
                    }}
                    className="cursor-pointer"
                  >
                      <div className="cursor-pointer">{searchRes?.name}</div>
                  </Link>
                </div>
              );
            })
          )}
        </div>

        {recentSearches?.length > 0 && (
          <div className="w-full p-2 border border-t-[1px] border-t-gray h-auto w-full flex flex-wrap items-center">
            <div className="flex flex-col w-full justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
              <div className="w-full flex flex-wrap justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-[90px]">
                <div className="w-full flex-grow-0 flex-shrink-0 text-base text-left text-[#000000] flex items-center">
                  <TrendingSearchSVG />
                  {t("main.recent_search")}
                </div>
              </div>
              <div className="w-full flex flex-wrap">
                {recentSearches?.map((recent) => {
                  return (
                    <div className="w-full p-4">
                      <Link
                        href={`/products/search_text=${recent?.replace(
                          /\//g,
                          ""
                        )}`}
                        onClick={() => {
                          handleCloseSearchModal();
                        }}
                        className="flex w-fit max-w-[100%]  break-words whitespace-normal  p-5 flex-grow-0 flex-shrink-0 h-auto relative gap-1 px-[16px] py-[6px] rounded-[4px] bg-[#F2F2F2] text-black hover:bg-[#E7E7E7]"
                      >
                          <HotSearchSVG />
                          <div
                            onClick={(e) => handleSelectRecentSearch(recent)}
                            className="cursor-pointer  w-fit max-w-[100%]  break-words whitespace-normal  flex-grow-0 flex-shrink-0 text-sm text-left text-[#31353C]"
                          >
                            {recent}
                          </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ModalSearch;
