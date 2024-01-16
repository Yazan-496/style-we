'use client';
import React, { useEffect, useState } from 'react';
import Header from 'components/Header/desktop';
import Footer from 'components/Footer/desktop';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import OrderList from 'components/Account/desktop/orderlist';
import RightSideChat from 'components/common/RightSideChat';
import Loading from '../../Loading';
import { TransClient } from 'helpers/TransClient';
import store from "../../../store";
const PaymentMethod = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const param = useParams();
  const { status } = param;
  const [token, setToken] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
  //   }
  // }, [syncInfo]);
  useEffect(() => {
    const firstToken = JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token
    setToken(firstToken);
    const unsubscribe = store.subscribe(() => {
      const updatedToken = JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token
      if (updatedToken) {
        setToken(updatedToken);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  const SuccessPayment = useSelector(
    (state) => state?.CheckoutReducer?.SuccessPayment
  );
  const mainPageData = useSelector((state) => state.mainReducer.mainPageData);
  const orders = useSelector((state) => state.CheckoutReducer.orders);
  const offset = useSelector((state) => state.CheckoutReducer.offset);
  const prevAddresses = useSelector(
    (state) => state.CheckoutReducer.prevAddresses
  );
  useEffect(() => {
    if (SuccessPayment) {
      dispatch({ type: 'RESET_CONFIRM_PAYMENT_REDUCER' });
    }
  }, [SuccessPayment]);
  const mainCategories = useSelector(
    (state) => state.mainReducer.mainPageData?.categories
  );
  useEffect(() => {
    if (token) {
      dispatch({ type: 'GET_ORDERS_STATUS' });
    }
  }, [token, refresh]);
  useEffect(() => {
    if (!mainCategories?.length > 0) {
      dispatch({
        type: 'GET_SECTIONS_SAGA',
      });
      dispatch({ type: 'GET_ITEMS_CART' });
    }
  }, [mainCategories]);
  useEffect(() => {
    if (token) {
      dispatch({
        type: 'GET_ORDERS_SAGA'
      });
    }
  }, [token, refresh]);
  useEffect(() => {
    if (token) {
    dispatch({
      type: 'GET_PREV_ADDRESS',
    });}
  }, [token, refresh]);
  useEffect(() => {
    if (token) {
    dispatch({
      type: 'GET_FAVORITE_PRODUCTS',
    });}
  }, [token, refresh]);
  useEffect(() => {
    // console.log(orders);
  }, [orders]);
  useEffect(() => {
    // console.log(prevAddresses);
  }, [prevAddresses]);

  useEffect(() => {
    if (token) {
    dispatch({
      type: 'GET_WALLET',
      payload: { offset },
    });}
  }, [offset, token, refresh]);
  useEffect(() => {
    if (token) {
    dispatch({
      type: 'GET_WALLET_PAGINATION',
      payload: { offset },
    });}
  }, [offset, token, refresh]);
  return (
    <>
      <Head>
        <title>Orders List</title>
      </Head>
      {!token && <Loading />}
      <div dir={TransClient('user.dir')} className="relative w-full lg:min-w-[1024px] bg-gray-50">
        {/* <Header collection={true} categories={mainPageData?.categories} /> */}
        <OrderList setRefresh={(a) => setRefresh(a)} refresh={refresh} tab={status} prevAddresses={prevAddresses} orders={orders} />
        {/* <Footer /> */}
      </div>
      {/* <RightSideChat /> */}
      <div id="modal-root"></div>
    </>
  );
};

export default PaymentMethod;
