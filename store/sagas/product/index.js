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
  fetchProductDetails,
  fetchDataError,
  startLoading,
  stopLoading,
  successAddHeart,
  successRemoveHeart,
  fetchProduct,
  fetchSearch,
  startLoadingPagination,
  stopLoadingPagination,
  fetchWishListDetails,
} from "../../actions/product";
import Cookies from "js-cookie"
import store from "store";
//################# Start QuickProduct #################//

function* fetchProductDetailSaga(action) {
  yield put(startLoading());
  const id = action.payload.id;
  try {
    let storedRecentlyProduct = [];
    const Product = yield API.get(`api/web_v10/products/details/${id}`);
    if (typeof window !== "undefined") {
      const recentlyData = JSON.parse(
        sessionStorage.getItem("RECENTLY_PRODUCT")
      );
      storedRecentlyProduct = recentlyData || [];
    }
    // console.log(Product?.data?.data?.id, "id");
    const isProductStored = storedRecentlyProduct.some(
      (product) => product?.id === Product?.data?.data?.id
    );
    if (!isProductStored) {
      storedRecentlyProduct.push(Product?.data?.data);
      // console.log(storedRecentlyProduct, "storedRecentlyProduct");
      if (storedRecentlyProduct) {
        sessionStorage.setItem(
          "RECENTLY_PRODUCT",
          JSON.stringify(storedRecentlyProduct)
        );
      }
    }
    store.dispatch({ type: "SYNC_SESSION_STORAGE" });
    yield put(fetchProductDetails({ Product: Product?.data?.data }));
    yield put(stopLoading());
  } catch (error) {
    // console.log(error);
    yield put(fetchDataError(error));
  }
}

function* GetProductDetailWatch() {
  yield takeEvery("PRODUCT_DETAILS", fetchProductDetailSaga);
}

//################# End QuickProduct #################//

//################# Start Add To Favorite Saga #################//

function* AddOrRemoveFavoriteSaga(action) {
  // yield put(startLoading());
  const id = action.payload.id;
  const isFavorite = action.payload.isFavorite;
  try {
    if (isFavorite) {
      yield API.post(`api/web_v10/customer/wish-list/remove`, {
        product_id: id,
      });
      yield put(successRemoveHeart({ id: id }));
    } else {
      yield API.post(`api/web_v10/customer/wish-list/add`, {
        product_id: id,
      });
      yield put(successAddHeart({ id: id }));
    }
    store.dispatch({ type: "SYNC_PRODUCTS" });
    store.dispatch({ type: "GET_FAVORITE_PRODUCTS" });
  } catch (error) {
    // console.log(error);
    yield put(fetchDataError(error));
  }
}

function* AddOrRemoveFavoriteWatch() {
  yield takeEvery("FAVORITE_PRODUCT", AddOrRemoveFavoriteSaga);
}

//################# End Add To Favorite Saga #################//

//################# Start Get Favorite Products Saga #################//

function* GetFavoriteProducts() {
  let token = Cookies.get('TOKEN_LOCAL_STORAGE');
  if(token) {
    yield put(startLoading());
    try {
      const WishList = yield API.get(`api/web_v10/customer/wish-list`);
      yield put(stopLoading());
      if (WishList) {
        // console.log(WishList);
        yield put(fetchWishListDetails({ WishList: WishList?.data?.data }));
      }
    } catch (error) {
      // console.log(error);
      yield put(fetchDataError(error));
    }
  }
}

function* GetFavoriteProductsWatch() {
  yield takeEvery("GET_FAVORITE_PRODUCTS", GetFavoriteProducts);
}

//################# End Get Favorite Products Saga #################//

//################# Start Get Favorite Products Saga #################//

