import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {SvgCheckbox, SvgLoader} from 'components/svgs';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '../../../../../helpers/Link';
import LoadingComponent from '../../../../LoadingComponent/mobile';
import OrderModal from '../OrderModal';
import ReturnModal from './index';
import ReturnProductModal from '../ReturnProductModal';
import { BsCircle } from 'react-icons/bs';
import { BiSolidCircle } from 'react-icons/bi';
import { GiBank, GiWallet } from 'react-icons/gi';
import HTMLRenderer from '../../../../../helpers/HTMLRenderer';
import store from '../../../../../store';
import {TransClient} from "../../../../../helpers/TransClient";

const ItemsModal = ({
    items,
    setTotal,
    setSelected,
    selectAll,
    setSaved,
    setPriceForFree,
    order,
    type,
    padding,
}) => {
    const checkRef = useRef([]);
    const [check, setCheck] = useState(true);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [isCancelItem, setIsCancelItem] = useState(false);
    const [buttonStates, setButtonStates] = useState([]);
    const [openProductModalReturn, setOpenProductModalReturn] = useState({
        show: false,
        type: null,
        product: null,
    });
    const acceptReturn = useSelector(
        (state) => state.CheckoutReducer?.acceptReturn
    );
    const checkoutLoading = useSelector(
        (state) => state.CheckoutReducer?.checkoutLoading
    );
    const returnRequestId = useSelector(
        (state) => state?.CheckoutReducer?.orderRequestId
    );
    const cartLoading = useSelector((state) => state.CartReducer?.cartLoading);
    const [limitFree, setLimitFree] = useState(order?.limitFree || 0);
    const [customerInfo, setCustomerInfo] = useState(null);
    let checkedItems = useSelector((store) => store.CartReducer.items);
    let orderReturnDetails = useSelector(
        (store) => store.CheckoutReducer.orderReturnDetails
    );
    let Reasons = useSelector((store) => store.CheckoutReducer.Reasons);
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
        dispatch({
            type: 'UPDATE_ITEM_IN_ORDER',
            payload: {
                data: {
                    order_id: item.order_id,
                    qty: item?.qty,
                    detail_id: item.id,
                },
            },
        });
    };

    const [totalPrices, setTotalPrices] = useState({});
    const [totalSaved, setTotalSaved] = useState({});
    const [Quantities, setQuantities] = useState({});
    const handleQuantityChange = useCallback((quant, item) => {
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
    }, [order, items]);

    const getQuantityById = (id) => {
        const item = items.find((item) => item.product_details.id === id);
        return item ? item.qty : 0;
    };

    const getTotalPriceById = (id) => {
        const item = items.find((item) => item.product_details.id === id);
        const final = item ? item.product_details.price * item.qty : 0;
        return final?.toFixed(2);
    };
    const getOfferTotalPriceById = (id) => {
        const item = items.find((item) => item?.product_details.id === id);
        const final = item ? item.product_details.offer_price * item.qty : 0;
        return final?.toFixed(2);
    };

    const getSaveById = (id) => {
        const item = items.find((item) => item?.product_details?.id === id);
        const final = item
            ? (item?.product_details.price -
                  item?.product_details?.offer_price) *
              item?.qty
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
        if (sit?.sitting?.order_status_can_canceled_item) {
            setCustomerInfo(sit?.sitting?.order_status_can_canceled_item);
        } else {
            sit = JSON.parse(sessionStorage.getItem('SITTING'));
            if (sit?.sitting?.order_status_can_canceled_item) {
                setCustomerInfo(sit?.sitting?.order_status_can_canceled_item);
            }
        }
        const unsubscribe = store.subscribe(() => {
            const updatedSitting = JSON.parse(
                sessionStorage.getItem('SITTING')
            );
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
        if (order?.return_request_id && type !== 'Show') {
            dispatch({
                type: 'RETURN_ORDER_DETAILS',
                payload: {
                    returnRequestId: order?.return_request_id,
                },
            });
        } else {
           if (order?.id && type === 'Add') {
               dispatch({
                   type: 'ADD_RETURN',
                   payload: {
                       id: order?.id,
                   },
               });
           }
        }
        if (Reasons?.length === 0) {
            dispatch({
                type: 'GET_REASONS',
            });
        }
    }, [order, type]);
    const { t, i18n } = useTranslation('translation');

    function handleReturn(product, type) {
        setOpenProductModalReturn({
            show: true,
            type: type,
            product: product,
        });
    }

    const handleClick = (index) => {
        const newButtonStates = [...buttonStates];
        newButtonStates[index] = !newButtonStates[index];
        setButtonStates(newButtonStates);

        setDeleteConfirmed(false);
    };

    function handleDeleteReturnProduct(item) {
        setButtonStates([]);
        setDeleteConfirmed(false);
        dispatch({
            type: 'DELETE_RETURN_PRODUCT',
            payload: {
                id: item?.return_request_product_id,
                returnId: order?.return_request_id || returnRequestId,
            },
        });
    }

    useEffect(() => {
        if (type === 'Show') {
            dispatch({
                type: 'SHOW_RETURN_ACCEPTED',
                payload: {
                    returnRequestId: order?.return_request_id,
                },
            });
        }
    }, [type]);

    function handleConfirmReturnRequest(returnId) {
        if (returnId) {
            dispatch({
                type: "CONFIRM_RETURN_REQUEST",
                payload: {
                    returnRequestId:
                    returnId,
                },
            })
            dispatch({
                type: 'RETURN_ORDER_DETAILS',
                payload: {
                    returnRequestId: returnId,
                },
            });
        }
    }
    return (
        <>
            {/**/}
            {(checkoutLoading || cartLoading) && <LoadingComponent />}
            <>
                <div
                    className={`w-full rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                >
                    Return Request Id:{' '}
                    {order?.return_request_id || returnRequestId}
                </div>
                <div
                    className={`w-full rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                >
                    Total Returnable Amount:{' '}
                    {orderReturnDetails?.total_returnable_amount_formatted ||
                        acceptReturn?.total_returnable_amount_formatted}
                </div>
                <div
                    className={`${
                        type === 'Show' ? ' ' : 'hidden'
                    } flex flex-col`}
                >
                    <div
                        className={`w-full rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                    >
                        Customer Money Destination:{' '}
                        {acceptReturn?.customer_return_request_destination
                            ?.is_wallet_destination === 1 ? (
                            <div className="flex items-center justify-center gap-x-2">
                                {
                                    acceptReturn
                                        ?.customer_return_request_destination
                                        ?.name
                                }
                                <BiSolidCircle
                                    color={
                                        acceptReturn
                                            ?.admin_return_request_destination
                                            ?.is_wallet_destination === 1
                                            ? 'green'
                                            : 'red'
                                    }
                                />
                                <GiWallet size={40} color="gray" />
                            </div>
                        ) : acceptReturn?.customer_return_request_destination
                              ?.is_telr_destination === 1 ? (
                            <div className="flex items-center justify-center gap-x-2">
                                {
                                    acceptReturn
                                        ?.customer_return_request_destination
                                        ?.name
                                }
                                <BiSolidCircle
                                    color={
                                        acceptReturn
                                            ?.admin_return_request_destination
                                            ?.is_telr_destination === 1
                                            ? 'green'
                                            : 'red'
                                    }
                                />
                                <GiWallet size={40} color="gray" />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div
                    className={`${
                        type === 'Show' ? ' ' : 'hidden'
                    } flex flex-col`}
                >
                    <div
                        className={`w-full rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                    >
                        Admin Money Destination:{' '}
                        {acceptReturn?.admin_return_request_destination
                            ?.is_wallet_destination === 1 ? (
                            <div className="flex items-center justify-center gap-x-2">
                                {
                                    acceptReturn
                                        ?.admin_return_request_destination?.name
                                }
                                <BiSolidCircle
                                    color={
                                        acceptReturn
                                            ?.admin_return_request_destination
                                            ?.is_wallet_destination === 1
                                            ? 'green'
                                            : 'red'
                                    }
                                />
                                <GiWallet size={40} color="gray" />
                            </div>
                        ) : acceptReturn?.admin_return_request_destination
                              ?.is_telr_destination === 1 ? (
                            <div className="flex items-center justify-center gap-x-2">
                                {
                                    acceptReturn
                                        ?.admin_return_request_destination?.name
                                }
                                <BiSolidCircle
                                    color={
                                        acceptReturn
                                            ?.admin_return_request_destination
                                            ?.is_telr_destination === 1
                                            ? 'green'
                                            : 'red'
                                    }
                                />
                                <GiWallet size={40} color="gray" />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                {
                    orderReturnDetails?.total_returnable_amount >
                    0 &&
                    orderReturnDetails?.status !== 'pending' &&
                    (
                        <div className="w-full text-center flex justify-center">
                            <button
                                onClick={
                                    () => handleConfirmReturnRequest(returnRequestId)
                                }
                                className="cm-btn-primary bg-black flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-21 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-[#F2F2F3] disabled:text-[#CED0D3] disabled:cursor-not-allowed"
                            >
                                <p className=" text-white text-[18px] leading-[21px] font-bold">
                                    {checkoutLoading ? (
                                        <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">
                                            <SvgLoader />
                                        </p>
                                    ) : (
                                        t(
                                            "user.confirm_now"
                                        )
                                    )}
                                </p>
                            </button>
                        </div>
                    )}
                <div
                    className={`w-full flex items-center justify-center rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                >
                    {orderReturnDetails?.status && (
                        <div
                            className={`${
                                orderReturnDetails?.status ===
                                'draft return request'
                                    ? 'bg-red-600'
                                    : 'bg-green-500'
                            } w-fit px-10 py-1 text-center overflow-auto rounded-[5px] text-center text-white font-[700] text-base mt-3 mb-3 `}
                        >
                            {orderReturnDetails?.status}
                        </div>
                    )}
                </div>
                {orderReturnDetails?.order_details?.length > 0 && (
                    <h1>Products</h1>
                )}
                {orderReturnDetails?.order_details?.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="p-[10px] flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4"
                        >
                            <div
                                onClick={() => handleCheck(i, item)}
                                ref={checkRef}
                                key={i}
                                className="hidden flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-4 relative"
                            >
                                <div key={i}>
                                    <SvgCheckbox
                                        click={
                                            checkRef?.current &&
                                            checkRef?.current[`${i}`]
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-x-4 w-full">
                                <div className="flex gap-3">
                                    <div className="flex-grow-0 flex-shrink-0 w-[102px] h-[136px] relative bg-[#ebebeb]">
                                        {
                                            <div
                                                className={`style_discountTag__LG3NB_small z-10 relative text-center ${getColor(
                                                    item?.product_price,
                                                    item?.product_price
                                                )} `}
                                            >
                                                {100 -
                                                    parseInt(
                                                        (item?.product_price *
                                                            100) /
                                                        item?.product_price
                                                    ) !==
                                                    0 && (
                                                    <span
                                                        className={`style_discountTagInner__xrve6_small notranslate`}
                                                    >
                                                        -
                                                        {100 -
                                                            parseInt(
                                                                (item?.product_price *
                                                                    100) /
                                                                item?.product_price
                                                            )}
                                                        %
                                                    </span>
                                                )}
                                            </div>
                                        }
                                        {/*<Link href={`/product-details/${item?.slug}`}>*/}
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
                                                src={item?.image_url ?? ''}
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
                                        {/*</Link>*/}
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow gap-14px">
                                        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                                            <div className="flex w-full justify-between items-center self-stretch flex-grow-0 flex-shrink-0 gap-3">
                                                {/*<Link href={`/product-details/${item?.slug}`}>*/}
                                                <a
                                                    title="Plain Crew Neck Loose Elegant Dress"
                                                    className="flex-grow text-[14px] font-normal leading-[20px] text-left text-[#31353C] max-w-[245px]"
                                                >
                                                    {item?.name ?? ''}
                                                </a>
                                                <div
                                                    className={`${
                                                        item?.return_request_product_status
                                                            ? 'hidden'
                                                            : 'hidden'
                                                    } w-full flex items-center justify-start rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                                                >
                                                    <div
                                                        className={`${
                                                            item?.return_request_product_status ===
                                                            'status not found'
                                                                ? 'hidden'
                                                                : 'bg-green-500'
                                                        } w-fit px-10 py-1 text-center overflow-auto rounded-[5px] text-center text-white font-[700] text-base mt-3 mb-3 `}
                                                    >
                                                        {
                                                            item?.return_request_product_status
                                                        }
                                                    </div>
                                                </div>
                                                {/*</Link>*/}
                                                <button
                                                    onClick={() =>
                                                        handleDeleteFromCart(
                                                            item,
                                                            i
                                                        )
                                                    }
                                                    className={`${
                                                        isCancelItem
                                                            ? ''
                                                            : 'hidden'
                                                    } p-0`}
                                                >
                                                    <svg
                                                        width={28}
                                                        height={28}
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            width={28}
                                                            height={28}
                                                            rx={4}
                                                            fill="white"
                                                        />
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
                                                {item?.product_price_formatted ??
                                                    ''}
                                            </p>
                                            <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]">
                                                {item?.product_price_formatted ??
                                                    ''}
                                            </p>
                                        </div>
                                        {/*{item?.variations?.length > 0 && (*/}
                                        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                                            <p className="flex-grow-0 flex-shrink-0 text-base leading-[24px] font-bold text-left text-[#31353C]">
                                                {item?.variant ?? ''}
                                            </p>
                                            <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]" />
                                        </div>
                                        {/*)}*/}
                                        <div className="flex items-center"></div>
                                        <div className=" flex items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                                            <div className="flex flex-grow-0 flex-shrink-0 relative rounded-l-[5px] h-[28px]">
                                                <div className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] overflow-hidden w-[36px]">
                                                    <input
                                                        className="appearance-none focus:outline-none focus:ring hide-arrows text-center text-[#31353c] leading-none border-none outline-none h-full rounded-l-[5px] text-base"
                                                        type="number"
                                                        disabled
                                                        id="quantity"
                                                        value={item?.quantity}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleReturn(item, 'Add')
                                                }
                                                className={`${
                                                    type === 'Show'
                                                        ? 'hidden'
                                                        : ' '
                                                } ${
                                                    !item?.already_return
                                                        ? ''
                                                        : ' hidden'
                                                } hover:underline align-super flex items-center justify-center text-black cursor-pointer text-[13px] font-semibold max-w-full overflow-hidden relative text-center no-underline text-ellipsis uppercase transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                            >
                                                <div className="flex items-center justify-center gap-x-1 bg-black px-3 p-1 text-white inline-block hover:underline">
                                                    <EditIcon fontSize="12" />{' '}
                                                    {TransClient("user.add_return_request")}
                                                </div>
                                            </button>
                                            <div
                                                className={`${
                                                    type === 'Show'
                                                        ? 'hidden'
                                                        : ' '
                                                }${
                                                    item?.already_return
                                                        ? ''
                                                        : ' hidden'
                                                } flex flex-col w-full gap-y-2 items-center justify-center `}
                                            >
                                                <button
                                                    className={` w-full hover:underline align-super flex items-center justify-center text-black cursor-pointer transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                                    onClick={() =>
                                                        handleReturn(
                                                            item,
                                                            'Edit'
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center justify-center gap-x-1 bg-black px-3 p-1 text-white inline-block hover:underline">
                                                        <EditIcon
                                                            fontSize="12"
                                                            className="mb-1"
                                                        />{' '}
                                                        {TransClient("user.edit_return_request")}
                                                    </div>
                                                </button>
                                                <button
                                                    className={`align-super flex items-center justify-center text-black cursor-pointer transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                                    onClick={() =>
                                                        handleClick(i)
                                                    }
                                                >
                                                    <div
                                                        className={`flex transition-all transition-duration-300 items-center justify-center gap-x-1 ${
                                                            buttonStates[i]
                                                                ? 'pl-5'
                                                                : ''
                                                        }`}
                                                    >
                                                        {buttonStates[i] &&
                                                        !deleteConfirmed ? (
                                                            <>
                                                                <div className="flex items-center justify-between space-x-5">
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() =>
                                                                            handleDeleteReturnProduct(
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        ✔️
                                                                    </span>
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            const newButtonStates =
                                                                                [
                                                                                    ...buttonStates,
                                                                                ];
                                                                            newButtonStates[
                                                                                i
                                                                            ] = false;
                                                                            setButtonStates(
                                                                                newButtonStates
                                                                            );
                                                                        }}
                                                                    >
                                                                        ❌
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={`flex items-center gap-x-1 bg-red-600 p-1 text-white ${
                                                                        buttonStates[
                                                                            i
                                                                        ]
                                                                            ? 'w-1/2'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    <DeleteIcon
                                                                        fontSize="12"
                                                                        className="mb-1"
                                                                    />
                                                                            {TransClient("user.delete_return_request")}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div
                                                                className={`bg-red-600 p-1 text-white ${
                                                                    buttonStates[
                                                                        i
                                                                    ]
                                                                        ? 'opacity-0 w-0'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <DeleteIcon
                                                                    fontSize="12"
                                                                    className="mb-1"
                                                                />
                                                                    {TransClient("user.delete_return_request")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                {type === 'Show' && acceptReturn?.products_returned?.length > 0 && (
                    <h1>Products</h1>
                )}
                {type === 'Show' && acceptReturn?.products_returned?.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="p-[10px] flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4"
                        >
                            <div
                                onClick={() => handleCheck(i, item)}
                                ref={checkRef}
                                key={i}
                                className="hidden flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 w-4 relative"
                            >
                                <div key={i}>
                                    <SvgCheckbox
                                        click={
                                            checkRef?.current &&
                                            checkRef?.current[`${i}`]
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-x-4 w-full">
                                <div className="flex gap-3">
                                    <div className="flex-grow-0 flex-shrink-0 w-[102px] h-[136px] relative bg-[#ebebeb]">
                                        {/*<Link href={`/product-details/${item?.slug}`}>*/}
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
                                                src={
                                                    item?.product_image_url ??
                                                    ''
                                                }
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
                                        {/*</Link>*/}
                                    </div>
                                    <div className="flex flex-col justify-between flex-grow gap-14px">
                                        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0">
                                            <div className="flex w-full justify-between items-center self-stretch flex-grow-0 flex-shrink-0 gap-3">
                                                {/*<Link href={`/product-details/${item?.slug}`}>*/}
                                                <a
                                                    title="Plain Crew Neck Loose Elegant Dress"
                                                    className="flex-grow text-[14px] font-normal leading-[20px] text-left text-[#31353C] max-w-[245px]"
                                                >
                                                    {item?.product_name ?? ''}
                                                </a>
                                                <div
                                                    className={`${
                                                        item?.return_request_product_status
                                                            ? 'hidden'
                                                            : 'hidden'
                                                    } w-full flex items-center justify-start rounded-[5px] text-center text-black font-[700] text-base mt-3 mb-3 `}
                                                >
                                                    <div
                                                        className={`${
                                                            item?.return_request_product_status ===
                                                            'status not found'
                                                                ? 'hidden'
                                                                : 'bg-green-500'
                                                        } w-fit px-10 py-1 text-center overflow-auto rounded-[5px] text-center text-white font-[700] text-base mt-3 mb-3 `}
                                                    >
                                                        {
                                                            item?.return_request_product_status
                                                        }
                                                    </div>
                                                </div>
                                                {/*</Link>*/}
                                                <button
                                                    onClick={() =>
                                                        handleDeleteFromCart(
                                                            item,
                                                            i
                                                        )
                                                    }
                                                    className={`${
                                                        isCancelItem
                                                            ? ''
                                                            : 'hidden'
                                                    } p-0`}
                                                >
                                                    <svg
                                                        width={28}
                                                        height={28}
                                                        viewBox="0 0 28 28"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <rect
                                                            width={28}
                                                            height={28}
                                                            rx={4}
                                                            fill="white"
                                                        />
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
                                                {item?.returnable_amount ?? ''}
                                            </p>
                                            <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]">
                                                {item?.product_price_formatted ??
                                                    ''}
                                            </p>
                                        </div>
                                        {/*{item?.variations?.length > 0 && (*/}
                                        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                                            <p className="flex-grow-0 flex-shrink-0 text-base leading-[24px] font-bold text-left text-[#31353C]">
                                                {item?.variant ?? ''}
                                            </p>
                                            <p className="flex-grow-0 flex-shrink-0 text-[14px] leading-[19px] line-through text-left text-[#a1a5ab]" />
                                        </div>
                                        {/*)}*/}
                                        <div className="flex items-center"></div>
                                        <div className="flex items-center flex-grow-0 flex-shrink-0 relative gap-2 notranslate">
                                            <div className="hidden flex flex-grow-0 flex-shrink-0 relative rounded-l-[5px] h-[28px]">
                                                <div className="flex justify-center items-center bg-white border-[1.25px] border-[#868c93] overflow-hidden w-[36px]">
                                                    <input
                                                        className="appearance-none focus:outline-none focus:ring hide-arrows text-center text-[#31353c] leading-none border-none outline-none h-full rounded-l-[5px] text-base"
                                                        type="number"
                                                        id="quantity"
                                                        min={1}
                                                        max={199}
                                                        value={item?.quantity}
                                                    />
                                                </div>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleReturn(item, 'Add')
                                                }
                                                className={`${
                                                    type === 'Show'
                                                        ? 'hidden'
                                                        : ' '
                                                } ${
                                                    !item?.already_return
                                                        ? ''
                                                        : ' hidden'
                                                } hover:underline align-super flex items-center justify-center text-black cursor-pointer text-[13px] font-semibold max-w-full overflow-hidden relative text-center no-underline text-ellipsis uppercase transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                            >
                                                <div className="flex items-center justify-center gap-x-1 bg-black px-3 p-1 text-white inline-block hover:underline">
                                                    <EditIcon fontSize="12" />{' '}
                                                    {TransClient("user.add_return_request")}
                                                </div>
                                            </button>
                                            <div
                                                className={`${
                                                    type === 'Show'
                                                        ? 'hidden'
                                                        : ' '
                                                }${
                                                    item?.already_return
                                                        ? ''
                                                        : ' hidden'
                                                } flex flex-col w-full gap-y-2 items-center justify-center `}
                                            >
                                                <button
                                                    className={` w-full hover:underline align-super flex items-center justify-center text-black cursor-pointer transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                                    onClick={() =>
                                                        handleReturn(
                                                            item,
                                                            'Edit'
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-center justify-center gap-x-1 bg-black px-3 p-1 text-white inline-block hover:underline">
                                                        <EditIcon
                                                            fontSize="12"
                                                            className="mb-1"
                                                        />{' '}
                                                            {TransClient("user.edit_return_request")}
                                                    </div>
                                                </button>
                                                <button
                                                    className={`align-super flex items-center justify-center text-black cursor-pointer transition-all duration-[0.3s] ease-[ease] delay-[0s] whitespace-nowrap z-[1] tracking-[1px] leading-[unset] min-h-0 mr-5 pt-0 pb-px px-0 rounded-none border-t-[initial] border-b-[rgb(147,147,147)] border-x-[initial] border-[0px_0px_1px]`}
                                                    onClick={() =>
                                                        handleClick(i)
                                                    }
                                                >
                                                    <div
                                                        className={`flex transition-all transition-duration-300 items-center justify-center gap-x-1 ${
                                                            buttonStates[i]
                                                                ? 'pl-5'
                                                                : ''
                                                        }`}
                                                    >
                                                        {buttonStates[i] &&
                                                        !deleteConfirmed ? (
                                                            <>
                                                                <div className="flex items-center justify-between space-x-5">
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() =>
                                                                            handleDeleteReturnProduct(
                                                                                item
                                                                            )
                                                                        }
                                                                    >
                                                                        ✔️
                                                                    </span>
                                                                    <span
                                                                        className="cursor-pointer"
                                                                        onClick={() => {
                                                                            const newButtonStates =
                                                                                [
                                                                                    ...buttonStates,
                                                                                ];
                                                                            newButtonStates[
                                                                                i
                                                                            ] = false;
                                                                            setButtonStates(
                                                                                newButtonStates
                                                                            );
                                                                        }}
                                                                    >
                                                                        ❌
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={`flex items-center gap-x-1 bg-red-600 p-1 text-white ${
                                                                        buttonStates[
                                                                            i
                                                                        ]
                                                                            ? 'w-1/2'
                                                                            : ''
                                                                    }`}
                                                                >
                                                                    <DeleteIcon
                                                                        fontSize="12"
                                                                        className="mb-1"
                                                                    />
                                                                        {TransClient("user.delete_return_request")}
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div
                                                                className={`bg-red-600 p-1 text-white ${
                                                                    buttonStates[
                                                                        i
                                                                    ]
                                                                        ? 'opacity-0 w-0'
                                                                        : ''
                                                                }`}
                                                            >
                                                                <DeleteIcon
                                                                    fontSize="12"
                                                                    className="mb-1"
                                                                />
                                                                    {TransClient("user.delete_return_request")}
                                                            </div>
                                                        )}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {orderReturnDetails?.total_returnable_amount < 0 && (
                    <div className="">
                        <HTMLRenderer
                            overFlow={true}
                            htmlContent={
                                orderReturnDetails?.description_returnable_amount_less_than_0
                            }
                        />
                    </div>
                )}
            </>
            <ReturnProductModal
                width={'100%'}
                padding={padding}
                show={openProductModalReturn.show}
                onClose={() => {
                    setOpenProductModalReturn({
                        show: false,
                        type: null,
                        product: null,
                    });
                }}
                order={order}
                product={openProductModalReturn.product}
                type={openProductModalReturn.type}
                close={openProductModalReturn.show}
            />
        </>
    );
};
export default ItemsModal
