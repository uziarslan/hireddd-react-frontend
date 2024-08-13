import React, { useState, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useNavigate } from "react-router-dom";
import registerUser from "../Assets/images/uploads/register-user.svg";
import AuthNav from "./AuthNav";
import Flash from "./Flash";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    const formData = {
      username,
      password,
    };

    try {
      const { status, data } = await login(formData);
      if (status === 200) {
        navigate(data.callBack);
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
      <Loading isLoading={isLoading} />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section">
          <div className="banner-register">
            <div className="banner-garphic-area">
              <div className="graphic-content">
                <div className="graphic-content-image">
                  <img src={registerUser} alt="Register User" />
                </div>
                <div className="graphic-content-inner-content">
                  <h2 className="heading-3">Hire Talent</h2>
                  <p>
                    Hire the best candidates you find, seamlessly, far quicker
                    than other hiring platforms out there.
                  </p>
                </div>
              </div>
            </div>
            <div className="banner-form-area">
              <div className="banner-form-area-inner-content">
                <h1 className="text-24">Login to your account</h1>
                <div className="banner-form-wrap">
                  <form onSubmit={handleSubmit}>
                    <div className="banner-tab-form">
                      <div className="input-set">
                        <label htmlFor="email">Email address</label>
                        <input
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          id="email"
                          type="email"
                          placeholder="XYZ@gmail.com"
                        />
                      </div>
                      <div className="input-set">
                        <label htmlFor="password">Password</label>
                        <input
                          className="password"
                          required
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                        <input type="submit" value="Login" />
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
