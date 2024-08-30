// roomSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义RoomState的接口
interface RoomState {
  loading: boolean;
  error: string | null;
  rooms: any[];  // 这里可以根据实际数据结构进行细化
}

// 初始化RoomState的初始状态
const initialState: RoomState = {
  loading: true,
  error: null,
  rooms: [],
};

// 异步操作: 获取指定酒店的所有房型
export const getRoomsByHotelId = createAsyncThunk(
  "room/getRoomsByHotelId",
  async (hotelId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/rooms/hotel?hotelId=${hotelId}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 定义slice
export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoomsByHotelId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomsByHotelId.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getRoomsByHotelId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 导出reducer
export default roomSlice.reducer;