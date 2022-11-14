import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header-bar--black"></div>
      <div className="header-bar--redwhite px-5">
        <Link to="/">
          <img src="\public\UniversityofZackLogoSmall.jpg" alt="logo" />
        </Link>
      </div>
      <nav className="navbar navbar-expand-md navbar--yellowgold px-5">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarToggler">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link nav-link--text px-3" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link nav-link--text px-3" to="/homeAlt">
                  About
                </Link>
              </li>
              <li className="nav-item nav-item--active">
                <Link className="nav-link nav-link--text px-3" to="/competing-search">
                  Find Competing Trials
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
