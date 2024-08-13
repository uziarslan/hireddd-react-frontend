import React, { useRef, useState, useEffect, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useNavigate } from "react-router-dom";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import Flash from "./Flash";
import axiosInstance from "../services/axiosInstance";
import Loading from "./Loading";
import { AuthContext } from "../Context/AuthContext";

export default function OrgProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setProfile(user.profile ? user.profile.path : dummyProfile);
      setLocation(user.location);
      setIndustry(user.industry);
      setAbout(user.about);
    }
    setIsLoading(false);
  }, [user]);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("location", location);
    formData.append("industry", industry);
    formData.append("about", about);
    if (profile) {
      formData.append("profile", profile);
    }

    try {
      const response = await axiosInstance.post("/org/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setMessage(response.data);
        navigate("/organization/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }
    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <DashNav preview={preview} firstName={firstName} profile={profile} />
      <Loading isLoading={isLoading} />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1240">
          <div className="profile-form-row">
            <div className="profile-form-left">
              <div className="profile-form-image">
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <img
                  src={preview || profile || dummyProfile}
                  alt="User avatar"
                />
                <button
                  onClick={handleButtonClick}
                  className="upload-profile-image"
                >
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 2.375H13.0844L12.0195 0.778125C11.9625 0.692618 11.8852 0.622502 11.7946 0.573989C11.704 0.525475 11.6028 0.500062 11.5 0.5H6.5C6.39721 0.500062 6.29602 0.525475 6.2054 0.573989C6.11478 0.622502 6.03752 0.692618 5.98047 0.778125L4.91484 2.375H2.75C2.25272 2.375 1.77581 2.57254 1.42417 2.92417C1.07254 3.27581 0.875 3.75272 0.875 4.25V13C0.875 13.4973 1.07254 13.9742 1.42417 14.3258C1.77581 14.6775 2.25272 14.875 2.75 14.875H15.25C15.7473 14.875 16.2242 14.6775 16.5758 14.3258C16.9275 13.9742 17.125 13.4973 17.125 13V4.25C17.125 3.75272 16.9275 3.27581 16.5758 2.92417C16.2242 2.57254 15.7473 2.375 15.25 2.375ZM15.875 13C15.875 13.1658 15.8092 13.3247 15.6919 13.4419C15.5747 13.5592 15.4158 13.625 15.25 13.625H2.75C2.58424 13.625 2.42527 13.5592 2.30806 13.4419C2.19085 13.3247 2.125 13.1658 2.125 13V4.25C2.125 4.08424 2.19085 3.92527 2.30806 3.80806C2.42527 3.69085 2.58424 3.625 2.75 3.625H5.25C5.35292 3.62507 5.45427 3.59971 5.54504 3.5512C5.63581 3.50268 5.71319 3.43249 5.77031 3.34688L6.83437 1.75H11.1648L12.2297 3.34688C12.2868 3.43249 12.3642 3.50268 12.455 3.5512C12.5457 3.59971 12.6471 3.62507 12.75 3.625H15.25C15.4158 3.625 15.5747 3.69085 15.6919 3.80806C15.8092 3.92527 15.875 4.08424 15.875 4.25V13ZM12.125 8.625C12.125 8.79076 12.0592 8.94973 11.9419 9.06694C11.8247 9.18415 11.6658 9.25 11.5 9.25H9.625V11.125C9.625 11.2908 9.55915 11.4497 9.44194 11.5669C9.32473 11.6842 9.16576 11.75 9 11.75C8.83424 11.75 8.67527 11.6842 8.55806 11.5669C8.44085 11.4497 8.375 11.2908 8.375 11.125V9.25H6.5C6.33424 9.25 6.17527 9.18415 6.05806 9.06694C5.94085 8.94973 5.875 8.79076 5.875 8.625C5.875 8.45924 5.94085 8.30027 6.05806 8.18306C6.17527 8.06585 6.33424 8 6.5 8H8.375V6.125C8.375 5.95924 8.44085 5.80027 8.55806 5.68306C8.67527 5.56585 8.83424 5.5 9 5.5C9.16576 5.5 9.32473 5.56585 9.44194 5.68306C9.55915 5.80027 9.625 5.95924 9.625 6.125V8H11.5C11.6658 8 11.8247 8.06585 11.9419 8.18306C12.0592 8.30027 12.125 8.45924 12.125 8.625Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="profile-sidebar-links">
                <Link className="profile-sidebar-link profile-tab-link current">
                  <div className="profile-sidebar-title">Profile</div>
                </Link>
              </div>
            </div>
            <div className="profile-form-right">
              <div
                id="profile-form"
                className="profile-form profile-tabbed-content current"
              >
                <form onSubmit={handleSubmit}>
                  <div className="input-set">
                    <label htmlFor="firstname"> First name</label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      id="firstname"
                      type="text"
                      placeholder="First name"
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="lastname"> Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="location"> Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      id="location"
                      type="text"
                      placeholder="Location"
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="skill">Industry</label>
                    <input
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      id="skill"
                      type="text"
                      placeholder="Industry"
                    />
                  </div>
                  <div className="input-set input-set-full">
                    <label htmlFor="about"> About</label>
                    <textarea
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      id="about"
                      placeholder="Add bio here"
                    ></textarea>
                  </div>
                  <div className="input-set input-set-full">
                    <input type="submit" value="Create profile" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <Flash message={message} />
      </main>
    </>
  );
}
