import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "../MovieListing/MovieListing";
import { fetchAsyncMovies } from "../../features/movies/movieSlice";
// import { fetchAsyncShows } from "../../features/movies/showSlice";

const Home = () => {
<<<<<<< HEAD
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

=======
  useEffect(() => {
    const fechMovies = async () => {
      const response = await axios
        .get(`Url here`)
        .catch((err) => {
          console.log("Err :", err);
        });
      console.log("The response from api", response);
    };
    fechMovies();
  }, []);
>>>>>>> f8afde4682b0246c03741e70f836e3e7599ae6e6
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
      <div></div>
    </div>
  );
};

export default Home;
