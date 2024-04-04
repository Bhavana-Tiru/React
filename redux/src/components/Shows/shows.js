import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Shows.scss";

const Shows = () => {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    const tvshows = async () => {
      try {
        const res = await axios.get(
          `https://www.episodate.com/api/most-popular?page=1`
        );
        setShows(res.data.tv_shows);
      } catch (err) {
        console.log("Err :", err);
      }
    };
    tvshows();
  }, []);

  return (
    <div className="show-item">
      <h2>TV Shows</h2>
      <br></br>
      <div className="show-conatiner">
        {shows.map((show) => (
          <div key={show.id}>
            <div className="show-top">
              <img
                src={show.image_thumbnail_path}
                alt={show.name}
                className="show-img"
              />
            </div>
            <div className="show-bottom">
              <div className="show-info">
                <h3>{show.name}</h3>
                <br></br>
                <p>Start Date: {show.start_date}</p>
                <p>End Date: {show.end_date || "Ongoing"}</p>
                <p>Country: {show.country}</p>
                <p>Network: {show.network}</p>
                <p>Status: {show.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shows;