function* GetProducts(action) {
  const Attributes = action?.payload.Attributes;
  const Category = action?.payload.Attributes.Category || null;
  const pricesParam = `prices=${JSON.stringify(Attributes.Prices)}`;
  const offset = 1;
  const page = Attributes.page;
  const data_from = Attributes.data_from || null;
  const sort_by = Attributes.sort_by || null;
  const searchText = Attributes.searchText?.replace("search_text=", "") || null;
  const sizesParam = `attributes=[${JSON.stringify({
    id: 1,
    name: "Size",
    options: Attributes.Sizes,
  })}]`;
  const brandsParam = `brands=${JSON.stringify(Attributes.Brands)}`;
  const searchValueReducer = store.getState()?.ProductReducer?.search_value;
  const categoryReducer = store.getState()?.ProductReducer?.category;
  const pagination = store.getState()?.ProductReducer?.pagination;
  yield put(startLoading());
  try {
    if (searchValueReducer !== searchText || categoryReducer !== Category) {
      store.dispatch({ type: "RESET_JUST_GET_PRODUCTS" });
    }
    if (
      pricesParam.length > 0 ||
      sizesParam.length > 0 ||
      brandsParam.length > 0
    ) {
    }
    const Products = yield searchText
      ? API.get(
          `api/web_v10/products?search_text=${searchText}&offset=${offset}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}&${brandsParam}`
        )
      : Category
      ? API.get(
          `api/web_v10/products?category=${Category}&offset=${offset}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}&${brandsParam}`
        )
      : brandsParam
      ? API.get(
          `api/web_v10/products?${brandsParam}&offset=${offset}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}`
        )
      : null;

    if (searchText) {
      if (typeof window !== "undefined") {
        if (localStorage.getItem("RECENT_SEARCH")) {
          const recentSearches = JSON.parse(
            localStorage.getItem("RECENT_SEARCH")
          );

          if (!recentSearches.includes(searchText)) {
            if (searchText && searchText !== "undefined") {
              recentSearches.push(searchText);
            }

            localStorage.setItem(
              "RECENT_SEARCH",
              JSON.stringify(recentSearches)
            );
          }
        } else {
          const recentSearches = [searchText];

          localStorage.setItem("RECENT_SEARCH", JSON.stringify(recentSearches));
        }
      }
    }
    yield put(fetchProduct({ Products: Products?.data, category: Category }));
    store.dispatch({
      type: "SEO_PRODUCT",
      payload: {
        title: Products?.data?.data?.category_title,
        description: Products?.data?.data?.category_seo_description,
      },
    });
    store.dispatch({ type: "SYNC_PRODUCTS" });
    // yield delay(3000);
    yield put(stopLoading());
  } catch (error) {
    // console.log(error);
    yield put(fetchDataError(error));
    // yield put(stopLoading());
  }
}

function* GetProductsWatch() {
  yield takeLatest("GET_PRODUCTS", GetProducts);
}

//################# Start Get Favorite Products Saga #################//

function* GetProductsPagination(action) {
  const Attributes = action?.payload.Attributes;
  const Category = action?.payload.Attributes.Category || null;
  const pricesParam = `prices=${JSON.stringify(Attributes.Prices)}`;
  const offset = Attributes.offset;
  const page = Attributes.page;
  const data_from = Attributes.data_from || null;
  const sort_by = Attributes.sort_by || null;
  const searchText = Attributes.searchText?.replace("search_text=", "") || null;
  const sizesParam = `attributes=[${JSON.stringify({
    id: 1,
    name: "Size",
    options: Attributes.Sizes,
  })}]`;
  const brandsParam = `brands=${JSON.stringify(Attributes.Brands)}`;
  const searchValueReducer = store.getState()?.ProductReducer?.search_value;
  const categoryReducer = store.getState()?.ProductReducer?.category;
  const offsetReducer = store.getState()?.ProductReducer?.offset;
  if (offsetReducer !== offset) {
    // console.log("222");
    try {
      yield put(startLoadingPagination());
      const Products = yield searchText
        ? API.get(
            `api/web_v10/products?search_text=${searchText}&offset=${offsetReducer}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}&${brandsParam}`
          )
        : Category
        ? API.get(
            `api/web_v10/products?category=${Category}&offset=${offsetReducer}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}&${brandsParam}`
          )
        : brandsParam
        ? API.get(
            `api/web_v10/products?${brandsParam}&offset=${offsetReducer}&page=${page}&sort_by=${sort_by}&data_from=${data_from}&${pricesParam}&${sizesParam}`
          )
        : null;

      if (searchText) {
        if (typeof window !== "undefined") {
          if (localStorage.getItem("RECENT_SEARCH")) {
            const recentSearches = JSON.parse(
              localStorage.getItem("RECENT_SEARCH")
            );

            if (!recentSearches.includes(searchText)) {
              recentSearches.push(searchText);

              localStorage.setItem(
                "RECENT_SEARCH",
                JSON.stringify(recentSearches)
              );
            }
          } else {
            const recentSearches = [searchText];

            localStorage.setItem(
              "RECENT_SEARCH",
              JSON.stringify(recentSearches)
            );
          }
        }
      }
      yield put(fetchProduct({ Products: Products?.data, category: Category }));
      store.dispatch({ type: "SYNC_PRODUCTS" });
      // yield delay(5000);
      yield put(stopLoadingPagination());
    } catch (error) {
      console.log(error);
      yield put(fetchDataError(error));
      yield put(stopLoadingPagination());
    }
  }
}

function* GetProductsPaginationWatch() {
  yield takeLatest("GET_PRODUCTS_PAGINATION", GetProductsPagination);
}

