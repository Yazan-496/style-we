import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../../LoadingComponent/mobile";
import { useTranslation } from "react-i18next";
import { RefreshSvg } from '../../../svgs';
import moment from "moment";

const WalletList = ({
                      WalletLists,
    refresh,
    setRefresh
                    }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation("translation");
  const checkoutLoading = useSelector(
    (state) => state.CheckoutReducer.checkoutLoading
  );
  const WalletTotal = useSelector(
    (state) => state.CheckoutReducer.WalletTotal
  );
  const viewMoreButtonRef = useRef(null);

  const WalletTotalCount = useSelector(
    (state) => state?.CheckoutReducer?.WalletTotalCount
  );
  const handleIncreaseOffset = () => {
    if (!checkoutLoading) {
      dispatch({ type: "INCREASE_OFFSET_WALLET" });
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", function() {
      const buttonElement = viewMoreButtonRef.current;

      if (buttonElement) {
        const buttonRect = buttonElement?.getBoundingClientRect();
        const isButtonVisible = buttonRect.top < window.innerHeight;

        if (isButtonVisible && WalletTotal?.length < WalletTotalCount) {
          // handleIncreaseOffset();
        }
      }
    });
  }, [WalletTotal, WalletTotal?.length]);
  useEffect(() => {
    dispatch({
      type: "GET_WALLET", payload: { offset: 1 }
    });
    dispatch({
      type: "GET_WALLET_PAGINATION", payload: { offset: 1 }
    });
  }, []);
  const formatDate = (date) => {
    return moment(date).format("YYYY-MM-DD HH:mm:ss");
  };
  const sortedWalletTotal = WalletTotal.slice().sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB - dateA;
  });
  return (
    <>
      {/* {checkoutLoading && <LoadingComponent />} */}
      <h3
        className="flex gap-x-10 text-[rgb(49,53,60)] text-2xl font-semibold leading-[29px] mb-6 pb-4 border-b-2 border-b-[rgb(93,98,106)] border-solid">
        <span>{t("user.wallet_transaction")}</span>
        <div className='flex-1' onClick={() => {
          setRefresh(!refresh)
        }}>
          <RefreshSvg />
        </div></h3>
      <div className="flex flex-col">
        <span>{t("user.total_wallet_balance")}: {WalletLists?.total_wallet_balance_formatted}</span>
        <span>{t("user.total_wallet_transaction")}: {WalletLists?.total_wallet_transaction}</span></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sortedWalletTotal?.length > 0 &&
        sortedWalletTotal?.map((WalletList) => (
          <div
            key={WalletList.transaction_id}
            className="p-4 border text-[rgb(92,92,92)] text-[15px] border-solid border-[rgb(231,231,231)]">
            <span>Transaction Id: {WalletList?.transaction_id}</span>
            <div className="text-[rgb(51,51,51)] text-base mb-1">
              {t("user.created_at")}: {formatDate(WalletList.created_at)}
            </div>
            <span className="bg-green-200 block p-1">
          + {t("user.credit")}: {WalletList.credit_formatted}
        </span>
            <span className="bg-red-200 block p-1">
          - {t("user.debit")}: {WalletList.debit_formatted}
        </span>
            <span>
          {t("user.transaction_type")}: {WalletList.transaction_type}
        </span>
          </div>
        ))}
      </div>      <div className={`${
        WalletTotalCount > WalletTotal.length ? "" : "hidden"
      } w-full flex items-center justify-center`}><span
        ref={viewMoreButtonRef}
        className="hover:underline  cursor-pointer"
        onClick={handleIncreaseOffset}
      >
                      {t("main.view_more")}
                    </span></div>
    </>
  );
};
export default WalletList;
