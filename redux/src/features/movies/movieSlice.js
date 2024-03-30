import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    //here initialState is state and
    addMovies: (state, { payload }) => {
      // when we get movies form the payload
      state.movies = payload;
    },
  },
});

export const { addMovies } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
//if we want a value from the store
//1st movie:- name of the slice here it is movies
//2nd movie:-which we want to export
export default movieSlice.reducer;
