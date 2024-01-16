import {
  all,
  fork,
  put,
  takeEvery,
  race,
  take,
  delay,
  takeLatest,
  debounce,
} from "@redux-saga/core/effects";

import API from "helpers/API";
import {
  fetchDataError,
  startLoading,
  stopLoading,
  fetchFlashSale,
} from "../../actions/flashsale";
import store from "../../index";

function* GetFlashSalePagination(action) {
  const offset = action.payload?.offset;
  yield put(startLoading());
  try {
    const flashSale = yield API.get(
      `api/web_v10/web/home/flash-deals?offset=${offset}&limit=20`
    );

    yield put(fetchFlashSale(flashSale?.data?.data));
    yield delay(4000);
    yield put(stopLoading());
  } catch (error) {
    yield put(fetchDataError(error));
    yield put(stopLoading());
  }
}

function* GetFlashSalePaginationWatch() {
  yield takeEvery("GET_FLASH_SALE_PAGINATION", GetFlashSalePagination);
}
export function* FlashSaleSaga() {
  yield all([fork(GetFlashSalePaginationWatch)]);
}
