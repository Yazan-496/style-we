const initialState = {
  checkoutLoading: false,
  addedAddress: false,
  prevAddresses: [],
  checkedId: null,
  addressId: null,
  orderNote: null,
  paymentTypes: [],
  orders: [],
  orderStatus: [],
  orderStatusTypes: [],
  WalletList: [],
  WalletTotal: [],
  Reasons: [],
  WalletTotalCount: 0,
  sync: false,
  offset: 1,
  SuccessPayment: false,
  PaymentURL: null,
  orderReturnDetails: null,
  orderRequestId: null,
  closeModalProductReturn: false,
  acceptReturn: null,
};
export function CheckoutReducer(state = initialState, action) {
  switch (action.type) {
    case "ACCEPT_RETURN_REDUCER":
      return {
        ...state,
        acceptReturn: action?.payload?.res,
      };
    case "RESET_RETURN_PRODUCT":
      return {
        ...state,
        closeModalProductReturn: false,
      };
    case "CLOSE_AFTER_SUCCESS_RETURN_PRODUCT":
      return {
        ...state,
        closeModalProductReturn: true,
      };
    case "GET_REASONS_REDUCER":
      return {
        ...state,
        Reasons: action?.payload?.Reasons,
      };
    case "RETURN_ORDER_DETAILS_REDUCER":
      return {
        ...state,
        orderReturnDetails: action?.payload?.orderRequestDetailRes,
        orderRequestId: action?.payload?.orderRequestId,
      };
    case "RESET_RETURN_ORDER_DETAILS_REDUCER":
      return {
        ...state,
        orderReturnDetails: null,
        orderRequestId: null,
        acceptReturn: null,
      };
    case "RES_URL_PAYMENT":
      return {
        ...state,
        PaymentURL: action?.payload?.URL,
      };
    case "RESET_CONFIRM_PAYMENT_REDUCER":
      return {
        ...state,
        SuccessPayment: false,
        PaymentURL: null,
      };
    case "CONFIRM_PAYMENT_REDUCER":
      return {
        ...state,
        SuccessPayment: true,
      };
    case "GET_WALLET_REDUCER":
      return {
        ...state,
        WalletList: action.payload.wallet,
      };
    case "SUCCESS_GET_WALLET":
      const walletTotalNew = action.payload.wallet?.wallet_transaction_list || [];

      const filteredWalletTotalNew = walletTotalNew.filter(newTransaction => {
        return !state.WalletTotal.some(existingTransaction => existingTransaction.id === newTransaction.id);
      });

      return {
        ...state,
        WalletTotal: [
          ...state.WalletTotal,
          ...filteredWalletTotalNew,
        ],
        WalletTotalCount: action?.payload?.wallet?.total_wallet_transaction,
      };

    case "INCREASE_OFFSET_WALLET":
      // console.log(state.WalletTotalCount, "state.WalletTotalCount");
      // console.log(state.WalletTotal?.length, "state.WalletTotal?.length");
      if (state.WalletTotalCount > state.WalletTotal?.length) {
        return {
          ...state,
          offset: state?.offset + 1,
        };
      } else {
        return {
          ...state,
          offset: state?.offset,
        };
      }
    case "ADDED_ADDRESS":
      return {
        ...state,
        addedAddress: true,
      };
    case "RESET_ADDED_ADDRESS":
      return {
        ...state,
        addedAddress: false,
      };
    case "RESET_CHECKOUT_REDUCER":
      return {
        ...state,
        checkoutLoading: false,
        checkedId: null,
        addressId: null,
        orderNote: null,
      };
    case "GET_ORDERS_REDUCER":
      return {
        ...state,
        orders: action.payload.orders,
      };
    case "GET_ORDERS_STATUS_REDUCER":
      return {
        ...state,
        orderStatus: action.payload.orders,
        sync: !state.sync,
      };
    case "GET_ORDERS_STATUS_REDUCER_TYPES":
      return {
        ...state,
        orderStatusTypes: action.payload,
      };
    case "PAYMENT_TYPES":
      return {
        ...state,
        paymentTypes: action.payload,
      };
    case "SET_ORDER_NOTE":
      return {
        ...state,
        orderNote: action.payload,
      };
    case "START_LOADING_CHECKOUT":
      return {
        ...state,
        checkoutLoading: true,
      };
    case "STOP_LOADING_CHECKOUT":
      return {
        ...state,
        checkoutLoading: false,
      };
    case "PREV_ADDRESSES":
      return {
        ...state,
        prevAddresses: action.payload.prevAddresses,
      };
    case "ADDRESS_ID":
      return {
        ...state,
        addressId: action.payload,
      };
    case "SET_CHECK_ID":
      return {
        ...state,
        checkedId: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}
