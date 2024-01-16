export const fetchDataSuccess = (data) => ({
  type: "FETCH_DATA_SUCCESS",
  payload: data,
});
export const fetchSittingSuccess = (data) => ({
  type: "FETCH_SITTING_SUCCESS",
  payload: data,
});

export const fetchDataError = (error) => ({
  type: "FETCH_DATA_ERROR",
  payload: error,
});

export const startLoading = () => ({
  type: "START_LOADING",
});

export const stopLoading = () => ({
  type: "STOP_LOADING",
});
