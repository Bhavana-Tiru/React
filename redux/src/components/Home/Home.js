import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncMovies());
  }, [dispatch]);

  // for shows
  // useEffect(() => {
  //   const tvshows = async () => {
  //     const res = await axios
  //       .get(`Api url here`)
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
