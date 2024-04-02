import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async () => {
    const response = await axios.get(`https://dummyapi.online/api/movies`);
    // .catch((err) => {
    //   console.log("Err :", err);
    // });
    return response.data;
  }
);

const initialState = {
  movies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    //here initialState is state and
    // addMovies: (state, { payload }) => {
    //   // when we get movies form the payload
    //   state.movies = payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, () => {
        console.log("Pending");
      })
      .addCase(fetchAsyncMovies.fulfilled, (state, { payload }) => {
        console.log("Fetched Sucessfully!");
        return { ...state, movies: payload };
      })
      .addCase(fetchAsyncMovies.rejected, () => {
        console.log("Rejected");
      });
  },
});

export const { addMovies } = movieSlice.actions;
// export const { addshow } = showsSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
//if we want a value from the store
//1st movie:- name of the slice here it is movies
//2nd movie:-which we want to export
export default movieSlice.reducer;
