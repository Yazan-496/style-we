import { all, fork, put, takeEvery } from "@redux-saga/core/effects";
import {
  fetchDataSuccess,
  fetchDataError,
  startLoading,
  stopLoading,
  fetchSittingSuccess,
} from "../../actions";
import API from "helpers/API";
import store from "../../index";

//################# Start SETTING #################//

function* fetchSittingSaga() {
  // const APISitting = "https://json-styles.vercel.app/sitting";
  const APISitting = "api/web_v10/web/home/startingSettings";
  try {
    yield put(startLoading());
    const sitting = yield API.get(APISitting);
    const { font, color, logo, backgroundColor, root, title } = sitting.data;
    if (typeof window !== "undefined" && sitting.data?.data) {
      yield sessionStorage.setItem(
        "SITTING",
        JSON.stringify({ sitting: sitting.data?.data['starting-setting'] })
      );
      yield put(fetchSittingSuccess({ sitting: sitting.data }));
    }
    store.dispatch(stopLoading());
  } catch (error) {
    // console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainSittingWatch() {
  yield takeEvery("SETTING", fetchSittingSaga);
}

//################# End SETTING #################//

//################# Start Main page #################//
function* fetchMainPageSaga() {
  try {
    yield put(startLoading());
    const mainPage = yield API.get("api/web_v10/web/home");
    yield put(fetchDataSuccess({ mainPage: mainPage }));
    // setTimeout(() => {
    yield put(stopLoading());
    // }, 3000);
  } catch (error) {
    // console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainPageWatch() {
  yield takeEvery("GET_SECTIONS_SAGA", fetchMainPageSaga);
}

//################# Start FLASH_SALE #################//

function* fetchFlashSaleSaga() {
  yield put(startLoading());
  try {
    const flashSale = yield API.get("api/web_v10/web/home/flash-deals");
    yield put(fetchDataSuccess({ flashSale: flashSale }));
    yield put(stopLoading());
  } catch (error) {
    // console.log(error);
    yield put(stopLoading());
    yield put(fetchDataError(error));
  }
}

function* MainFlashSaleWatch() {
  yield takeEvery("GET_FLASH_SALE_SAGA", fetchFlashSaleSaga);
}

//################# End FLASH_SALE #################//

//################# Start CATEGORIES #################//

function* fetchCategoriesSaga() {
  try {
    yield put(startLoading());
    const mainCategories = yield API.get("api/web_v10/web/home/main-categories");
    yield put(fetchDataSuccess({ mainCategories: mainCategories }));
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    // console.log(error);
    yield put(fetchDataError(error));
  }
}

function* MainCategoriesWatch() {
  yield takeEvery("GET_CATEGORIES_SAGA", fetchCategoriesSaga);
}

function* fetchFooterPagesSaga() {
  try {
    const footer = yield API.get("api/web_v10/web/home/footer");
    const footerRes = footer?.data?.data
    store.dispatch({type: "GET_FOOTER_PAGES_REDUCER", payload: {footerRes}})
  } catch (error) {
    // console.log(error);
  }
}

function* FooterPagesWatch() {
  yield takeEvery("GET_FOOTER_PAGES", fetchFooterPagesSaga);
}

function* fetchFooterPageContentSaga(action) {
  yield put(startLoading());
  const page = action?.payload?.page
  try {
    const footer = yield API.get(`api/web_v10/web/home/setup_page?slug=${page}`);
    // console.log(footer, "footer")
    const footerPage = footer?.data?.data
    store.dispatch({type: "GET_PAGE_CONTENT_REDUCER", payload: {footerPage}})
    yield put(stopLoading());
  } catch (error) {
    yield put(stopLoading());
    // console.log(error);
  }
}

function* FooterPageContentWatch() {
  yield takeEvery("GET_CONTENT_FOOTER", fetchFooterPageContentSaga);
}

//################# End CATEGORIES #################//

export function* MainPageSaga() {
  yield all([fork(MainPageWatch)]);
  yield all([fork(MainSittingWatch)]);
  yield all([fork(MainFlashSaleWatch)]);
  yield all([fork(MainCategoriesWatch)]);
  yield all([fork(FooterPagesWatch)]);
  yield all([fork(FooterPageContentWatch)]);
}
