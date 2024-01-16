import { all, delay, fork, put, takeEvery } from "@redux-saga/core/effects"
import { fetchDataError } from "../../actions"
import API from "helpers/API"
import store from "store/index"
import { startCartLoading, stopCartLoading } from '../../actions/cart';
import Cookies from "js-cookie"

//################# start  ADD_ADDRESS #################//

function* fetchAddAddressSaga(action) {
  const data = action.payload.formData
  const name = data.firstName
  const addressOne = data.addressOne
  const addressType = data.addressType
  const country = data.countryId
  const city = data.City
  const zip = data.postalCode
  const phone = data.phoneNumber
  const email = data.email
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    const address = yield API.post(`api/web_v10/customer/address/add`, {
      contact_person_name: name,
      address_type: addressType,
      address: addressOne,
      country,
      city,
      zip,
      phone,
      email,
    })
    if (address) {
      // console.log(address, "address");
      store.dispatch({
        type: "SET_DEFAULT_ADDRESS",
        payload: address?.data?.data?.id,
      })
      store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
    }
    store.dispatch({ type: "ADDED_ADDRESS" })
    store.dispatch({ type: "GET_PREV_ADDRESS" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* AddAddressWatch() {
  yield takeEvery("ADD_ADDRESS", fetchAddAddressSaga)
}

//################# End ADD_ADDRESS #################//

//################# start  ADD_ADDRESS #################//

function* fetchGetAddressesSaga() {
  let token = Cookies.get('TOKEN_LOCAL_STORAGE');
  if(token) {
    store.dispatch({ type: "START_LOADING_CHECKOUT" })
    const address = yield API.get(`api/web_v10/customer/address/list`)
    if (address) {
      // console.log(address?.data?.data);
      store.dispatch({
        type: "PREV_ADDRESSES",
        payload: { prevAddresses: address.data?.data },
      })
    }

    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* GetAddressesWatch() {
  yield takeEvery("GET_PREV_ADDRESS", fetchGetAddressesSaga)
}

function* fetchGetWishListSaga() {
  let token = Cookies.get('TOKEN_LOCAL_STORAGE');
  if(token) {
    store.dispatch({ type: "START_LOADING_CHECKOUT" })
    const address = yield API.get(`api/web_v10/customer/address/list`)
    if (address) {
      // console.log(address?.data?.data);
      store.dispatch({
        type: "PREV_ADDRESSES",
        payload: { prevAddresses: address.data?.data },
      })
    }

    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* GetWishListWatch() {
  yield takeEvery("GET_WISH_LIST", fetchGetWishListSaga)
}

function* fetchSetDefaultSaga(action) {
  const id = action.payload
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const address = yield API.post(`api/web_v10/customer/address/set-default`, {
    address_id: id,
  })

  store.dispatch({ type: "SET_CHECK_ID", payload: id })
  store.dispatch({ type: "ADDRESS_ID", payload: id })
  store.dispatch({ type: "GET_ITEMS_CART" })
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* GetSetDefaultWatch() {
  yield takeEvery("SET_DEFAULT_ADDRESS", fetchSetDefaultSaga)
}

//################# End ADD_ADDRESS #################//

function* fetchPlaceOrderSaga(action) {
  const data = action.payload
  const type = action.payload?.type
  const addressId = data.addressId
  const orderNote = data.orderNote
  // const wallet = data.wallet ? 1 : 0
  let wallet = 0;
  if (type === "Wallet" || type === "COD") {
    wallet = 1;
  }
  if (type === "Wallet" || type === "Telr") {
    wallet = 1;
  }
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  localStorage.removeItem("COUPON")
  localStorage.removeItem("COUPON_CODES")
  localStorage.removeItem("REDEEM_PRODUCTS_IDS")
  if (type === "COD") {
    const cod = yield API.get(
      `api/web_v10/customer/order/place?order_note=${orderNote}&address_id=${addressId}&pay_by_wallet=${wallet}`
    )
    if (cod?.data) {
      store.dispatch({
        type: "SET_AUTH_TOKEN",
        payload: "cod?.data",
      })
    }
    store.dispatch({ type: "RESET_CHECKOUT_REDUCER" })
  }
  if (type === "Wallet") {
    const wallet = yield API.get(
      `api/web_v10/customer/order/wallet-pay?order_note=${orderNote}&address_id=${addressId}`
    )
    if (wallet?.data) {
      store.dispatch({
        type: "SET_AUTH_TOKEN",
        payload: "wallet?.data",
      })
    }
    store.dispatch({ type: "RESET_CHECKOUT_REDUCER" })
  }
  if (type === "Telr") {
    const telrRES = yield API.get(
      `api/web_v10/customer/order/pay-telr/web?order_note=${orderNote}&address_id=${addressId}&pay_by_wallet=${wallet}`
    )
    if (telrRES?.data?.message?.includes("URL")) {
      const URL = telrRES?.data?.data?.url
      store.dispatch({
        type: "RES_URL_PAYMENT",
        payload: { URL },
      })
    }
  }
  if (type === "postpay") {
    const postpay = yield API.get(
      `api/web_v10/customer/order/post-pay/web?order_note=${orderNote}&address_id=${addressId}&pay_by_wallet=${wallet}`
    )
    if (postpay?.data?.message?.includes("URL")) {
      const URL = postpay?.data?.data?.url
      store.dispatch({
        type: "RES_URL_PAYMENT",
        payload: { URL },
      })
    }
  }
  store.dispatch({ type: "GET_ITEMS_CART" })
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* GetPlaceOrderWatch() {
  yield takeEvery("PLACE_ORDER", fetchPlaceOrderSaga)
}

//################# End ADD_ADDRESS #################//
//################# End ADD_ADDRESS #################//

function* fetchOrdersSaga() {
  yield store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    startCartLoading();
    yield store.dispatch({ type: "START_LOADING_CHECKOUT" })
    const orders = yield API.get(`api/web_v10/customer/order/list`)
    if (orders?.data?.data) {
      // console.log(orders?.data?.data);
      store.dispatch({
        type: "GET_ORDERS_REDUCER",
        payload: { orders: orders?.data?.data },
      })
    }
    stopCartLoading();
    yield store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (error) {
    stopCartLoading();
    yield store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* GetOrdersWatch() {
  yield takeEvery("GET_ORDERS_SAGA", fetchOrdersSaga)
}

//################# End ADD_ADDRESS #################//
//################# End ADD_ADDRESS #################//

function* fetchOrderStatusSaga() {
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const orders = yield API.get(`api/web_v10/customer/order/orders_statuses`)
  if (orders?.data?.data) {
    store.dispatch({
      type: "GET_ORDERS_STATUS_REDUCER",
      payload: { orders: orders?.data?.data },
    })
    const originalData = orders?.data?.data
    const categorizedOrders = {}
    originalData.forEach(orderStatus => {
      const { status, orders } = orderStatus

      if (!categorizedOrders[status]) {
        categorizedOrders[status] = []
      }

      categorizedOrders[status] = orders
    })
    store.dispatch({
      type: "GET_ORDERS_STATUS_REDUCER_TYPES",
      payload: categorizedOrders,
    })
  }
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* GetOrderStatusWatch() {
  yield takeEvery("GET_ORDERS_STATUS", fetchOrderStatusSaga)
}

function* fetchWalletSaga(action) {
  const offset = 1
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const wallet = yield API.get(
    `api/web_v10/customer/wallet/list?limit=10&offset=${offset}`
  )
  // console.log(wallet?.data);
  if (wallet?.data) {
    store.dispatch({
      type: "GET_WALLET_REDUCER",
      payload: { wallet: wallet?.data },
    })
  }
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* GetWalletWatch() {
  yield takeEvery("GET_WALLET", fetchWalletSaga)
}

function* fetchWalletPagSaga(action) {
  const offset = action.payload?.offset
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    const wallet = yield API.get(
      `api/web_v10/customer/wallet/list?limit=10&offset=${offset}`
    )
    if (wallet?.data) {
      store.dispatch({
        type: "SUCCESS_GET_WALLET",
        payload: { wallet: wallet?.data },
      })
      store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
    }
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* GetWalletPagWatch() {
  yield takeEvery("GET_WALLET_PAGINATION", fetchWalletPagSaga)
}

//################# End ADD_ADDRESS #################//
//################# End ADD_ADDRESS #################//

function* DeleteOrderSaga(action) {
  const id = action.payload
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const orders = yield API.post(`api/web_v10/order/cancel-order`, {
    order_id: id,
  })
  store.dispatch({ type: "GET_ORDERS_SAGA" })
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* DeleteOrderWatch() {
  yield takeEvery("DELETE_ORDER", DeleteOrderSaga)
}

//################# End ADD_ADDRESS #################//
//################# End ADD_ADDRESS #################//

function* DeleteAddressSaga(action) {
  const id = action.payload
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  yield API.post(`api/web_v10/customer/address/delete`, {
    address_id: id,
  })
  store.dispatch({ type: "GET_PREV_ADDRESS" })
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* DeleteAddressWatch() {
  yield takeEvery("DELETE_ADDRESS", DeleteAddressSaga)
}

//################# End ADD_ADDRESS #################//

function* ConfirmPayment(action) {
  const type = action.payload?.type
  const orderId = action.payload?.orderId
  const status = action.payload?.statusOrder
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  if (type === "postpay") {
    const postPay = yield API.get(
      `post-pay/success?order_id=${orderId}&status=${status}`
    )
    if (
      postPay?.data?.message?.includes("successfully") ||
      postPay?.data?.message?.includes("بنجاح")
    ) {
      // console.log(postPay?.data?.message, "postPay")
      store.dispatch({ type: "CONFIRM_PAYMENT_REDUCER" })
    }
  }
  if (type === "telr") {
    const telr = yield API.get(`pay-telr/success`)
    if (
      telr?.data?.message?.includes("successfully") ||
      telr?.data?.message?.includes("بنجاح")
    ) {
      store.dispatch({ type: "CONFIRM_PAYMENT_REDUCER" })
    }
  }
  store.dispatch({ type: "GET_PREV_ADDRESS" })
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* ConfirmPaymentWatch() {
  yield takeEvery("CONFIRM_PAYMENT", ConfirmPayment)
}

function* ReturnOrderDetails(action) {
  const orderRequestId = action.payload?.returnRequestId
  yield store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const orderRequestDetails = yield API.get(
    `api/web_v10/customer/order/return_requests/order_details?return_request_id=${orderRequestId}`
  )
  if (orderRequestDetails?.data) {
    const orderRequestDetailRes = orderRequestDetails?.data?.data
    store.dispatch({
      type: "RETURN_ORDER_DETAILS_REDUCER",
      payload: {
        orderRequestDetailRes,
        orderRequestId
      },
    })
  }
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* ReturnOrderDetailsWatch() {
  yield takeEvery("RETURN_ORDER_DETAILS", ReturnOrderDetails)
}

function* AddReturnRequestDetails(action) {
  const orderId = action.payload?.id
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  yield API.get(
    `api/web_v10/customer/order/return_requests/store?order_id=${orderId}&is_for_exchange=0&is_draft=1`
  ).then(data => {
    if (data?.data?.data) {
      store.dispatch({
        type: "RETURN_ORDER_DETAILS",
        payload: {
          returnRequestId: data?.data?.data?.return_request_id,
        },
      })
    }
  })

  // store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* ReturnRequestWatch() {
  yield takeEvery("ADD_RETURN", AddReturnRequestDetails)
}

function* GetReasonsDetails() {
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  const reasons = yield API.get(
    `api/web_v10/customer/order/return_requests/reasons`
  )
  if (reasons?.data?.data?.return_reasons?.length > 0) {
    store.dispatch({
      type: "GET_REASONS_REDUCER",
      payload: {
        Reasons: reasons?.data?.data?.return_reasons,
      },
    })
  }
  store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
}

function* GetReasonsWatch() {
  yield takeEvery("GET_REASONS", GetReasonsDetails)
}

function* StoreReturnProduct(action) {
  const data = action.payload
  const type = action.payload?.type === "Add" ? "store" : "update"
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    const reasons = yield API.post(
      `api/web_v10/customer/order/return_request_products/${type}`,
      {
        product_id: data?.productId,
        order_detail_id: data?.orderId,
        return_request_id: data?.returnRequestId,
        id: data?.returnRequestProductId,
        is_for_exchange: data?.isForExchange,
        quantity: data?.quantity,
        return_request_reason_id: parseInt(data?.returnRequestReasonId),
        images: data?.images?.length > 0 ? data?.images : [],
        details: data?.details,
      }
    ).then(res => {
      if (res?.data) {
        store.dispatch({
          type: "RETURN_ORDER_DETAILS",
          payload: {
            returnRequestId: data?.returnRequestId,
          },
        })
        store.dispatch({
          type: "CLOSE_AFTER_SUCCESS_RETURN_PRODUCT",
        })
        // store.dispatch({ type: 'GET_ORDERS_SAGA' });
      }
    })
    if (reasons?.data?.data?.return_reasons?.length > 0) {
      store.dispatch({
        type: "GET_REASONS_REDUCER",
        payload: {
          Reasons: reasons?.data?.data?.return_reasons,
        },
      })
    }
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* StoreReturnProductWatch() {
  yield takeEvery("STORE_RETURN_PRODUCT", StoreReturnProduct)
}
function* DeleteReturnProduct(action) {
  const id = action.payload?.id
  const returnId = action.payload?.returnId
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    yield API.get(
      `api/web_v10/customer/order/return_request_products/cancel?return_request_product_id=${id}`
    ).then(data => {
      if (data?.data) {
        store.dispatch({
          type: "CLOSE_AFTER_SUCCESS_RETURN_PRODUCT",
        })
        // store.dispatch({ type: 'GET_ORDERS_SAGA' });
        store.dispatch({
          type: "RETURN_ORDER_DETAILS",
          payload: {
            returnRequestId: returnId,
          },
        })
      }
    })
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* DeleteReturnProductWatch() {
  yield takeEvery("DELETE_RETURN_PRODUCT", DeleteReturnProduct)
}
function* DeleteReturnRequest(action) {
  const id = action.payload?.id
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    yield API.get(
      `api/web_v10/customer/order/return_requests/cancel?return_request_id=${id}`
    ).then(data => {
      if (data?.data) {
        store.dispatch({
          type: "CLOSE_AFTER_SUCCESS_RETURN_PRODUCT",
        })
        store.dispatch({ type: "GET_ORDERS_SAGA" })
      }
    })
    // store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* DeleteReturnRequestWatch() {
  yield takeEvery("DELETE_RETURN_REQUEST", DeleteReturnRequest)
}
function* AcceptReturnRequest(action) {
  const returnRequestId = action?.payload?.returnRequestId
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    yield API.get(
      `api/web_v10/customer/order/return_requests/view?return_request_id=${returnRequestId}`
    ).then(data => {
      // console.log(data, "data")
      if (data?.data) {
        const res = data?.data?.data
        store.dispatch({
          type: "ACCEPT_RETURN_REDUCER",
          payload: {
            res,
          },
        })
        store.dispatch({ type: "GET_ORDERS_SAGA" })
      }
    })
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* AcceptReturnRequestWatch() {
  yield takeEvery("SHOW_RETURN_ACCEPTED", AcceptReturnRequest)
}
function* ConfirmReturnRequest(action) {
  const returnRequestId = action.payload?.returnRequestId
  store.dispatch({ type: "START_LOADING_CHECKOUT" })
  try {
    yield API.post(
      `api/web_v10/customer/order/return_requests/confirm_return_request`,
      {
        return_request_id: returnRequestId,
      }
    ).then(data => {
      if (data?.data) {
        store.dispatch({
          type: "CLOSE_AFTER_SUCCESS_RETURN_PRODUCT",
        })
        store.dispatch({ type: "GET_ORDERS_SAGA" })
      }
    })
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  } catch (e) {
    store.dispatch({ type: "STOP_LOADING_CHECKOUT" })
  }
}

function* ConfirmReturnRequestWatch() {
  yield takeEvery("CONFIRM_RETURN_REQUEST", ConfirmReturnRequest)
}

//################# End ADD_ADDRESS #################//
export function* CheckoutSaga() {
  yield all([fork(AddAddressWatch)])
  yield all([fork(GetAddressesWatch)])
  yield all([fork(GetSetDefaultWatch)])
  yield all([fork(GetPlaceOrderWatch)])
  yield all([fork(GetOrdersWatch)])
  yield all([fork(DeleteOrderWatch)])
  yield all([fork(DeleteAddressWatch)])
  yield all([fork(GetOrderStatusWatch)])
  yield all([fork(GetWishListWatch)])
  yield all([fork(GetWalletWatch)])
  yield all([fork(GetWalletPagWatch)])
  yield all([fork(ConfirmPaymentWatch)])
  yield all([fork(ReturnOrderDetailsWatch)])
  yield all([fork(ReturnRequestWatch)])
  yield all([fork(GetReasonsWatch)])
  yield all([fork(StoreReturnProductWatch)])
  yield all([fork(DeleteReturnProductWatch)])
  yield all([fork(DeleteReturnRequestWatch)])
  yield all([fork(ConfirmReturnRequestWatch)])
  yield all([fork(AcceptReturnRequestWatch)])
}
