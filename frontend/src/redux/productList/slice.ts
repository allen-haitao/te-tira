import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义 ProductListState 的接口
interface ProductListState {
  data: { hotels: any[] } | null; // 确保 data 包含 hotels 属性
  loading: boolean;
  error: string | null;
}

// 初始化 ProductListState 的初始状态
const initialState: ProductListState = {
  loading: true,
  error: null,
  data: null,
};

// 异步操作: 获取产品列表
export const fetchProductList = createAsyncThunk<
  { hotels: any[] }, // 返回的数据类型
  void, // 参数类型
  { rejectValue: string } // rejectWithValue 的返回类型
>("productList/fetchProductList", async (_, thunkAPI) => {
  try {
    const response = await axios.get("http://localhost:3000/hotels");
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error instanceof Error ? error.message : "Error fetching product list"
    );
  }
});

// 创建切片
const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductList.fulfilled, (state, action: PayloadAction<{ hotels: any[] }>) => {
        console.log("Fetched hotels data:", action.payload);
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch product list";
      });
  },
});

// 只导出 reducer 和异步 thunk
export const productListReducer = productListSlice.reducer;
export { productListSlice };