import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMoviesDetails,
  getMovieDetails,
} from "../../features/movies/movieSlice";
import "./MovieDetails.scss";

const MovieDeatail = () => {
  const data = useSelector(getMovieDetails); // to use slice
  const dispatch = useDispatch();
  // console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMoviesDetails());
  }, [dispatch]);
  return (
    <div className="movie-details">
      <h1>
        Click
        <a href={data.imdb_url}> here </a> to redirect to IMDb page
      </h1>
    </div>
  );
};

export default MovieDeatail;
