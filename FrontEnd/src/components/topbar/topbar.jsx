import "./topbar.css";
import { WbSunny } from "@mui/icons-material";
import { useContext } from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "./logo.png";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topNavBar">
      <div className="logoSide">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt="logo" class="logoimg"></img>
        </Link>
      </div>

      <div className="profileSide">
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <WbSunny
              onClick={function myFunction() {
                var element = document.body;
                element.classList.toggle("dark-mode");
              }}
            />
          </div>
        </div>
        {user && (
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "Persons/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
