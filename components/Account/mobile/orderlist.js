import React, { useEffect, useState } from 'react';
import ConfirmDialog from '../desktop/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import LoadingComponent from '../../LoadingComponent/desktop';
import Orders from '../desktop/Parts/Orders';
import Coupons from '../desktop/Parts/Coupons';
import Addresses from '../desktop/Parts/Addresses';
import AddToCardModal from '../../card-modal/desktop';
import AddressModal from '../desktop/Parts/AddressModal';
import OrderModal from '../desktop/Parts/OrderModal';
import Profile from '../desktop/Parts/Profile';
import WishList from '../desktop/Parts/WishList/mobile';
import { useTranslation } from 'react-i18next';
import WalletList from '../desktop/Parts/WalletList';
import ReturnModal from '../desktop/Parts/ReturnModal';
import store from '../../../store';

export default function OrderList({ orders, prevAddresses, tab }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation('translation');
  const [activeBigTab, setActiveBigTab] = useState('order-list');
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openOrderModalReturn, setOpenOrderModalReturn] = useState({
    show: false,
    type: null,
  });
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [openDialogOrder, setIsOpenDialogOrder] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);
  const [userData, setUserData] = useState(null);
  const WishListReducer = useSelector(
    (state) => state?.ProductReducer?.WishList
  );
  const WalletListReducer = useSelector(
    (state) => state?.CheckoutReducer?.WalletList
  );
  const orderReturnDetails = useSelector(
    (state) => state?.CheckoutReducer?.orderReturnDetails
  );
  const resetOrder = useSelector((state) => state?.CheckoutReducer?.resetOrder);
  const handleCancelDelete = () => {
    setIsOpenDialog(false);
  };
  const handleCancelDeleteOrder = () => {
    setIsOpenDialogOrder(false);
  };
  const handleConfirmDeleteOrder = () => {
    if (order) {
      dispatch({ type: 'DELETE_ORDER', payload: order.id });
    }
    setIsOpenDialogOrder(false);
  };
  const handleConfirmDelete = () => {
    if (address) {
      dispatch({ type: 'DELETE_ADDRESS', payload: address.id });
    }
    setIsOpenDialog(false);
  };
  const handleActiveBigTab = (tab) => {
    setActiveBigTab(tab);
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserData(
        JSON.parse(localStorage.getItem('CUSTOMER_INFO_STORAGE'))?.customerInfo
          ?.customer_info
      );
    }
  }, []);
  useEffect(() => {
    if (orderReturnDetails) {
      // setOrder(orderReturnDetails);
    }
  }, [orderReturnDetails]);
  useEffect(() => {
    setOrder(null);
  }, [resetOrder]);
  useEffect(() => {
  }, [order]);
  const [customerInfo, setCustomerInfo] = useState(null);
  const syncSitting = useSelector((state) => state.AuthReducer.syncSitting);
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

  useEffect(() => {
    isOpenDialog
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset');
  }, [isOpenDialog]);
  useEffect(() => {
    if (tab !== 'all') {
      setActiveBigTab(tab);
    }
  }, [tab]);
  return (
    <div className="min-h-[100vh]">
      {orders ? (
        <div className="p-5 md:flex py-5">
          {/* Sidebar */}
          <div className=" mb-5 md:mb-0 md:sticky md:top-0 md:h-screen">
            <div className="w-full justify-center items-start mb-5 flex flex-row md:flex-col">
              <div className="hidden md:block text-[rgb(147,147,147)] cursor-pointer text-[13px] mb-2.5">
                Logout
              </div>
              <div className="hidden md:block text-[rgb(92,92,92)] text-[13px] tracking-[0.75px]">
                {t('user.welcome_to_back')}
              </div>
              <div className="hidden md:block  mb-[30px]">
                {userData?.f_name + userData?.l_name || userData?.email}!
              </div>
              <div className={`  flex flex-row gap-x-2 md:flex-col w-full`}>
                <div
                  onClick={() => handleActiveBigTab('order-list')}
                  className={`${
                    activeBigTab === 'order-list' ? 'underline' : ''
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t('user.Order_List')}
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
                  onClick={() => handleActiveBigTab('address')}
                  className={`${
                    activeBigTab === 'address' ? 'underline' : ''
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t('user.Address')}
                </div>
                <div
                  onClick={() => handleActiveBigTab('account')}
                  className={`${
                    activeBigTab === 'account' ? 'underline' : ''
                  }  h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t('user.Change_Profile')}
                </div>
                <div
                  onClick={() => handleActiveBigTab('wish-list')}
                  className={`${
                    activeBigTab === 'wish-list' ? 'underline' : ''
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t('user.wishlist')}
                </div>
                <div
                  onClick={() => handleActiveBigTab('wallet')}
                  className={`${
                    activeBigTab === 'wallet' ? 'underline' : ''
                  } h-10 px-0 py-2 cursor-pointer w-fit`}
                >
                  {t('user.wallet')}
                </div>
              </div>
            </div>
          </div>
          {/* Main Content */}
          <div className="flex-1 text-[rgb(92,92,92)] text-[15px]">
            {activeBigTab === 'order-list' ? (
              <Orders
                orders={orders}
                customerInfo={customerInfo}
                openOrderModal={() => setOpenOrderModal(true)}
                openOrderModalReturn={({ show, type }) =>
                  setOpenOrderModalReturn({ show, type })
                }
                setOrder={(order) => setOrder(order)}
                setIsOpenDialog={() => setIsOpenDialogOrder(true)}
              />
            ) : activeBigTab === 'coupon' ? (
              <Coupons />
            ) : activeBigTab === 'address' ? (
              <Addresses
                openAddressModal={() => setOpenAddressModal(true)}
                setAddress={(address) => setAddress(address)}
                prevAddresses={prevAddresses}
                setIsEdit={(isEdit) => setIsEdit(isEdit)}
                setIsOpenDialog={() => setIsOpenDialog(true)}
              />
            ) : activeBigTab === 'account' ? (
              <Profile />
            ) : activeBigTab === 'wish-list' ? (
              <WishList WishLists={WishListReducer} />
            ) : activeBigTab === 'wallet' ? (
              <WalletList WalletLists={WalletListReducer} />
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
        width={'75%'}
        show={openOrderModal}
        onClose={() => {
          setOpenOrderModal(false);
        }}
        order={order}
        close={openOrderModal}
        address={address}
      />
      <ReturnModal
        width={'100%'}
        show={openOrderModalReturn.show}
        type={openOrderModalReturn.type}
        onClose={() => {
          setOpenOrderModalReturn(false);
        }}
        order={order}
        close={openOrderModalReturn.show}
        address={address}
      />
      {isOpenDialog && (
        <ConfirmDialog
          message={'Are you sure you want to delete this address?'}
          handleCancelDelete={handleCancelDelete}
          handleConfirmDelete={handleConfirmDelete}
          isOpen={isOpenDialog}
        />
      )}
      {openDialogOrder && (
        <ConfirmDialog
          message={'Are you sure you want to cancel this order?'}
          handleCancelDelete={handleCancelDeleteOrder}
          handleConfirmDelete={handleConfirmDeleteOrder}
          isOpen={isOpenDialog}
        />
      )}
    </div>
  );
}
