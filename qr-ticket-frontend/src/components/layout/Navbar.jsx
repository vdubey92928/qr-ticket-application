import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {

  const location = useLocation();
  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    if (localStorage.getItem("jwtToken") != null &&
      localStorage.getItem("userRole") != null) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem("userRole"))
    }

  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          QR Ticket System
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-lg-center">

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/")}`} to="/home">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/generate")}`} to="/generate">
                Book Ticket
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/gallery")}`} to="/gallery">
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/about")}`} to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className={`nav-link ${isActive("/contact")}`} to="/contact">
                Contact
              </Link>
            </li>

            <li className="nav-item ms-lg-3">
              <Link to={isLoggedIn ? (userRole == "ADMIN" ? "/admin" : userRole == "MUSEUM" ? "/museum-scanner" : "gate-scanner") : "/login"} className="btn btn-primary">
                {!isLoggedIn ? "Staff LogIn" : "Dashboard"}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
