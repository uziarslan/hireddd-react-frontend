import React, { useState, useContext, useEffect } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
//import socialIcon from "../Assets/images/profile-social-icon-01.svg";
//import socialIcon1 from "../Assets/images/profile-social-icon-02.svg";
import pdfIcon from "../Assets/images/pdf-icon.svg";
import linkedIn from "../Assets/images/profile-social-icon-03.svg";

// import svgs
import { mailSVG, magSVG, closeSVG, bookmarkSVG } from "../Assets/vectors/ButtonVectors";

// import companyLogo from "../Assets/images/uploads/shortlisted-image.jpg";
import Chat from "./Chat";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
// import { JobContext } from "../Context/JobContext";
import jobService from "../services/jobService";
import Loading from "./Loading";

import SocialMedia from "./modals/SocialMedia"; //-Lucas
//const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

import DocumentUploadModal from "./DocumentUploadModal"; // -Dylan
import JobDetails from "./modals/JobDetails"; // - EGBAIYELO
import { useNavigate } from "react-router-dom";



export default function TalentDash() {

  const { user, updateUser } = useContext(AuthContext);
  const [tabName, setTabName] = useState("profile");
  const [subTabName, setSubTabName] = useState("shortlisted");
  const [isEditing, setIsEditing] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  // -- RAUNAK
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false);
  const [portfolios, setPortfolios] = useState([]);
  const [newLink, setNewLink] = useState({ icon: "", href: "" });
  // const [loading, setLoading] = useState(true);
  const [tempPortfolios, setTempPortfolios] = useState([]);
  const handleEditPortfolio = () => {
    // Make a copy of current portfolios for editing
    setTempPortfolios([...portfolios]);
    setIsEditingPortfolio(true);
  };
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false); // Added social media modal state

  // -- MONTE
  const [about, setAbout] = useState("");
  const [skillsString, setSkills] = useState(""); // Not to be confused with the skills array
  // -- Jobs
  const [userJobs, setUserJobs] = useState([]);
  const [currentJobPage, setCurrentJobPage] = useState(1);
  const [jobsPerPage] = useState(9);
  const [currentJobs, setCurrentJobs] = useState([]);
  const [pageNumbers, setPageNumbers] = useState(1);

  // -- Ayushi
  const [showResumeModal, setShowResumeModal] = useState(false);
  const openResumeModal = (e) => {
    e.preventDefault();
    setShowResumeModal(true);
  };
  const closeResumeModal = () => {
    setShowResumeModal(false);
  };

  // -- Egbaiyelo
  const [showJobDetails, setShowJobDetails] = useState(false);
  const [jobDetailId, setJobDetailId] = useState("");

  const [fetched, setFetched] = useState(false);



  const navigate = useNavigate();

  // -- DYLAN
  const [uploadStatus, setUploadStatus] = useState(""); //video upload status
  const [documents, setDocuments] = useState([]); //initialize documents to an empty array to wait for user to load
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  const [isEditingContact, setIsEditingContact] = useState(false); // toggles contact editing mode
  const [contactDetails, setContactDetails] = useState({
    phone: "",
    email: "",
  }); // Initialize contact details to empty strings

  //update user data once user is loaded


  //This Use Effect ensures that all user data is fetched on page load - fixes bug after registration - Dylan
  useEffect(() => {
    if (!user || user.fetched) return; // Prevents infinite loop
    console.log(user);
    async function fetchUserData() {
      try {
        if (!user.about || !user.phone || !user.skills || user.skills.length === 0) {
          const response = await fetch(`http://localhost:4000/api/v1/talent/get-data/${user._id}`);

          console.log(response);

          const fullUserData = await response.json();
          updateUser({ ...fullUserData, fetched: true }); // Mark user as fetched


          // if (!response.ok) {
          //   throw new Error(`HTTP error! Status: ${response.status}`);
          // }
        }
        // setHasFetched(true);

      } catch (error) {
        console.error("Error fetching full user data:", error);
      }
    }

    fetchUserData();
  }, [user, updateUser]);



  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setAbout(user.about); // Skills in db is list but here is string - Monte
      setSkills(user.skills.join(", "));

      if (user.documents) {
        setDocuments(user.documents);
      }
      if (user.phone && user.username) {
        setContactDetails({
          phone: user.phone || "",
          email: user.username || "",
        });
      }

      // - MONTE
      const getJobs = async () => {
        const jobs = await jobService.getJobsForTalent(user._id);

        // console.log("here are jobs", jobs);

        const updatedJobs = Array.isArray(jobs) ? jobs.map((job) => {
          return {
            key: job.jobId._id,
            status: job.status,
            ...job.jobId,
          };
        }) : [];

        await setUserJobs(updatedJobs);
        return updatedJobs; // Return the updated array with status and job details
      };
      getJobs();
    }

    //==== Redirect users
    if (user?.role && user.role !== "talent") {
      navigate("/");
    }
    // Set the portfolio if available
    if (user && user.portfolios) {
      setPortfolios(user.portfolios || ""); // Assuming user.portfolios is an array of objects containing 'icon' and 'href'
    }

    setIsLoading(false);
  }, [user, navigate]);

  useEffect(() => {
    if (userJobs.length > 0) {

      // - MONTE
      const handleJobSplice = async () => {
        // userJobs.length === 0
        // Job align
        // console.log("these are the jobs i got", userJobs);
        const totalPages = Math.ceil(userJobs.length / jobsPerPage);
        setPageNumbers(totalPages);

        const indexOfLastJob = currentJobPage * jobsPerPage;
        const indexOfFirstJob = indexOfLastJob - jobsPerPage;
        const currentJobs = userJobs.slice(indexOfFirstJob, indexOfLastJob);
        setCurrentJobs(currentJobs);
      };
      handleJobSplice();
    }
  }, [userJobs, currentJobPage, jobsPerPage]);

  if (isLoading || !user || !user.about) {
    return <Loading isLoading={true} />;  // Show loading spinner
  }
  //method for uploading resume
  const handleUploadResume = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "video/mp4,video/avi,video/mov,video/mkv,video/webm"; // Accept only videos

    input.onchange = async (e) => {
      const file = e.target.files[0];

      if (file) {
        setUploadStatus("Uploading... ⏳");

        const formData = new FormData();
        formData.append("video", file);

        try {
          const response = await fetch(
            `http://localhost:4000/api/v1/talent/upload-resume/${user._id}`,
            {
              method: "PUT",
              body: formData,
            }
          );

          const result = await response.json();

          if (!response.ok) {
            throw new Error(result.error || "Failed to upload resume video.");
          }

          setUploadStatus("Upload Successful! ✅");

          // Update the user state to reflect the new resume video
          updateUser({ video: { path: result.videoUrl } });

          setTimeout(() => setUploadStatus(""), 3000);
        } catch (error) {
          console.error("Error uploading resume video:", error);
          setUploadStatus("Upload Failed ❌");
        }
      }
    };

    input.click();
  };

  // RAUNAK
  const handleSavePortfolio = async () => {
    try {
      const token = localStorage.getItem("token");

      // Make API call with tempPortfolios (the edited data)
      const response = await fetch(
        `http://localhost:4000/api/v1/talent/edit-portfolio/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ portfolios: tempPortfolios }),
        }
      );

      const result = await response.json();
      if (result.success) {
        // alert("Portfolio section updated successfully!");

        // Update the real portfolios state with tempPortfolios
        setPortfolios(tempPortfolios);

        // Close the edit popup
        setIsEditingPortfolio(false);
      } else {
        console.error("Failed to update portfolio:", result.message);

        alert("Failed to update portfolio.");
      }
    } catch (error) {
      console.error("Error updating Portfolio section:", error);
      alert("An error occurred while updating the Portfolio section.");
    }
  };

  // Called when user clicks "Cancel"
  const handleCancel = () => {
    // Simply close the popup - do NOT update portfolios
    setIsEditingPortfolio(false);
  };


  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profile", file); // "profile" must match Multer's `upload.single("profile")`

    try {
      const response = await fetch(`http://localhost:4000/api/v1/talent/update-profile/${user._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure user is authenticated
        },
        body: formData,
      });

      const result = await response.json();
      console.log("Response:", result); // Debugging

      if (response.ok) {
        alert("Profile picture updated successfully!");
        updateUser({ profile: { path: result.profileUrl } });
      } else {
        alert(`Failed: ${result.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      alert("An error occurred.");
    }
  };




  //method for deleting docs on profile -- DYLAN
  const handleDeleteDocument = async (docId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/talent/delete-document/${user._id}/${docId}`,
        { method: "DELETE" }
      );

      const result = await response.json();

      if (result.success) {
        alert("Document deleted successfully!");
        // Update the documents array in state
        setDocuments((prevDocuments) =>
          prevDocuments.filter((doc) => doc._id !== docId)
        );
      } else {
        alert("Failed to delete the document. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      alert("An error occurred while deleting the document.");
    }
  };

  //method for uploading docs on profile -DYLAN
  const handleUploadDocument = async (certificateName, file) => {
    if (!file) {
      alert("No file selected.");
      return;
    }
    // limit user to 3 uploaded documents
    if (documents.length >= 3) {
      alert("Maximum of 3 documents allowed.");
      return;
    }

    // Read the file as a Base64 string
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64File = event.target.result;
      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/talent/upload-document/${user._id}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              document: base64File,
              fileName: certificateName || file.name,
            }),
          }
        );

        const result = await response.json();

        if (!response.ok) {
          console.error("Upload Error:", result);
          throw new Error(
            result.error || result.message || "Failed to upload the document."
          );
        }

        alert("Document uploaded successfully!");

        // Add the new document to the state
        setDocuments(result.talent.documents);
      } catch (error) {
        console.error("Error uploading document:", error);
        alert(error.message);
      }
    };

    reader.readAsDataURL(file);
  };


  // Editing contact details
  const handleSaveContactDetails = async () => {
    // Basic regex patterns for validation
    console.log("handleSaveContactDetails called");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^\d{3} \d{3} \d{4}$/; // Ensures format like "123 456 7890"

    // Validate email (always required)
    if (!emailRegex.test(contactDetails.email)) {
      alert("Please enter a valid email address.");
      console.log("email fail");
      console.log("email is:", contactDetails.email);
      return;
    }

    // Validate phone only if a number is provided
    if (contactDetails.phone && !phoneRegex.test(contactDetails.phone)) {
      alert("Please enter a valid phone number in the format XXX XXX XXXX.");
      console.log("phone fail");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/talent/update-contact-details/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: contactDetails.phone || "", // Send empty string if no phone
            email: contactDetails.email, // Email is required
          }),
        }
      );
      const result = await response.json();

      if (result.success) {
        alert("Contact details updated successfully!");
        updateUser({
          ...user,
          phone: result.talent.phone,
          username: result.talent.username,
        });
        setIsEditingContact(false); // Exit editing mode
      } else {
        alert("Failed to update contact details. Please try again.");
      }
    } catch (error) {
      console.error("Error updating contact details:", error);
      alert("An error occurred while updating contact details.");
    }
  };


  // Handling the sumamry and the skills -- MONTE
  // Handling the Summaries
  const handleSaveAbout = async () => {
    if (!about.trim()) {
      // Just to remove spaces before null checking
      alert("About section cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/edit-profile/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: about,
            userType: "talent",
            dataField: "about",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("About section updated successfully!");

        setAbout(result.user.about); // Update the state with new about (using backend filtered text)
        updateUser({ about: result.user.about }); // Update the user state
        setIsEditing(""); // Exiting edit mode
      } else {
        alert("Failed to update the About section. Please try again.");
      }
    } catch (error) {
      console.error("Error updating About section:", error);
      alert("An error occurred while updating the About section.");
    }
  };

  // Handling the skills
  const handleSaveSkills = async () => {
    if (!skillsString.trim()) {
      alert("Skills section cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/talent/edit-skills/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rawSkills: skillsString }), // Skills are sent as a string
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Skills section updated successfully!");

        setSkills(result.talent.skills.join(", ")); // Updating the skills form the backend (using backend filters)
        updateUser({ skills: result.talent.skills }); // Update the user state
        setIsEditing(""); // Exit edit mode
      } else {
        alert("Failed to update the Skills section. Please try again.");
      }
    } catch (error) {
      console.error("Error updating Skills section:", error);
      alert("An error occurred while updating the Skills section.");
    }
  };

  // formerly isLoading && !user
  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <>
      <DashNav
        profile={user?.profile?.path || dummyProfile}
        firstName={user?.firstName || dummyProfile}
        toggleLoading={setIsLoading}
      />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1230">
          <div className="profile-body-row">
            <div className="profile-sidebar-area">
              <div className="profile-sidebar-links">
                {/* <Link to="#" className="profile-sidebar-link tab-link-main">
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
                </Link> */}
                <Link
                  className={`profile-sidebar-link tab-link-main ${tabName === "profile" ? "current" : ""
                    }`}
                  onClick={() => setTabName("profile")}
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
                  data-testid="messages-tab"
                  className={`profile-sidebar-link tab-link-main ${tabName === "messages" ? "current" : ""
                    }`}
                  onClick={() => setTabName("messages")}
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
                  data-testid="status-tab"
                  className={`profile-sidebar-link tab-link-main ${tabName === "hiredddStatus" ? "current" : ""
                    }`}
                  onClick={() => setTabName("hiredddStatus")}
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
                <Link
                  data-testid="settings-tab"
                  to="/talent/settings"
                  className={`profile-sidebar-link tab-link-main ${tabName === "settings" ? "current" : ""
                    }`}
                  onClick={() => setTabName("settings")}
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
                        fill="url(#pattern0_1516_2788)"
                      />
                      <defs>
                        <pattern
                          id="pattern0_1516_2788"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1"
                        >
                          <use
                            href="#image0_1516_2788"
                            transform="scale(0.0111111)"
                          />
                        </pattern>
                        <image
                          id="image0_1516_2788"
                          width="90"
                          height="90"
                          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFA0lEQVR4nO2dTYgcVRCAn4K/0YOe/EEhJxX/QdSLv6gX9eBFPMgeJLoqGC9qPKgLopiwjjNVXdXLkOBA1CxW7YIIivhziGiMEoPByxrJwZ8swRgTknXNuoSRmh0libOzs7Pd/bqn3wd12e3trvp48/rte2+6nQsEAoFAIBAIBAKBwInU6/XTEGU1sNyGLENI+iKwAJC8hSwfIMlXSDqFJHuA9A8LZJ1B1mY7Zv77OckeOxZYt9nf2jnsXHZOO3frGiir7ZpuEKlslPMx1luQZBhINyDrOLB8gaS/Iuux46RlFcfs2pYDsGxp5UQybDlari7vVCpyFsSTN0esjwNrBKSfIes+DyKbK4x9lrvVYLVUSW+y2rzKbTQaZwLLU0D6NbLM50BSM52QeST5JmJ52mrOVHJlTC5Gkl3+JWi2QbLLas9EMsCHZwDLd96LZj9htZuD1EXbR8h3seg7SNemLtr6K++Fsu+Q7amLBpI//ReqvmMmddE5KLKZhwiiOYhu+m6FoUVzdwnA+jFEsqYay2Wjo5tXWSBOXI6kjwLJJ0H0ClsRsP5QpYlbl7xB26QRye7QorkfybI1jt85r9ebjk0KAcnnoevg5bXk5Ug+QTbrj6GP5l5FT9zR7/BpYX473Aybvdz43ApBlk/DqIOXEB3Jmk7yRkROb0/UTwPrXiRZbz/r2KpjeSyI5u6ibQjXsZWSrO/Q+l/reKwN/cI4WruKJpJzFhE9/b/jSaY7HWvnCKK5u+jF+91kjk8qXNr4KgCD6CA6FUKL1tB1HE/oozn00T2R2B4O0jlkeS6KtlzkUsauAbGuW7hmEvcUmU87Z3fS/re+A2Jd5zKmJTuJ3FmPpJ4skh5IItkog5Z8MnbNhD6N+1NPNqlpSOeJhERPpZ5oazdoyUUDy9YsEtWyi0aWd9NPtMMsWtlEA8urqScKpI+UXTSyDKWf6JjcWHbRUaQ3pJ6obVlFlqNlFQ2kfy22spNCsrK9tKJZt2WWLLC8XF7Rkv6N8F+sjyqr6GoPO6cSo9lsntL+Clu5RJMeyPy7ikAyVjrRrBszTxhY7ymd6HjirswTbncfU6URTbJ7ZGTkVD9Jk64tjWiWJ33l7DZseu9cID1UlPnoin0RtT/JBxfb2JMZSFopygoLkjzfV66srzvftFvJ8pe3SOdMdt7XDG3ZysenryPA8lL/fZ/mO0hecHnBHrWApD95l8JJh/xSr79/tssTyPqwfzGaaNQiecjlDRtX225933IwoQCWj6wml0daNx2W331LwpUG6f436pMXujxTi+SBwrdm0gddEQDWRoElv+mKgj17qPU4tRyIw+UE6Y7cjTKWgkguANKfC9OSWfdm9rykpIFYr09qUySmK/kI4uS1rsjYHC6yzvqW2SVmMZY73SAQRXK3LdPnQGqnPdr3ukEiivS+JPaDJBdy1HJyg0gU6e39zl8n25LlsC3FuUGGSK/0Ohohma6SXOfKQK0ulwLLtx765B3M45e4MtGwh8iSbspQ9NuF+2ckSYDkiZSHf7P2iGLfdeaCKo9fgSQ7U+iPv6+xXuO7vlwBth2Y9BUg/TuBvnjONmJmtr22iESRXL3wrP6+W/GXtXjyKt91FAbgiftbL0noUfDCkFGGcrsqkv/uRJ61FY8ukn8D1mcyeXj2oDM6unmVjU7ar/842HotSOvtFzJsv/OdXyAQCAQCgUAgEAi4IvMPPa08rYTN1OMAAAAASUVORK5CYII="
                        />
                      </defs>
                    </svg>
                  </div>
                  <div className="profile-sidebar-title">Settings</div>
                </Link>
              </div>
            </div>
            <div className="profile-content-area">
              <div
                className={`tabbed-content-main ${tabName === "profile" ? "current" : ""
                  }`}
              >
                <div className="profile-sidebar-sidebar-link">
                  <div className="profile-content-head">
                    <div className="profile-head-left">
                      <div className="profile-head-image">
                        <div
                          className="profile-picture"
                          style={{ backgroundImage: `url(${user?.profile?.path || dummyProfile})` }}
                        ></div>

                        {/* Camera Icon */}
                        <label className="camera-icon">
                          <input type="file" accept="image/*" onChange={handleProfilePictureChange} style={{ display: "none" }} />
                          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M12 2C10.5 2 9.14 2.84 8.47 4H5C3.34 4 2 5.34 2 7V19C2 20.66 3.34 22 5 22H19C20.66 22 22 20.66 22 19V7C22 5.34 20.66 4 19 4H15.53C14.86 2.84 13.5 2 12 2ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6ZM5 19C4.45 19 4 18.55 4 18V16C4 15.45 4.45 15 5 15H19C19.55 15 20 15.45 20 16V18C20 18.55 19.55 19 19 19H5Z" />
                          </svg>
                        </label>
                      </div>

                      <div className="profile-head-info">
                        <h2 className="profile-head-title">{user.firstName}</h2>
                        <div className="profile-head-subtext">Industry</div>
                        <div className="profile-head-text">{user.location}</div>
                      </div>
                    </div>
                    <div className="profile-head-right">
                      <a
                        href="#"
                        onClick={openResumeModal}
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
                      </a>
                      <button
                        className="resume-btn fill-btn"
                        onClick={handleUploadResume}
                      >
                        Upload resume
                      </button>
                      {uploadStatus && (
                        <p
                          style={{
                            color: uploadStatus.includes("Failed")
                              ? "red"
                              : "green",
                          }}
                        >
                          {uploadStatus}
                        </p>
                      )}
                    </div>
                  </div>
                  {showResumeModal && (
                    <div className="resume-modal-overlay">
                      <div className="resume-modal-content">
                        <div className="resume-modal-header">
                          <h2 className="resume-modal-title">Resume</h2>
                          <button onClick={closeResumeModal} className="resume-modal-close">
                            &times;
                          </button>
                        </div>
                        <div className="resume-modal-body">
                          {user.video && user.video.path ? (
                            <video
                              src={user.video.path}
                              controls
                              autoPlay
                              style={{ width: "100%", maxHeight: "400px" }}
                            />
                          ) : (
                            <p>No resume video uploaded.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="profile-edit-options">
                    <div className="profile-edit-set">
                      {isEditing === "summary" && (
                        <>
                          <button
                            onClick={() => handleSaveAbout()}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>

                          <button
                            onClick={() => setIsEditing("")}
                            className="edit-button profile-summry-close-button"
                          >
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
                                fill="url(#pattern0_1846_11491)"
                              />
                              <defs>
                                <pattern
                                  id="pattern0_1846_11491"
                                  patternContentUnits="objectBoundingBox"
                                  width="1"
                                  height="1"
                                >
                                  <use
                                    href="#image0_1846_11491"
                                    transform="scale(0.0111111)"
                                  />
                                </pattern>
                                <image
                                  id="image0_1846_11491"
                                  width="90"
                                  height="90"
                                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2dS4uURxSGH1AzipIsHUfBiPoHkrhKghKMMgvRLKJgFJIYszEwJiKtO3fRrGTAv+F1YdAfkBAM42WTTYILzc25mFW6YeIJFU6gaabHr6dPXb6vzwPvpumuPvVSXbc+VR84juM4juM4juM4lVkF7AJOAN8A14GHwM/APNBRzetrD/U9l/Qzb2kZzhJsAU4Dt4C/ABlSz4GbwBSwmRFnHXAcuAv8Y2BuPy0Cd4BjwFpGiA3a0p5GNLef/gQuAK/RYNYAZ4G5DAb3KsRwRmNqFO8CjwowuFc/AXtpAKFPvAK8KMDUfgqxTQNj1JTXge8LMFIq6kdgBzVjr9E0TRIrTAvfoyZ8APxdgGmyQoXF0BEK5/PIc2JJpFCHkxTKIV0c5DZJDM0+TGGEfq1dgDkSoRvZRyHsrOnAJwMMkNtzmzym0yJpuO7lnmdfKcAESaSwqMm2rC55xSfGCnXdndrk1cCDAiovifUo9UbU2QIqLZn0Zcr95NkCKiyZNKseRKdVQGUls8JedvS/n343XAy0gHFVy3jR016i/I5R2b/G/lvsuKERrSXKnzQyu61l9XLOMP6PYhp91zDQ8T7fsX/I3b/Qag/0KXujYfy3Y5m82XjTaHyZ71qp2cuZHJgw3nSKkspw2jBI0Z/xcgzajfTrLro5b1yHL4jALeMg2xWMqWq2ZVmD6BrGhBSrBeMgpcJPvUo3YlHGSrVgnX62K0KQYtAac7Xkbr1p6DOfRQxUVtgqc7bkbn1i6PN/WZ0xg5UBjSvF5KCvDX3mRoKAZYCuIHd3EW1ATLkl2q5gZCkmB80Y+szjhIFLxa4hZ3fRrV8sjc6RAdoZ0OwcJgc9szTaatdLIpmdy2TRbsqNpmZGe9dBmq7DB0PSDIY+vSPN9O56wv5usmYLlquGPvsSnERL8BORW0WnxptKHxv67Nuk9Df6DUujfeOfNBv/6NnqHANfO3FZ2QbC/5kyDrJlbEwVsy3zOoJOEYGJBqQbbDSMf/EldRiKOzVPoJmoQwINehVDzLyOycgpYZZ5HUdjJzn+ZhRoR83epDoXIcmxt3yr7d6nKe7+GOUkdFF9RQLW69agjKhmUyWio4nYMqKaIvFhofsFVFqaflgo8I4ff0vHdAGtTBLpMhkZ0+O70nD9ALxCZrbrwXRpqBaAbRTCnprfOiN9FBY471MYBxt4McqHFMrJhlz1s6g54UVzqObdSLvEK36Wu/rneU0Hvj3UjK3AdwWYJxV1r4QrfYaZZ08XvoJ8oYuR7PNkq+X6gwJM7VWI6W0axmq9VKSELdZnugsXYmos67WSTzIY/Ide1P0qI8RavYrh28gLnUX9I/XoqF09vxSb9AD7NX0axbDmzmtZp2KmBNSdVZrP9ilwUbOBZvRRIHNdjweZ09dm9D0X9RRr+Kw/HsRxHMdxHMdxHIeK/AvYyyqXnlvdpAAAAABJRU5ErkJggg=="
                                />
                              </defs>
                            </svg>
                          </button>
                        </>
                      )}
                      {!(isEditing === "summary") && (
                        <button
                          onClick={() => setIsEditing("summary")}
                          className="edit-button"
                        >
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
                      )}
                      <div className="profile-edit-title">Summary</div>
                      <div className="profile-edit-text" data-testid="user-summary">
                        {isEditing === "summary" ? (
                          <div>
                            <textarea
                              value={about}
                              placeholder="Summary"
                              onChange={(e) => setAbout(e.target.value)}
                            ></textarea>
                          </div>
                        ) : (
                          <div>
                            <p>{about}</p>
                          </div>
                        )}
                        {/* <div
                          className={`profile-summry-edit ${
                            isEditing === "summary" ? "current" : ""
                          }`}
                        >
                          <textarea
                            value={about}
                            placeholder="Summary"
                            onChange={(e) => setAbout(e.target.value)}
                          ></textarea>
                        </div> */}
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      {isEditing === "topSkills" && (
                        <>
                          <button
                            onClick={() => handleSaveSkills()}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>

                          <button
                            onClick={() => setIsEditing("")}
                            className="edit-button profile-summry-close-button"
                          >
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
                                fill="url(#pattern0_1846_11491)"
                              />
                              <defs>
                                <pattern
                                  id="pattern0_1846_11491"
                                  patternContentUnits="objectBoundingBox"
                                  width="1"
                                  height="1"
                                >
                                  <use
                                    href="#image0_1846_11491"
                                    transform="scale(0.0111111)"
                                  />
                                </pattern>
                                <image
                                  id="image0_1846_11491"
                                  width="90"
                                  height="90"
                                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2dS4uURxSGH1AzipIsHUfBiPoHkrhKghKMMgvRLKJgFJIYszEwJiKtO3fRrGTAv+F1YdAfkBAM42WTTYILzc25mFW6YeIJFU6gaabHr6dPXb6vzwPvpumuPvVSXbc+VR84juM4juM4juM4lVkF7AJOAN8A14GHwM/APNBRzetrD/U9l/Qzb2kZzhJsAU4Dt4C/ABlSz4GbwBSwmRFnHXAcuAv8Y2BuPy0Cd4BjwFpGiA3a0p5GNLef/gQuAK/RYNYAZ4G5DAb3KsRwRmNqFO8CjwowuFc/AXtpAKFPvAK8KMDUfgqxTQNj1JTXge8LMFIq6kdgBzVjr9E0TRIrTAvfoyZ8APxdgGmyQoXF0BEK5/PIc2JJpFCHkxTKIV0c5DZJDM0+TGGEfq1dgDkSoRvZRyHsrOnAJwMMkNtzmzym0yJpuO7lnmdfKcAESaSwqMm2rC55xSfGCnXdndrk1cCDAiovifUo9UbU2QIqLZn0Zcr95NkCKiyZNKseRKdVQGUls8JedvS/n343XAy0gHFVy3jR016i/I5R2b/G/lvsuKERrSXKnzQyu61l9XLOMP6PYhp91zDQ8T7fsX/I3b/Qag/0KXujYfy3Y5m82XjTaHyZ71qp2cuZHJgw3nSKkspw2jBI0Z/xcgzajfTrLro5b1yHL4jALeMg2xWMqWq2ZVmD6BrGhBSrBeMgpcJPvUo3YlHGSrVgnX62K0KQYtAac7Xkbr1p6DOfRQxUVtgqc7bkbn1i6PN/WZ0xg5UBjSvF5KCvDX3mRoKAZYCuIHd3EW1ATLkl2q5gZCkmB80Y+szjhIFLxa4hZ3fRrV8sjc6RAdoZ0OwcJgc9szTaatdLIpmdy2TRbsqNpmZGe9dBmq7DB0PSDIY+vSPN9O56wv5usmYLlquGPvsSnERL8BORW0WnxptKHxv67Nuk9Df6DUujfeOfNBv/6NnqHANfO3FZ2QbC/5kyDrJlbEwVsy3zOoJOEYGJBqQbbDSMf/EldRiKOzVPoJmoQwINehVDzLyOycgpYZZ5HUdjJzn+ZhRoR83epDoXIcmxt3yr7d6nKe7+GOUkdFF9RQLW69agjKhmUyWio4nYMqKaIvFhofsFVFqaflgo8I4ff0vHdAGtTBLpMhkZ0+O70nD9ALxCZrbrwXRpqBaAbRTCnprfOiN9FBY471MYBxt4McqHFMrJhlz1s6g54UVzqObdSLvEK36Wu/rneU0Hvj3UjK3AdwWYJxV1r4QrfYaZZ08XvoJ8oYuR7PNkq+X6gwJM7VWI6W0axmq9VKSELdZnugsXYmos67WSTzIY/Ide1P0qI8RavYrh28gLnUX9I/XoqF09vxSb9AD7NX0axbDmzmtZp2KmBNSdVZrP9ilwUbOBZvRRIHNdjweZ09dm9D0X9RRr+Kw/HsRxHMdxHMdxHIeK/AvYyyqXnlvdpAAAAABJRU5ErkJggg=="
                                />
                              </defs>
                            </svg>
                          </button>
                        </>
                      )}
                      {!(isEditing === "topSkills") && (
                        <button
                          onClick={() => setIsEditing("topSkills")}
                          className="edit-button"
                        >
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
                      )}
                      <div className="profile-edit-title">Top Skills</div>
                      <div className="profile-edit-tags" data-testid="skills-list">
                        {isEditing === "topSkills" ? (
                          <div>
                            <textarea
                              value={skillsString}
                              placeholder="skills"
                              onChange={(e) => setSkills(e.target.value)}
                            ></textarea>
                            <p>Separate skills with Commas</p>
                          </div>
                        ) : (
                          (
                            user.skills.map((skill, index) => (
                              <div key={index} className="profile-edit-tag">
                                {skill}
                              </div>
                            )))
                        )}
                        {/* Edit Input for Skills */}
                      </div>
                    </div>

                    <div className="profile-edit-set">
                      {isEditing === "contactDetails" && (
                        <button
                          onClick={() => setIsEditing("")}
                          className="edit-button profile-summry-close-button"
                        >
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
                              fill="url(#pattern0_1846_11491)"
                            />
                            <defs>
                              <pattern
                                id="pattern0_1846_11491"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                              >
                                <use
                                  href="#image0_1846_11491"
                                  transform="scale(0.0111111)"
                                />
                              </pattern>
                              <image
                                id="image0_1846_11491"
                                width="90"
                                height="90"
                                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAACXBIWXMAAAsTAAALEwEAmpwYAAAENklEQVR4nO2dS4uURxSGH1AzipIsHUfBiPoHkrhKghKMMgvRLKJgFJIYszEwJiKtO3fRrGTAv+F1YdAfkBAM42WTTYILzc25mFW6YeIJFU6gaabHr6dPXb6vzwPvpumuPvVSXbc+VR84juM4juM4juM4lVkF7AJOAN8A14GHwM/APNBRzetrD/U9l/Qzb2kZzhJsAU4Dt4C/ABlSz4GbwBSwmRFnHXAcuAv8Y2BuPy0Cd4BjwFpGiA3a0p5GNLef/gQuAK/RYNYAZ4G5DAb3KsRwRmNqFO8CjwowuFc/AXtpAKFPvAK8KMDUfgqxTQNj1JTXge8LMFIq6kdgBzVjr9E0TRIrTAvfoyZ8APxdgGmyQoXF0BEK5/PIc2JJpFCHkxTKIV0c5DZJDM0+TGGEfq1dgDkSoRvZRyHsrOnAJwMMkNtzmzym0yJpuO7lnmdfKcAESaSwqMm2rC55xSfGCnXdndrk1cCDAiovifUo9UbU2QIqLZn0Zcr95NkCKiyZNKseRKdVQGUls8JedvS/n343XAy0gHFVy3jR016i/I5R2b/G/lvsuKERrSXKnzQyu61l9XLOMP6PYhp91zDQ8T7fsX/I3b/Qag/0KXujYfy3Y5m82XjTaHyZ71qp2cuZHJgw3nSKkspw2jBI0Z/xcgzajfTrLro5b1yHL4jALeMg2xWMqWq2ZVmD6BrGhBSrBeMgpcJPvUo3YlHGSrVgnX62K0KQYtAac7Xkbr1p6DOfRQxUVtgqc7bkbn1i6PN/WZ0xg5UBjSvF5KCvDX3mRoKAZYCuIHd3EW1ATLkl2q5gZCkmB80Y+szjhIFLxa4hZ3fRrV8sjc6RAdoZ0OwcJgc9szTaatdLIpmdy2TRbsqNpmZGe9dBmq7DB0PSDIY+vSPN9O56wv5usmYLlquGPvsSnERL8BORW0WnxptKHxv67Nuk9Df6DUujfeOfNBv/6NnqHANfO3FZ2QbC/5kyDrJlbEwVsy3zOoJOEYGJBqQbbDSMf/EldRiKOzVPoJmoQwINehVDzLyOycgpYZZ5HUdjJzn+ZhRoR83epDoXIcmxt3yr7d6nKe7+GOUkdFF9RQLW69agjKhmUyWio4nYMqKaIvFhofsFVFqaflgo8I4ff0vHdAGtTBLpMhkZ0+O70nD9ALxCZrbrwXRpqBaAbRTCnprfOiN9FBY471MYBxt4McqHFMrJhlz1s6g54UVzqObdSLvEK36Wu/rneU0Hvj3UjK3AdwWYJxV1r4QrfYaZZ08XvoJ8oYuR7PNkq+X6gwJM7VWI6W0axmq9VKSELdZnugsXYmos67WSTzIY/Ide1P0qI8RavYrh28gLnUX9I/XoqF09vxSb9AD7NX0axbDmzmtZp2KmBNSdVZrP9ilwUbOBZvRRIHNdjweZ09dm9D0X9RRr+Kw/HsRxHMdxHMdxHIeK/AvYyyqXnlvdpAAAAABJRU5ErkJggg=="
                              />
                            </defs>
                          </svg>
                        </button>
                      )}
                      <button
                        data-testid="edit-contact-button"
                        onClick={() => setIsEditingContact((prev) => !prev)} // Toggles edit mode
                        className="edit-button"
                      >
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
                      <div className="profile-edit-text" data-testid="user-contact">
                        {isEditingContact ? (
                          <div>
                            <label>
                              <strong>Phone:</strong>
                              <input
                                data-testid="edit-phone"
                                type="text"
                                value={contactDetails.phone || ""}
                                placeholder={"eg.123 456 7890"}
                                onChange={(e) => {
                                  setContactDetails({
                                    ...contactDetails,
                                    phone: e.target.value,
                                  });
                                }}
                              />
                            </label>
                            <label>
                              <strong>Email:</strong>
                              <input
                                data-testid="edit-email"
                                type="email"
                                value={contactDetails.email}
                                placeholder={"johndoe@example.com"}
                                onChange={(e) => {
                                  setContactDetails({
                                    ...contactDetails,
                                    email: e.target.value,
                                  });
                                }}
                              />
                            </label>
                            <button data-testid="save-contact-button" onClick={handleSaveContactDetails}>
                              Save
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p data-testid="phone-display">
                              <strong>Phone:</strong>{" "}
                              {user.phone || "Not provided"}
                            </p>
                            <p data-testid="email-display">
                              <strong>Email:</strong>{" "}
                              {user.username}
                            </p>
                          </div>
                        )}
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
                      <div>
                        {/* EDIT BUTTON */}
                        <button
                          onClick={handleEditPortfolio}
                          className="edit-button"
                          style={{
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                          }}
                        >
                          {/* Your Pencil SVG or icon */}
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
                            {/* ... */}
                          </svg>
                        </button>

                        {isEditingPortfolio ? (
                          <div
                            style={{
                              position: "fixed",
                              top: 0,
                              left: 0,
                              width: "100vw",
                              height: "100vh",
                              backgroundColor: "rgba(0, 0, 0, 0.5)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              zIndex: 9999,
                            }}
                          >
                            {/* POPUP CONTAINER */}
                            <div
                              style={{
                                background: "#fff",
                                borderRadius: "12px",
                                padding: "20px",
                                width: "500px",
                                maxWidth: "90%",
                              }}
                            >
                              <h2 style={{ marginBottom: "20px" }}>
                                Portfolio Links
                              </h2>

                              {/* Map over tempPortfolios rather than real portfolios */}
                              {tempPortfolios.slice(1).map((portfolio, i) => {
                                // index in tempPortfolios
                                const actualIndex = i + 1;
                                return (
                                  <div
                                    key={actualIndex}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      marginBottom: "8px",
                                    }}
                                  >
                                    <input
                                      type="text"
                                      placeholder="Portfolio Link"
                                      value={portfolio.href}
                                      onChange={(e) => {
                                        const updated = [...tempPortfolios];
                                        updated[actualIndex] = {
                                          ...updated[actualIndex],
                                          href: e.target.value,
                                        };
                                        setTempPortfolios(updated);
                                      }}
                                      style={{
                                        width: "80%",
                                        marginRight: "10px",
                                        padding: "5px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                      }}
                                    />
                                    {/* Remove link button */}
                                    <button
                                      onClick={() => {
                                        setTempPortfolios(
                                          tempPortfolios.filter(
                                            (_, idx) => idx !== actualIndex
                                          )
                                        );
                                      }}
                                      className="remove-button"
                                      style={{
                                        background: "transparent",
                                        border: "none",
                                        cursor: "pointer",
                                        width: "50px",
                                      }}
                                    >
                                      {/* X icon */}
                                      <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1 1L15 15"
                                          stroke="red"
                                          strokeWidth="2"
                                        />
                                        <path
                                          d="M15 1L1 15"
                                          stroke="red"
                                          strokeWidth="2"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                );
                              })}

                              {/* Add new link */}
                              <div style={{ marginBottom: "10px" }}>
                                <button
                                  onClick={() => {
                                    setTempPortfolios([
                                      ...tempPortfolios,
                                      newLink,
                                    ]);
                                    setNewLink({ href: "" });
                                    <input
                                      type="text"
                                      placeholder="Add link"
                                      value={newLink.href}
                                      onChange={(e) =>
                                        setNewLink({
                                          ...newLink,
                                          href: e.target.value,
                                        })
                                      }
                                      style={{
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "8px",
                                        marginBottom: "5px",
                                      }}
                                    />;
                                  }}
                                  style={{
                                    padding: "8px 16px",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                >
                                  Add Link
                                </button>
                              </div>

                              {/* POPUP FOOTER BUTTONS */}
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <button
                                  onClick={handleCancel}
                                  style={{
                                    padding: "8px 16px",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                    marginRight: "10px",
                                  }}
                                >
                                  Cancel
                                </button>
                                <button
                                  onClick={handleSavePortfolio}
                                  style={{
                                    padding: "8px 16px",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer",
                                  }}
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* When not editing, we show the real portfolios */
                          <div>
                            {portfolios.slice(1).length > 0 ? (
                              portfolios.slice(1).map((portfolio, idx) => (
                                <div key={idx}>
                                  <a
                                    href={portfolio.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {portfolio.href}
                                  </a>
                                </div>
                              ))
                            ) : (
                              <p>No portfolio links provided</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="profile-edit-set">
                      <button
                        className="edit-button"
                        onClick={() => setIsDocModalOpen((prev) => !prev)}
                      >
                        {"Edit"}
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
                        <div className="profile-edit-documents">
                          {documents.map((doc, index) => {
                            if (!doc || !doc.fileData) return null; // Safeguard to skip invalid documents

                            return (
                              <div key={index} className="document-item">
                                <a
                                  href={doc.fileData}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  download={doc.fileName}
                                >
                                  <img
                                    src={pdfIcon}
                                    alt={`Document ${index + 1}`}
                                  />
                                </a>
                                <div className="document-name">
                                  {doc.fileName}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    

                    <div className="profile-edit-set">
                    <button 
                      className="edit-button"
                      onClick={() => setIsSocialModalOpen(true)} // Add onClick to open modal
                    >
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

                    <div className="profile-edit-title">Social Media</div>
                    <div className="profile-edit-socials">
                      <Link to="#" className="profile-edit-social-icon">
                        <img src={linkedIn} alt="Icon " />
                      </Link>
                    </div>

                    {isSocialModalOpen && (
                      <SocialMedia 
                        onClose={() => setIsSocialModalOpen(false)}
                        user={user}
                      />
                    )}
                  </div>
                   

                  </div>
                </div>
              </div>
              <div
                className={`tabbed-content-main ${tabName === "messages" ? "current" : ""
                  }`}
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
                className={`tabbed-content-main ${tabName === "hiredddStatus" ? "current" : ""
                  }`}
              >
                <div className="profile-sidebar-sidebar-link">
                  <div className="shortlisted-tabs">
                    <div className="shortlisted-tabs-nav">
                      <ul>
                        <li>
                          <Link
                            className={`tab-link ${subTabName === "shortlisted" ? "current" : ""
                              }`}
                            onClick={() => setSubTabName("shortlisted")}
                          >
                            Shortlisted
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div className="shortlisted-tabs-content-area">
                      <div
                        className={`shortlisted-tabs-content tabbed-content ${subTabName === "shortlisted" ? "current" : ""
                          }`}
                      >
                        <div className="three-columns">
                          {currentJobs && currentJobs.length > 0 ? (
                            currentJobs.map((job) => (
                              <div className="single-shortlist-column">
                                <div className="profile-head-left">
                                  <div className="profile-head-image">
                                    <img
                                      src={job.orgId.profile.path}
                                      alt="Avatar"
                                    />
                                  </div>
                                  <div className="profile-head-info">
                                    <h2 className="profile-head-title">
                                      {job.title}
                                    </h2>
                                    <div className="profile-head-subtext">
                                      {job.company}
                                    </div>
                                    <div className="profile-head-text">
                                      {job.location || "No Location"}
                                    </div>
                                    <div className="">
                                      <Link
                                        className="centered-message-button"
                                      >
                                        {mailSVG()}
                                      </Link>
                                      <Link
                                        // to={`#job-popup-${job.id}`}
                                        onClick={() => { setJobDetailId(job._id ?? ''); setShowJobDetails((prev) => !prev); }}
                                        className="learn-more job-popup"
                                      >
                                        View
                                      </Link>
                                    </div>
                                  </div>
                                </div>

                                {/* Job Popup */}
                                <div
                                  id={`job-popup-${job.id}`}
                                  className="job-popup-detail mfp-hide"
                                >
                                  <div className="popup-modal-dismiss">
                                    {closeSVG()}
                                  </div>
                                  <h2 className="job-popup-title">
                                    Job Details
                                  </h2>
                                  <h3>About this job</h3>
                                  <p>
                                    {job.description ||
                                      "No description available."}
                                  </p>

                                  <h3>Responsibilities</h3>
                                  <ul>
                                    {job.responsibilities &&
                                      job.responsibilities.length > 0 ? (
                                      job.responsibilities.map(
                                        (responsibility, index) => (
                                          <li key={index}>{responsibility}</li>
                                        )
                                      )
                                    ) : (
                                      <li>No responsibilities listed.</li>
                                    )}
                                  </ul>
                                  <div className="s-20"></div>

                                  <h3>Skills required</h3>
                                  <div className="profile-edit-tags">
                                    {job.skills && job.skills.length > 0 ? (
                                      job.skills.map((skill, index) => (
                                        <div
                                          className="profile-edit-tag"
                                          key={index}
                                        >
                                          {skill}
                                        </div>
                                      ))
                                    ) : (
                                      <div>No skills listed.</div>
                                    )}
                                  </div>

                                  <div className="s-20"></div>

                                  <h3>Location</h3>
                                  <p>
                                    {job.location || "No location specified"}
                                  </p>
                                  <h3>Company size</h3>
                                  <p>{job.companySize || "Unknown size"}</p>
                                  <h3>Salary</h3>
                                  <p>{job.salary || "Salary not provided"}</p>
                                  <h3>Job type</h3>
                                  <p>
                                    {job.jobType || "No job type specified"}
                                  </p>

                                  <div className="popup-button">
                                    <Link to="#" className="button">
                                      Message
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <>
                              <div className="No-fetch-jobs-message">
                                <div>{magSVG()}</div>
                                <div>
                                  You haven't been shortlisted for any jobs yet.
                                </div>
                              </div>
                            </>
                          )}
                        </div>

                        {currentJobs && currentJobs.length > 0 && (
                          <div className="custom-slider-pagination flex-between-center">
                            <button
                              className="custom-slick-nav custom-prev slick-arrow"
                              aria-disabled="true"
                              onClick={() =>
                                setCurrentJobPage(currentJobPage - 1)
                              }
                              disabled={currentJobPage === 1}
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
                              <span className="active">{currentJobPage}</span>{" "}
                              of <span className="total">{pageNumbers}</span>
                            </div>
                            <button
                              className="custom-slick-nav custom-next slick-arrow"
                              aria-disabled="false"
                              onClick={() =>
                                setCurrentJobPage(currentJobPage + 1)
                              }
                              disabled={currentJobPage === pageNumbers}
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
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DocumentUploadModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        onUpload={handleUploadDocument}
        onDelete={handleDeleteDocument}
        documents={documents}
      />
      <div data-testid="current-tab" style={{ visibility: "hidden" }}>{tabName}</div>
      <JobDetails
        isOpen={showJobDetails}
        onClose={() => setShowJobDetails(false)}
        Id={jobDetailId}
      />
    </>
  );
}
