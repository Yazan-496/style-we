import { combineReducers } from "redux";
import { AuthReducer } from "./auth/reducer";
import { LanguageReducer } from "./languages/reducer";
import { CartReducer } from "./cart/reducer";
import { mainReducer } from "./main/reducer";
import { ProductReducer } from "./product/reducer";
import { FlashSaleReducer } from "./flashsale/reducer";
import { CheckoutReducer } from "./checkout/reducer";

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  LanguageReducer: LanguageReducer,
  CartReducer: CartReducer,
  mainReducer: mainReducer,
  ProductReducer: ProductReducer,
  FlashSaleReducer: FlashSaleReducer,
  CheckoutReducer: CheckoutReducer,
});
export default rootReducer;
