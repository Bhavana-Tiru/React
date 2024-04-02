import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
// import { fetchAsyncShows } from "../../features/movies/showSlice";

const Home = () => {
  const dispatch = useDispatch();
  //for apis and for rendering onchange of certain elements
  useEffect(() => {
    dispatch(fetchAsyncMovies());
    // dispatch(fetchAsyncShows());
  }, [dispatch]);

  // for shows
  // useEffect(() => {
  //   const tvshows = async () => {
  //     const res = await axios
  //       .get(`https://www.episodate.com/api/most-popular?page=1`)
  //       .catch((err) => {
  //         console.log("Err :", err);
  //       });
  //     console.log(res);
  //   };
  //   tvshows();
  // }, []);

  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
      <div></div>
    </div>
  );
};

export default Home;
