import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncShows = createAsyncThunk(
  "shows/fetchAsyncShows", // "name given in ceateSlice/ function"
  async () => {
    const response = await axios.get(
      `https://www.episodate.com/api/most-popular?page=1`
    );
    // .catch((err) => {
    //   console.log("Err :", err);
    // });
    const data = response.data;
    return data.tv_shows;
  }
);

const initialState = {
  shows: [], //2
};

const tvShowSlice = createSlice({
  name: "tvShows", //1
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncShows.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.shows = action.payload;
      })
      .addCase(fetchAsyncShows.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const getAllShows = (state) => state.tvShows.shows;
export default tvShowSlice.reducer;
