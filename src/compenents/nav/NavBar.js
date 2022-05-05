import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./NavBar.css"

export const NavBar = ({ clearUser, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };
  return (
    <div className="navbar">
      <ul className="linkOrder">
        <li>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link to="serviceTask">
            Service Task
          </Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};
