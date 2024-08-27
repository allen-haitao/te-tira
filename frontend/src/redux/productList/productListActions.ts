import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import axios from "axios";

export const FETCH_PRODUCT_LIST_START = "FETCH_PRODUCT_LIST_START"; // 正在调用推荐信息api
export const FETCH_PRODUCT_LIST_SUCCESS = "FETCH_PRODUCT_LIST_SUCCESS"; // 推荐信息api调用成功
export const FETCH_PRODUCT_LIST_FAIL = "FETCH_PRODUCT_LIST_FAIL"; // 推荐信息api调用失败

interface FetchProductListStartAction {
  type: typeof FETCH_PRODUCT_LIST_START;
}

interface FetchProductListSuccessAction {
  type: typeof FETCH_PRODUCT_LIST_SUCCESS;
  payload: any;
}

interface FetchProductListFailAction {
  type: typeof FETCH_PRODUCT_LIST_FAIL;
  payload: any;
}

export type ProductListAction =
  | FetchProductListStartAction
  | FetchProductListSuccessAction
  | FetchProductListFailAction;

export const fetchProductListStartActionCreator =
  (): FetchProductListStartAction => {
    return {
      type: FETCH_PRODUCT_LIST_START,
    };
  };

export const fetchProductListSuccessActionCreator = (
  data: any
): FetchProductListSuccessAction => {
  return {
    type: FETCH_PRODUCT_LIST_SUCCESS,
    payload: data,
  };
};

export const fetchProductListFailActionCreator = (
  error: string
): FetchProductListFailAction => {
  return {
    type: FETCH_PRODUCT_LIST_FAIL,
    payload: error,
  };
};

// thunk 可以返回一个函数，而不一定是js对象
// 在一个thunk action中可以完成一些列连续的action操作
// 并且可以处理异步逻辑
// 业务逻辑可以从ui层面挪到这里，代码分层会更清晰
export const giveMeDataActionCreator =
  (): ThunkAction<void, RootState, unknown, ProductListAction> =>
  async (dispatch, getState) => {
    dispatch(fetchProductListStartActionCreator());
    try {
      const response = await axios.get("http://localhost:3000/hotels");
      const data = response.data;
      // 打印从后端获取的数据
      console.log("Data fetched from backend:", data);

      dispatch(fetchProductListSuccessActionCreator(data));
    } catch (error) {
      console.error("Error fetching data:", error);
      
      dispatch(
        fetchProductListFailActionCreator(
          error instanceof Error ? error.message : "error"
        )
      );
    }
  };