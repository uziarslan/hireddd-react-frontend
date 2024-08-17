import React, { useEffect, useState, useContext } from "react";
import "../Assets/Css/styles.min.css";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import { Link } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import SearchCard from "./SearchCard";
import { AuthContext } from "../Context/AuthContext";
import Flash from "./Flash";
import Loading from "./Loading";

export default function SearchPage() {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tabName, setTabName] = useState("home");
  const [locationFilters, setLocationFilters] = useState([]);
  const [skillsFilters, setSkillsFilters] = useState([]);
  const [skill, setSkill] = useState("");
  const [location, setLocation] = useState("");
  const [badges, setBadges] = useState({
    trendingProfile: false,
    profileCompleted: false,
    ableToStartRightAway: false,
  });
  const [shortlisted, setShortlisted] = useState("");
  const [liked, setLiked] = useState("");
  const [uploaded, setUploaded] = useState("");
  const [talents, setTalents] = useState([]);

  const labelToKeyMap = {
    "Trending Profile": "trendingProfile",
    "Profile Completed": "profileCompleted",
    "Able to start right away": "ableToStartRightAway",
  };

  const fetchTalents = async () => {
    try {
      const { status, data } = await axiosInstance.get(`/get/talent`);
      if (status === 200) {
        setIsLoading(false);
        setTalents(data);
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axiosInstance.get("/dynamic/filters");
        setLocationFilters(data.locations);
        setSkillsFilters(data.skills);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTalents();
    fetchLocations();
  }, []);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSkillChange = (e) => {
    setSkill(e.target.value);
  };

  const handleBadgesChange = (e) => {
    const labelToKeyMap = {
      "Trending Profile": "trendingProfile",
      "Profile Completed": "profileCompleted",
      "Able to start right away": "ableToStartRightAway",
    };

    const key = labelToKeyMap[e.target.id];
    setBadges((prevBadges) => ({
      ...prevBadges,
      [key]: e.target.checked,
    }));
  };

  const handleShortlistedChange = (e) => {
    setShortlisted(e.target.id);
  };

  const handleLikedChange = (e) => {
    setLiked(e.target.id);
  };

  const handleUploadedChange = (e) => {
    setUploaded(e.target.id);
  };

  const handleClearFilters = () => {
    setSkill("");
    setLocation("");
    setBadges({
      trendingProfile: false,
      profileCompleted: false,
      ableToStartRightAway: false,
    });
    setShortlisted("");
    setLiked("");
    setUploaded("");
    fetchTalents();
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    setMessage("");

    const filters = {
      location,
      badges,
      shortlisted,
      liked,
      uploaded,
      skill,
    };

    try {
      const { status, data } = await axiosInstance.post(
        "/get/talent/filter",
        filters
      );

      if (status === 200) {
        setTalents(data);
      }
    } catch (error) {
      setMessage(error.response.data);
    }
  };

  if (isLoading) return <Loading isLoading={isLoading} />;

  if (!user || !talents.length || !locationFilters.length) return null;

  return (
    <>
      <DashNav
        profile={user.profile ? user.profile.path : dummyProfile}
        firstName={user.firstName}
      />
      <Flash message={message} />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1280">
          <div className="search-body-row">
            <form onSubmit={handleApplyFilters} className="search-sidebar-area">
              <button className="clear-filter-btn" onClick={handleClearFilters}>
                Clear all
              </button>
              <div className="search-sidebar-title">Filter</div>
              <div className="input-set input-set-main select-location">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  value={location}
                  onChange={handleLocationChange}
                >
                  {locationFilters.map((loc, index) => (
                    <option key={index} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-set input-set-main select-location">
                <label htmlFor="skills">Skills</label>
                <select
                  id="skills"
                  className="skill-select"
                  onChange={handleSkillChange}
                  value={skill}
                >
                  {skillsFilters.map((skill, index) => (
                    <option key={index} value={skill}>
                      {skill}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-set input-set-main">
                <div className="input-main-set-title">Badges</div>
                {[
                  "Trending Profile",
                  "Profile Completed",
                  "Able to start right away",
                ].map((item) => (
                  <div className="input-set" key={item}>
                    <input
                      id={item}
                      type="checkbox"
                      checked={badges[labelToKeyMap[item]]}
                      onChange={handleBadgesChange}
                    />
                    <label htmlFor={item}>{item}</label>
                  </div>
                ))}
              </div>
              <div className="input-set input-set-main">
                <div className="input-main-set-title">Shortlisted</div>
                {["Most-shortlisted", "Least-shortlisted"].map((item) => (
                  <div className="input-set" key={item}>
                    <input
                      id={item}
                      type="radio"
                      name="shortlisted"
                      checked={shortlisted === item}
                      onChange={handleShortlistedChange}
                    />
                    <label htmlFor={item}>{item.replace("-", " ")}</label>
                  </div>
                ))}
              </div>
              <div className="input-set input-set-main">
                <div className="input-main-set-title">Liked resumes</div>
                {["Most-liked", "Least-liked"].map((item) => (
                  <div className="input-set" key={item}>
                    <input
                      id={item}
                      type="radio"
                      name="liked"
                      checked={liked === item}
                      onChange={handleLikedChange}
                    />
                    <label htmlFor={item}>{item.replace("-", " ")}</label>
                  </div>
                ))}
              </div>
              <div className="input-set input-set-main">
                <div className="input-main-set-title">Recently uploaded</div>
                {["Any-time", "Past-24-hrs", "Past-week", "Past-month"].map(
                  (item) => (
                    <div className="input-set" key={item}>
                      <input
                        id={item}
                        type="radio"
                        name="uploaded"
                        checked={uploaded === item}
                        onChange={handleUploadedChange}
                      />
                      <label htmlFor={item}>
                        {item.replace("-", " ").replace("hrs", "hours")}
                      </label>
                    </div>
                  )
                )}
              </div>
              <div className="filter-button">
                <button type="submit" className="apply-filter-button">
                  Apply filters
                </button>
              </div>
            </form>
            <div className="search-content-area">
              <div className="shortlisted-tabs-nav search-tabs">
                <ul>
                  <li>
                    <Link
                      className={`tab-link ${
                        tabName === "home" ? "current" : ""
                      }`}
                      onClick={() => setTabName("home")}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`tab-link ${
                        tabName === "hiredddStatus" ? "current" : ""
                      }`}
                      onClick={() => setTabName("hiredddStatus")}
                    >
                      Hireddd Status
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`tab-link ${
                        tabName === "messages" ? "current" : ""
                      }`}
                      onClick={() => setTabName("messages")}
                    >
                      Message
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="search-results-content">
                <SearchCard data={talents} userId={user._id} />
              </div>
              <div className="custom-slider-pagination flex-between-center">
                <button
                  className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                  aria-disabled="true"
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.59251 14.7955L0.433416 7.63636L7.59251 0.477273L9.24023 2.1108L4.91495 6.43608H15.0499V8.83665H4.91495L9.24023 13.1548L7.59251 14.7955Z"
                      fill="#ffffff"
                    ></path>
                  </svg>
                </button>
                <div className="slides-numbers" style={{ display: "block" }}>
                  <span className="active">06</span> of{" "}
                  <span className="total">10</span>
                </div>
                <button
                  className="custom-slick-nav custom-next slick-arrow"
                  aria-disabled="false"
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.41637 14.7955L6.76864 13.1619L11.0939 8.83665H0.958984V6.43608H11.0939L6.76864 2.1179L8.41637 0.477273L15.5755 7.63636L8.41637 14.7955Z"
                      fill="white"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
