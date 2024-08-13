import React, { useState } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import AuthNav from "./AuthNav";
import forgotPassword from "../Assets/images/uploads/forget-password.svg";
import Flash from "./Flash";
import axiosInstance from "../services/axiosInstance";
import Loading from "./Loading";

export default function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = {
      username,
    };

    try {
      const response = await axiosInstance.post("/forgot/password", formData);
      if (response.status === 200) {
        setMessage({ success: response.data.success });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }

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
                    <h2 className="heading-3">Like Talent</h2>
                    <p>
                      Express your admiration for talent that stands out. Our
                      ”like” feature lets you do that.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-form-area">
              <div className="banner-form-area-inner-content">
                <form onSubmit={handleSubmit}>
                  <h1 className="text-24">Forgot password?</h1>
                  <div className="banner-form-wrap">
                    <div className="banner-tab-form">
                      <div className="input-set">
                        <label htmlFor="password">Email address</label>
                        <input
                          id="email"
                          type="text"
                          placeholder="XYZ@gmail.com"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="input-set input-set-submit">
                        <input type="submit" value="Send verification code" />
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
