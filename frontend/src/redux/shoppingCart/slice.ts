import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CartItem {
  userId: string;
  roomTypeId: string;
  checkInDate: string;
  checkOutDate: string;
}

interface ShoppingCartState {
  items: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: ShoppingCartState = {
  items: [],
  loading: true,
  error: null,
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://127.0.0.1:3000/cart`,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data.shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async ({ jwt, roomTypeId, checkInDate, checkOutDate }: { jwt: string; roomTypeId: string; checkInDate: string; checkOutDate: string }, thunkAPI) => {
    try {
      const response = await axios.post("http://127.0.0.1:3000/cart/add", {
        roomTypeId,
        checkInDate,
        checkOutDate
      }, {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const checkout = createAsyncThunk(
  "shoppingCart/checkout",
  async (jwt: string, thunkAPI) => {
    const { data } = await axios.post(
      `http://127.0.0.1:3000/cart/checkout`,
      null,
      {
        headers: {
          Authorization: `bearer ${jwt}`,
        },
      }
    );
    return data;
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  async (parameters: { jwt: string; itemIds: number[] }, thunkAPI) => {
    return await axios.delete(
      `http://127.0.0.1:3000/cart/remove(${parameters.itemIds.join(
        ","
      )})`,
      {
        headers: {
          Authorization: `bearer ${parameters.jwt}`,
        },
      }
    );
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addShoppingCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addShoppingCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
        state.items.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(addShoppingCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});