// roomSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 定义RoomState的接口
interface Room {
  roomTypeId: string;
  hotelId: string;
  roomTypeName: string;
  price: number;
  total: number;
  available: number;
  createdAt?: string;
}

interface RoomState {
  loading: boolean;
  error: string | null;
  rooms: Room[];
  selectedRoom: Room | null;
}

// 初始化RoomState的初始状态
const initialState: RoomState = {
  loading: false,
  error: null,
  rooms: [],
  selectedRoom: null,
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

// 异步操作: 创建新房型
export const createRoom = createAsyncThunk(
  "room/createRoom",
  async (newRoom: Room, thunkAPI) => {
    try {
      const response = await axios.post(`http://127.0.0.1:3000/rooms`, newRoom);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 异步操作: 更新房间可用性
export const updateRoomAvailability = createAsyncThunk(
  "room/updateRoomAvailability",
  async ({ roomTypeId, available }: { roomTypeId: string; available: number }, thunkAPI) => {
    try {
      const response = await axios.patch(`http://127.0.0.1:3000/rooms/${roomTypeId}/availability`, { available });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// 异步操作: 按ID获取房型
export const getRoomById = createAsyncThunk(
  "room/getRoomById",
  async (roomTypeId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/rooms/${roomTypeId}`);
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
      // 获取指定酒店的所有房型
      .addCase(getRoomsByHotelId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomsByHotelId.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.rooms = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getRoomsByHotelId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 创建新房型
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
        state.rooms.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 更新房间可用性
      .addCase(updateRoomAvailability.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateRoomAvailability.fulfilled, (state, action: PayloadAction<Room>) => {
        const index = state.rooms.findIndex(room => room.roomTypeId === action.payload.roomTypeId);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateRoomAvailability.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 按ID获取房型
      .addCase(getRoomById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRoomById.fulfilled, (state, action: PayloadAction<Room>) => {
        state.selectedRoom = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getRoomById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 导出reducer
export default roomSlice.reducer;