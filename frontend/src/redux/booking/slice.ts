import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { checkout } from "../shoppingCart/slice";

// 定义 OrderItem 的类型
interface OrderItem {
  userId: string;
  hotelId: string;
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
  totalPrice: number;
}

interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any;
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null,
};

// 修改后的 booking 异步操作，接收的参数改为包含订单信息的对象
export const booking = createAsyncThunk(
  "order/booking",
  async (parameters: { jwt: string; orderItem: OrderItem }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `http://127.0.0.1:3000/bookings`, // 使用 '/bookings' 路由
        parameters.orderItem, // 发送正确的请求主体
        {
          headers: {
            Authorization: `bearer ${parameters.jwt}`,
          },
        }
      );
      return data;
    } catch (error: any) { // 将 error 显式转换为 any 类型
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to create booking"
      );
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(booking.pending, (state) => {
        state.loading = true;
      })
      .addCase(booking.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(booking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkout.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;