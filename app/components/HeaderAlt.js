import React from "react";
import { Link } from "react-router-dom";

function HeaderAlt(props) {
  return (
    <header className="header">
      <div className="header-bar--black"></div>
      <div className="header-bar--redwhite">
        <nav className="navbar navbar-expand-lg px-5">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <img src="\public\UniversityofZackLogoSmallNoPad.jpg" alt="logo" />
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="mx-5 collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link nav-link--text" href="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link--text" href="/">
                    About
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-link--text" href="/">
                    Find Competing Trials
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default HeaderAlt;