//################# End Get Favorite Products Saga #################//

//################# Start INCREASE_OFFSET_REDUCER Saga #################//

function* IncreaseOffset() {
  yield put(startLoadingPagination());
  store.dispatch({ type: "INCREASE_OFFSET_REDUCER" });
  yield put(stopLoadingPagination());
}

function* IncreaseOffsetWatch() {
  yield takeLatest("INCREASE_OFFSET", IncreaseOffset);
}

//################# End INCREASE_OFFSET_REDUCER Saga #################//
//################# Start INCREASE_OFFSET_REDUCER Saga #################//

function* DecreaseOffset() {
  yield put(startLoading());
  store.dispatch({ type: "DECREASE_OFFSET_REDUCER" });
  yield put(stopLoading());
}

function* DecreaseOffsetWatch() {
  yield takeEvery("Decrease_Offset", DecreaseOffset);
}

//################# End INCREASE_OFFSET_REDUCER Saga #################//
//################# Start INCREASE_OFFSET_REDUCER Saga #################//

function* SetSortBy(action) {
  const sortBy = action.payload.sortBy;
  console.log(action);
  yield put(startLoading());
  store.dispatch({ type: "SET_SORT_BY_REDUCER", payload: sortBy });
  // yield put(stopLoading());
}

function* SetSortByWatch() {
  yield takeEvery("Set_SortBy", SetSortBy);
}

//################# End INCREASE_OFFSET_REDUCER Saga #################//
//################# Start INCREASE_OFFSET_REDUCER Saga #################//

function* SetFilter(action) {
  const filter = action.payload.filter;
  yield put(startLoading());
  store.dispatch({ type: "SET_FILTER_REDUCER", payload: filter });
  // yield put(stopLoading());
}

function* SetFilterWatch() {
  yield takeEvery("Set_Filter", SetFilter);
}

//################# End INCREASE_OFFSET_REDUCER Saga #################//
//################# Start INCREASE_OFFSET_REDUCER Saga #################//

function* getSearch(action) {
  const word = action.payload;
  if (word) {
    yield put({ type: "START_LOADING_SEARCH" });
    try {
      const SearchResult = yield API.get(
        `api/web_v10/products/search?name=${word}`
      );
      yield put(fetchSearch({ SearchResult: SearchResult?.data }));
    } catch (error) {
      console.log(error);
      yield put(fetchDataError(error));
    } finally {
      yield put({ type: "STOP_LOADING_SEARCH" });
    }
  }
}

function* GetSearchWatchTime() {
  yield debounce(1500, "SEARCH", getSearch);
}

//################# End INCREASE_OFFSET_REDUCER Saga #################//

//################# Start QuickProduct #################//

function* fetchProductDetailServerSaga(action) {
  yield put(startLoading());
  const productData = action.payload.productData;
  try {
    let storedRecentlyProduct = [];
    if (typeof window !== "undefined") {
      const recentlyData = JSON.parse(
        sessionStorage.getItem("RECENTLY_PRODUCT")
      );
      storedRecentlyProduct = recentlyData || [];
    }
    // console.log(productData?.id, "id");
    const isProductStored = storedRecentlyProduct.some(
      (product) => product?.id === productData?.id
    );
    if (!isProductStored) {
      storedRecentlyProduct.push(productData);
      // console.log(storedRecentlyProduct, "storedRecentlyProduct");
      if (storedRecentlyProduct) {
        sessionStorage.setItem(
          "RECENTLY_PRODUCT",
          JSON.stringify(storedRecentlyProduct)
        );
      }
    }
    store.dispatch({ type: "SYNC_SESSION_STORAGE" });
    yield put(fetchProductDetails({ Product: productData }));
    yield put(stopLoading());
  } catch (error) {
    console.log(error);
    yield put(fetchDataError(error));
  }
}

function* GetProductDetailServerWatch() {
  yield takeEvery("PRODUCT_DETAILS_SERVER", fetchProductDetailServerSaga);
}

export function* ProductSaga() {
  yield all([fork(GetProductsPaginationWatch)]);
  yield all([fork(GetProductDetailWatch)]);
  yield all([fork(GetFavoriteProductsWatch)]);
  yield all([fork(AddOrRemoveFavoriteWatch)]);
  yield all([fork(GetProductsWatch)]);
  yield all([fork(IncreaseOffsetWatch)]);
  yield all([fork(DecreaseOffsetWatch)]);
  yield all([fork(SetSortByWatch)]);
  yield all([fork(SetFilterWatch)]);
  yield all([fork(GetSearchWatchTime)]);
  yield all([fork(GetProductDetailServerWatch)]);
}
