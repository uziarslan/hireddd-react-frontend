import React from "react";
import "../Assets/Css/styles.min.css";
import logoWhite from "../Assets/images/site-logo.svg";
import logoPurple from "../Assets/images/site-logo.svg";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import { Link } from "react-router-dom";

export default function DashNav({ firstName, profile, preview }) {
  return (
    <>
      <header className="header-section header-section-profile">
        <div className="header-logo logo">
          <Link to="/">
            <img className="logo-white" src={logoWhite} alt="Site Logo" />
            <img className="logo-purple" src={logoPurple} alt="Site Logo" />
          </Link>
        </div>
        <div className="profile-bar">
          <div className="user-search">
            <form>
              <input type="search" placeholder="Quick Search" />
            </form>
          </div>
          <div className="user-profile-area">
            <div className="user-notifications">
              <svg
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5743 20.141C9.35021 20.141 7.12611 19.7878 5.01655 19.0814C4.21473 18.8046 3.60382 18.2414 3.33655 17.5064C3.05973 16.7714 3.15518 15.9601 3.59428 15.2346L4.69201 13.4114C4.9211 13.0296 5.1311 12.266 5.1311 11.8173V9.05868C5.1311 5.50776 8.02338 2.61548 11.5743 2.61548C15.1252 2.61548 18.0175 5.50776 18.0175 9.05868V11.8173C18.0175 12.2564 18.2275 13.0296 18.4566 13.421L19.5448 15.2346C19.9552 15.9219 20.0316 16.7523 19.7548 17.5064C19.478 18.2605 18.8766 18.8333 18.1225 19.0814C16.0225 19.7878 13.7984 20.141 11.5743 20.141ZM11.5743 4.0473C8.81566 4.0473 6.56292 6.29049 6.56292 9.05868L6.56292 11.8173C6.56292 12.5142 6.27656 13.5451 5.92338 14.1464L4.82564 15.9696C4.61564 16.3228 4.55837 16.6951 4.68246 17.0101C4.79701 17.3346 5.08337 17.5828 5.47474 17.7164C9.46475 19.0528 13.6934 19.0528 17.6834 17.7164C18.0271 17.6019 18.2943 17.3442 18.4184 17.0005C18.5425 16.6569 18.5139 16.2846 18.323 15.9696L17.2252 14.1464C16.8625 13.526 16.5857 12.5046 16.5857 11.8078V9.05868C16.5857 6.29049 14.3425 4.0473 11.5743 4.0473Z"
                  fill="white"
                />
                <path
                  d="M13.35 4.30503C13.2832 4.30503 13.2164 4.29548 13.1495 4.27639C12.8727 4.20003 12.6055 4.14275 12.3477 4.10457C11.5364 3.99957 10.7536 4.05684 10.0186 4.27639C9.75135 4.3623 9.46499 4.27639 9.28362 4.07593C9.10226 3.87548 9.04498 3.58911 9.14999 3.33139C9.54135 2.32911 10.4959 1.67047 11.5841 1.67047C12.6723 1.67047 13.6268 2.31956 14.0182 3.33139C14.1136 3.58911 14.0659 3.87548 13.8845 4.07593C13.7414 4.22866 13.5409 4.30503 13.35 4.30503Z"
                  fill="white"
                />
                <path
                  d="M11.5747 22.3174C10.6297 22.3174 9.7133 21.9356 9.04512 21.2674C8.37694 20.5992 7.99512 19.6829 7.99512 18.7379H9.42694C9.42694 19.301 9.65603 19.8547 10.0569 20.2556C10.4579 20.6565 11.0115 20.8856 11.5747 20.8856C12.7583 20.8856 13.7224 19.9215 13.7224 18.7379H15.1542C15.1542 20.7138 13.5506 22.3174 11.5747 22.3174Z"
                  fill="white"
                />
              </svg>
            </div>
            <Link to="#" className="user-profile">
              <div className="profile-image">
                <img
                  src={preview || profile || dummyProfile}
                  alt="Profile"
                />
              </div>
              <div className="profile-title">
                {firstName ? firstName.split(" ")[0] : ""}
              </div>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
