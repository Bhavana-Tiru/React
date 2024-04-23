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

export const fetchAsyncMoviesDetails = createAsyncThunk(
  "movies/fetchAsyncMoviesDetails",
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
  slectedMovie: {},
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
      })
      .addCase(fetchAsyncMoviesDetails.fulfilled, (state, { payload }) => {
        console.log("Fetched Sucessfully!");
        return { ...state, slectedMovie: payload };
      });
  },
});

export const { addMovies } = movieSlice.actions;
// export const { addshow } = showsSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getMovieDetails = (state) => state.movies.slectedMovie;
export default movieSlice.reducer;
