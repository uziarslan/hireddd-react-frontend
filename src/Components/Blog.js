import React from "react";
import "../Assets/Css/styles.min.css";
import heroShape from "../Assets/images/hero-shape.png"
import blogImage from "../Assets/images/uploads/video-slider-image.jpg"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import HomePageNavbar from "../Components/HomePageNav";
import HomePageFoot from "./HomePageFoot";

export default function Blog() {

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
                                <h1>Stay Updated with the <br /> latest Blogs & News
                                </h1>
                                <div className="banner-text">
                                    <p>Search amongst 1000+ active users on Pakistan’s #1 hiring platform</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="" className="page-section">
                    <section className="overflow-hidden section-overlap">
                        <div className="wrapper wide-1024">
                            <Slider className="featured-posts featured-post-slider">
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="featured-post">
                                    <div className="two-columns">
                                        <div className="featured-post-image h-img-cover">
                                            <img src={blogImage} alt="Blog Thumbnail" />
                                        </div>
                                        <div className="featured-post-content">
                                            <div className="date-meta">wednesday 12, march 2024</div>
                                            <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                            <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text Loreum
                                                ipsum
                                                dummy text Loreum ipsum dummy text
                                                Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                        </div>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </section>
                    <div className="s-60"></div>
                    <section>
                        <div className="wrapper">
                            <div className="filter-bar">
                                <div className="tags">
                                    <Link href="#" className="tag current">Trending</Link>
                                    <Link href="#" className="tag">Filter</Link>
                                    <Link href="#" className="tag">Filter</Link>
                                    <Link href="#" className="tag">Filter</Link>
                                    <Link href="#" className="tag">Filter</Link>
                                </div>
                                <div className="filter-search">
                                    <div className="user-search">
                                        <form>
                                            <input type="search" placeholder="Quick Search" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="s-100"></div>
                    <section>
                        <div className="wrapper wide-1280">
                            <div className="blog-posts blog-post-ctn">
                                <div className="blog-post-left">
                                    <div className="blog-posts-row two-columns">
                                        <div className="blog-post">
                                            <div className="blog-post-content">
                                                <div className="post-tag">Featured</div>
                                                <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum

                                                </p>
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                            </div>
                                            <div className="blog-post-image h-img-cover">
                                            </div>
                                            <div className="blog-post-socials">
                                                Share to
                                                <Link href="#" className="social-link">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.9187 11.7132C23.9187 17.6289 19.5349 22.5195 13.84 23.3131C13.3075 23.387 12.7627 23.4256 12.2097 23.4256C11.5714 23.4256 10.9446 23.3747 10.3341 23.2762C4.75824 22.3783 0.5 17.5427 0.5 11.7132C0.5 5.24434 5.7428 0 12.2089 0C18.675 0 23.9187 5.24434 23.9187 11.7132Z"
                                                            fill="#1877F2" />
                                                        <path
                                                            d="M13.8419 9.40453V11.9561H16.9974L16.4977 15.3933H13.8419V23.3123C13.3094 23.3862 12.7646 23.4247 12.2116 23.4247C11.5733 23.4247 10.9464 23.3739 10.336 23.2754V15.3933H7.42578V11.9561H10.336V8.83413C10.336 6.89726 11.9055 5.32642 13.8427 5.32642V5.32806C13.8484 5.32806 13.8533 5.32642 13.8591 5.32642H16.9982V8.29903H14.947C14.3374 8.29903 13.8427 8.79392 13.8427 9.40371L13.8419 9.40453Z"
                                                            fill="white" />
                                                    </svg>
                                                </Link>
                                                <Link href="#" className="social-link">
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M24.242 11.7132C24.242 17.6289 19.8583 22.5195 14.1634 23.3131C13.6309 23.387 13.0861 23.4256 12.5331 23.4256C11.8948 23.4256 11.268 23.3747 10.6575 23.2762C5.08245 22.3783 0.824219 17.5427 0.824219 11.7132C0.824219 5.24434 6.06702 0 12.534 0C19.0009 0 24.2437 5.24434 24.2437 11.7132H24.242Z"
                                                            fill="#1C1C1B" />
                                                        <path
                                                            d="M5.5727 5.16553L10.973 12.3878L5.53906 18.26H6.76239L11.5203 13.119L15.3642 18.26H19.5264L13.8225 10.6315L18.8807 5.16553H17.6574L13.2761 9.90021L9.73576 5.16553H5.57352H5.5727ZM7.37117 6.06667H9.28286L17.7263 17.3588H15.8146L7.37117 6.06667Z"
                                                            fill="white" />
                                                    </svg>

                                                </Link>
                                                <Link href="#" className="social-link">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.5006 11.6795C23.5006 5.22911 18.2731 0 11.8245 0C5.37601 0 0.148438 5.22911 0.148438 11.6795C0.148438 18.13 5.37601 23.3591 11.8245 23.3591C18.2731 23.3591 23.5006 18.13 23.5006 11.6795Z"
                                                            fill="#FF0209" />
                                                        <path
                                                            d="M16.7803 16.8525C16.4324 16.8902 16.0763 16.8968 15.735 16.896C13.0726 16.8935 10.4102 16.891 7.74857 16.8894C6.91087 16.8894 5.99851 16.8623 5.35116 16.3297C4.62176 15.7281 4.46998 14.685 4.4109 13.7412C4.32886 12.4477 4.32229 11.1502 4.38957 9.85591C4.42649 9.14518 4.49131 8.41721 4.79734 7.77377C5.01723 7.31171 5.38398 6.89643 5.85328 6.67812C6.3989 6.42452 6.96994 6.46966 7.5574 6.46884C8.96369 6.4672 10.37 6.46638 11.7763 6.46474C13.2383 6.46309 14.7012 6.46227 16.1633 6.46063C16.8541 6.46063 17.5959 6.47458 18.1595 6.87427C18.8873 7.38968 19.085 8.37043 19.1761 9.25762C19.3443 10.8917 19.3467 12.5429 19.1826 14.177C19.1145 14.8508 19.0013 15.5631 18.5574 16.0744C18.1177 16.5816 17.4654 16.777 16.7811 16.8517L16.7803 16.8525Z"
                                                            fill="white" />
                                                        <path d="M14.2061 11.6795L10.2383 9.38812V13.971L14.2061 11.6795Z"
                                                            fill="#FF0209" />
                                                    </svg>

                                                </Link>
                                            </div>
                                        </div>
                                        <div className="blog-post">
                                            <div className="blog-post-content">
                                                <div className="post-tag">Featured</div>
                                                <h3>Loreum ipsum dummy text Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum

                                                </p>
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                            </div>
                                            <div className="blog-post-image h-img-cover">
                                            </div>
                                            <div className="blog-post-socials">
                                                Share to
                                                <Link href="#" className="social-link">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.9187 11.7132C23.9187 17.6289 19.5349 22.5195 13.84 23.3131C13.3075 23.387 12.7627 23.4256 12.2097 23.4256C11.5714 23.4256 10.9446 23.3747 10.3341 23.2762C4.75824 22.3783 0.5 17.5427 0.5 11.7132C0.5 5.24434 5.7428 0 12.2089 0C18.675 0 23.9187 5.24434 23.9187 11.7132Z"
                                                            fill="#1877F2" />
                                                        <path
                                                            d="M13.8419 9.40453V11.9561H16.9974L16.4977 15.3933H13.8419V23.3123C13.3094 23.3862 12.7646 23.4247 12.2116 23.4247C11.5733 23.4247 10.9464 23.3739 10.336 23.2754V15.3933H7.42578V11.9561H10.336V8.83413C10.336 6.89726 11.9055 5.32642 13.8427 5.32642V5.32806C13.8484 5.32806 13.8533 5.32642 13.8591 5.32642H16.9982V8.29903H14.947C14.3374 8.29903 13.8427 8.79392 13.8427 9.40371L13.8419 9.40453Z"
                                                            fill="white" />
                                                    </svg>
                                                </Link>
                                                <Link href="#" className="social-link">
                                                    <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M24.242 11.7132C24.242 17.6289 19.8583 22.5195 14.1634 23.3131C13.6309 23.387 13.0861 23.4256 12.5331 23.4256C11.8948 23.4256 11.268 23.3747 10.6575 23.2762C5.08245 22.3783 0.824219 17.5427 0.824219 11.7132C0.824219 5.24434 6.06702 0 12.534 0C19.0009 0 24.2437 5.24434 24.2437 11.7132H24.242Z"
                                                            fill="#1C1C1B" />
                                                        <path
                                                            d="M5.5727 5.16553L10.973 12.3878L5.53906 18.26H6.76239L11.5203 13.119L15.3642 18.26H19.5264L13.8225 10.6315L18.8807 5.16553H17.6574L13.2761 9.90021L9.73576 5.16553H5.57352H5.5727ZM7.37117 6.06667H9.28286L17.7263 17.3588H15.8146L7.37117 6.06667Z"
                                                            fill="white" />
                                                    </svg>

                                                </Link>
                                                <Link href="#" className="social-link">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                            d="M23.5006 11.6795C23.5006 5.22911 18.2731 0 11.8245 0C5.37601 0 0.148438 5.22911 0.148438 11.6795C0.148438 18.13 5.37601 23.3591 11.8245 23.3591C18.2731 23.3591 23.5006 18.13 23.5006 11.6795Z"
                                                            fill="#FF0209" />
                                                        <path
                                                            d="M16.7803 16.8525C16.4324 16.8902 16.0763 16.8968 15.735 16.896C13.0726 16.8935 10.4102 16.891 7.74857 16.8894C6.91087 16.8894 5.99851 16.8623 5.35116 16.3297C4.62176 15.7281 4.46998 14.685 4.4109 13.7412C4.32886 12.4477 4.32229 11.1502 4.38957 9.85591C4.42649 9.14518 4.49131 8.41721 4.79734 7.77377C5.01723 7.31171 5.38398 6.89643 5.85328 6.67812C6.3989 6.42452 6.96994 6.46966 7.5574 6.46884C8.96369 6.4672 10.37 6.46638 11.7763 6.46474C13.2383 6.46309 14.7012 6.46227 16.1633 6.46063C16.8541 6.46063 17.5959 6.47458 18.1595 6.87427C18.8873 7.38968 19.085 8.37043 19.1761 9.25762C19.3443 10.8917 19.3467 12.5429 19.1826 14.177C19.1145 14.8508 19.0013 15.5631 18.5574 16.0744C18.1177 16.5816 17.4654 16.777 16.7811 16.8517L16.7803 16.8525Z"
                                                            fill="white" />
                                                        <path d="M14.2061 11.6795L10.2383 9.38812V13.971L14.2061 11.6795Z"
                                                            fill="#FF0209" />
                                                    </svg>

                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="s-80"></div>
                                    <div className="newsletter-form">
                                        <h3>Get updated our blogs & newslater!</h3>
                                        <form action="">
                                            <div className="inputs">
                                                <div className="email">
                                                    <label htmlFor="newsletter">Email</label>
                                                    <input id="newsletter" type="email" placeholder="xyz@emia.com" />
                                                </div>
                                                <div className="submit">
                                                    <input type="submit" value="Subscribe" />
                                                </div>
                                            </div>
                                            <div className="inputs">
                                                <input id="newslettercheckbox" type="checkbox" />
                                                <label htmlFor="newslettercheckbox">Notify me via email when new articles are
                                                    published</label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="blog-post-right">
                                    <div className="right-column-title">
                                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.5 1.5L4.5 1.5C4.10218 1.5 3.72064 1.65804 3.43934 1.93934C3.15804 2.22064 3 2.60218 3 3L3 15C3 15.3978 3.15804 15.7794 3.43934 16.0607C3.72064 16.342 4.10218 16.5 4.5 16.5H13.5C13.8978 16.5 14.2794 16.342 14.5607 16.0607C14.842 15.7794 15 15.3978 15 15L15 6M10.5 1.5L15 6M10.5 1.5V6L15 6M12 9.75L6 9.75M12 12.75L6 12.75M7.5 6.75H6"
                                                stroke="black" strokeWidth="1.5" strokeLinecap="round"
                                                strokeLinejoin="round" />
                                        </svg>
                                        <h4 className="heading-5">Related Articles</h4>
                                    </div>
                                    <div className="featured-post">
                                        <div className="two-columns">
                                            <div className="featured-post-image h-img-cover">
                                                <img src={blogImage} alt="Blog Thumbnail" />
                                            </div>
                                            <div className="featured-post-content">
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                                <h3>Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum
                                                    dummy text Loreum ipsum dummy text
                                                    Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="featured-post">
                                        <div className="two-columns">
                                            <div className="featured-post-image h-img-cover">
                                                <img src={blogImage} alt="Blog Thumbnail" />
                                            </div>
                                            <div className="featured-post-content">
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                                <h3>Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum
                                                    dummy text Loreum ipsum dummy text
                                                    Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="featured-post">
                                        <div className="two-columns">
                                            <div className="featured-post-image h-img-cover">
                                                <img src={blogImage} alt="Blog Thumbnail" />
                                            </div>
                                            <div className="featured-post-content">
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                                <h3>Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum
                                                    dummy text Loreum ipsum dummy text
                                                    Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="featured-post">
                                        <div className="two-columns">
                                            <div className="featured-post-image h-img-cover">
                                                <img src={blogImage} alt="Blog Thumbnail" />
                                            </div>
                                            <div className="featured-post-content">
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                                <h3>Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum
                                                    dummy text Loreum ipsum dummy text
                                                    Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="featured-post">
                                        <div className="two-columns">
                                            <div className="featured-post-image h-img-cover">
                                                <img src={blogImage} alt="Blog Thumbnail" />
                                            </div>
                                            <div className="featured-post-content">
                                                <div className="date-meta">wednesday 12, march 2024</div>
                                                <h3>Loreum ipsum dummy text</h3>
                                                <p>Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text
                                                    Loreum
                                                    ipsum
                                                    dummy text Loreum ipsum dummy text
                                                    Loreum ipsum dummy text Loreum ipsum dummy text Loreum ipsum dummy text</p>
                                            </div>
                                        </div>
                                    </div>
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
