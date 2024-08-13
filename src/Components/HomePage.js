import React, { useEffect, useRef, useState } from "react";
import "../Assets/Css/styles.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HomePageNavbar from "./HomePageNav";
import homeGraphic from "../Assets/images/uploads/home-hero-graphic.svg";
import videoSliderImage from "../Assets/images/uploads/video-slider-image.jpg";
import videoWhiteIcon from "../Assets/images/video-white-icon.svg";
import iwdIcon from "../Assets/images/uploads/iwd-icon-01.svg";
import iwdIcon2 from "../Assets/images/uploads/iwd-icon-02.svg";
import iwdIcon3 from "../Assets/images/uploads/iwd-icon-03.svg";
import icon from "../Assets/images/uploads/icon-01.png";
import icon2 from "../Assets/images/uploads/icon-02.png";
import authorImage from "../Assets/images/uploads/author-image.png";
import logo from "../Assets/images/uploads/logo-01.svg";
import logo1 from "../Assets/images/uploads/logo-02.svg";
import logo2 from "../Assets/images/uploads/logo-03.svg";
import logo3 from "../Assets/images/uploads/logo-04.svg";
import logo4 from "../Assets/images/uploads/logo-05.svg";
import logo5 from "../Assets/images/uploads/logo-06.svg";
import yellowStar from "../Assets/images/yellow-star.svg";
import halfYellow from "../Assets/images/half-yellow.svg";
import greyStar from "../Assets/images/gray-star.svg";
import HomePageFoot from "./HomePageFoot";
import { Link } from "react-router-dom";

