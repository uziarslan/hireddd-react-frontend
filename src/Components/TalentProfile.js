import React, { useState, useRef, useEffect, useContext } from "react";
import "../Assets/Css/styles.min.css";
import { Link, useNavigate } from "react-router-dom";
import Flash from "./Flash";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import axiosInstance from "../services/axiosInstance";
import Loading from "./Loading";
import { AuthContext } from "../Context/AuthContext";

export default function TalentProfile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  const [preview, setPreview] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [about, setAbout] = useState("");
  const [message, setMessage] = useState("");
  const [isProfile, setIsProfile] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setProfile(user.profile ? user.profile.path : dummyProfile);
      setLocation(user.location);
      setSkill(user.skills.join(", "));
      setAbout(user.about);
      if (user.video && user.video.path) {
        setMediaBlobUrl(user.video.path);
      }
    }
    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (videoRef.current && mediaBlobUrl) {
      videoRef.current.src = mediaBlobUrl;
    }
  }, [mediaBlobUrl]);

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("location", location);
    formData.append("skills", skill);
    formData.append("about", about);

    if (profile) {
      formData.append("profile", profile);
    }

    if (mediaBlobUrl) {
      const response = await fetch(mediaBlobUrl);
      const blob = await response.blob();
      formData.append("video", blob, "recorded-video.webm");
    }

    try {
      const { data, status } = await axiosInstance.post(
        "/talent/profile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (status === 200) {
        setMessage(data);
        navigate("/talent/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setMessage(error.response.data);
      }
    }
    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleOutsideClick = (event) => {
    if (event.target.classList.contains("mfp-content")) {
      setUploadPopup(false);
    }
  };

  const startRecording = async () => {
    try {
      setIsRecording(true);
      setMediaBlobUrl("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      } else {
        console.error(
          "videoRef.current is null. The video element might not be rendered."
        );
      }
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        setMediaBlobUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorderRef.current.start();
    } catch (err) {
      console.error("Error accessing media devices.", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <DashNav preview={preview} firstName={firstName} profile={profile} />
      <Loading isLoading={isLoading} />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1240">
          <div className="profile-form-row">
            <div className="profile-form-left">
              <div className="profile-form-image">
                <input
                  type="file"
                  accept=".jpg, .png, .jpeg"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <img
                  src={preview || profile || dummyProfile}
                  alt="User avatar"
                />
                <button
                  className="upload-profile-image"
                  onClick={handleButtonClick}
                >
                  <svg
                    width="18"
                    height="15"
                    viewBox="0 0 18 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.25 2.375H13.0844L12.0195 0.778125C11.9625 0.692618 11.8852 0.622502 11.7946 0.573989C11.704 0.525475 11.6028 0.500062 11.5 0.5H6.5C6.39721 0.500062 6.29602 0.525475 6.2054 0.573989C6.11478 0.622502 6.03752 0.692618 5.98047 0.778125L4.91484 2.375H2.75C2.25272 2.375 1.77581 2.57254 1.42417 2.92417C1.07254 3.27581 0.875 3.75272 0.875 4.25V13C0.875 13.4973 1.07254 13.9742 1.42417 14.3258C1.77581 14.6775 2.25272 14.875 2.75 14.875H15.25C15.7473 14.875 16.2242 14.6775 16.5758 14.3258C16.9275 13.9742 17.125 13.4973 17.125 13V4.25C17.125 3.75272 16.9275 3.27581 16.5758 2.92417C16.2242 2.57254 15.7473 2.375 15.25 2.375ZM15.875 13C15.875 13.1658 15.8092 13.3247 15.6919 13.4419C15.5747 13.5592 15.4158 13.625 15.25 13.625H2.75C2.58424 13.625 2.42527 13.5592 2.30806 13.4419C2.19085 13.3247 2.125 13.1658 2.125 13V4.25C2.125 4.08424 2.19085 3.92527 2.30806 3.80806C2.42527 3.69085 2.58424 3.625 2.75 3.625H5.25C5.35292 3.62507 5.45427 3.59971 5.54504 3.5512C5.63581 3.50268 5.71319 3.43249 5.77031 3.34688L6.83437 1.75H11.1648L12.2297 3.34688C12.2868 3.43249 12.3642 3.50268 12.455 3.5512C12.5457 3.59971 12.6471 3.62507 12.75 3.625H15.25C15.4158 3.625 15.5747 3.69085 15.6919 3.80806C15.8092 3.92527 15.875 4.08424 15.875 4.25V13ZM12.125 8.625C12.125 8.79076 12.0592 8.94973 11.9419 9.06694C11.8247 9.18415 11.6658 9.25 11.5 9.25H9.625V11.125C9.625 11.2908 9.55915 11.4497 9.44194 11.5669C9.32473 11.6842 9.16576 11.75 9 11.75C8.83424 11.75 8.67527 11.6842 8.55806 11.5669C8.44085 11.4497 8.375 11.2908 8.375 11.125V9.25H6.5C6.33424 9.25 6.17527 9.18415 6.05806 9.06694C5.94085 8.94973 5.875 8.79076 5.875 8.625C5.875 8.45924 5.94085 8.30027 6.05806 8.18306C6.17527 8.06585 6.33424 8 6.5 8H8.375V6.125C8.375 5.95924 8.44085 5.80027 8.55806 5.68306C8.67527 5.56585 8.83424 5.5 9 5.5C9.16576 5.5 9.32473 5.56585 9.44194 5.68306C9.55915 5.80027 9.625 5.95924 9.625 6.125V8H11.5C11.6658 8 11.8247 8.06585 11.9419 8.18306C12.0592 8.30027 12.125 8.45924 12.125 8.625Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </div>
              <div className="profile-sidebar-links">
                <Link
                  className={`profile-sidebar-link profile-tab-link ${
                    isProfile ? "current" : ""
                  }`}
                  onClick={() => setIsProfile(true)}
                >
                  <div className="profile-sidebar-title">Profile</div>
                </Link>
                <Link
                  className={`profile-sidebar-link profile-tab-link ${
                    !isProfile ? "current" : ""
                  }`}
                  onClick={() => setIsProfile(false)}
                >
                  <div className="profile-sidebar-title">Record video</div>
                </Link>
              </div>
            </div>
            <div className="profile-form-right">
              <div
                id="profile-form"
                className={`profile-form profile-tabbed-content ${
                  isProfile ? "current" : ""
                }`}
              >
                <form onSubmit={handleSubmit}>
                  <div className="input-set">
                    <label htmlFor="firstname">First name</label>
                    <input
                      name="firstName"
                      id="firstname"
                      type="text"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="lastname">Last name</label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      name="lastName"
                      id="lastname"
                      type="text"
                      placeholder="Last name"
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="location">Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      name="location"
                      id="location"
                      type="text"
                      placeholder="Location"
                    />
                  </div>
                  <div className="input-set">
                    <label htmlFor="skill">Skill</label>
                    <input
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      name="skills"
                      id="skill"
                      type="text"
                      placeholder="Designer, Developer, Editor"
                    />
                  </div>
                  <div className="input-set input-set-full">
                    <label htmlFor="about">About</label>
                    <textarea
                      name="about"
                      value={about}
                      id="about"
                      placeholder="Add bio here"
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="input-set input-set-full">
                    <input type="submit" value="Create profile" />
                  </div>
                </form>
              </div>
              <div
                id="record-video"
                className={`profile-viode profile-tabbed-content ${
                  !isProfile ? "current" : ""
                }`}
              >
                <div className="profile-record-video">
                  <h2 className="text-24 font-med">Record Video</h2>
                  <div className="record-video-upload-area">
                    {isRecording ? (
                      <video
                        className="record-video-upload-area"
                        ref={videoRef}
                        autoPlay
                        muted
                      />
                    ) : (
                      mediaBlobUrl && (
                        <video
                          className="record-video-upload-area"
                          src={mediaBlobUrl}
                          controls
                          loop
                        />
                      )
                    )}
                  </div>
                  <div className="record-video-buttons">
                    <div className="record-time">Record time 00:00</div>
                    <div className="record-video-buttons-inner">
                      <Link
                        className="button job-popup outline"
                        onClick={() => setUploadPopup(true)}
                      >
                        Upload Resume
                      </Link>
                      <button
                        className="button-fill"
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </button>
                    </div>
                  </div>
                </div>
                {uploadPopup && (
                  <>
                    <div className="mfp-bg mfp-ready"></div>
                    <div
                      className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
                      tabIndex="-1"
                      style={{ overflow: "hidden auto" }}
                    >
                      <div
                        onClick={handleOutsideClick}
                        className="mfp-container mfp-inline-holder"
                      >
                        <div className="mfp-content">
                          <div
                            id="file-upload"
                            className="job-popup-detail file-upload"
                          >
                            <div className="file-upload-content-inner">
                              <p className="file-upload-top-text">
                                Drag and drop or
                              </p>
                              <button className="upload-button">
                                Upload video
                              </button>
                              <div className="upload-instructions">
                                <ul>
                                  <li>
                                    Be concise: Keep your introduction under 60
                                    seconds, focusing on key points.
                                  </li>
                                  <li>
                                    Prepare: Have a brief introduction,
                                    highlighting your skills and experiences.
                                  </li>
                                  <li>
                                    Speak clearly: Project your voice and
                                    articulate your words clearly.
                                  </li>
                                  <li>
                                    Start strong: Begin with your name and a
                                    brief overview of your background.
                                  </li>
                                  <li>
                                    Eye contact: Maintain eye contact to convey
                                    confidence and engagement.
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <button
                              title="Close (Esc)"
                              type="button"
                              className="mfp-close"
                            ></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Flash message={message} />
      </main>
    </>
  );
}
