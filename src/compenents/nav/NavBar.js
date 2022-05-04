import React from "react"
import {Link } from "react-router-dom"

export const NavBar = () => {

    return (
      <nav className="navbar">

        <ul className="naaa">

      <li className="nav-item active">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="users">Users</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="serviceTask">Service Task</Link>
        </li>
        </ul>
      </nav>
    )
}