export default function HomePage() {
  const sliderRef = useRef(null);
  const testimonialSlider = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);
  const [seacrh, setSearch] = useState("");

  // Claculating the number of slides in the video slider
  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      const totalSlides = slider.innerSlider.props.children.length;
      setTotalSlides(totalSlides);
    }
  }, [sliderRef]);

  // Handle the api call here
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      seacrh,
    };

    // Api call here
    console.log(formData);
    // Api call here

    setSearch("");
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    margin: 16,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const testimonoialSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    margin: 16,
  };

  const handlePrevious = () => {
    sliderRef.current.slickPrev();
  };

  const handlePreviousTest = () => {
    testimonialSlider.current.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const handleNextTest = () => {
    testimonialSlider.current.slickNext();
  };

  return (
    <>
      <HomePageNavbar />
      <main id="main-section" className="main-section">
        <section id="hero-section" className="hero-section">
          <div className="banner-home">
            <div className="wrapper flex-between-center">
              <div className="banner-content">
                <h1>Hire the perfect talent for your company!</h1>
                <div className="banner-text">
                  <p>
                    Search amongst 1000+ active users on Pakistan’s #1 hiring
                    platform
                  </p>
                  <div className="banner-search">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="search"
                        className="banner-search-input"
                        placeholder="Search for talent here"
                        value={seacrh}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <input
                        type="submit"
                        className="banner-search-submit"
                        value="Find talent"
                      />
                    </form>
                    <div className="form-description">
                      <p>
                        <strong>Popular search:</strong> Graphic Designer, UI UX
                        Designer, Web Designer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="banner-image">
                <img src={homeGraphic} alt="Graphical content" />
              </div>
            </div>
          </div>
        </section>
        <section id="" className="page-section">
          <div className="s-100"></div>
          <div className="wrapper">
            <div className="videos-slider">
              <div className="section-head">
                <h2>Revolutionising the Hiring Process.</h2>
                <p>
                  Take a look at how we’re disrupting the industry, making
                  hiring faster, cheaper, and better.
                </p>
              </div>
              <div className="slider-holder">
                <Slider ref={sliderRef} {...settings}>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div className="video-slider-item h-img-cover">
                    <Link to="#" className="video-popup">
                      <img src={videoSliderImage} alt="" />
                      <div className="video-button flex-between-center">
                        <div className="video-icon">
                          <img src={videoWhiteIcon} alt="Icon" />
                        </div>
                        <div className="video-detail">
                          <div className="video-detail-title">
                            Tabish Waheed
                          </div>
                          <div className="video-detail-description">
                            UI UX Designer
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </Slider>
              </div>
              <div className="custom-slider-pagination flex-between-center">
                <button
                  onClick={handlePrevious}
                  className="custom-slick-nav custom-prev"
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
                    />
                  </svg>
                </button>
                <div className="slides-numbers" style={{ display: "block" }}>
                  <span className="active">{currentSlide + 3}</span> of{" "}
                  <span className="total">{totalSlides}</span>
                </div>
                <button
                  onClick={handleNext}
                  className="custom-slick-nav custom-next"
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
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="s-100"></div>
          <div className="wrapper wide-1024">
            <div className="icon-description-ctn">
              <div className="section-head">
                <h2>
                  The Only Platform You Need <br />
                  to Hire Top Talent.
                </h2>
                <p>
                  Hireddd lets you access 1000+ digital resumes with verified
                  profiles.
                </p>
              </div>

              <div className="iwd-row">
                <div className="iwd-column">
                  <div className="iwd-column-icon">
                    <img src={iwdIcon} alt="Icon" />
                  </div>
                  <div className="iwd-column-content">
                    <h3 className="text-24">Development</h3>
                    <p>
                      Highly skilled software engineers, coders, and architects
                      with extensive proficiency in a wide range of technologies
                    </p>
                  </div>
                </div>
                <div className="iwd-column">
                  <div className="iwd-column-icon">
                    <img src={iwdIcon2} alt="Icon" />
                  </div>
                  <div className="iwd-column-content">
                    <h3 className="text-24">Designing</h3>
                    <p>
                      Specialized UI/UX, visual, and interaction designers,
                      along with diverse talents such as illustrators,
                      animators, and more.
                    </p>
                  </div>
                </div>
                <div className="iwd-column">
                  <div className="iwd-column-icon">
                    <img src={iwdIcon3} alt="Icon" />
                  </div>
                  <div className="iwd-column-content">
                    <h3 className="text-24">Sales & Marketing</h3>
                    <p>
                      Experienced professionals with in-depth knowledge of
                      financial management, accounting principles, budgeting,
                      financial analysis, and financial planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="s-100"></div>
          <div className="wrapper wide-1240">
            <div className="process-ctn">
              <div className="section-head">
                <h2>Hiring made simple</h2>
                <p>
                  Hireddd revolutionises the hiring process for all the
                  recruiters out there, making it a simple <br />
                  and swift process to hire talent within minutes. Follow these
                  three simple steps:
                </p>
              </div>
              <div className="process-row flex-between-start">
                <div className="process-column">
                  <div className="process-number">1</div>
                  <div className="process-column-content">
                    <div className="process-title">
                      <h3 className="text-22">Create your account</h3>
                      <p>
                        Sign up and create your account: Join in a few clicks
                        and explore countless talented candidates.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="process-column">
                  <div className="process-number">2</div>
                  <div className="process-column-content">
                    <div className="process-title">
                      <h3 className="text-22">Browse Talent</h3>
                      <p>
                        Get access to thousands of resumes and digital profiles.
                        Find the best talent in the market, faster, cheaper, and
                        better.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="process-column">
                  <div className="process-number">3</div>
                  <div className="process-column-content">
                    <div className="process-title">
                      <h3 className="text-22">Hire Talent</h3>
                      <p>
                        Once you find candidates that match your needs, simply
                        initiate the hiring process. Yes, it’s that simple!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="process-button">
                <Link to="/signup" className="button">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div className="s-100"></div>
          <div className="wrapper wide-1180">
            <div className="two-column-ctn">
              <div className="section-head">
                <h2>
                  Why Employees and Employers <br />
                  Embrace Hireddd
                </h2>
                <p>
                  Seamless hiring with Hireddd. The future of remote work
                  recruitment. <br />
                  Trustworthy and reliable, we’re the future of hiring.
                </p>
              </div>
              <div className="iwd-row iwd-horizantal">
                <div className="iwd-column">
                  <div className="iwd-column-icon">
                    <img src={icon} alt="Icon" />
                  </div>
                  <div className="iwd-column-content">
                    <h3 className="text-24">For Employees</h3>
                    <p>
                      At Hireddd, we empower job seekers with one minute dynamic
                      video resumes that leave a lasting impression on
                      employers. Stand out from the competition and unlock
                      exciting job opportunities. Join us today!
                    </p>
                    <div className="iwd-column-button">
                      <Link to="/signup" className="button">
                        Create video
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="iwd-column">
                  <div className="iwd-column-icon">
                    <img src={icon2} alt="Icon" />
                  </div>
                  <div className="iwd-column-content">
                    <h3 className="text-24">For Employers</h3>
                    <p>
                      Simplify Hiring with Hireddd: Advanced Features for
                      Perfect Talent Matches! At Hireddd, we offer advanced
                      employer features to streamline your hiring process. Find
                      your perfect match effortlessly. Join us now!
                    </p>
                    <div className="iwd-column-button">
                      <Link to="/signup" className="button">
                        Get started
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="s-100"></div>
          <div className="wrapper">
            <div className="testimonial-slider-ctn">
              <div className="section-head">
                <h2>Testimonials</h2>
                <p>
                  Here’s what our users think about us. With thousands of people
                  giving us feedback, <br />
                  we’re a purely people-driven operation.
                </p>
              </div>
              <div className="testimonial-slider">
                <Slider {...testimonoialSliderSettings} ref={testimonialSlider}>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                  <div className="testimonial-slide">
                    <div className="author-head flex-between-center">
                      <div className="author-image h-img-cover">
                        <img src={authorImage} alt="Graphical content" />
                      </div>
                      <div className="author-info">
                        <div className="author-title">Rick Fast</div>
                        <div className="author-designation">
                          Employer in SVP of Engineering @ Expedia
                        </div>
                      </div>
                      <div className="review-stars">
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={yellowStar} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={halfYellow} alt="Star" />
                        </div>
                        <div className="star">
                          <img src={greyStar} alt="Star" />
                        </div>
                      </div>
                    </div>
                    <blockquote>
                      I had been searching for a new job for months with no
                      luck, until I stumbled upon this amazing job site. Within
                      a week of creating my profile, I received multiple
                      interview requests and finally landed my dream job. This
                      site is a game-changer for job seekers!
                    </blockquote>
                  </div>
                </Slider>
              </div>
              <div className="custom-slider-pagination flex-between-center">
                <button
                  onClick={handlePreviousTest}
                  className="custom-slick-nav custom-prev"
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
                    />
                  </svg>
                </button>
                {/* <div className="slides-numbers" style="display: block;">
                                <span className="active">01</span> of <span className="total"></span>
                            </div> */}
                <button
                  onClick={handleNextTest}
                  className="custom-slick-nav custom-next"
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
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="s-100"></div>
          <div className="logo-grid-ctn">
            <div className="section-head">
              <h2>Who’s hiring at hireddd.com?</h2>
            </div>
            <div className="logos-grid">
              <div className="logo-grid-item">
                <img src={logo} alt="Logo" />
              </div>
              <div className="logo-grid-item">
                <img src={logo1} alt="Logo" />
              </div>
              <div className="logo-grid-item">
                <img src={logo2} alt="Logo" />
              </div>
              <div className="logo-grid-item">
                <img src={logo3} alt="Logo" />
              </div>
              <div className="logo-grid-item">
                <img src={logo4} alt="Logo" />
              </div>
              <div className="logo-grid-item">
                <img src={logo5} alt="Logo" />
              </div>
            </div>
          </div>
          <div className="s-80"></div>
        </section>
      </main>
      <HomePageFoot />
    </>
  );
}
