import React from "react";
import { Link, NavLink } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header-bar--redwhite" data-cy="click-me">
        <div className="container">
          <Link to="/" data-cy="logoToHome">
            <img src="\public\UniversityofZackLogoSmall.jpg" alt="logo" />
          </Link>
        </div>
      </div>
      <nav className="navbar navbar-expand-md navbar--gold">
        <div className="container container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link nav-link--text px-3" data-cy="home" style={({ isActive }) => (isActive ? { borderRadius: "2rem", backgroundColor: "#fff" } : undefined)} to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link nav-link--text px-3" data-cy="find-trials" style={({ isActive }) => (isActive ? { borderRadius: "2rem", backgroundColor: "#fff" } : undefined)} to="/competing-search">
                  Find Competing Trials
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link nav-link--text px-3" data-cy="all-trials" style={({ isActive }) => (isActive ? { borderRadius: "2rem", backgroundColor: "#fff" } : undefined)} to="/all-trials">
                  All Trials
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
