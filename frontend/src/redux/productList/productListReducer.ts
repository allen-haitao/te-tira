import {
    FETCH_PRODUCT_LIST_FAIL,
    FETCH_PRODUCT_LIST_START,
    FETCH_PRODUCT_LIST_SUCCESS,
    ProductListAction,
  } from "./productListActions";
  
  interface ProductListState {
    data: any;
    loading: boolean;
    error: string | null;
  }
  
  const defaultState: ProductListState = {
    loading: true,
    error: null,
    data: null,
  };
  
  export default (state = defaultState, action: ProductListAction) => {
    console.log("Reducer called with action:", action);
    console.log("Current state before action:", state);   
    switch (action.type) {
      case FETCH_PRODUCT_LIST_START:
        return { ...state, loading: true };
      case FETCH_PRODUCT_LIST_SUCCESS:
        console.log("Reducer - data:", action.payload); 
        return { ...state, loading: false, data: action.payload};
      case FETCH_PRODUCT_LIST_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };