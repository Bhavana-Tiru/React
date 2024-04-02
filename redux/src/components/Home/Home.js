import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import axios from "axios";

const Home = () => {
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
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
      <div></div>
    </div>
  );
};

export default Home;
