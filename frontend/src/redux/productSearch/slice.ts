import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// 定义 ProductSearchState 接口
interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalCount: number;
  } | null;
}

// 初始化 state 的初始状态
const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

// 定义异步操作：searchProduct
export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    parameters: {
      keywords: string;
      nextPage: number;
      pageSize: number;
    },
    thunkAPI
  ) => {
    const { keywords, nextPage, pageSize } = parameters;
    const [location, dateRange, roomType] = keywords.split("-");

    const requestBody: any = {};

    if (location && location !== "any") {
      requestBody.location = location;
    }
    if (dateRange && dateRange !== "any") {
      const [startDate, endDate] = dateRange.split("_");
      requestBody.startDate = startDate;
      requestBody.endDate = endDate;
    }
    if (roomType && roomType !== "any") {
      requestBody.roomType = roomType;
    }

    requestBody.pageNumber = nextPage;
    requestBody.pageSize = pageSize;

    const response = await axios.post(`http://127.0.0.1:3000/hotel/search`, requestBody);
    return {
      data: response.data.hotels,
      pagination: {
        currentPage: nextPage,
        pageSize: pageSize,
        totalCount: response.data.totalCount || 0,
      },
    };
  }
);

// 创建 productSearchSlice
export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action: PayloadAction<{ data: any; pagination: any }>) => {
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.loading = false;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});