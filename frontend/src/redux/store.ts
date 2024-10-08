import { languageSlice } from "./language/slice";
import { productListSlice } from "./productList/slice";
import { actionLog } from "./middlewares/actionLog";
import { productDetailSlice } from "./productDetail/slice";
import { roomSlice } from "./room/slice";
import { commentsSlice } from "./comments/slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSearchSlice } from "./productSearch/slice";
import { authSlice } from "./auth/slice";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { orderSlice } from "./booking/slice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"]
}

const rootReducer = combineReducers({
    language: languageSlice.reducer,
    productList: productListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    room: roomSlice.reducer,
    comments: commentsSlice.reducer, 
    productSearch: productSearchSlice.reducer,
    user: authSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    booking: orderSlice.reducer
   

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(actionLog),
    devTools: true,
  });

const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default { store, persistor };