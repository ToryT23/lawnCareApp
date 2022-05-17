import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"
import logo from "../../images/EASYCUTZ.png"

export const NavBar = ({ clearUser, isAuthenticated }) => {
  const nav = useNavigate();

  const handleLogout = () => {
    clearUser();
    nav("/");
  };
  return (
    <>

    <div className="NavBackGround">
      <div className="logoSettings">
      <img src={logo} alt="logo" />
      </div>

    <div className="navbarTop">
      <div className="navbar">

      <ul className="linkOrder">
        <li className="nav-item">
          <button type="button"  className="nav-link" onClick={() => nav("/")}>Home</button>
        </li>
        <li className="nav-item">
        <button type="button" className="nav-link" onClick={() => nav("users")}>Users</button>
        </li>
        <li className="nav-item">
        <button type="button" className="nav-link" onClick={() => nav("serviceTask")}>Service Task</button>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
      </div>
    </div>
    </>
  );
};
