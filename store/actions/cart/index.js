export const fetchCartProduct = (data) => ({
  type: "PRODUCT_CART_REDUCERS",
  payload: data,
});
export const fetchShippingCart = (data) => ({
  type: "SHIPPING_CART_REDUCERS",
  payload: data,
});
export const removeCartProduct = () => ({
  type: "REMOVE_PRODUCT_CART_REDUCERS",
});

export const startCartLoading = () => ({
  type: "CART_START_LOADING",
});

export const stopCartLoading = () => ({
  type: "CART_STOP_LOADING",
});

export const AddedCart = () => ({
  type: "ADDED_TO_CART",
});
