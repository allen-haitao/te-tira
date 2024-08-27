import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from "./language/languageReducer";
import productListReducer from './productList/productListReducer';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    language: languageReducer,
    productList: productListReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>

export default store;