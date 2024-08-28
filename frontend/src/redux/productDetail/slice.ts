import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch } from "../store";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (hotelId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/hotels/${hotelId}`
    );
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {},
  extraReducers: {
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});