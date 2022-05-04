import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ clearUser, isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate("/");
  };
  return (
    <nav className="navbar">
      <ul className="naaa">
        <li className="nav-item active">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="users">
            Users
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="serviceTask">
            Service Task
          </Link>
        </li>
        <li className="nav-item">
          <button type="button" className="nav-link" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};
