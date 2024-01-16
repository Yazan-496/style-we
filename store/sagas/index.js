import { all } from "redux-saga/effects";
import { MainPageSaga } from "./main"; // Import your feature sagas here
import { CartSaga } from "./cart"; // Import your feature sagas here
import { ProductSaga } from "./product"; // Import your feature sagas here
import { AuthSaga } from "./auth"; // Import your feature sagas here
import { FlashSaleSaga } from "./flashsale"; // Import your feature sagas here
import { CheckoutSaga } from "./checkout"; // Import your feature sagas here

function* rootSaga() {
  yield all([
    CartSaga(),
    MainPageSaga(),
    ProductSaga(),
    AuthSaga(),
    FlashSaleSaga(),
    CheckoutSaga(),
  ]);
}

export default rootSaga;
