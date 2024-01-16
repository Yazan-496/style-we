"use client"
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // or 'redux-persist/lib/storage/local' for local storage
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";

// initial states here
const initalState = {};

const persistConfig = {
  key: "root", // key for the root of your state object
  storage: storage,
  whitelist: ["AuthReducer", "ProductReducer", "CartReducer", "mainReducer"], // Specify the reducer(s) to persist
};
// middleware
const middleware = [thunk];
const sagaMiddleware = createSagaMiddleware();

// Create the Redux store
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  initalState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
export const persistor = persistStore(store);

// Run the root saga
sagaMiddleware.run(rootSaga);
const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);
export default store;
