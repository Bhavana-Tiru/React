import React from "react";
import { useSelector } from "react-redux";
import { getAllMovies } from "../../features/movies/movieSlice";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieListing.scss";

const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  // const tvshows = useSelector((state) => state.shows);
  // console.log(movies);

  // useEffect(() => {
  //   dispatch(getAllMovies()); // Dispatch an action to fetch movies when component mounts
  // }, [dispatch]); // Make sure to include dispatch in the dependency array to avoid lint warnings

  let renderMovies = "";

  // renderMovies =
  //   movies.id > 8 ? (
  //     movies.map((movie, index) => {
  //       <MovieCard key={index} data={movie} />;
  //     })
  //   ) : (
  //     <div className="movies-error">
  //       <h3>{movies.Error}</h3>
  //     </div>
  //   );

  if (movies.length > 8) {
    renderMovies = movies.map((movie, index) => (
      <MovieCard key={index} data={movie} />
    ));
  } else {
    renderMovies = (
      <div className="movies-error">
        <h3>No movies available</h3>
      </div>
    );
  }

  // renderShows =
  //   tvshows.length == 0 ? (
  //     tvshows.map((tvshow, index) => <MovieCard key={index} data={tvshow} />)
  //   ) : (
  //     <div className="shows-error">
  //       <h3>No shows available</h3>
  //     </div>
  //   );

  return (
    <div className="movie-wrapper">
      <div className="movie-list">
        <h2>Movies</h2>
        <div className="movie-conatiner">{renderMovies}</div>
      </div>
      {/* <div className="show-list">
        <h2>Shows</h2>
        <div className="movie-conatiner">{renderShows}</div>
      </div> */}
    </div>
  );
};

export default MovieListing;
