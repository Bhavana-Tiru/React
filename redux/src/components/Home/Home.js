import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
      <div></div>
    </div>
  );
};

export default Home;
