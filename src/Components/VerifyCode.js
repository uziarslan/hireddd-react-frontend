import React, { useState } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthNav from "./AuthNav";
import forgotPassword from "../Assets/images/uploads/forget-password.svg";
import Flash from "./Flash";
import axios from "axios";
import Loading from "./Loading";

const END_POINT = process.env.REACT_APP_PUBLIC_URL;

export default function VerifyCode() {
  const [message, setMessage] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = {
      code,
      userId: id,
    };

    try {
      const response = await axios.post(`${END_POINT}/verify/code`, formData);
      if (response.status === 200) {
        setMessage({ success: response.data.success });
        setTimeout(() => {
          navigate(`/new/password?id=${response.data.id}`);
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }
    setCode("");
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
                  <h1 className="text-24">Verification code</h1>
                  <div className="banner-form-wrap">
                    <div className="banner-tab-form">
                      <div className="input-set">
                        <label htmlFor="password">Enter code</label>
                        <input
                          id="password"
                          type="text"
                          placeholder="0000"
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          required
                        />
                      </div>
                      <div className="input-set input-set-submit">
                        <input type="submit" value="Verify" />
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
