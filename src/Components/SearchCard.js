import React from "react";
import { Link } from "react-router-dom";
import resultImage from "../Assets/images/uploads/result-image.png";
import dummyProfile from "../Assets/images/uploads/avatar-image.jpeg";
import timeIcon from "../Assets/images/time-icon.png";
import likeIcon from "../Assets/images/like-icon-01.svg";
import profileIcon from "../Assets/images/profile-icon-01.svg";
import verifiedIcon from "../Assets/images/verified-icon-01.svg";
import jobIcon from "../Assets/images/job-icon-01.svg";
import jobIcon2 from "../Assets/images/job-icon-02.svg";
import jobIcon3 from "../Assets/images/job-icon-03.svg";
import axiosInstance from "../services/axiosInstance";

const SearchCard = ({ data, userId }) => {
  const handleClick = async (talentId) => {
    try {
      const response = await axiosInstance.post("/chat", {
        talentId,
        organizationId: userId,
      });

      if (response.status === 200) {
        const chat = response.data;
        // Redirect to the chat page or update UI
      } else {
        // Handle errors appropriately
        console.error("Failed to create chat");
        alert("Failed to start the chat");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error starting chat");
    }
  };

  return (
    <>
      <div className="job-results-columns">
        {data.map((item, index) => (
          <div key={index} className="serach-result-item">
            {item.video ? (
              item.video.newVideo ? (
                <div className="tag-new-video">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.7844 1.44329C12.7477 1.26245 12.6495 1.09986 12.5067 0.983072C12.3638 0.866287 12.1849 0.80249 12.0004 0.80249C11.8158 0.80249 11.637 0.866287 11.4941 0.983072C11.3512 1.09986 11.2531 1.26245 11.2164 1.44329L11.0244 2.39689C10.9935 2.55179 10.9175 2.69409 10.8059 2.80585C10.6942 2.91761 10.552 2.99382 10.3972 3.02489L9.44358 3.21529C9.26187 3.25123 9.09825 3.34911 8.98066 3.49224C8.86307 3.63536 8.79879 3.81486 8.79879 4.00009C8.79879 4.18533 8.86307 4.36482 8.98066 4.50795C9.09825 4.65107 9.26187 4.74895 9.44358 4.78489L10.3972 4.97529C10.5522 5.00622 10.6946 5.08237 10.8063 5.19414C10.9181 5.30591 10.9943 5.44828 11.0252 5.60329L11.2156 6.55689C11.2515 6.73861 11.3494 6.90222 11.4925 7.01981C11.6357 7.13741 11.8151 7.20169 12.0004 7.20169C12.1856 7.20169 12.3651 7.13741 12.5082 7.01981C12.6514 6.90222 12.7492 6.73861 12.7852 6.55689L12.9756 5.60329C13.0065 5.44828 13.0827 5.30591 13.1944 5.19414C13.3062 5.08237 13.4486 5.00622 13.6036 4.97529L14.5572 4.78489C14.7389 4.74895 14.9025 4.65107 15.0201 4.50795C15.1377 4.36482 15.202 4.18533 15.202 4.00009C15.202 3.81486 15.1377 3.63536 15.0201 3.49224C14.9025 3.34911 14.7389 3.25123 14.5572 3.21529L13.6036 3.02489C13.4486 2.99396 13.3062 2.91781 13.1944 2.80604C13.0827 2.69427 13.0065 2.5519 12.9756 2.39689L12.7852 1.44329H12.7844ZM5.55958 4.54729C5.5066 4.38782 5.40475 4.24908 5.26848 4.15075C5.1322 4.05243 4.96843 3.99951 4.80038 3.99951C4.63234 3.99951 4.46856 4.05243 4.33229 4.15075C4.19602 4.24908 4.09416 4.38782 4.04118 4.54729L3.49478 6.18809C3.45552 6.30604 3.38932 6.41322 3.30141 6.50112C3.21351 6.58902 3.10633 6.65523 2.98838 6.69449L1.34758 7.24089C1.18811 7.29387 1.04937 7.39572 0.951046 7.532C0.852721 7.66827 0.799805 7.83205 0.799805 8.00009C0.799805 8.16813 0.852721 8.33191 0.951046 8.46819C1.04937 8.60446 1.18811 8.70631 1.34758 8.75929L2.98838 9.30649C3.10625 9.34567 3.21337 9.41176 3.30127 9.49951C3.38916 9.58727 3.45542 9.69429 3.49478 9.81209L4.04118 11.4529C4.09416 11.6124 4.19602 11.7511 4.33229 11.8494C4.46856 11.9478 4.63234 12.0007 4.80038 12.0007C4.96843 12.0007 5.1322 11.9478 5.26848 11.8494C5.40475 11.7511 5.5066 11.6124 5.55958 11.4529L6.10598 9.81209C6.14524 9.69414 6.21145 9.58696 6.29935 9.49906C6.38726 9.41116 6.49443 9.34495 6.61238 9.30569L8.25318 8.75929C8.41266 8.70631 8.5514 8.60446 8.64972 8.46819C8.74805 8.33191 8.80096 8.16813 8.80096 8.00009C8.80096 7.83205 8.74805 7.66827 8.64972 7.532C8.5514 7.39572 8.41266 7.29387 8.25318 7.24089L6.61238 6.69449C6.49443 6.65523 6.38726 6.58902 6.29935 6.50112C6.21145 6.41322 6.14524 6.30604 6.10598 6.18809L5.55958 4.54729ZM11.1596 10.9473C11.1066 10.7878 11.0048 10.6491 10.8685 10.5508C10.7322 10.4524 10.5684 10.3995 10.4004 10.3995C10.2323 10.3995 10.0686 10.4524 9.93229 10.5508C9.79602 10.6491 9.69416 10.7878 9.64118 10.9473L9.49398 11.3881C9.4548 11.506 9.38872 11.6131 9.30096 11.701C9.2132 11.7889 9.10619 11.8551 8.98838 11.8945L8.54758 12.0409C8.38811 12.0939 8.24937 12.1957 8.15105 12.332C8.05272 12.4683 7.99981 12.632 7.99981 12.8001C7.99981 12.9681 8.05272 13.1319 8.15105 13.2682C8.24937 13.4045 8.38811 13.5063 8.54758 13.5593L8.98838 13.7057C9.10633 13.745 9.21351 13.8112 9.30141 13.8991C9.38932 13.987 9.45552 14.0941 9.49478 14.2121L9.64118 14.6529C9.69416 14.8124 9.79602 14.9511 9.93229 15.0494C10.0686 15.1478 10.2323 15.2007 10.4004 15.2007C10.5684 15.2007 10.7322 15.1478 10.8685 15.0494C11.0048 14.9511 11.1066 14.8124 11.1596 14.6529L11.3068 14.2121C11.346 14.0942 11.4121 13.9871 11.4998 13.8992C11.5876 13.8113 11.6946 13.7451 11.8124 13.7057L12.2532 13.5593C12.4127 13.5063 12.5514 13.4045 12.6497 13.2682C12.748 13.1319 12.801 12.9681 12.801 12.8001C12.801 12.632 12.748 12.4683 12.6497 12.332C12.5514 12.1957 12.4127 12.0939 12.2532 12.0409L11.8124 11.8937C11.6945 11.8545 11.5874 11.7884 11.4995 11.7007C11.4116 11.6129 11.3454 11.5059 11.306 11.3881L11.1596 10.9473Z"
                      fill="white"
                    />
                  </svg>
                  New Video
                </div>
              ) : null
            ) : null}
            <div className="job-item-image">
              {item.video.path ? (
                <video controls>
                  <source src={item.video.path} type={item.video.fileType} />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={item.profile ? item.profile.path : dummyProfile}
                  alt="Attachment"
                />
              )}
            </div>
            <div className="search-result-item-content">
              <div className="search-result-item-content-inner">
                <div className="job-author-content">
                  <div className="job-head-row">
                    <div className="job-author-left">
                      <div className="job-author-image">
                        <img
                          src={item.profile ? item.profile.path : dummyProfile}
                          alt="Attachment"
                        />
                      </div>
                      <Link
                        to={`/talent/${item._id}`}
                        className="job-author-info"
                      >
                        <div className="job-atuhor-title">{item.firstName}</div>
                        <div className="job-atuhor-designation">
                          {item.location}
                        </div>
                      </Link>
                    </div>
                    <div className="job-author-right">
                      <div className="job-published-time">
                        <div className="tiime-icon">
                          <img src={timeIcon} alt="Time icon" />
                        </div>
                        <div className="time-text">24 hours ago</div>
                      </div>
                      <div className="job-verfied-icons">
                        <img src={jobIcon} alt="Icon " />
                        <img src={jobIcon2} alt="Icon " />
                        <img src={jobIcon3} alt="Icon " />
                      </div>
                    </div>
                  </div>
                  <div className="job-description">
                    <p>{item.about}</p>
                  </div>
                  <div className="tags">
                    {item.skills.map((skill, index) => (
                      <div key={index} className="tag">
                        {skill.toUpperCase()}
                      </div>
                    ))}
                  </div>
                  <div className="job-reactions">
                    <div className="job-reaction-links">
                      <Link to="#" className="job-reaction">
                        <img src={likeIcon} alt="Icon" />
                      </Link>
                      <Link to="#" className="job-reaction">
                        <img src={profileIcon} alt="Icon" />
                      </Link>
                      <Link to="#" className="job-reaction">
                        <img src={verifiedIcon} alt="Icon" />
                      </Link>
                    </div>
                    <div className="view-profile-link">
                      <Link
                        to="#"
                        onClick={() => handleClick(item._id)}
                        className="profile-link"
                      >
                        Message{" "}
                        <svg
                          width="9"
                          height="15"
                          viewBox="0 0 9 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 14L7.5 7.5L1 1"
                            stroke="#7B68EE"
                            strokeWidth="2"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchCard;
