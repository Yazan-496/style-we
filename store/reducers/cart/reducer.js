const initialState = {
  sync: false,
  syncFetchCart: false,
  openCart: false,
  shippingCart: [],
  cartProduct: null,
  toastMessage: null,
  cartLoading: false,
  addedToCart: false,
};
export function CartReducer(state = initialState, action) {
  switch (action.type) {
    case "CLEAR_TOAST_MESSAGE": {
      return {
        ...state,
        toastMessage: null,
      };
    }
    case "TOAST_MESSAGE": {
      return {
        ...state,
        toastMessage: action?.payload,
      };
    }
    case "OPEN_CART": {
      return {
        ...state,
        openCart: !state.openCart,
      };
    }
    case "SYNC": {
      return {
        ...state,
        sync: !state.sync,
      };
    }
    case "CART_START_LOADING":
      return {
        ...state,
        cartLoading: true,
      };
    case "CART_STOP_LOADING":
      return {
        ...state,
        cartLoading: false,
      };
    case "ADDED_TO_CART":
      return {
        ...state,
        addedToCart: true,
      };
    case "RESET_ADDED_TO_CART":
      return {
        ...state,
        addedToCart: false,
      };
    case "PRODUCT_CART_REDUCERS":
      return {
        ...state,
        cartProduct: action?.payload?.cartProduct?.data,
        error: null,
      };
    case "SHIPPING_CART_REDUCERS":
      return {
        ...state,
        shippingCart: action?.payload?.shippingCart?.data,
        syncFetchCart: !state?.syncFetchCart,
        error: null,
      };
    case "REMOVE_PRODUCT_CART_REDUCERS":
      return {
        ...state,
        cartProduct: null,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
}
