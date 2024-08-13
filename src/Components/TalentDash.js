import React, { useState, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import socialIcon from "../Assets/images/profile-social-icon-01.svg";
import socialIcon1 from "../Assets/images/profile-social-icon-02.svg";
import pdfIcon from "../Assets/images/pdf-icon.svg";
import linkedIn from "../Assets/images/profile-social-icon-03.svg";
import companyLogo from "../Assets/images/uploads/shortlisted-image.jpg";
import Chat from "./Chat";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";

export default function TalentDash() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfile, setIsProfile] = useState(true);
  const [isMessages, setIsMessages] = useState(false);
  const [isHiredddStatus, setIsHiredddStatus] = useState(false);
  const [isShortlisted, setIsShortlisted] = useState(true);
  const [isInterviewed, setIsInterviewed] = useState(false);
  const [isAssessment, setIsAssessment] = useState(false);
  const [isHired, setIsHired] = useState(false);
  const [isRejected, setIsRejected] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleProfileClick = () => {
    setIsProfile(true);
    setIsMessages(false);
    setIsHiredddStatus(false);
  };
  const handleMessagesClick = () => {
    setIsMessages(true);
    setIsProfile(false);
    setIsHiredddStatus(false);
  };
  const handleHiredddStatusClick = () => {
    setIsHiredddStatus(true);
    setIsProfile(false);
    setIsMessages(false);
  };
  const handleShortlisted = () => {
    setIsShortlisted(true);
    setIsInterviewed(false);
    setIsAssessment(false);
    setIsHired(false);
    setIsRejected(false);
  };
  const handleInterviewed = () => {
    setIsInterviewed(true);
    setIsShortlisted(false);
    setIsAssessment(false);
    setIsHired(false);
    setIsRejected(false);
  };
  const handleAssessment = () => {
    setIsAssessment(true);
    setIsShortlisted(false);
    setIsInterviewed(false);
    setIsHired(false);
    setIsRejected(false);
  };
  const handleHired = () => {
    setIsHired(true);
    setIsShortlisted(false);
    setIsInterviewed(false);
    setIsAssessment(false);
    setIsRejected(false);
  };
  const handleRejected = () => {
    setIsRejected(true);
    setIsShortlisted(false);
    setIsInterviewed(false);
    setIsAssessment(false);
    setIsHired(false);
  };

  if (isLoading) {
    if (!user) {
      return <Loading isLoading={isLoading} />
    } else {
      setIsLoading(false)
    }
  }

  if (!user) return null

  return (
    <>
      <DashNav
        profile={user.profile ? user.profile.path : dummyProfile}
        firstName={user.firstName}
      />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1230">
          <div className="profile-body-row">
            <div className="profile-sidebar-area">
              <div className="profile-sidebar-links">
                <Link to="#" className="profile-sidebar-link tab-link-main">
                  <div className="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1547_1842)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1547_1842"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1547_1842"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1547_1842"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAADL0lEQVR4nO2cPW8TQRCGF4EgTSRqQFRQQAcNPwFooIWOioqPktJ0JAVydm7WUaRIlgICaSYRgQLR0QFpCBUNFYgkJZBICAmE0UECzodxEu/drM/vI01jJ7b38Zu5HW10zgEAAAAAgDaazeaQZx0llkUfdIlYRvLH2n8G9EiWPThEQV5R0Na6Ynk9NiFHe3194JzzDT1FrO83SV4tH3ShznoGsnpgLJNLFPRrJ8n/Sr4RyxXI3iEisjfvwd0Fb2wlOlGrPd+30/cbSEYnZ4c96+MdS/7bSuRZvf7ooPU6koZZjhHr291Kbuvb7+rh4Qnr9SRJlk2fpSCfepXctiNZzhpywXpdSeEbcpWCfI8meS3ZrD98Q2+5QafZbA5R0KnYgreoqW7DTU1k/9pAtHH7mF+Y8+ddvw4hnnWuBMlr6Z7L37PT5+m6y2EZcVUbQqioYlnsNNxsTPKmLyrokusniPXy9oaQomrr4WY7v+sqPYSEotK9friphOjRydlhYnliLvc/w03fix4bnz4eYwgpTvaf4aavRVNDz3vWz9Yyu9f2BiWXIlmQm/nAYC9Ro5VLCe+fHvBBm9ZSqMqiO56EhGqUS4EsmzntWT9Yy6Aqi7YfQrTaopMbQkIFRecb/XzDb714KrFKP7lJfQihAocbPy4nS5HsWc5FPQkJfVYsy571YqGSqziE0G6SzfLTB73darX2RBWcny5Q0PvWC6TEyrPci3ry4oPesV4UJVq5m5iiF6wXRKkWyyJEhzJE68doogdpKCHL1vH7YsgyghaiNv+GYJ0mKrkKFwrRCtGERNv/qRNah5pLQ48O9kJxMQzFSYHoUE76IDpAdNIDi0OiFaKrNBk6JFohGolW7KMJrcO+HxN6NERHwTq1hERDdFSsU0tINERHxTq1hERDdFSsU0tINERHxTq1hERDdFSsU0tINERHxTq1hETbi6YEvryBSDRBtJoL67tE+6Ar1oun8uqLnegSbxBI1sXy0kw0sd4YINHXjG/rI2/MJYTCa9783qTezxypuOz5u+Ny2KXAarKv532sChdIH3TFB32RtwvzJAMAAAAAAAAAAAC49PgFKCQMIyWHyO0AAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">Home</div>
                </Link>
                <Link
                  className={`profile-sidebar-link tab-link-main ${isProfile ? "current" : ""
                    }`}
                  onClick={handleProfileClick}
                >
                  <div className="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1320_2039)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1320_2039"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1320_2039"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1320_2039"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEx0lEQVR4nO2cXailYxTH14xvcoEakmKSYtxwIUUZqUE0Pi6QlCSuCHdStGl8xOm091rvWu9pN+qgnKO19hFTI4MxLoyDEsfU+BgMMmYYXPia4ThtPWefZg5G7X3O+77PM8/7/Op/s2u/+1n/nr3e53MBJBKJRCKRSCQSiURiMBDHT0e2W0lsLYpuIravkO0nEp0msV9R9Ev3OYo9iLmdO+Dj6027ve5ozO0OFH2PxLqDSV9jtrN9xxA03W53CWZ6G7HtHtzg/UK2Pch6k+94giTLnj+BWDcsxuB/aQbZrvYdV1AgTpyCYtsKNLkn989guwulszrPJ5ZBncnzZ48jto8LN/m/uXsvsT6VZWMnQx1zMomuL9/keflbbEdLJs6DOkGiN1dp8ryU8iNz51SoA4gvHUFs33gxumf2G1AHiO12bybPKct0FcQOsU76NhpZX4WYyfOJZb5N7kmnh9fq8RArJJ1r/Ju8r1fHO4Mk1iHfBs9TE2KFWF8PwOCeWDdArBDrloCM/hxiBcV2hGO07YZYQbY93g3eJ90LsYJivwSUOn6GWEGxT7wbPCfXFogVKnaBf3FGs22EWCG2B8JJHfYQxEqT7fxwUoeuhJhB0Y/8m2xfNBqNpRAzKJb5NppYGWKGcr3E7VJ7N1psJsvsYogVYl0XgMm99MH2IsQKhbXWMQWxQqJvB2T0JMQKsbW9G7xfOcRKiztXBGDwrJD1cogZFH3Tu8lib7lDPBAzRLocRT/waPT7zZHx06AuoChW35MVoW6gdFZX35v1SqgbDdXDkfW7CvPyzna7fRjUEczt3sp6M+udUOc7K8S2vQKTtzQamw6FOpNluqrkhaa4F5AGgVjvLy83632+4wvrVhbbcyUYPR79xGRQVPWQQsfWbO3ajjL6oSij+/qxOkPJ6GR0VFDq0cnoqKDUo8sHRVcWZXSTOxdV0OSDdd1DC9slR7EP3TN9xxUc3W53SSZ6N7L9uXijddpVpon+2NdiIOpc6HrjwmeEOoViF/iO46Cg0WgsJdZbBqrlwfqp+07tezGRLp9LDRvdNbh+b666wlTE9rC7LE9iu2brb8zKdrnPUGxNk/Wcfp71+JMvHItir7j6S64trk0QQ8519TF6JunUARZ9tla5G+0KoxDru/+Tata4th5UK31NGT+L2B5Ftq/7GBnsrCKfurzfV+kKV/JN9BGizpkQ7Igh16sWcrYO2f5ywY2Ojh5ZdLuGh/UoFHvM/cYCXqqTbqceQiHLOpcd8C85cGC2nURvKOJl1nuZ2o2uCOGix+Ns76DYpeAL9zIrY1cExba5F1WrNXbioG1i1pMw03tI7LPi26VjruAWVElrpHNGKWXU5B+aIdbNLq1kuV2HI7rCGelSjNOsqSO6Atmun82rrJvLvk3g7ia6Up4V1gyt7uALhSbWb0sfLc2NQ4O5/UrezLatQ0PPHFOa0e7wtvcgJRCxUSkmu0q2gdyo6gaiGTdnKNxoZHs6gOC6IQnFRouv68z6m+/AKDz9XuiadyvTawMIqhui3Iy4MKOJbdh3QBSoUOyJwoxG0Zd9B0TBStcXZnQZU1qKRG6GXJjRKPqD74AoXH1fmNHE9kcAAXXDVMTVxhKJRCKRSCQSiQTUgr8BN15sriCKoW4AAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">My Profile</div>
                </Link>
                <Link
                  className={`profile-sidebar-link tab-link-main ${isMessages ? "current" : ""
                    }`}
                  onClick={handleMessagesClick}
                >
                  <div className="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1320_2027)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1320_2027"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1320_2027"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1320_2027"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFMElEQVR4nO2dS4gcVRSGr+8His/4BBciuhGCiKKIuhEUHxtRUBSJLhzFx8aFgmLHV5xIZqbPqXNqaA2OGifKOd0qLoSIMIlJVq4VJb4HNZk4iiY6GROm5VaPWfiaqe7qvvdW3Q9+aJju6nN+TlfdunXvGWMikUgkEolEIpFIJLI0tdrU4ZDqRUiyCkmfQtbXgGUbsn6OLNNA+hOy7LdafD3d+Ztute/NPkOyyh7DHmsZX1kNROQwYLkaSNdas4DkN2RtFyF7LCD5EEmGMdUr7XeZKlGr1Q4FkuuAdQJJdxdl7DI0A6QvJ0nzWhuDKSv1+sbTIdVHkeSLAZr7H5JpYF2dpq3TTFlY15g8Nfv5sv7u3uC/iXQeSRujjdaZJlTWrn/neGB9Hln3Ojd0CQHrHiRdQyTHmZBAlhuQ9BvXBmJ+w79D1puN74y8JCcjq7o2DHs1nPTNNJ08yfjI4vjXgwudFiP7ixyXS41PAOk9QDrn3BwuvLLnEpa7jQ9kQzYPTMG+VrcMOzO43W4fAqwvODeBB1TdLGBzHrjRVTIZD1a2rhmoyUgy5DxpdlbZDw3E5CTRG4H0QGWNJj1Qp+b1fTV5ZFzOBpYfXSeLrkW6O0k2ntUXk+2MF7J84DxJ9kPA+n5fZgGR9GHXyaFnApL7CzXZ3o7GU4b+02zS2SR565TCjEZSdF096KmAZbS4CyDpH64TQl9FOl/IhdEO0p0nw34LWJ7urZpH5Jh4btblmD0zMTFxdC/VfLvrasFAlKR6a9dG2wlw1wlgIAKSDV2Z3Gg0jkCWn10ngKGIdLarRTuIzSucB89hKUnk8vxGkzzoOnCswp0isLzoOnAMTEAy3k1Fb3cdOIanrV1UtO7wIPB2SALWz/JXNOuM68AxPO3swmjZ50Hg7bAk+3IbXcZ1GthnWc/yVzTJ964Dx8AErD90YbR+7DpwDE2kn+Y3urMvxH3wXPLhnV2g7UHg7cCU5jYaUrnXg8DbISlhva8boy92HThWYVKpJnIksv7iOngs+zRpVtUkG5wnwGEISF/tyuTMaG7e5DoBDERAckv3RsN7R3W2ArtPBP3WTuuV6YW43ECXrmbW1T2Z3KlqWRHCXkF0JdL5wjaE2mVPzhNiPwWs6woxOTMaZEVcSKP/ZvTM2NjbJ5oiQZa7XFcP+iaSoUJNPmg2ySbnybEnItnUt11a9YacAyS7nCfJbmU9IJIzTD+x3VyqvYxX9tvGLmYQ2G27la3mVB8wg2SxuVS1TGZ9xrigEvvAeVEkw062KP8FkjwGJAulrWKSBVtQxgfsIuysXU7pTNY520fP+MRYKhcg6SelMZnl6zq3LjE+gtha6dogLEavNxpygvGVJHnj/LCrWL8c2Bi5F+pp60LXZmE3IvnVDlcbjXePNSEQ4HaMvbYvaqHbjAcBkNwRyClihx2y2S6TJkSQ9FlvzSXZBaTrMW1e4/TGowh8Wq8HrHuAZQpYnrOntNJ02LXnuU4T7ZymkM5aM8aoeRWRnAdp67J6IrchyRNI8krWqNuubCX9yj6R78wcdhp1A+m3djsDsGyx70WSWvaAAlsrS9svGlgez191MlWq1sL9xg7u8z4QANJJu+zMdexBYU3LcVFacD4TFiJI8kieC1TSSxeAKpJ1DcvRNAVYtoymzXNdxx0UdmQALB8td/yKJEOlGV4NCmB5cjkT/XbBjX304/UsmM/8Xw8P205ycUw7FMwEja9kd1qk89kNg90vTroZWceQ9U77L0BcxxeJRCKRSCRiKs2f9ZwqOjUm7jAAAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">Messages</div>
                </Link>
                <Link
                  className={`profile-sidebar-link tab-link-main ${isHiredddStatus ? "current" : ""
                    }`}
                  onClick={handleHiredddStatusClick}
                >
                  <div className="profile-sidebar-icon">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        width="32"
                        height="32"
                        fill="url(#pattern0_1320_2030)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1320_2030"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1320_2030"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1320_2030"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACNElEQVR4nO2cMU5jMRCGX8VyBFg4IoFu2Y4TgOSJB0SVbgtbaTnCAhVwFJQ0VEZeFiEiFEiEPX4v3ydNE1no+cvP+EUjuesAAAAAAAAAAKCbTCbbYw1Hzsdb0TgXjWmgNRcNN+LjoXNXP6p+9c5N98WHhwYkpJrlNNznvVdL8iZKlneyKyQ7twvrzYq97FFx0f97ctro8uG6vGiNM/ONqnWi46y4aOtNSiOFaEV0sk4hiVZ7cbQOtZdKj1ZEv6XAxyfR8Gs8/vMzlzuPxy+ffb6+9Mn+pefpS6LzRroF/m1uhfWlWfY8vRF9djndXfwb3oedVdaXZtnz9Eb0Ry3g9CLsrbK+NMuepzeiP2oF4sPvllrHsufpjeh80LjzeLzKYfi6vvReBnUYDrU6REdESwNJJNFqL4/WofZi6dGKaPPUCYmO5qJoHWovkR6t7RQ/WBTRyTqFw040E5Y6opmwVBLNhKWSaCYshq1DmLB8v2gmLGti/VoljdS6/hCtiE7W6SXRimjzxAmJjuaSaB1qL5AerW0Vr3eK6GSdQhKt9uJoHWovtR89mglLHdFMWCqJZsJSSTQTFsPWIUxYvl80E5Y1sX6tkkZqXX+IVkQn6/SSaEW0eeKEREdzSb1oHVzHFrPox/KiuWAwVblgMN86a/1vK9blw0Fx0fkC1HwRqvlm1azuTkLYKi76RfZ0f0Nl3+VLVKpIXkj2KPerIR+QTuPMafyb20W1JAMAAAAAAAAAdG3zDBRCpGkIW31yAAAAAElFTkSuQmCC"
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">Hireddd Status</div>
                </Link>
              </div>
            </div>
            <div className="profile-content-area">
              <div
                className={`tabbed-content-main ${isProfile ? "current" : ""}`}
              >
                <div className="profile-sidebar-sidebar-link">
                  <div className="profile-content-head">
                    <div className="profile-head-left">
                      <div className="profile-head-image">
                        <img
                          src={user.profile ? user.profile.path : dummyProfile}
                          alt="Avatar"
                        />
                      </div>
                      <div className="profile-head-info">
                        <h2 className="profile-head-title">{user.firstName}</h2>
                        <div className="profile-head-subtext">Industry</div>
                        <div className="profile-head-text">{user.location}</div>
                      </div>
                    </div>
                    <div className="profile-head-right">
                      <Link
                        to={user.video ? user.video.path : ""}
                        className="button outline resume-button"
                      >
                        <div className="play-icon">
                          <svg
                            width="20"
                            height="23"
                            viewBox="0 0 20 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M19.2637 11.7633L0.513672 22.5887L0.513672 0.938019L19.2637 11.7633Z"
                              fill="#7B68EE"
                            />
                          </svg>
                        </div>
                        <div className="play-line">
                          <svg
                            width="1"
                            height="31"
                            viewBox="0 0 1 31"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <line
                              x1="0.5"
                              y1="2.18556e-08"
                              x2="0.499999"
                              y2="31"
                              stroke="#7B68EE"
                            />
                          </svg>
                        </div>
                        View resume
                      </Link>
                      <button className="resume-btn fill-btn">
                        Change resume
                      </button>
                    </div>
                  </div>
                  <div className="profile-edit-options">
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">Summary</div>
                      <div className="profile-edit-text">
                        <p>{user.about}</p>
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">Top Skills</div>
                      <div className="profile-edit-tags">
                        {user.skills.map((skill, index) => (
                          <div key={index} className="profile-edit-tag">
                            {skill}
                          </div>
                        ))}
                        {/* <div className="profile-edit-tag">Skill</div> */}
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">Contact Details</div>
                      <div className="profile-edit-text">
                        <p>
                          <strong>Phone</strong>+921234567
                        </p>
                        <p>
                          <strong>Email</strong>
                          {user.username}
                        </p>
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">Portfolio</div>
                      <div className="profile-edit-socials">
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={socialIcon} alt="Icon" />
                        </Link>
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={socialIcon1} alt="Icon" />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">Attach Documents</div>
                      <div className="profile-edit-socials">
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={pdfIcon} alt="Icon " />
                        </Link>
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={pdfIcon} alt="Icon " />
                        </Link>
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={pdfIcon} alt="Icon " />
                        </Link>
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button className="edit-button">
                        <svg
                          width="27"
                          height="27"
                          viewBox="0 0 27 27"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            width="27"
                            height="27"
                            fill="url(#pattern0_1475_1863)"
                          />
                          <defs>
                            <pattern
                              id="pattern0_1475_1863"
                              patternContentUnits="objectBoundingBox"
                              width="1"
                              height="1"
                            >
                              <use
                                href="#image0_1475_1863"
                                transform="scale(0.0111111)"
                              />
                            </pattern>
                            <image
                              id="image0_1475_1863"
                              width="90"
                              height="90"
                              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAACF0lEQVR4nO3cv0rdYBiA8cdBb8YqgpPYoegmXoD34GaRLkK/rVJQcBBHFbVLZzdXR72DQmnr0D9Lx/4BJRChSJRzTpI3PfmeH2Q8mjy8nnw5JxEkSZIkSf+1OeAEuAF+A1+AI+BZ1zvWJy+Bv8BtxfYHWO96B/sgPRL44bbV9Y7mEPnW2HGRjR0Y2diBkY0dGNnYgZHvN5d+QaGLdfb0w1+Wu9RS7MOuDyyX2J+6PqhcYv/q+oByif2564PJJfYxGYZLI7ymTuTiU79ZMpL+OfjI2BtkJFUE2B7yZ7waIfJrMpKeCNFmbCPTfmwj0/5kG5n2YxuZ9mMbmeFWCqMs/YZ9zVhLNS8s6kx2NlKDkY0d/Bmykx0U2diBkbOPnQIjZxs7dRC52FwnY2Qnedwk3y6M3AvJSTZyLyQn2ci9kJxkI/dCcpKN3AtOcgAjBzByACMHMHIAIwcwcoBJYB5YBjbLB2civn5KZG7ByHETXjy26yQH+OEtATE+eN9FjCtPfDEuvIMoxntv04qx4zo5xpIXI/XNDHhV9gJ4C5wB58AlcF2uSJ5a/mV/xXfvTUNBpoGfRq42AXxscPp2neRqzxv+U1/z7aLaQcOPJSzndqf9oB8WfW/4JDbVwn6OvVUfuInxzqebYnzzUbIYNwP+R8O98qstjWj7kbjFCXIfWCzX2appqoxdTPZX4BRYKVcjkiRJkiTG2B2vTLDs0kESkAAAAABJRU5ErkJggg=="
                            />
                          </defs>
                        </svg>
                      </button>
                      <div className="profile-edit-title">LinkedIn</div>
                      <div className="profile-edit-socials">
                        <Link to="#" className="profile-edit-social-icon">
                          <img src={linkedIn} alt="Icon " />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tabbed-content-main ${isMessages ? "current" : ""}`}
              >
                <div className="profile-sidebar-sidebar-link">
                  <div className="user-search messages-search">
                    <form>
                      <input type="search" placeholder="Quick Search" />
                    </form>
                  </div>
                  <div className="messages-row">
                    <Chat
                      userId={user._id}
                      selectChat={setSelectedChat}
                      userType={user.role}
                    />
                    <div className="messages-chats-content">
                      {selectedChat ? (
                        <Message chatId={selectedChat} user={user} />
                      ) : (
                        <div>Select a chat to start messaging</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="shortlisted"
                className={`tabbed-content-main ${isHiredddStatus ? "current" : ""
                  }`}
              >
                <div className="profile-sidebar-sidebar-link">
                  <div className="shortlisted-tabs">
                    <div className="shortlisted-tabs-nav">
                      <ul>
                        <li>
                          <Link
                            className={`tab-link ${isShortlisted ? "current" : ""
                              }`}
                            onClick={handleShortlisted}
                          >
                            Shortlisted
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`tab-link ${isInterviewed ? "current" : ""
                              }`}
                            onClick={handleInterviewed}
                          >
                            Interviewed
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`tab-link ${isAssessment ? "current" : ""
                              }`}
                            onClick={handleAssessment}
                          >
                            Assessment
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`tab-link ${isHired ? "current" : ""}`}
                            onClick={handleHired}
                          >
                            Hired
                          </Link>
                        </li>
                        <li>
                          <Link
                            className={`tab-link ${isRejected ? "current" : ""
                              }`}
                            onClick={handleRejected}
                          >
                            Rejected
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="shortlisted-tabs-content-area">
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${isShortlisted ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link
                                  to="#job-popup"
                                  className="learn-more job-popup"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                            <div
                              id="job-popup"
                              className="job-popup-detail mfp-hide"
                            >
                              <div className="popup-modal-dismiss">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width="40"
                                    height="40"
                                    fill="url(#pattern0_1510_2048)"
                                  />
                                  <defs>
                                    <pattern
                                      id="pattern0_1510_2048"
                                      patternContentUnits="objectBoundingBox"
                                      width="1"
                                      height="1"
                                    >
                                      <use
                                        href="#image0_1510_2048"
                                        transform="scale(0.0111111)"
                                      />
                                    </pattern>
                                    <image
                                      id="image0_1510_2048"
                                      width="90"
                                      height="90"
                                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO2dS28cRRDHWyK8FARHAkECBHyBACdARIiHckDAYUEiRjxipnrsWGAsZE+3o+FG4BRF4mvwyiEIPgAIBYWQCxceQoDjeKpmc4ojJR5Us7ZEHK+zzlZ3z+z2XyrJste93b/trX5V1ygVFRUVFRUVFRUVFRUVNZg6neqmI+nK4xaKQxboU6vxS6PpFwv4mwUko/ESG//Mv6v/1nvNJ/w/Juk+xmUM+HbjpXyyuM/o8n0DeMIAXbCaqiGtazV+vQj0noFirxpnzc7+dbvV9IYB+s4AXhGA28fwstX0bZbSRP7mH7epcVE+tXxHr6fRP+7g9jHA8xbwo/mE7lKjqiSpbjYaPzQa0TvgTcZ1yDTOcZ3UKCnT9JQFOhsa8DXAgX61afGsarvYJ1qNn1mNa6Gh9jdcMxqPz8xUt6o2ah7KB4ymH8KDpEGB/7Qw1X1YtUn8dRSaplWerWt1+YxqgwyUrxhNFxsArboRqxdDCb6mmiyTYuJ2Tkx+YHMbAN9VTdRiWr68vjgIDsoKwc4AX1VNEvs1C7gaGo514UbS4nnVBC3ChUdaOvBVA1rXJt2HgkLmuSdPixoAo3LaswFPBZ1n9xYj4UFYH7A1Hg+3rG70io+EDdeylJ72CjnPq10W8Ez4xpNfAzrrdSOKd+GCN1qHsUUoZr3tJ1vAInSDbbBejQUzcA7apDgfvLE6rPFeto/jp3MSlTV8yJrifD61vIet/gAlFz2Aq5vLrxcgMuX/6/RYjM/4pECYFOc3l280HhCBzZA1Htii/gtyHyQddAaaD1KlKppPLe/Z8j00vjDM7l/9TUnoxa3Kzg6du1uso2g66QhysVdy0yjvA3oY2NtBZuXTK/eKgQa84iSUgeMuxL52uraF7d9vh26kj7u4qkygTLINBuiwPGjAE6KgYQAwg8KWLGtnvfoLUcgcYmUAS+EeXV3vqz6IG5EoYwjQpWj4WR0LJ1xJK9EbA/Xk/9uRtPuoGGijcdIZaH1jvTJkT77K0vJtMdC9qE6HldU7A9cYyL0B8WMx0AbwK9cVtjtwBaHdhbMB0euWKFwfdlMgr9f3tBhoA/int4rrwdxISHexqa6/y4EOEAFqdgg7BOT1eq5Igpba9apcwA4FuTbA1Qhatw90dB3ah+uIg2HlZTCM0zvyM73je3y+/J1p2YLFavxcDnRcgldeluD1LVaHvcK0eFPJQPmWGOi4TUr9QSflPjHQceOf/Gz8s/hudYiBzzb4KEt0INwQXysW9W3ptXEdQ4EZALZoXEfPpsVB947q2x1ukAnGdTCL7dowlDhLQJsDaHLJuA5XATQsTsXgMq7DOA4Jk4zryDS97jTI0QAtyfQI5K3XBZOcv4et9p/CQY6by5fa7uUUGM5zf4xzELrdsAQ/UK41N7G0m7cGgzdWj3ggOosDsYM3WIcxnuYqn5eFjMafx683k9/LQiyb0JPx+psn8SXH4L1M+zGj8ZgKJb62y9d3Rx4y0I95p7pFhRRfSO9lbhlVyFjayfJB1QRZKPe3OeuM7QdZ46UMiudUk2SAXhq1xCg2xY5qojg9ziik+rEaL3NMuGqyOOVPq90I4GrjUvxsm/qnhQOk4YEPyv2qTbJTdL8F+r5FkE8FT+kz1Dy7XtRg01NmHgs+TxZbrkMDE6kAnskAn1CjpDyvdnFSkSZssXIdeBeO66RGVXMTS7vXT9T/9g4YcJkTdeczxZ1qXJRzymOggxboG7cLHZ4T00k+4xur1PNbqT7XAzrMV8nqp1EM73upLkvTtLOQgLarw/fOk3Kf0cU7FugoRwNxDHLvUSCIG48HqW8h9B4Zcrr3GjrKt1j5f+PjQaKioqKioqKioqKiotTg+g/jhnWGqOgW+gAAAABJRU5ErkJggg=="
                                    />
                                  </defs>
                                </svg>
                              </div>
                              <h2 className="job-popup-title">Job Details</h2>
                              <h3>About this job</h3>
                              <p>
                                Experienced UI/UX designer specializing in
                                crafting intuitive and visually appealing
                                interfaces. Skilled in user research,
                                prototyping, and usability testing to ensure
                                optimal user experiences. Passionate about
                                advocating for user-centric design principles to
                                drive business success.
                              </p>
                              <h3>Responsibilities</h3>
                              <ul>
                                <li>
                                  Experienced UI/UX designer specializing in
                                  crafting intuitive.
                                </li>
                                <li>
                                  Experienced UI/UX designer specializing in
                                  crafting intuitive.
                                </li>
                                <li>
                                  Experienced UI/UX designer specializing in
                                  crafting intuitive.
                                </li>
                                <li>
                                  Experienced UI/UX designer specializing in
                                  crafting intuitive.
                                </li>
                              </ul>
                              <div className="s-20"></div>
                              <h3>Skills required</h3>
                              <div className="profile-edit-tags">
                                <div className="profile-edit-tag">
                                  User research
                                </div>
                                <div className="profile-edit-tag">
                                  User research
                                </div>
                                <div className="profile-edit-tag">
                                  User research
                                </div>
                                <div className="profile-edit-tag">
                                  User research
                                </div>
                              </div>
                              <div className="s-20"></div>

                              <h3>Location</h3>
                              <p>Model Town, Lahore</p>
                              <h3>Company size</h3>
                              <p>100-150</p>
                              <h3>Salary</h3>
                              <p>PKR 150,000 to PKR 20,0000</p>
                              <h3>Job type</h3>
                              <p>Permanent</p>

                              <div className="popup-button">
                                <Link to="#" className="button">
                                  Message
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#job-popup" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
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
                              ></path>
                            </svg>
                          </button>
                          <div
                            className="slides-numbers"
                            style={{ display: "block" }}
                          >
                            <span className="active">01</span> of{" "}
                            <span className="total">10</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${isInterviewed ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
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
                              ></path>
                            </svg>
                          </button>
                          <div
                            className="slides-numbers"
                            style={{ display: "block" }}
                          >
                            <span className="active">01</span> of{" "}
                            <span className="total">10</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${isAssessment ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
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
                              ></path>
                            </svg>
                          </button>
                          <div
                            className="slides-numbers"
                            style={{ display: "block" }}
                          >
                            <span className="active">01</span> of{" "}
                            <span className="total">10</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${isHired ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
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
                              ></path>
                            </svg>
                          </button>
                          <div
                            className="slides-numbers"
                            style={{ display: "block" }}
                          >
                            <span className="active">01</span> of{" "}
                            <span className="total">10</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${isRejected ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link
                                  href="#job-popup-feedback"
                                  className="learn-more job-popup"
                                >
                                  View
                                </Link>
                              </div>
                            </div>
                            <div
                              id="job-popup-feedback"
                              className="job-popup-detail job-popup-small mfp-hide"
                            >
                              <div className="popup-modal-dismiss">
                                <svg
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    width="40"
                                    height="40"
                                    fill="url(#pattern0_1510_2048)"
                                  />
                                  <defs>
                                    <pattern
                                      id="pattern0_1510_2048"
                                      patternContentUnits="objectBoundingBox"
                                      width="1"
                                      height="1"
                                    >
                                      <use
                                        href="#image0_1510_2048"
                                        transform="scale(0.0111111)"
                                      />
                                    </pattern>
                                    <image
                                      id="image0_1510_2048"
                                      width="90"
                                      height="90"
                                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFdElEQVR4nO2dS28cRRDHWyK8FARHAkECBHyBACdARIiHckDAYUEiRjxipnrsWGAsZE+3o+FG4BRF4mvwyiEIPgAIBYWQCxceQoDjeKpmc4ojJR5Us7ZEHK+zzlZ3z+z2XyrJste93b/trX5V1ygVFRUVFRUVFRUVFRUVNZg6neqmI+nK4xaKQxboU6vxS6PpFwv4mwUko/ESG//Mv6v/1nvNJ/w/Juk+xmUM+HbjpXyyuM/o8n0DeMIAXbCaqiGtazV+vQj0noFirxpnzc7+dbvV9IYB+s4AXhGA28fwstX0bZbSRP7mH7epcVE+tXxHr6fRP+7g9jHA8xbwo/mE7lKjqiSpbjYaPzQa0TvgTcZ1yDTOcZ3UKCnT9JQFOhsa8DXAgX61afGsarvYJ1qNn1mNa6Gh9jdcMxqPz8xUt6o2ah7KB4ymH8KDpEGB/7Qw1X1YtUn8dRSaplWerWt1+YxqgwyUrxhNFxsArboRqxdDCb6mmiyTYuJ2Tkx+YHMbAN9VTdRiWr68vjgIDsoKwc4AX1VNEvs1C7gaGo514UbS4nnVBC3ChUdaOvBVA1rXJt2HgkLmuSdPixoAo3LaswFPBZ1n9xYj4UFYH7A1Hg+3rG70io+EDdeylJ72CjnPq10W8Ez4xpNfAzrrdSOKd+GCN1qHsUUoZr3tJ1vAInSDbbBejQUzcA7apDgfvLE6rPFeto/jp3MSlTV8yJrifD61vIet/gAlFz2Aq5vLrxcgMuX/6/RYjM/4pECYFOc3l280HhCBzZA1Htii/gtyHyQddAaaD1KlKppPLe/Z8j00vjDM7l/9TUnoxa3Kzg6du1uso2g66QhysVdy0yjvA3oY2NtBZuXTK/eKgQa84iSUgeMuxL52uraF7d9vh26kj7u4qkygTLINBuiwPGjAE6KgYQAwg8KWLGtnvfoLUcgcYmUAS+EeXV3vqz6IG5EoYwjQpWj4WR0LJ1xJK9EbA/Xk/9uRtPuoGGijcdIZaH1jvTJkT77K0vJtMdC9qE6HldU7A9cYyL0B8WMx0AbwK9cVtjtwBaHdhbMB0euWKFwfdlMgr9f3tBhoA/int4rrwdxISHexqa6/y4EOEAFqdgg7BOT1eq5Igpba9apcwA4FuTbA1Qhatw90dB3ah+uIg2HlZTCM0zvyM73je3y+/J1p2YLFavxcDnRcgldeluD1LVaHvcK0eFPJQPmWGOi4TUr9QSflPjHQceOf/Gz8s/hudYiBzzb4KEt0INwQXysW9W3ptXEdQ4EZALZoXEfPpsVB947q2x1ukAnGdTCL7dowlDhLQJsDaHLJuA5XATQsTsXgMq7DOA4Jk4zryDS97jTI0QAtyfQI5K3XBZOcv4et9p/CQY6by5fa7uUUGM5zf4xzELrdsAQ/UK41N7G0m7cGgzdWj3ggOosDsYM3WIcxnuYqn5eFjMafx683k9/LQiyb0JPx+psn8SXH4L1M+zGj8ZgKJb62y9d3Rx4y0I95p7pFhRRfSO9lbhlVyFjayfJB1QRZKPe3OeuM7QdZ46UMiudUk2SAXhq1xCg2xY5qojg9ziik+rEaL3NMuGqyOOVPq90I4GrjUvxsm/qnhQOk4YEPyv2qTbJTdL8F+r5FkE8FT+kz1Dy7XtRg01NmHgs+TxZbrkMDE6kAnskAn1CjpDyvdnFSkSZssXIdeBeO66RGVXMTS7vXT9T/9g4YcJkTdeczxZ1qXJRzymOggxboG7cLHZ4T00k+4xur1PNbqT7XAzrMV8nqp1EM73upLkvTtLOQgLarw/fOk3Kf0cU7FugoRwNxDHLvUSCIG48HqW8h9B4Zcrr3GjrKt1j5f+PjQaKioqKioqKioqKiotTg+g/jhnWGqOgW+gAAAABJRU5ErkJggg=="
                                    />
                                  </defs>
                                </svg>
                              </div>
                              <h2 className="job-popup-title">
                                Employeer Feedback
                              </h2>
                              <div className="feedback-text-box">
                                <p>
                                  <strong>Hi Tabish,</strong>
                                  After careful consideration, we have decided
                                  to move forward with another candidate for
                                  this role. This decision was not easy, as we
                                  were impressed by your qualifications and the
                                  experiences you bring to the table. We will
                                  keep your resume on file for future
                                  opportunities that may better match your
                                  skills and experience. We encourage you to
                                  apply for other positions with us that you
                                  find suitable. Thank you again for your
                                  interest in [Company Name], and we wish you
                                  the best of luck in your job search and future
                                  career endeavors.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="single-shortlist-column">
                            <div className="profile-head-left">
                              <div className="profile-head-image">
                                <img src={companyLogo} alt="Avatar" />
                              </div>
                              <div className="profile-head-info">
                                <h2 className="profile-head-title">
                                  UI UX Designer
                                </h2>
                                <div className="profile-head-subtext">
                                  Company Name
                                </div>
                                <div className="profile-head-text">
                                  Pakistan remote
                                </div>
                                <Link to="#" className="learn-more">
                                  View
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
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
                              ></path>
                            </svg>
                          </button>
                          <div
                            className="slides-numbers"
                            style={{ display: "block" }}
                          >
                            <span className="active">01</span> of{" "}
                            <span className="total">10</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
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
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
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
