export const fetchWishListDetails = (data) => ({
  type: "WISH_LIST_REDUCER",
  payload: data,
});
export const fetchProductDetails = (data) => ({
  type: "PRODUCT_DETAILS_REDUCERS",
  payload: data,
});
export const fetchDataError = (error) => ({
  type: "FETCH_DATA_ERROR",
  payload: error,
});

export const startLoading = () => ({
  type: "START_LOADING_PRODUCT",
});

export const stopLoading = () => ({
  type: "STOP_LOADING_PRODUCT",
});
export const startLoadingPagination = () => ({
  type: "START_LOADING_PRODUCT_PAGINATION",
});

export const stopLoadingPagination = () => ({
  type: "STOP_LOADING_PRODUCT_PAGINATION",
});
export const successRemoveHeart = (data) => ({
  type: "SUCCESS_REMOVE_HEART",
  payload: data,
});
export const successAddHeart = (data) => ({
  type: "SUCCESS_ADD_HEART",
  payload: data,
});
export const fetchProduct = (data) => ({
  type: "SUCCESS_GET_PRODUCTS",
  payload: data,
});
export const fetchSearch = (data) => ({
  type: "SUCCESS_GET_SEARCH_PRODUCTS",
  payload: data,
});
