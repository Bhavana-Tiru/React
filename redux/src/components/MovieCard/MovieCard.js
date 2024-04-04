import React from "react";
import "./MovieCard.scss";

const MovieCard = (props) => {
  const { data } = props;
  return (
    <div className="card-item">
      <div className="card-inner">
        <div className="card-top">
          <img
            src="https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg"
            alt={data.movie}
          />
        </div>
        <div className="card-bottom">
          <div className="card-info">
            <h4>{data.movie}</h4>
            <p>{data.rating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
