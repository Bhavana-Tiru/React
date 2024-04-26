import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../images/user_1.png";
import "./Header.scss";
const Header = () => {
  const [term, setTerm] = useState("");
  const submitHandlar = (e) => {
    e.preventDefault(); // should know
    console.log(term);
  };
  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App </Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandlar}>
          <input
            type="text"
            placeholder=" Search here"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <Link to="/shows">
        <div className="shows">Shows</div>
      </Link>
      <div className="user-image">
        <img src={user} alt="user"></img>
      </div>
    </div>
  );
};

export default Header;
