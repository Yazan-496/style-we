export const fetchDataError = (error) => ({
  type: "FETCH_DATA_ERROR",
  payload: error,
});

export const startLoading = () => ({
  type: "START_LOADING_FLASH_SALE",
});

export const stopLoading = () => ({
  type: "STOP_LOADING_FLASH_SALE",
});
export const fetchFlashSale = (data) => ({
  type: "SUCCESS_GET_FLASH_SALE",
  payload: data,
});
