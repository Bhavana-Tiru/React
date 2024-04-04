import React from "react";
import { Link } from "react-router-dom";
import user from "../../images/user_1.png";
import "./Header.scss";
const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo">Movie App</div>
      </Link>
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
