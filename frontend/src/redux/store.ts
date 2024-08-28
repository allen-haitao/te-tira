import languageReducer from "./language/languageReducer";
import productListReducer from './productList/productListReducer';
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { combineReducers, configureStore, Middleware } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";

const rootReducer = combineReducers({
    language: languageReducer,
    productList: productListReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer
})

const store = configureStore({
    reducer: rootReducer,
    // middleware: [thunk, actionLog],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
  });

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;