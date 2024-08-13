import React, { useState, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useNavigate } from "react-router-dom";
import registerUser from "../Assets/images/uploads/register-user.svg";
import registerOrg from "../Assets/images/uploads/register-organization.svg";
import AuthNav from "./AuthNav";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";

export default function Registration() {
  const [message, setMessage] = useState("");
  const [userUsername, setUserUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [orgUsername, setOrgUsername] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [orgWebsite, setOrgWebsite] = useState("");
  const [orgPassword, setOrgPassword] = useState("");
  const [showOrgForm, setShowOrgForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, orgRegister } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");
    const formData = {
      username: userUsername,
      password: userPassword,
    };

    try {
      const { status, data } = await register(formData);
      if (status === 201) {
        setMessage(data.success);
        navigate("/talent/profile");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error)
        setMessage(error.response.data);
    }
    setIsLoading(false);
  };

  const handleOrgSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = {
      username: orgUsername,
      website: orgWebsite,
      password: orgPassword,
      companyName,
    };

    try {
      const { status, data } = await orgRegister(formData);
      if (status === 201) {
        setMessage(data.success);
        navigate("/organization/profile");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="overlay">
        <div className="fancy-spinner">
          <div className="ring"></div>
          <div className="ring"></div>
          <div className="dot"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <AuthNav />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section">
          <div className="banner-register">
            <div className="banner-garphic-area">
              <div
                className={`tabbed-content tab-part-user ${
                  !showOrgForm ? "current" : ""
                }`}
              >
                <div className="graphic-content">
                  <div className="graphic-content-image">
                    <img src={registerUser} alt="Register User" />
                  </div>
                  <div className="graphic-content-inner-content">
                    <h2 className="heading-3">Browse Talent</h2>
                    <p>
                      Access more than 1000+ digital resumes and thousands of
                      daily job seekers to find qualified candidates.
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`tabbed-content tab-part-organization ${
                  showOrgForm ? "current" : ""
                }`}
              >
                <div className="graphic-content">
                  <div className="graphic-content-image">
                    <img src={registerOrg} alt="Register User" />
                  </div>
                  <div className="graphic-content-inner-content">
                    <h2 className="heading-3">Shortlist Talent</h2>
                    <p>
                      A continuous pool of daily job seekers, ensuring you find
                      the right fit for your team hassle-free
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-form-area">
              <div className="banner-form-area-inner-content">
                <h1 className="text-24">Create Your Account</h1>
                <div className="banner-form-tabs form-tabs">
                  <button
                    onClick={() => setShowOrgForm(false)}
                    data-tab-target=".tab-part-user"
                    className={!showOrgForm ? "current" : ""}
                  >
                    <div className="icon">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.0009 8.80001C11.8761 8.80001 12.7154 8.45233 13.3343 7.83346C13.9532 7.21459 14.3009 6.37523 14.3009 5.50001C14.3009 4.6248 13.9532 3.78543 13.3343 3.16656C12.7154 2.54769 11.8761 2.20001 11.0009 2.20001C10.1256 2.20001 9.28627 2.54769 8.6674 3.16656C8.04853 3.78543 7.70085 4.6248 7.70085 5.50001C7.70085 6.37523 8.04853 7.21459 8.6674 7.83346C9.28627 8.45233 10.1256 8.80001 11.0009 8.80001ZM3.81235 15.9423C3.71024 16.2152 3.69897 16.5139 3.78023 16.7937C3.86149 17.0736 4.03094 17.3197 4.26335 17.4955C6.18982 18.9927 8.56103 19.8037 11.0009 19.8C13.5419 19.8 15.8827 18.9376 17.745 17.49C18.218 17.1237 18.4094 16.4967 18.1938 15.939C17.6352 14.4848 16.6489 13.2342 15.3649 12.3522C14.0809 11.4701 12.5597 10.9981 11.0019 10.9985C9.44417 10.9988 7.92314 11.4715 6.63957 12.3542C5.356 13.2368 4.37023 14.4879 3.81235 15.9423Z"
                          fill="#7B68EE"
                        />
                      </svg>
                    </div>
                    Register as a user
                  </button>
                  <button
                    onClick={() => setShowOrgForm(true)}
                    data-tab-target=".tab-part-organization"
                    className={showOrgForm ? "current" : ""}
                  >
                    <div className="icon">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.40078 18.15V3.85001H4.12578C3.90698 3.85001 3.69714 3.76309 3.54242 3.60838C3.3877 3.45366 3.30078 3.24382 3.30078 3.02501C3.30078 2.80621 3.3877 2.59637 3.54242 2.44165C3.69714 2.28693 3.90698 2.20001 4.12578 2.20001H17.8758C18.0946 2.20001 18.3044 2.28693 18.4591 2.44165C18.6139 2.59637 18.7008 2.80621 18.7008 3.02501C18.7008 3.24382 18.6139 3.45366 18.4591 3.60838C18.3044 3.76309 18.0946 3.85001 17.8758 3.85001H17.6008V18.15H17.8758C18.0946 18.15 18.3044 18.2369 18.4591 18.3916C18.6139 18.5464 18.7008 18.7562 18.7008 18.975C18.7008 19.1938 18.6139 19.4037 18.4591 19.5584C18.3044 19.7131 18.0946 19.8 17.8758 19.8H14.0258C13.807 19.8 13.5971 19.7131 13.4424 19.5584C13.2877 19.4037 13.2008 19.1938 13.2008 18.975V16.225C13.2008 16.0062 13.1139 15.7964 12.9591 15.6416C12.8044 15.4869 12.5946 15.4 12.3758 15.4H9.62578C9.40698 15.4 9.19714 15.4869 9.04242 15.6416C8.8877 15.7964 8.80078 16.0062 8.80078 16.225V18.975C8.80078 19.1938 8.71386 19.4037 8.55914 19.5584C8.40443 19.7131 8.19458 19.8 7.97578 19.8H4.12578C3.90698 19.8 3.69714 19.7131 3.54242 19.5584C3.3877 19.4037 3.30078 19.1938 3.30078 18.975C3.30078 18.7562 3.3877 18.5464 3.54242 18.3916C3.69714 18.2369 3.90698 18.15 4.12578 18.15H4.40078ZM7.70078 6.05001C7.70078 5.90414 7.75873 5.76425 7.86187 5.6611C7.96502 5.55796 8.10491 5.50001 8.25078 5.50001H9.35078C9.49665 5.50001 9.63654 5.55796 9.73969 5.6611C9.84283 5.76425 9.90078 5.90414 9.90078 6.05001V7.15001C9.90078 7.29588 9.84283 7.43578 9.73969 7.53892C9.63654 7.64207 9.49665 7.70001 9.35078 7.70001H8.25078C8.10491 7.70001 7.96502 7.64207 7.86187 7.53892C7.75873 7.43578 7.70078 7.29588 7.70078 7.15001V6.05001ZM8.25078 9.90001C8.10491 9.90001 7.96502 9.95796 7.86187 10.0611C7.75873 10.1642 7.70078 10.3041 7.70078 10.45V11.55C7.70078 11.6959 7.75873 11.8358 7.86187 11.9389C7.96502 12.0421 8.10491 12.1 8.25078 12.1H9.35078C9.49665 12.1 9.63654 12.0421 9.73969 11.9389C9.84283 11.8358 9.90078 11.6959 9.90078 11.55V10.45C9.90078 10.3041 9.84283 10.1642 9.73969 10.0611C9.63654 9.95796 9.49665 9.90001 9.35078 9.90001H8.25078ZM12.1008 6.05001C12.1008 5.90414 12.1587 5.76425 12.2619 5.6611C12.365 5.55796 12.5049 5.50001 12.6508 5.50001H13.7508C13.8966 5.50001 14.0365 5.55796 14.1397 5.6611C14.2428 5.76425 14.3008 5.90414 14.3008 6.05001V7.15001C14.3008 7.29588 14.2428 7.43578 14.1397 7.53892C14.0365 7.64207 13.8966 7.70001 13.7508 7.70001H12.6508C12.5049 7.70001 12.365 7.64207 12.2619 7.53892C12.1587 7.43578 12.1008 7.29588 12.1008 7.15001V6.05001ZM12.6508 9.90001C12.5049 9.90001 12.365 9.95796 12.2619 10.0611C12.1587 10.1642 12.1008 10.3041 12.1008 10.45V11.55C12.1008 11.6959 12.1587 11.8358 12.2619 11.9389C12.365 12.0421 12.5049 12.1 12.6508 12.1H13.7508C13.8966 12.1 14.0365 12.0421 14.1397 11.9389C14.2428 11.8358 14.3008 11.6959 14.3008 11.55V10.45C14.3008 10.3041 14.2428 10.1642 14.1397 10.0611C14.0365 9.95796 13.8966 9.90001 13.7508 9.90001H12.6508Z"
                          fill="#7B68EE"
                        />
                      </svg>
                    </div>
                    Register as organization
                  </button>
                </div>
                <div className="banner-form-wrap">
                  <form onSubmit={handleSubmit}>
                    <div
                      className={`tabbed-content tab-part-user ${
                        !showOrgForm ? "current" : ""
                      }`}
                    >
                      <div className="banner-tab-form">
                        <div className="input-set">
                          <label htmlFor="email">Email address</label>
                          <input
                            id="email"
                            type="email"
                            placeholder="XYZ@gmail.com"
                            required
                            value={userUsername}
                            onChange={(e) => setUserUsername(e.target.value)}
                          />
                        </div>
                        <div className="input-set">
                          <label htmlFor="password">Password</label>
                          <input
                            className="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            required
                            id="password"
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
                        <div className="forget-link">
                          <Link to="/forgot/password">Forgot Password?</Link>
                        </div>
                        <div className="input-set input-set-submit">
                          <input type="submit" value="Register" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <form onSubmit={handleOrgSubmit}>
                    <div
                      className={`tabbed-content tab-part-organization ${
                        showOrgForm ? "current" : ""
                      }`}
                    >
                      <div className="banner-tab-form">
                        <div className="input-set">
                          <label htmlFor="email">Email address</label>
                          <input
                            value={orgUsername}
                            onChange={(e) => setOrgUsername(e.target.value)}
                            required
                            id="email"
                            type="email"
                            placeholder="XYZ@gmail.com"
                          />
                        </div>
                        <div className="input-set">
                          <label htmlFor="companyName">Company name</label>
                          <input
                            id="companyName"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            type="text"
                            placeholder="Name Your Realm"
                          />
                        </div>
                        <div className="input-set">
                          <label htmlFor="website-url">Website URL</label>
                          <input
                            value={orgWebsite}
                            onChange={(e) => setOrgWebsite(e.target.value)}
                            id="website-url"
                            type="url"
                            placeholder="https://www.example.com"
                          />
                        </div>
                        <div className="input-set">
                          <label htmlFor="password">Password</label>
                          <input
                            className="password"
                            value={orgPassword}
                            onChange={(e) => setOrgPassword(e.target.value)}
                            required
                            id="password"
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
                        <div className="forget-link">
                          <Link to="/forgot/password">Forgot Password?</Link>
                        </div>
                        <div className="input-set input-set-submit">
                          <input type="submit" value="Register" />
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="option-outline">
                    <div className="option-outline-text">OR</div>
                  </div>
                  <div className="exteral-login">
                    <Link to="/google-signup" className="external-login-button">
                      <div className="icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1083_39380)">
                            <path
                              d="M23.7663 12.2765C23.7663 11.4608 23.7001 10.6406 23.559 9.83813H12.2402V14.4591H18.722C18.453 15.9495 17.5888 17.2679 16.3233 18.1056V21.104H20.1903C22.4611 19.014 23.7663 15.9274 23.7663 12.2765Z"
                              fill="#4285F4"
                            />
                            <path
                              d="M12.2391 24.0008C15.4756 24.0008 18.205 22.9382 20.1936 21.1039L16.3266 18.1055C15.2507 18.8375 13.8618 19.252 12.2435 19.252C9.11291 19.252 6.45849 17.1399 5.50607 14.3003H1.51562V17.3912C3.55274 21.4434 7.70192 24.0008 12.2391 24.0008Z"
                              fill="#34A853"
                            />
                            <path
                              d="M5.50277 14.3002C5.00011 12.8099 5.00011 11.196 5.50277 9.70569V6.61475H1.51674C-0.185266 10.0055 -0.185266 14.0004 1.51674 17.3912L5.50277 14.3002Z"
                              fill="#FBBC04"
                            />
                            <path
                              d="M12.2391 4.74966C13.9499 4.7232 15.6034 5.36697 16.8425 6.54867L20.2685 3.12262C18.0991 1.0855 15.2198 -0.034466 12.2391 0.000808666C7.70192 0.000808666 3.55274 2.55822 1.51562 6.61481L5.50166 9.70575C6.44967 6.86173 9.1085 4.74966 12.2391 4.74966Z"
                              fill="#EA4335"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1083_39380">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      Google
                    </Link>
                    <Link
                      to="/facebook-signup"
                      className="external-login-button"
                    >
                      <div className="icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_1083_39395)">
                            <path
                              d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 17.9895 4.3882 22.954 10.125 23.8542V15.4688H7.07812V12H10.125V9.35625C10.125 6.34875 11.9166 4.6875 14.6576 4.6875C15.9701 4.6875 17.3438 4.92188 17.3438 4.92188V7.875H15.8306C14.34 7.875 13.875 8.80008 13.875 9.75V12H17.2031L16.6711 15.4688H13.875V23.8542C19.6118 22.954 24 17.9895 24 12Z"
                              fill="#1877F2"
                            />
                            <path
                              d="M16.6711 15.4688L17.2031 12H13.875V9.75C13.875 8.80102 14.34 7.875 15.8306 7.875H17.3438V4.92188C17.3438 4.92188 15.9705 4.6875 14.6576 4.6875C11.9166 4.6875 10.125 6.34875 10.125 9.35625V12H7.07812V15.4688H10.125V23.8542C11.3674 24.0486 12.6326 24.0486 13.875 23.8542V15.4688H16.6711Z"
                              fill="white"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_1083_39395">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      Facbook
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Flash message={message} />
      </main>
    </>
  );
}
