import React from "react";
import "../Assets/Css/styles.min.css";
import heroShape from "../Assets/images/hero-shape.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePageNavbar from "../Components/HomePageNav";
import HomePageFoot from "./HomePageFoot";

export default function Contact() {
  return (
    <>
      <HomePageNavbar />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section blog-hero-section">
          <div className="banner-home">
            <div className="wrapper flex-between-center">
              <div className="hero-shape">
                <img src={heroShape} alt="Hero Shape" />
              </div>
              <div className="hero-content center-align">
                <h1>Contact us</h1>
                <div className="banner-text">
                  <p>Any question or remarks? Just write us a message</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="" className="page-section">
          <div className="s-100"></div>
          <section>
            <div className="wrapper">
              <div className="contact-ctn">
                <div className="contact-left">
                  <div className="label">Contact</div>
                  <h2 className="heading-3">We’d love to hear from you</h2>
                  <p>
                    Need something cleared up? Here are our most frequently
                    asked questions.
                  </p>
                  <div className="contact-columns">
                    <div className="contact-column">
                      <div className="contact-icon">
                        <svg
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M28.332 34.1667H11.6654C6.66536 34.1667 3.33203 31.6667 3.33203 25.8333V14.1667C3.33203 8.33334 6.66536 5.83334 11.6654 5.83334H28.332C33.332 5.83334 36.6654 8.33334 36.6654 14.1667V25.8333C36.6654 31.6667 33.332 34.1667 28.332 34.1667Z"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M28.3346 15L23.118 19.1667C21.4013 20.5333 18.5846 20.5333 16.868 19.1667L11.668 15"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <h4 className="contact-title">Email</h4>
                      <p>
                        Our friendly team is here to help. <br />
                        <a href="mailto:hello@hireddd.com">hello@hireddd.com</a>
                      </p>
                    </div>
                    <div className="contact-column">
                      <div className="contact-icon">
                        <svg
                          width="41"
                          height="40"
                          viewBox="0 0 41 40"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20.4969 22.3833C23.3688 22.3833 25.6969 20.0552 25.6969 17.1833C25.6969 14.3115 23.3688 11.9833 20.4969 11.9833C17.625 11.9833 15.2969 14.3115 15.2969 17.1833C15.2969 20.0552 17.625 22.3833 20.4969 22.3833Z"
                            stroke="white"
                            strokeWidth="2.5"
                          />
                          <path
                            d="M6.53741 14.15C9.82074 -0.283319 31.2041 -0.266652 34.4707 14.1667C36.3874 22.6333 31.1207 29.8 26.5041 34.2333C23.1541 37.4667 17.8541 37.4667 14.4874 34.2333C9.88741 29.8 4.62074 22.6167 6.53741 14.15Z"
                            stroke="white"
                            strokeWidth="2.5"
                          />
                        </svg>
                      </div>
                      <h4 className="contact-title">Office</h4>
                      <p>
                        Come say hello at our office HQ.
                        <br />
                        <mark>
                          100 Smith Street <br /> Collingwood VIC 3066 AU
                        </mark>
                      </p>
                    </div>
                    <div className="contact-column">
                      <div className="contact-icon">
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M34.6193 28.55C34.6193 29.15 34.4859 29.7667 34.2026 30.3667C33.9193 30.9667 33.5526 31.5334 33.0693 32.0667C32.2526 32.9667 31.3526 33.6167 30.3359 34.0334C29.3359 34.45 28.2526 34.6667 27.0859 34.6667C25.3859 34.6667 23.5693 34.2667 21.6526 33.45C19.7359 32.6334 17.8193 31.5334 15.9193 30.15C14.0026 28.75 12.1859 27.2 10.4526 25.4834C8.73594 23.75 7.18594 21.9334 5.8026 20.0334C4.43594 18.1334 3.33594 16.2334 2.53594 14.35C1.73594 12.45 1.33594 10.6334 1.33594 8.90004C1.33594 7.76671 1.53594 6.68337 1.93594 5.68337C2.33594 4.66671 2.96927 3.73337 3.8526 2.90004C4.91927 1.85004 6.08594 1.33337 7.31927 1.33337C7.78594 1.33337 8.2526 1.43337 8.66927 1.63337C9.1026 1.83337 9.48594 2.13337 9.78594 2.56671L13.6526 8.01671C13.9526 8.43337 14.1693 8.81671 14.3193 9.18337C14.4693 9.53337 14.5526 9.88337 14.5526 10.2C14.5526 10.6 14.4359 11 14.2026 11.3834C13.9859 11.7667 13.6693 12.1667 13.2693 12.5667L12.0026 13.8834C11.8193 14.0667 11.7359 14.2834 11.7359 14.55C11.7359 14.6834 11.7526 14.8 11.7859 14.9334C11.8359 15.0667 11.8859 15.1667 11.9193 15.2667C12.2193 15.8167 12.7359 16.5334 13.4693 17.4C14.2193 18.2667 15.0193 19.15 15.8859 20.0334C16.7859 20.9167 17.6526 21.7334 18.5359 22.4834C19.4026 23.2167 20.1193 23.7167 20.6859 24.0167C20.7693 24.05 20.8693 24.1 20.9859 24.15C21.1193 24.2 21.2526 24.2167 21.4026 24.2167C21.6859 24.2167 21.9026 24.1167 22.0859 23.9334L23.3526 22.6834C23.7693 22.2667 24.1693 21.95 24.5526 21.75C24.9359 21.5167 25.3193 21.4 25.7359 21.4C26.0526 21.4 26.3859 21.4667 26.7526 21.6167C27.1193 21.7667 27.5026 21.9834 27.9193 22.2667L33.4359 26.1834C33.8693 26.4834 34.1693 26.8334 34.3526 27.25C34.5193 27.6667 34.6193 28.0834 34.6193 28.55Z"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeMiterlimit="10"
                          />
                        </svg>
                      </div>
                      <h4 className="contact-title">Phone</h4>
                      <p>
                        Mon-Fri from 8am to 5pm. <br />
                        <a href="tel:+1 (555) 000-0000">+1 (555) 000-0000</a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="contact-right">
                  <h2 className="heading-3">Get in touch</h2>
                  <p>We’d love to hear from you. Please fill out this form.</p>
                  <form action="" className="contact-form">
                    <div className="input-half">
                      <label htmlFor="firstname">First Name</label>
                      <input
                        id="firstname"
                        type="text"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="input-half">
                      <label htmlFor="lastname">Last name</label>
                      <input
                        id="lastname"
                        type="text"
                        placeholder="Last name"
                      />
                    </div>
                    <div className="input-full">
                      <label htmlFor="formemail">Email</label>
                      <input
                        id="formemail"
                        type="email"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div className="input-full">
                      <label htmlFor="formphone">Phone</label>
                      <input
                        id="formphone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                    <div className="input-full">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        placeholder="Leave us a message..."
                      ></textarea>
                    </div>
                    <div className="input-full">
                      <input type="checkbox" id="formcheck" />
                      <label htmlFor="formcheck">
                        You agree to our friendly privacy policy.
                      </label>
                    </div>
                    <div className="input-full">
                      <input type="submit" value="Send Message" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <div className="s-100"></div>
        </section>
      </main>
      <HomePageFoot />
    </>
  );
}
