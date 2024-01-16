import React, { useEffect, useState } from 'react';
import ConfirmDialog from './ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import Orders from './Parts/Orders';
import Coupons from './Parts/Coupons';
import Addresses from './Parts/Addresses';
import AddressModal from './Parts/AddressModal';
import OrderModal from './Parts/OrderModal';
import Profile from './Parts/Profile';
import WishList from './Parts/WishList/desktop';
import { useTranslation } from 'react-i18next';
import WalletList from './Parts/WalletList';
import ReturnModal from './Parts/ReturnModal';
import { useRouter } from 'next/navigation';
import Loading from '../../Loading';
import store from '../../../store';
import Link from 'helpers/Link';
import { TransClient } from 'helpers/TransClient';

export default function OrderList({ orders, prevAddresses, tab, refresh, setRefresh }) {
  const dispatch = useDispatch();
  const router = useRouter()
  const { t, i18n } = useTranslation("translation");
  const [activeBigTab, setActiveBigTab] = useState("order-list");
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [openOrderModalReturn, setOpenOrderModalReturn] = useState({ show:false, type: null, order: null });
  const [openDialogOrder, setIsOpenDialogOrder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);
  const [userData, setUserData] = useState(null);

  const checkoutLoading = useSelector(
      (state) => state.CheckoutReducer?.checkoutLoading
  );
  const cartLoading = useSelector((state) => state.CartReducer?.cartLoading);
  const [token, setToken] = useState(null);
  const syncInfo = useSelector((state) => state.AuthReducer.syncInfo);

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
    if (typeof window !== 'undefined') {
      if (window.location?.pathname === '/account/login') {
        window.location.reload();
      } else {
          router.refresh();
          // router.push('/account/login');
          window.location.href = '/account/login';
      }
    }
  }
  useEffect(() => {
    if(activeBigTab === "account" || activeBigTab === "address" || activeBigTab === "account"){
      dispatch({type: "CART_STOP_LOADING"})
    }
  }, [activeBigTab]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setToken(JSON.parse(localStorage.getItem('TOKEN_LOCAL_STORAGE'))?.token);
    }
  }, [syncInfo]);
  const WishListReducer = useSelector(
    (state) => state?.ProductReducer?.WishList
  );
  const WalletListReducer = useSelector(
    (state) => state?.CheckoutReducer?.WalletList
  );
  const productLoading = useSelector(
    (state) => state?.ProductReducer?.productLoading
  );
  const handleCancelDelete = () => {
    setIsOpenDialog(false);
  };
  const handleCancelDeleteOrder = () => {
    setIsOpenDialogOrder(false);
  };
  const handleConfirmDeleteOrder = () => {
    if (order) {
      dispatch({ type: "DELETE_ORDER", payload: order.id });
    }
    setIsOpenDialogOrder(false);
    // window.setTimeout(() => {
    //   setRefresh(!refresh)
    // }, 3000);
  };
  const handleConfirmDelete = () => {
    if (address) {
      dispatch({ type: "DELETE_ADDRESS", payload: address.id });
    }
    setIsOpenDialog(false);
  };
  const handleActiveBigTab = (tab) => {
    setActiveBigTab(tab);
  };
  const [customerInfo, setCustomerInfo] = useState(null);
  const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
  useEffect(() => {
    let custInfo = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
    if (custInfo) {
      setUserData(custInfo?.customerInfo?.customer_info);
    } else {
      custInfo = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
      if(custInfo ) {
        setUserData(custInfo?.customerInfo?.customer_info);
      }
    }
    const unsubscribe = store.subscribe(() => {
      const updatedCustInfo = JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'));
      if (updatedCustInfo) {
        setUserData(updatedCustInfo?.customerInfo?.customer_info);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncSitting]);
  useEffect(() => {
    if(tab !== 'all'){
      setActiveBigTab(tab)
    }

  }, [tab]);

  useEffect(() => {
    isOpenDialog
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "unset");
  }, [isOpenDialog]);
  useEffect(() => {
    let sit = JSON.parse(sessionStorage.getItem('SITTING'));
    if (sit?.sitting) {
      setCustomerInfo(sit?.sitting?.order_status_can_canceled);
    } else {
      sit = JSON.parse(sessionStorage.getItem('SITTING'));
      if(sit?.sitting ) {
        setCustomerInfo(sit?.sitting?.order_status_can_canceled);
      }
    }
    const unsubscribe = store.subscribe(() => {
      const updatedSitting = JSON.parse(sessionStorage.getItem('SITTING'));
      if (updatedSitting?.sitting) {
        setCustomerInfo(updatedSitting?.sitting?.order_status_can_canceled);
      }
    });
    return () => {
      unsubscribe();
    };
  }, [syncSitting]);
  return (
      <>
        {(checkoutLoading || cartLoading) && <Loading />}
    <div className="h-fit min-h-[100vh]">
      {orders ? (
        <div className="lg:pt-5 md:flex p-5">
          {/* Sidebar */}
          <div className={`lg:m${TransClient('user.dirlet')}-[60px] lg:mb-5 lg:md:mb-0 md:sticky md:top-0 md:h-screen`}>
            <div className="lg:mr-[60px] justify-start lg:justify-center items-start mb-5 flex flex-row md:flex-col">
              {token ? 
              <>
              <Link
                  href="#"
                  onClick={handleLogout}
                  className='hidden lg:flex justify-center items-center overflow-hidden rounded disabled:opacity-20 disabled:cursor-not-allowed hover:opacity-80 active:opacity-90 active:shadow-[inset_0px_0px_8px_rgba(0,0,0,0.25)] group cm-btn-primary flex-grow text-base gap-1 bg-gray-500 block rounded text-white p-1  w-full mb-3'
              >
                  <div className='inline-block truncate opacity-1 group-active:opacity-90'>
                      {t('user.logout')}
                  </div>
              </Link>
              </> : <></>}
              <div className="hidden md:block text-[rgb(92,92,92)] text-[13px] tracking-[0.75px]">
                {t("user.Welcome_back")}!
              </div>
              <div className="hidden md:block  mb-[30px]">
                {userData?.f_name || userData?.email}
              </div>
              <div className={`  gap-x-2  flex flex-row lg:flex-col `}>
                <div
                  onClick={() => handleActiveBigTab("order-list")}
                  className={`${
                    activeBigTab === "order-list" ? "underline" : ""
                  } h-10 px-0 py-2 cursor-pointer`}
                >
                  {t("user.Order_List")}
                </div>
                {/*<div*/}
                {/*  onClick={() => handleActiveBigTab("coupon")}*/}
                {/*  className={`${*/}
                {/*    activeBigTab === "coupon" ? "underline" : ""*/}
                {/*  } h-10 px-0 py-2 cursor-`}*/}
                {/*>*/}
                {/*  Coupon*/}
                {/*</div>*/}
                <div
                  onClick={() => handleActiveBigTab("address")}
                  className={`${
                    activeBigTab === "address" ? "underline" : ""
                  } h-10 px-0 py-2 cursor-pointer`}
                >
                  {t("user.Address")}
                </div>
                <div
                  onClick={() => handleActiveBigTab("account")}
                  className={`${
                    activeBigTab === "account" ? "underline" : ""
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t("user.Change_Profile")}
                </div>
                <div
                  onClick={() => handleActiveBigTab("wish-list")}
                  className={`${
                    activeBigTab === "wish-list" ? "underline" : ""
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t("user.wishlist")}
                </div>
                <div
                  onClick={() => handleActiveBigTab("wallet")}
                  className={`${
                    activeBigTab === "wallet" ? "underline" : ""
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t("user.wallet")}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className={`lg:m${TransClient('user.dirlet_reverse')}-[60px] flex-1 text-[rgb(92,92,92)] text-[15px] mt-20 lg:mt-0`}>
            {activeBigTab === "order-list" ? (
              <Orders
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                orders={orders}
                activeTab={activeBigTab}
                openOrderModalReturn={({ show, type, order }) => setOpenOrderModalReturn({ show, type, order })}
                customerInfo={customerInfo}
                openOrderModal={() => setOpenOrderModal(true)}
                setOrder={(order) => setOrder(order)}
                setIsOpenDialog={() => setIsOpenDialogOrder(true)}
              />
            ) : activeBigTab === "coupon" ? (
              <Coupons
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                  orders={orders}/>
            ) : activeBigTab === "address" ? (
              <Addresses
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                  orders={orders}
                openAddressModal={() => setOpenAddressModal(true)}
                setAddress={(address) => setAddress(address)}
                prevAddresses={prevAddresses}
                setIsEdit={(isEdit) => setIsEdit(isEdit)}
                setIsOpenDialog={() => setIsOpenDialog(true)}
              />
            ) : activeBigTab === "account" ? (
              <Profile
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                  orders={orders}/>
            ) : activeBigTab === "wish-list" ? (
              <WishList
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                  orders={orders} WishLists={WishListReducer} />
            ) : activeBigTab === "wallet" ? (
              <WalletList
                  setRefresh={(a) => setRefresh(a)} refresh={refresh} t
                  orders={orders} WalletLists={WalletListReducer} />
            ) : null}
          </div>
        </div>
      ) : (
        ""
      )}
      <AddressModal
        show={openAddressModal}
        onClose={() => {
          setOpenAddressModal(false);
        }}
        addressId={address?.id}
        isEdit={isEdit}
        close={openAddressModal}
        address={address}
      />
      <OrderModal
        setRefresh={(a) => setRefresh(a)} refresh={refresh}
        show={openOrderModal}
        onClose={() => {
          setOpenOrderModal(false);
        }}
        order={order}
        close={openOrderModal}
        address={address}
      />
      {isOpenDialog && (
        <ConfirmDialog
          setRefresh={(a) => setRefresh(a)} refresh={refresh}
          message={"Are you sure you want to delete this address?"}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          isOpen={isOpenDialog}
        />
      )}
      <ReturnModal
        width={"100%"}
        padding={true}
        show={openOrderModalReturn.show}
        type={openOrderModalReturn.type}
        onClose={() => {
          setOpenOrderModalReturn({ show:false, type: null, order: null });
        }}
        order={openOrderModalReturn.order}
        close={openOrderModalReturn.show}
        address={address}
      />
      {openDialogOrder && (
        <ConfirmDialog
          setRefresh={(a) => setRefresh(a)} refresh={refresh}
          message={"Are you sure you want to cancel this order?"}
          handleCancelDelete={handleCancelDeleteOrder}
          handleConfirmDelete={handleConfirmDeleteOrder}
          isOpen={isOpenDialog}
        />
      )}
    </div></>
  );
}
