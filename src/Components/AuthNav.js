import React from "react";
import "../Assets/Css/styles.min.css";
import logoWhite from "../Assets/images/site-logo.svg";
import logoPurple from "../Assets/images/site-logo.svg";
import { Link } from "react-router-dom";

export default function AuthNav() {
  return (
    <header className="header-section">
      <div className="header-wrapper">
        <div className="header-logo logo">
          <Link to="/">
            <img className="logo-white" src={logoWhite} alt="Site Logo" />
            <img className="logo-purple" src={logoPurple} alt="Site Logo" />
          </Link>
        </div>
        <div className="right-header header-navigation">
          <div className="nav-overlay">
            <div className="nav-container">
              <div className="header-nav">
                <ul>
                  <li>
                    <Link to="#">Find Employees</Link>
                  </li>
                  <li>
                    <Link to="#">For Employees</Link>
                  </li>
                </ul>
              </div>
              <div className="header-btns">
                <Link to="/login" className="button outline" title="Log In">
                  Log In
                </Link>
                <Link to="/signup" className="button fill" title="Register">
                  Register
                </Link>
              </div>
            </div>
          </div>
          <div className="menu-btn">
            <span className="top"></span>
            <span className="middle"></span>
            <span className="bottom"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
