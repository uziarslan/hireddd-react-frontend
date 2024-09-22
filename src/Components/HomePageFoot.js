import React from "react";
import "../Assets/Css/styles.min.css";
import siteLogo from "../Assets/images/site-logo.svg";
import socialIcon from "../Assets/images/social-icon-01.svg";
import socialIcon1 from "../Assets/images/social-icon-02.svg";
import socialIcon2 from "../Assets/images/social-icon-03.svg";
import socialIcon3 from "../Assets/images/social-icon-04.svg";
import { Link } from "react-router-dom";

export default function HomePageFoot() {
  return (
    <footer id="footer-section" className="footer-section">
      <div className="footer-ctn">
        <div className="wrapper">
          <div className="footer-widgets d-flex justify-content-between flex-wrap">
            <div className="single-widget">
              <div className="footer-widget-content">
                <div className="footer-logo">
                  <Link to="/">
                    <img src={siteLogo} alt="Logo" />
                  </Link>
                </div>
                <div className="footer-text">
                  <p>
                    Hireddd lets you to connect with the right talent within
                    seconds. Explore thousands of digital resumes countrywide
                    and shortlist the most relevant, qualified, and fresh
                    candidates.
                  </p>
                </div>
              </div>
              <div className="social-icons d-flex">
                <Link to="#" className="social-icon flex-center">
                  <img src={socialIcon} alt="LinkedIn Icon" />
                </Link>
                <Link to="#" className="social-icon flex-center">
                  <img src={socialIcon1} alt="Instagram Icon" />
                </Link>
                <Link to="#" className="social-icon flex-center">
                  <img src={socialIcon2} alt="Twitter Icon" />
                </Link>
                <Link to="#" className="social-icon flex-center">
                  <img src={socialIcon3} alt="Facebook Icon" />
                </Link>
              </div>
            </div>
            <div className="single-widget">
              <h5>General</h5>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link to="/">Home page</Link>
                  </li>
                  <li>
                    <Link to="#">For Employer</Link>
                  </li>
                  <li>
                    <Link to="#">Find Employees</Link>
                  </li>
                  <li>
                    <Link to="/plans">Pricing</Link>
                  </li>
                  <li>
                    <Link to="/blogs">Blog</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="single-widget">
              <h5>Job Categories</h5>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link to="#">Web, mobile & IT</Link>
                  </li>
                  <li>
                    <Link to="#">Marketing & Sales</Link>
                  </li>
                  <li>
                    <Link to="#">Design & creative</Link>
                  </li>
                  <li>
                    <Link to="#">Many more...</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="single-widget">
              <h5>Help & Support</h5>
              <div className="footer-nav">
                <ul>
                  <li>
                    <Link to="/contact-us">Help center</Link>
                  </li>
                  <li>
                    <Link to="#">Community</Link>
                  </li>
                  <li>
                    <Link to="#">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="gl-s11"></div>
          <div className="footer-bottom ">
            <div className="copy-right">
              @ 2024 All Rights Reserved I hireddd.com
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
