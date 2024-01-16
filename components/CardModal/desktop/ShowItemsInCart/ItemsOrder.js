import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SvgCheckbox } from 'components/svgs';
import { useTranslation } from 'react-i18next';
import Link from '../../../../helpers/Link';
import Loading from 'components/Loading';
import ConfirmDialog from '../../../Account/desktop/ConfirmDialog';
import store from '../../../../store';
import { TransClient } from 'helpers/TransClient';

const ItemsOrder = ({
  items,
  setTotal,
  setSelected,
  selectAll,
  setSaved,
  setPriceForFree,
  order,
  refresh,
  setRefresh
}) => {
  const checkRef = useRef([]);
  const [check, setCheck] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isCancelItem, setIsCancelItem] = useState(false);
  const [limitFree, setLimitFree] = useState(order?.limitFree || 0);
  const redeemProductIds = JSON.parse(localStorage.getItem('REDEEM_PRODUCTS_IDS')) || [];
  const [customerInfo, setCustomerInfo] = useState(null);
  let checkedItems = useSelector((store) => store.CartReducer.items);
  const dispatch = useDispatch();
  const handleCheck = (i, item) => {
    if (checkRef?.current) {
      checkRef.current[i] = !checkRef.current[i];
      // Get checked items
      const checkedItems = items.filter(
        (item, index) => checkRef.current[index]
      );

      setSelected(checkedItems?.length);
    }
    setCheck(!check);
    handleCheckedItems(item);
  };
  const handleCheckedItems = (item) => {
    if (checkedItems?.indexOf(item) !== -1) {
      checkedItems?.splice(checkedItems.indexOf(item), 1);
    } else {
      checkedItems.push(item);
    }
  };

  const handleDeleteFromCart = (item, i) => {
    setItemToDelete(item);
    setIsOpenDialog(true);
  };
  const handleCancelDelete = () => {
    setIsOpenDialog(false);
    setItemToDelete(null);
  };
  const handleConfirmDelete = () => {
    if (itemToDelete) {
      dispatch({
        type: 'UPDATE_ITEM_IN_ORDER',
        payload: {
          data: {
            order_id: itemToDelete.order_id,
            qty: itemToDelete?.qty,
            detail_id: itemToDelete.id,
          },
        },
      });
    }
    setIsOpenDialog(false);
    setItemToDelete(null);
  };
  const [totalPrices, setTotalPrices] = useState({});
  const [totalSaved, setTotalSaved] = useState({});
  const [Quantities, setQuantities] = useState({});
  const handleQuantityChange = useCallback((quant, item) => {
    // console.log(item);
    if (quant > 0) {
      dispatch({
        type: 'UPDATE_ITEM_IN_ORDER',
        payload: {
          data: {
            order_id: item.order_id,
            qty: 1,
            detail_id: item.id,
          },
        },
      });
    }
  }, []);
  useEffect(() => {
    if (items) {
      const defaultTotalPrices = {};
      const defaultQuantities = {};
      const defaultOldPrice = {};

      items.forEach((item, i) => {
        handleCheck(i, item);
        const quantity = item.qty || 1;
        const price = item.offer_price;
        const oldPrice = item.price - item.offer_price;
        const newTotalPrice = (quantity * price).toFixed(1);
        const newOldPrice = (quantity * oldPrice).toFixed(1);
        const newQuantities = quantity;

        defaultTotalPrices[item.id] = newTotalPrice;
        defaultOldPrice[item.id] = newOldPrice;
        defaultQuantities[item.id] = newQuantities;
      });

      setTotalPrices(defaultTotalPrices);
      setTotalSaved(defaultOldPrice);
      setQuantities(defaultQuantities);
    }
  }, []);
  useEffect(() => {
    items?.map((item) => {
      const quantity = Quantities[item.id];
      // handleQuantityChange(quantity, item);
    });
  }, [items, handleQuantityChange]);
  useEffect(() => {
    const totalPriceSum = Object.values(totalPrices).reduce(
      (sum, price) => sum + parseFloat(price),
      0
    );
    const totalSavedSum = Object.values(totalSaved).reduce(
      (sum, price) => sum + parseFloat(price),
      0
    );
    const totalFormatted = totalPriceSum.toFixed(1);
    const savedFormatted = totalSavedSum.toFixed(1);
    setTotal(totalFormatted);
    setSaved(savedFormatted);

    const limit =
      limitFree - totalFormatted < 0 ? 0.0 : limitFree - totalFormatted;
    // setPriceForFree(limit.toFixed(1));
  }, [totalPrices]);

  function handleSelectAll(i, item, selectAll) {
    if (checkRef?.current) {
      checkRef.current[i] = !selectAll;
      // Get checked items
      const checkedItems = items.filter(
        (item, index) => checkRef.current[index]
      );
      setSelected(checkedItems?.length);
    }
  }

  useEffect(() => {
    items.forEach((item, i) => {
      handleSelectAll(i, item, selectAll);
    });
  }, [selectAll]);
  useEffect(() => {
    // console.log(items, "items");
  }, [items]);

  const getQuantityById = (id) => {
    const item = items.find((item) => item.product_details.id === id);
    // console.log(item, item);
    return item ? item.qty : 0;
  };

  const getTotalPriceById = (id) => {
    const item = items.find((item) => item.product_details.id === id);
    const final = item ? parseInt(item.price) * item.qty : 0;
    return final?.toFixed(2);
  };
  const getOfferTotalPriceById = (id) => {
    const item = items.find((item) => item.product_details.id === id);
    const final = item ? parseInt(item.price_after_discount) * item.qty : 0;
    return final?.toFixed(2);
  };

  const getSaveById = (id) => {
    const item = items.find((item) => item.product_details.id === id);
    const final = item
      ? (parseInt(item.price) - parseInt(item.price_after_discount)) * item.qty
      : 0;
    return final?.toFixed(2);
  };

  function getColor(offer_price, price) {
    const num = 100 - parseInt((offer_price * 100) / price);
    switch (true) {
      case 0 < num && num < 39:
        return 'bg-green-600';
      case 38 < num && num < 74:
        return 'bg-yellow-400';
      case 73 < num && num < 89:
        return 'bg-orange-600';
      case 88 < num && num < 101:
        return 'bg-red-600';
      default:
        return '';
    }
  }
  const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem('SITTING'));
    if (sit?.sitting?.countries) {
      setCustomerInfo(
          sit?.sitting?.order_status_can_canceled_item
      );
    } else {
      sit = JSON.parse(sessionStorage.getItem('SITTING'));
      if(sit?.sitting?.countries.length > 0 ) {
        setCustomerInfo(
            sit?.sitting?.order_status_can_canceled_item
        );
      }
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
      if (updatedSitting?.sitting) {
        setCustomerInfo(
            updatedSitting?.sitting?.order_status_can_canceled_item
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncSitting, items]);
  useEffect(() => {
    if (customerInfo?.length > 0) {
      if (customerInfo?.filter((one) => one === order?.order_status)[0]) {
        setIsCancelItem(true);
      }
    }
  }, [customerInfo]);
  useEffect(() => {
    // console.log(order, 'order');
  }, [order]);
  const { t, i18n } = useTranslation('translation');
  return (
    <div dir={TransClient("user.dir")}>
      <div
        className={`${
          order?.order_status === 'pending' ? 'bg-blue-400' : 'bg-red-600'
        } w-full overflow-auto rounded-[5px] text-center text-white font-[700] text-base mt-3 mb-3 `}
      >
        {TransClient(`main.${order?.order_status}`)}
      </div>
      <div
        className={`${
          order?.payment_status === 'unpaid' ? 'bg-red-600' : 'bg-green-500'
        } w-full rounded-[5px] text-center text-white font-[700] text-base mt-3 mb-3 `}
      >
        {TransClient(`main.${order?.payment_status}`)}
      </div>
      <div
        className={`w-full rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
      >
        {TransClient("user.order_id")}: {items[0]?.order_id}
      </div>
      <h1>{TransClient("user.products")}</h1>
      {items?.map((item, i) => {
        return (
          <div
            key={i}
            className={`${
              item.qty > 0 ? '' : 'hidden'
            } p-[10px] flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4`}
          >
            <div
              onClick={() => handleCheck(i, item)}
              ref={checkRef}
              key={i}
              className="hidden flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-4 relative"
            >
              <div key={i}>
                <SvgCheckbox
                  click={checkRef?.current && checkRef?.current[`${i}`]}
                />
              </div>
            </div>
            <div className="flex flex-col gap-x-4 w-full">
              <div className="flex gap-3">
                <div className="flex-grow-0 flex-shrink-0 w-[102px] h-[136px] relative bg-[#ebebeb]">
                  {
                    <div
                      className={`style_discountTag__LG3NB_small z-10 w-fit rounded relative ${item?.product_details?.redeem_price > 0 ? "bg-green-500" : getColor(
                        parseInt(item?.product_details?.offer_price),
                        parseInt(item?.product_details?.price)
                      )} `}
                    >
                      {item?.product_details?.redeem_price > 0 ? (
                        <span>-{item?.product_details?.redeem_discount_rate.toFixed(0)}%</span>
                      ) : (
                        100 -
                        (parseInt(item?.product_details?.offer_price) * 100) /
                        parseInt(item?.product_details?.price) !== 0 && (
                          <span className={`style_discountTagInner__xrve6_small notranslate`}>
                            -
                            {(
                              100 -
                              (parseInt(item?.product_details?.offer_price) * 100) /
                              parseInt(item?.product_details?.price)
                            )?.toFixed(0)}
                            %
                          </span>
                        )
                      )}
                    </div>

                  }
                  <Link href={`/product/${item?.product_details.slug}`}>
                    <span
                      className="cursor-pointer"
                      style={{
                        boxSizing: 'border-box',
                        display: 'block',
                        overflow: 'hidden',
                        width: 'initial',
                        height: 'initial',
                        background: 'none',
                        opacity: 1,
                        border: 0,
                        margin: 0,
                        padding: 0,
                        position: 'absolute',
                        inset: 0,
                      }}
                    >
                      <img
                        alt="Plain Crew Neck Loose Elegant Dress"
                        // sizes="100vw"
                        src={item.product_details.thumbnail ?? ''}
                        decoding="async"
                        data-nimg="fill"
                        style={{
                          position: 'absolute',
                          inset: 0,
                          boxSizing: 'border-box',
                          padding: 0,
                          border: 'none',
                          margin: 'auto',
                          display: 'block',
                          width: 0,
                          height: 0,
                          minWidth: '100%',
                          maxWidth: '100%',
                          minHeight: '100%',
                          maxHeight: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </span>
                  </Link>
                </div>
                <div
                  className={`flex flex-col justify-between flex-grow gap-14px`}
                >
                  <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                    <div className="flex w-full justify-between items-center self-stretch flex-grow-0 flex-shrink-0 gap-3">
                      <Link
                        title="Plain Crew Neck Loose Elegant Dress"
                        className="flex-grow text-[14px] font-normal leading-[20px] text-left text-[#31353C] max-w-[245px]"
                        href={`/product/${item?.product_details.slug}`}
                      >
                        {item.product_details.name ?? ''}
                      </Link>
                      <button
                        onClick={() => handleDeleteFromCart(item, i)}
                        className={`${isCancelItem ? '' : 'hidden'} p-0`}
                      >
                        <svg
                          width={28}
                          height={28}
                          viewBox="0 0 28 28"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width={28} height={28} rx={4} fill="white" />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0417 8.66593C10.0417 7.40028 11.0677 6.37427 12.3333 6.37427H15.6667C16.9323 6.37427 17.9583 7.40028 17.9583 8.66593V9.41626H20.875C21.2202 9.41626 21.5 9.69608 21.5 10.0413C21.5 10.3864 21.2202 10.6663 20.875 10.6663H7.125C6.77982 10.6663 6.5 10.3864 6.5 10.0413C6.5 9.69608 6.77982 9.41626 7.125 9.41626H10.0417V8.66593ZM16.7083 8.66593V9.41626H11.2917V8.66593C11.2917 8.09064 11.758 7.62427 12.3333 7.62427H15.6667C16.242 7.62427 16.7083 8.09064 16.7083 8.66593ZM9.625 11.8324C9.625 11.4873 9.34518 11.2074 9 11.2074C8.65482 11.2074 8.375 11.4873 8.375 11.8324V19.3324C8.375 20.5981 9.40101 21.6241 10.6667 21.6241H17.3333C18.599 21.6241 19.625 20.5981 19.625 19.3324V11.8324C19.625 11.4873 19.3452 11.2074 19 11.2074C18.6548 11.2074 18.375 11.4873 18.375 11.8324V19.3324C18.375 19.9077 17.9086 20.3741 17.3333 20.3741H10.6667C10.0914 20.3741 9.625 19.9077 9.625 19.3324V11.8324ZM12.2917 13.1663C12.6369 13.1663 12.9167 13.4461 12.9167 13.7913V18.3746C12.9167 18.7198 12.6369 18.9996 12.2917 18.9996C11.9465 18.9996 11.6667 18.7198 11.6667 18.3746V13.7913C11.6667 13.4461 11.9465 13.1663 12.2917 13.1663ZM15.0833 13.7913C15.0833 13.4461 15.3631 13.1663 15.7083 13.1663C16.0535 13.1663 16.3333 13.4461 16.3333 13.7913V18.3746C16.3333 18.7198 16.0535 18.9996 15.7083 18.9996C15.3631 18.9996 15.0833 18.7198 15.0833 18.3746V13.7913Z"
                            fill="#31353C"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                    <p className="flex-grow-0 text-red-500 flex-shrink-0 text-base leading-[24px] font-bold text-left text-[#31353C]">
                      {item.price_after_discount ?? ''}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]">
                      {item.price ?? ''}
                    </p>
                  </div>
                  {/*{item?.variations?.length > 0 && (*/}
                  <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                    <p className="flex-grow-0 flex-shrink-0 text-base leading-[24px] font-bold text-left text-[#31353C]">
                      {item.product_details.variations?.Size ?? ''}
                    </p>
                    <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]" />
                  </div>
                  {/*)}*/}
                  <div className="flex items-center"></div>
                  <div className="flex items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                    <div className="flex flex-grow-0 flex-shrink-0 relative rounded-l-[5px] h-[28px]">
                      <button
                        disabled={item?.qty === 1}
                        // disabled={false}
                        onClick={(e) =>
                          handleQuantityChange(
                            Quantities[item.id] > 1
                              ? Quantities[item.id] - 1
                              : Quantities[item.id],
                            item
                          )
                        }
                        className={`${
                          isCancelItem ? '' : 'hidden'
                        } flex justify-center items-center bg-white border-[1.25px] border-[#868c93] cursor-pointer rounded-l-[5px] w-[32px] h-[28px]`}
                      >
                        <svg
                          viewBox="0 0 31 30"
                          fill="#222222"
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                        >
                          <path d="M23 15.938h.938v-1.876H23v1.876ZM8 14.062h-.938v1.876H8v-1.876Zm15 0H8v1.876h15v-1.876Z" />
                        </svg>
                      </button>
                      <div className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] overflow-hidden w-[36px]">
                        <input
                          className="appearance-none focus:outline-none focus:ring hide-arrows text-center text-[#31353c] leading-none border-none outline-none h-full rounded-l-[5px] text-base"
                          type="number"
                          id="quantity"
                          min={1}
                          max={199}
                          value={item.qty}
                          // onChange={(e) =>
                          //   handleQuantityChange(e?.target?.value, item)
                          // } // Pass the item object to the handler
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col items-center justify-between w-full">
                        <div className="flex items-center space-x-1 justify-center">
                          <div className="text-[12px] flex leading-[16px] text-[#31353c]">
                            {t('user.total')}:
                          </div>
                          <span className="text-[12px] truncate text-red-500 leading-[18px] font-bold">
                            {item?.product_details?.redeem_price > 0 ? item?.product_details?.redeem_price_formatted : item?.product_details?.offer_price_formatted}
                          </span>
                        </div>
                        <div className="flex flex-row items-center space-x-1  justify-center">
                          <div className="text-[12px] leading-[16px] text-[#31353c]">
                            {t('user.save')}:
                          </div>
                          <div>
                            <span className="text-[12px]  text-[#a1a5ab] line-through leading-[18px] font-bold">
                              {item?.product_details?.price_formatted}{' '}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {isOpenDialog && (
              <ConfirmDialog
                setRefresh={(a) => setRefresh(a)} refresh={refresh}
                message={'Are you sure you want to remove this product?'}
                handleCancelDelete={handleCancelDelete}
                handleConfirmDelete={handleConfirmDelete}
                isOpen={isOpenDialog}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
export default ItemsOrder;
