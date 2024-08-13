import React, { useState } from "react";
import "../Assets/Css/styles.min.css";
import forgotPassword from "../Assets/images/uploads/forget-password.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import Flash from "./Flash";
import Loading from "./Loading";
import axiosInstance from "../services/axiosInstance";

export default function NewPassword() {
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = {
      newPassword,
      userId: id,
    };

    try {
      const response = await axiosInstance.post("/newpassword", formData);
      if (response.status === 200) {
        setMessage(response.data);
        setTimeout(() => {
          navigate(`/login`);
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }

    setNewPassword("");
    setIsLoading(false);
  };

  return (
    <>
      <AuthNav />
      <Flash message={message} />
      <Loading isLoading={isLoading} />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section">
          <div className="banner-register banner-forget-password">
            <div className="banner-garphic-area">
              <div className="tabbed-content tab-part-user current">
                <div className="graphic-content">
                  <div className="graphic-content-image">
                    <img src={forgotPassword} alt="Forget password" />
                  </div>
                  <div className="graphic-content-inner-content">
                    <h2 className="heading-3">Recommend Talent</h2>
                    <p>
                      Streamline your hiring process by accessing a database of
                      1000+ digital resumes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-form-area">
              <div className="banner-form-area-inner-content">
                <form onSubmit={handleSubmit}>
                  <h1 className="text-24">Create a new password</h1>
                  <div className="banner-form-wrap">
                    <div className="banner-tab-form">
                      <div className="input-set">
                        <label htmlFor="password">New Password</label>
                        <input
                          className="password"
                          required
                          id="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          type={showPassword ? "text" : "password"}
                          placeholder="***************"
                        />
                        <input id="show-password-checkbox" type="checkbox" />
                        <label
                          htmlFor="show-password-checkbox"
                          className="show-password-checkbox"
                          onClick={handleShowPassword}
                        >
                          <svg
                            width="23"
                            height="15"
                            viewBox="0 0 23 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22.0761 7.08469C22.0442 7.01156 21.2642 5.28188 19.5224 3.54C17.9061 1.92563 15.1292 0 11.0624 0C6.99549 0 4.21861 1.92563 2.60236 3.54C0.860488 5.28188 0.0804882 7.00875 0.0486132 7.08469C0.0165623 7.15669 0 7.23462 0 7.31344C0 7.39225 0.0165623 7.47018 0.0486132 7.54219C0.0804882 7.61437 0.860488 9.34406 2.60236 11.0859C4.21861 12.7003 6.99549 14.625 11.0624 14.625C15.1292 14.625 17.9061 12.7003 19.5224 11.0859C21.2642 9.34406 22.0442 7.61719 22.0761 7.54219C22.1082 7.47018 22.1247 7.39225 22.1247 7.31344C22.1247 7.23462 22.1082 7.15669 22.0761 7.08469ZM11.0624 13.5C8.12049 13.5 5.55174 12.4294 3.42643 10.3191C2.5355 9.43364 1.78158 8.42031 1.18955 7.3125C1.78141 6.20487 2.53535 5.19182 3.42643 4.30688C5.55174 2.19563 8.12049 1.125 11.0624 1.125C14.0042 1.125 16.573 2.19563 18.6983 4.30688C19.5894 5.19182 20.3433 6.20487 20.9352 7.3125C20.338 8.45719 17.3436 13.5 11.0624 13.5ZM11.0624 3C10.2094 3 9.37565 3.25292 8.66647 3.72679C7.95728 4.20065 7.40454 4.87417 7.07813 5.66218C6.75173 6.45018 6.66633 7.31728 6.83273 8.15383C6.99913 8.99037 7.40985 9.75878 8.01297 10.3619C8.61608 10.965 9.38449 11.3757 10.221 11.5421C11.0576 11.7085 11.9247 11.6231 12.7127 11.2967C13.5007 10.9703 14.1742 10.4176 14.6481 9.7084C15.1219 8.99921 15.3749 8.16543 15.3749 7.3125C15.3734 6.16921 14.9185 5.07317 14.1101 4.26475C13.3017 3.45632 12.2057 3.00149 11.0624 3ZM11.0624 10.5C10.4319 10.5 9.81567 10.3131 9.29148 9.96281C8.7673 9.61256 8.35875 9.11474 8.1175 8.5323C7.87624 7.94986 7.81312 7.30896 7.93611 6.69065C8.0591 6.07234 8.36268 5.50438 8.80846 5.0586C9.25424 4.61282 9.8222 4.30924 10.4405 4.18625C11.0588 4.06326 11.6997 4.12638 12.2822 4.36763C12.8646 4.60889 13.3624 5.01744 13.7127 5.54162C14.0629 6.0658 14.2499 6.68207 14.2499 7.3125C14.2499 8.15788 13.914 8.96863 13.3163 9.5664C12.7185 10.1642 11.9077 10.5 11.0624 10.5Z"
                              fill="#6B6B6B"
                            />
                          </svg>
                        </label>
                      </div>
                      <div className="input-set input-set-submit">
                        <input type="submit" value="Change" />
                      </div>
                      <div className="forget-link center-align">
                        Remember your password? <Link to="/login">Login</Link>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <Flash message={message} />
      </main>
    </>
  );
}
