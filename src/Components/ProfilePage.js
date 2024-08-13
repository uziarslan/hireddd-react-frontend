import React, { useState, useEffect, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useParams } from "react-router-dom";
import Flash from "./Flash";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import socialIcon from "../Assets/images/profile-social-icon-01.svg";
import socialIcon1 from "../Assets/images/profile-social-icon-02.svg";
import pdfIcon from "../Assets/images/pdf-icon.svg";
import linkedIn from "../Assets/images/profile-social-icon-03.svg";
import guranteeIcon from "../Assets/images/guarantee-icon.svg";
import axiosInstance from "../services/axiosInstance";
import Loading from "./Loading";
import { AuthContext } from "../Context/AuthContext";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const { talentId } = useParams();
  const [talent, setTalent] = useState({});
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTalentProfile = async () => {
      try {
        const { status, data } = await axiosInstance.get(
          `/profile/${talentId}`
        );
        setIsLoading(false);
        if (status === 200) {
          setTalent(data);
        }
      } catch (error) {
        setIsLoading(false);
        setMessage(error.response.data);
      }
    };

    fetchTalentProfile();
  }, [talentId]);

  if (!user || !talent || !talent.skills) return null;

  return (
    <>
      <DashNav firstName={user.firstName} profile={user.profile.path} />
      <Loading isLoading={isLoading} />
      <Flash message={message} />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1230">
          <div className="profile-body-row no-sidebar">
            <div className="profile-content-area">
              <div className="profile-sidebar-sidebar-link">
                <Link to="/find/employees" className="back-link-arrow">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="39"
                      height="39"
                      rx="19.5"
                      stroke="#7B68EE"
                    />
                    <g clipPath="url(#clip0_2701_1885)">
                      <path
                        d="M19.5925 27.7955L12.4334 20.6364L19.5925 13.4773L21.2402 15.1108L16.915 19.4361H27.0499V21.8366H16.915L21.2402 26.1548L19.5925 27.7955Z"
                        fill="#7B68EE"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2701_1885">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(8 8)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Link>
                <div className="profile-content-head employee-status">
                  <div className="profile-head-left">
                    <div className="profile-head-image">
                      <img
                        src={
                          talent.profile ? talent.profile.path : dummyProfile
                        }
                        alt="Avatar"
                      />
                    </div>
                    <div className="profile-head-info">
                      <h2 className="profile-head-title">
                        {talent.firstName} {talent.lastName}
                      </h2>
                      <div className="profile-head-subtext">UI UX Designer</div>
                      <div className="profile-head-text">{talent.location}</div>
                    </div>
                  </div>
                  <div className="profile-head-right">
                    <button className=" change-status-button">
                      <div className="btn-icon">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="5"
                            width="4"
                            height="14"
                            rx="2"
                            fill="white"
                          />
                          <rect
                            y="9"
                            width="4"
                            height="14"
                            rx="2"
                            transform="rotate(-90 0 9)"
                            fill="white"
                          />
                        </svg>
                      </div>
                      Add to
                    </button>
                  </div>
                </div>
                <div className="profile-edit-options">
                  <div className="profile-edit-set">
                    <div className="profile-edit-title">Summary</div>
                    <div className="profile-edit-text">
                      <p>{talent.about}</p>
                      <div className="profile-summry-edit">
                        <textarea placeholder="Edit"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="profile-edit-set">
                    <div className="profile-edit-title">Top Skills</div>
                    <div className="profile-edit-tags">
                      {talent.skills.map((skill, index) => (
                        <div key={index} className="profile-edit-tag">
                          {skill.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="profile-edit-set">
                    <div className="profile-edit-title">Contact Details</div>
                    <div className="profile-edit-text">
                      <p>
                        <strong>Phone</strong> +921234567
                      </p>
                      <p>
                        <strong>Email</strong> {talent.username}
                      </p>
                    </div>
                  </div>
                  <div className="profile-edit-set">
                    <div
                      id="addprofilelink"
                      className="job-popup-detail profile-links-popup mfp-hide"
                    >
                      <h2 className="job-popup-title">Portfolio Links</h2>
                      <div className="popup-links">
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={socialIcon} alt="Portfolio badge" />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={socialIcon1} alt="Portfolio badge" />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img
                              src="../assets/src/images/potfolio-link-badge.svg"
                              alt="Portfolio badge"
                            />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                      </div>
                      <div className="status-popup-bottom-btns">
                        <button className="outline-button popup-modal-dismiss">
                          Cancel
                        </button>
                        <button className="fill-button">Save</button>
                      </div>
                    </div>
                    <div className="profile-edit-title">Portfolio</div>
                    <div className="profile-edit-socials">
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={socialIcon} alt="Icon " />
                      </Link>
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={socialIcon1} alt="Icon " />
                      </Link>
                    </div>
                  </div>
                  <div className="profile-edit-set">
                    <div
                      id="attachdocument"
                      className="job-popup-detail profile-links-popup mfp-hide"
                    >
                      <h2 className="job-popup-title">Add Certificate</h2>
                      <div className="popup-links">
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={pdfIcon} alt="Portfolio badge" />
                          </div>
                          <div className="popup-link-title">
                            <input type="file" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={pdfIcon} alt="Portfolio badge" />
                          </div>
                          <div className="popup-link-title">
                            <input type="file" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={pdfIcon} alt="Portfolio badge" />
                          </div>
                          <div className="popup-link-title">
                            <input type="file" placeholder="Add Link" />
                          </div>
                        </div>
                      </div>
                      <div className="status-popup-bottom-btns">
                        <button className="outline-button popup-modal-dismiss">
                          Cancel
                        </button>
                        <button className="fill-button">Save</button>
                      </div>
                    </div>
                    <div className="profile-edit-title">Attach Documents</div>
                    <div className="profile-edit-socials">
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={pdfIcon} alt="Icon" />
                      </Link>
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={pdfIcon} alt="Icon" />
                      </Link>
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={pdfIcon} alt="Icon" />
                      </Link>
                    </div>
                  </div>
                  <div className="profile-edit-set">
                    <div
                      id="linkedin-popup"
                      className="job-popup-detail profile-links-popup mfp-hide"
                    >
                      <h2 className="job-popup-title">Portfolio Links</h2>
                      <div className="popup-links">
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={linkedIn} alt="Icon" />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={linkedIn} alt="Icon" />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                        <div className="popup-link-item">
                          <div className="popup-link-icon">
                            <img src={linkedIn} alt="Icon" />
                          </div>
                          <div className="popup-link-title">
                            <input type="text" placeholder="Add Link" />
                          </div>
                        </div>
                      </div>
                      <div className="status-popup-bottom-btns">
                        <button className="outline-button popup-modal-dismiss">
                          Cancel
                        </button>
                        <button className="fill-button">Save</button>
                      </div>
                    </div>
                    <div className="profile-edit-title">LinkedIn</div>
                    <div className="profile-edit-socials">
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={linkedIn} alt="Icon" />
                      </Link>
                    </div>
                  </div>

                  <div className="get-premium-btn">
                    <Link to="#">
                      <div className="premium-btn-icon">
                        <img src={guranteeIcon} alt="Icon" />
                      </div>
                      <div className="premium-btn-text">
                        <div className="btn-top-text">Get Premium</div>
                        <div className="btn-bottom-text">
                          To view more user details
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
