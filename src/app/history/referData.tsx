import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DataType } from "@/global/types";
import config from "../config";
import axios from "axios";

export const referData = createAsyncThunk(
  "charecters/referData",
  async (token: string) => {
    if (token) {
      let res = await axios.post(
        `${config.server}${config.baseURL}/user/referHistory/`,
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
      .addCase(referData.fulfilled, (state, action) => {
        let data = [...action.payload];
        data = data.map((obj, id) => {
          return { id: id + 1, ...obj };
        });
        state.data = data;
      })
  },
});
export default characterSlice.reducer;
