import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import axios from "axios";

export const userList = createAsyncThunk(
  "charecters/userList",
  async (token: string) => {
    if (token) {
      let res = await axios.post(
        // "http://127.0.0.1:8443/api/v1/user/userLP/userList/",
        "https://api.cryptoshowdown.io/api/v1/user/userLP/userList/",
        { token }
      );
      return res.data.data;
    }
    return [];
  }
);
const initialState = {
  data: [] as DataType[],
  detail: [] as DataType[],
};

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userList.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.data = data;
      })
  },
});
export default characterSlice.reducer;
