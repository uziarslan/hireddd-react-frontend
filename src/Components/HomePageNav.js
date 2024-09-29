import React, { useEffect, useContext } from "react";
import "../Assets/Css/styles.min.css";
import $ from "jquery";
import logoWhite from "../Assets/images/site-logo.svg";
import logoPurple from "../Assets/images/site-logo.svg";
import { Link } from "react-router-dom";
const { AuthContext } = require("../Context/AuthContext");

export default function HomePageNavbar() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      if ($(document).scrollTop() > 0) {
        $("header, body").addClass("shrink");
        if ($(".header-section").hasClass("header-section-white")) {
          $("header").removeClass("header-section-white");
          $("header").addClass("header-section-home");
        }
      } else {
        $("header, body").removeClass("shrink");
        if ($(".header-section").hasClass("header-section-home")) {
          $("header").removeClass("header-section-home");
          $("header").addClass("header-section-white");
        }
      }
    };

    $(document).on("scroll", handleScroll);

    return () => {
      $(document).off("scroll", handleScroll);
    };


	$( '.menu-btn' ).on( 'click', function() {
		$( this ).toggleClass( 'active' );
		$( '.nav-overlay' ).toggleClass( 'open' );
		$( 'html, body' ).toggleClass( 'no-overflow' );
		$( '.header-nav ul li.active' ).removeClass( 'active' );
		$( '.header-nav ul.sub-menu' ).slideUp();
	} );
  }, []);

  return (
    <header className="header-section header-section-white">
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
              {user ? (
                user.role === "organization" ? (
                  <div className="header-nav">
                    <ul>
                      <li>
                        <Link to="/find/employees">Find Employees</Link>
                      </li>
                    </ul>
                  </div>
                ) : null
              ) : null}
              <div className="header-btns">
                {!user ? (
                  <>
                    <Link to="/login" className="button outline" title="Log In">
                      Log In
                    </Link>
                    <Link to="/signup" className="button fill" title="Register">
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={
                        user.role === "talent"
                          ? "/talent/dashboard"
                          : "/organization/dashboard"
                      }
                      className="button fill"
                      title="Register"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
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
