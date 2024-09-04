import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 导出 Comment 数据接口
export interface CommentData {
  id: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
}

// 定义 CommentsState 接口
interface CommentsState {
  loading: boolean;
  error: string | null;
  comments: CommentData[];
}

// 初始化 CommentsState 的初始状态
const initialState: CommentsState = {
  loading: false,
  error: null,
  comments: [],
};

// 异步操作: 获取指定酒店的评论
export const fetchCommentsByHotelId = createAsyncThunk(
  "comments/fetchCommentsByHotelId",
  async (hotelId: string, thunkAPI) => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/comments/hotel/${hotelId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response.data); // 使用类型断言来指定 error 的类型
    }
  }
);

// 异步操作: 添加评论
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ itemId, itemType, comment }: { itemId: string; itemType: string; comment: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:3000/comments`,
        { itemId, itemType, comment },
        { headers: { Authorization: `Bearer ${(thunkAPI.getState() as any).user.token}` } }  // 确保用户登录状态，并提供token
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue((error as any).response.data); // 使用类型断言来指定 error 的类型
    }
  }
);

// 定义 slice
const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 获取指定酒店的评论
      .addCase(fetchCommentsByHotelId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCommentsByHotelId.fulfilled, (state, action: PayloadAction<CommentData[]>) => {
        state.comments = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchCommentsByHotelId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 添加评论
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action: PayloadAction<CommentData>) => {
        state.comments.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// 导出 reducer 和 slice
export const { reducer: commentsReducer } = commentsSlice;
export { commentsSlice };