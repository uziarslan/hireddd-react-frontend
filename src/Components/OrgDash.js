import React, { useState, useContext, useEffect } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import eyeIcon from "../Assets/images/eye-icon.svg";
import playIcon from "../Assets/images/play-icon-round.svg";
import Chat from "./Chat";
import Message from "./Message";
import { AuthContext } from "../Context/AuthContext";
import Loading from "./Loading";
// import axiosInstance from "../services/axiosInstance";
import { useNavigate } from "react-router-dom";
// import svgs
import { bookmarkSVG  } from "../Assets/vectors/ButtonVectors";
import jobService from "../services/jobService";

// EGBAIYELO - SVGs
// These are constants and they are not all intelligeable so i declare them as components
// So they dont clog up document
const pencilSVG = () => (
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
);
const closeSVG = () => (
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
);
// const bookmarkSVG = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     width="24"
//     height="24"
//     fill="black" // Ensures the entire bookmark is filled
//   >
//     <path d="M6 2H18C19.1 2 20 2.9 20 4V20C20 20.8 19.2 21.3 18.5 20.9L12 17.6L5.5 20.9C4.8 21.3 4 20.8 4 20V4C4 2.9 4.9 2 6 2Z" />
//   </svg>
// );

export default function OrgDash() {
  const { user, updateUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  const [tabName, setTabName] = useState("profile");
  const [selectedChat, setSelectedChat] = useState(null);

  // organization properties
  const [about, setAbout] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [location, setLocation] = useState("");
  const maxAboutCharacters = 5000;

  const [isEditing, setIsEditing] = useState("");

  const [candidates, setCandidates] = useState([]);
  const [currentCandPage, setCurrentCandPage] = useState(1);
  const [candidatesPerPage] = useState(9);
  const [currentCands, setCurrentCands] = useState([]);
  const [pageNumbers, setPageNumbers] = useState(1);

  const navigate = useNavigate();

  // sending a change to the user object, in the backend, 
  useEffect(() => {
    if (user) {
      setIsLoading(false);
      setAbout(user.about || "");
      setWebsite(user.website || "");
      setIndustry(user.industry || "");
      setCompanySize(user.companySize || "");
      setLocation(user.location || "");
    }

    //==== Redirect users
    if (user?.role && user.role !== 'organization') {
      navigate('/');
    }

    setIsLoading(true)
    // Getting candidates for the org
    const getCandidates = async () => {
      try {
        const jobs = await jobService.getJobsbyOrgID(user._id);
        console.log("Fetched jobs:", jobs);
    
        // Array to hold candidates and their associated jobs
        const candidatesWithJobs = [];
    
        // Loop over each job and fetch candidates for each
        for (const job of jobs) {
          try {
            // Fetching candidates for the current job
            const candidates = await jobService.getCandidatesForJob(job._id);
            console.log(`Fetched candidates for job ${job._id}:`, candidates);
    
            // If candidates exist, associate the job with each candidate
            for (const candidate of candidates) {
              let existingCandidate = candidatesWithJobs.find(
                (c) => c.talentId._id === candidate.talentId._id
              );

              if (existingCandidate) {
                existingCandidate.orgJobs.push(job.title);
              } else {
                // If the candidate doesn't exist, create a new candidate entry
                candidate.orgJobs = [job.title]; 
                candidatesWithJobs.push(candidate);
              }
            }

          } catch (error) {
            console.error(`Error fetching candidates for job ${job._id}:`, error);
          }
        }

        setCandidates(candidatesWithJobs)
    
        // console.log("Candidates with associated jobs:", candidatesWithJobs);
    
      } catch (error) {
        console.error("Error fetching jobs:", error);
        alert("Error fetching job data");
      } finally {
        setIsLoading(false)
      }
    };
    
    getCandidates();
    //
  }, [user, navigate]);

  useEffect(() => {
    if (candidates.length > 0) {

      // - MONTE
      const handleCandSplice = async () => {
          // Job align
        const totalPages = Math.ceil(candidates.length / candidatesPerPage);
        setPageNumbers(totalPages);

        const indexOfLastCandidate = currentCandPage * candidatesPerPage;
        const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
        const currentCandidates = candidates.slice(indexOfFirstCandidate, indexOfLastCandidate);
        setCurrentCands(currentCandidates);
      };
      handleCandSplice();
    }
  }, [candidates, currentCandPage, candidatesPerPage]);


  const handleFieldChange = (field, value) => {
    // setUserFields((prev) => ({ ...prev, [field]: value }));
  }

  // Consolidating the update logic, it was redundant -- MONTE
  const updateField = async (field, value) => {
    // null check
    if (!value.trim()) {
      alert(`${field} section cannot be empty!`);
      return;
    }

    // Regex for company size
    if (field === 'companySize') {
      const companySizeRegex = /^\d+(-\d+)?$/; //+ Ill need to improve this
      if (!companySizeRegex.test(value)) {
        alert("Invalid company size format! It should only include numbers and optionally a hyphen (e.g., 100-500).");
        return;
      }
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/edit-profile/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: value, userType: "organization", dataField: field }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(`${field} section updated successfully!`);

        // Catchall switch
        switch (field) {
          case 'about':
            setAbout(result.user.about);
            updateUser({ about: result.user.about });
            break;
          case 'website':
            setWebsite(result.user.website);
            updateUser({ website: result.user.website });
            break;
          case 'industry':
            setIndustry(result.user.industry);
            updateUser({ industry: result.user.industry });
            break;
          case 'companySize':
            setCompanySize(result.user.companySize);
            updateUser({ companySize: result.user.companySize });
            break;
          case 'location':
            setLocation(result.user.location);
            updateUser({ location: result.user.location });
            break;
          default:
            break;
        }

        setIsEditing(""); // Exiting edit mode
      } else {
        alert(`Failed to update the ${field} section. Please try again.`);
      }
    } catch (error) {
      console.error(`Error updating ${field} section:`, error);
      alert(`An error occurred while updating the ${field} section.`);
    }
    // setUserFields((prev) => ({ ...prev, [field]: value }));
  }

  const handleCloseEdit = () => {
    setIsEditing("");
    // To cancel an edit  -- MONTE
    // handleProfileEdit();
  };

  // cleanup
  const handleShortlist = () => {

  }

  // For the next sprint
  // const handleSaveAbout = async () => {


  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/edit-profile/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: about, userType: "organization", dataField: "about" }), 
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("About section updated successfully!");

  //       setAbout(result.user.about); // Update the state with new about (using backend filtered text)
  //       updateUser({ about: result.user.about }); // Update the user state
  //       setIsEditing(""); // Exiting edit mode
  //     } else {
  //       alert("Failed to update the About section. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating About section:", error);
  //     alert("An error occurred while updating the About section.");
  //   }

  // };

  //- Better way to do this to make location link to google maps location
  // let googleLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

  // const handleSaveWebsite = async () => {


  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/edit-profile/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: website, userType: "organization", dataField: "website" }), 
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Website section updated successfully!");

  //       setWebsite(result.user.website); // Update the state with new website (using backend filtered text)
  //       updateUser({ website: result.user.website }); // Update the user state
  //       setIsEditing(""); // Exiting edit mode
  //     } else {
  //       alert("Failed to update the Website section. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating Website section:", error);
  //     alert("An error occurred while updating the Website section.");
  //   }
  // }

  // const handleSaveIndustry = async () => {


  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/edit-profile/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: industry, userType: "organization", dataField: "industry" }), 
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Industry section updated successfully! fr");

  //       setIndustry(result.user.industry); // Update the state with new industry (using backend filtered text)
  //       updateUser({ industry: result.user.industry }); // Update the user state
  //       setIsEditing(""); // Exiting edit mode
  //     } else {
  //       alert("Failed to update the Industry section. Please try again. fr");
  //     }
  //   } catch (error) {
  //     console.error("Error updating Industry section: fr", error);
  //     alert("An error occurred while updating the Industry section. fr");
  //   }
  // }

  // const handleSaveCompanySize = async () => {


  //   // Validate company size format using regex
  //   const companySizeRegex = /^\d+(-\d+)?$/;

  //   if (!companySizeRegex.test(companySize)) {
  //     alert("Invalid company size format! It should only include numbers and optionally a hyphen (e.g., 100-500).");
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/edit-profile/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: companySize, userType: "organization", dataField: "companySize" }), 
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Company size section updated successfully!");

  //       setCompanySize(result.user.companySize); // Update the state with new CompanySize (using backend filtered text)
  //       updateUser({ companySize: result.user.companySize }); // Update the user state
  //       setIsEditing(""); // Exiting edit mode
  //     } else {
  //       alert("Failed to update the company size section. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating company size section:", error);
  //     alert("An error occurred while updating the company size section.");
  //   }
  // }

  // const handleSaveLocation = async () => {


  //   try {
  //     const response = await fetch(
  //       `http://localhost:4000/api/v1/edit-profile/${user._id}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ data: location, userType: "organization", dataField: "location" }), 
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.success) {
  //       alert("Location section updated successfully!");

  //       setLocation(result.user.location); // Update the state with new location (using backend filtered text)
  //       updateUser({ location: result.user.location }); // Update the user state
  //       setIsEditing(""); // Exiting edit mode
  //     } else {
  //       alert("Failed to update the Location section. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error updating Location section:", error);
  //     alert("An error occurred while updating the Location section.");
  //   }

  // }


  // Shortlisted handling

  const [shortlisted, setShortlisted] = useState([]);


  // useEffect(() => {
  //   if (tabName === "hiredddStatus") {
  //     getJobCandidates();
  //     console.log("Candidates fetched.")
  //   }
  // }, [tabName]);

  // Logic to be reviewed
  // const getJobCandidates = async () => {
  //   try {
  //     // Assuming jobService.getJobsbyOrgID returns a promise that resolves to an array of jobs
  //     const jobs = await jobService.getJobsbyOrgID(user._id);
  //     let candidatesListIDs = [];

  //     // Use a for...of loop to iterate through the jobs
  //     for (const job of jobs) {
  //       // Pass job._id (or the appropriate job identifier) to getCandidatesForJob
  //       const jobCandidates = await jobService.getCandidatesForJob(job._id);
  //       // Merge candidates from the current job into the candidatesList
  //       candidatesListIDs = candidatesListIDs.concat(jobCandidates);
  //     }

  //     // get the user and the job associated with them.

  //     for (const candidateID of candidatesListIDs) {
  //       // get user
  //       const candidate_profile = await fetch()
  //     }

  //     // Update the shortlisted state with all candidates
  //     setShortlisted(candidatesList);
  //     console.log(candidatesList)
  //   } catch (error) {
  //     console.error("Error getting job candidates:", error);
  //   }
  // };

  // formerly && !user
  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <>
      <DashNav
        profile={user?.profile?.path || dummyProfile}
        firstName={user?.firstName}
        toggleLoading={setIsLoading}
      />
      <main id="main-section" className="main-section">
        <div className="wrapper wide-1230">
          <div className="profile-body-row">
            <div className="profile-sidebar-area">
              <div className="profile-sidebar-links">
                <Link
                  Link
                  data-testid="findTalents-tab"
                  className={`profile-sidebar-link tab-link-main ${tabName === "findTalents" ? "current" : ""
                    }`}
                  onClick={() => setTabName("findTalents")}
                  to="/find/employees"
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
                  <div className="profile-sidebar-title">Find Talents</div>
                </Link>
                <Link
                  data-testid="profile-tab"
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
                  <div className="profile-sidebar-title">Profile</div>
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
                  data-testid="hiredddStatus-tab"
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
                        <img
                          src={user?.profile?.path || dummyProfile}
                          alt="Avatar"
                        />
                      </div>
                      <div className="profile-head-info">
                        <h2 className="profile-head-title">
                          {user.firstName} {user.lastName}
                        </h2>
                        {user.industry != "undefined" && (
                          <div className="profile-head-subtext">
                            {user.industry}
                          </div>
                        )}
                        <div className="profile-head-text">{user.location != "undefined" ? user.location : ""}</div>
                      </div>
                    </div>
                    <div className="profile-head-right" data-testid="org-create-job">
                      <Link to="/organization/createJob">
                        <button className="resume-btn fill-btn">
                          Create Job
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="profile-edit-options" data-testid="org-profile">

                    {/* about company section */}

                    <div className="profile-edit-set">

                      {/* EGBAIYELO - Making the logic more compact */}
                      {isEditing === "about" ? (
                        <>
                          {/* Close edit button */}
                          <button
                            onClick={() => { handleCloseEdit(); }}
                            className="edit-button profile-summry-close-button"
                          >
                            {closeSVG()}
                          </button>

                          {/* Save edit button */}
                          <button
                            onClick={() => { updateField("about", about); }}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>
                        </>
                      ) : (
                        // (pencil) edit button
                        <button className="edit-button" onClick={() => setIsEditing("about")}>
                          {pencilSVG()}
                        </button>
                      )}

                      <div className="profile-edit-title">About Company</div>
                      <div className="profile-edit-text" data-testid="org-summary">
                        <p
                          className={`${isEditing === "about" ? "profile-summry-edit" : ""
                            }`}>{user.about != "undefined" ? user.about : ""}</p>
                        {/* profile-hidden */}
                        <div
                          className={`profile-about-edit ${isEditing === "about" ? "" : "profile-summry-edit"
                            }`}
                        >
                          <textarea
                            value={about}
                            placeholder="Write something about your company..."
                            maxLength={maxAboutCharacters} // Adding some validation here too
                            onChange={(e) => {
                              setAbout(e.target.value);
                              handleFieldChange("about", e.target.value)
                            }}
                          ></textarea>
                          {about.length} / {maxAboutCharacters}
                        </div>
                      </div>
                    </div>
                    {/* */}


                    {/* website */}

                    <div className="profile-edit-set">

                      {/* EGBAIYELO - Making the logic more compact */}
                      {isEditing === "website" ? (
                        <>
                          {/* Close edit button */}
                          <button
                            onClick={() => { handleCloseEdit(); }}
                            className="edit-button profile-summry-close-button"
                          >
                            {closeSVG()}
                          </button>

                          {/* Save edit button */}
                          <button
                            onClick={() => { updateField("website", website); }}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>
                        </>
                      ) : (
                        // (pencil) edit button
                        <button className="edit-button" onClick={() => setIsEditing("website")}>
                          {pencilSVG()}
                        </button>
                      )}

                      <div className="profile-edit-title">Website</div>
                      {/* {user.website.split("https://")} */}
                      <div className="profile-edit-text" data-testid="org-website">
                        <a href={website} className={`${isEditing === "website" ? "profile-summry-edit" : "profile-txtbx-link"
                          }`}>{user.website != "undefined" ? user.website : ""} </a>

                        <div className={`profile-about-edit ${isEditing === "website" ? "" : "profile-summry-edit"
                          }`}>

                          <textarea
                            value={website}
                            placeholder=""
                            onChange={(e) => {
                              setWebsite(e.target.value);
                              handleFieldChange("website", e.target.value)
                            }}
                          ></textarea>
                        </div>

                      </div>
                    </div>
                    {/* */}


                    {/* industry */}

                    <div className="profile-edit-set">
                      {/* EGBAIYELO - Making the logic more compact */}
                      {isEditing === "industry" ? (
                        <>
                          {/* Close edit button */}
                          <button
                            onClick={() => { handleCloseEdit(); }}
                            className="edit-button profile-summry-close-button"
                          >
                            {closeSVG()}
                          </button>

                          {/* Save edit button */}
                          <button
                            onClick={() => { updateField("industry", industry); }}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>
                        </>
                      ) : (
                        // (pencil) edit button
                        <button className="edit-button" onClick={() => setIsEditing("industry")}>
                          {pencilSVG()}
                        </button>
                      )}

                      <div className="profile-edit-title">Industry</div>
                      <div className="profile-edit-text" data-testid="org-industry">

                        <p className={`${isEditing === "industry" ? "profile-summry-edit" : ""
                          }`}>{user.industry != "undefined" ? user.industry : ""} </p>
                        {/* profile-hidden */}
                        <div
                          className={`profile-about-edit ${isEditing === "industry" ? "" : "profile-summry-edit"
                            }`}
                        >
                          <textarea
                            value={industry}
                            placeholder=""
                            onChange={(e) => {
                              setIndustry(e.target.value);
                              handleFieldChange("industry", e.target.value)
                            }}
                          ></textarea>
                        </div>


                      </div>
                    </div>
                    {/*  */}


                    {/* company Size */}

                    <div className="profile-edit-set">
                      {/* EGBAIYELO - Making the logic more compact */}
                      {isEditing === "companySize" ? (
                        <>
                          {/* Close edit button */}
                          <button
                            onClick={() => { handleCloseEdit(); }}
                            className="edit-button profile-summry-close-button"
                          >
                            {closeSVG()}
                          </button>

                          {/* Save edit button */}
                          <button
                            onClick={() => { updateField("companySize", companySize); }}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>
                        </>
                      ) : (
                        // (pencil) edit button
                        <button className="edit-button" onClick={() => setIsEditing("companySize")}>
                          {pencilSVG()}
                        </button>
                      )}

                      <div className="profile-edit-title">Company Size</div>
                      <div className="profile-edit-text" data-testid="org-companySize">

                        <p className={`${isEditing === "companySize" ? "profile-summry-edit" : ""
                          }`}>{user.companySize != "undefined" ? user.companySize : ""}</p>
                        {/* profile-hidden */}
                        <div
                          className={`profile-about-edit ${isEditing === "companySize" ? "" : "profile-summry-edit"
                            }`}
                        >
                          <textarea
                            value={companySize}
                            placeholder=""
                            onChange={(e) => {
                              setCompanySize(e.target.value);
                              handleFieldChange("companySize", e.target.value)
                            }}
                          ></textarea>
                        </div>

                      </div>
                    </div>


                    {/* location */}

                    <div className="profile-edit-set">
                      {/* EGBAIYELO - Making the logic more compact */}
                      {isEditing === "location" ? (
                        <>
                          {/* Close edit button */}
                          <button
                            onClick={() => { handleCloseEdit(); }}
                            className="edit-button profile-summry-close-button"
                          >
                            {closeSVG()}
                          </button>

                          {/* Save edit button */}
                          <button
                            onClick={() => { updateField("location", location); }}
                            className="edit-button profile-txtbx-done"
                          >
                            {bookmarkSVG()}
                          </button>
                        </>
                      ) : (
                        // (pencil) edit button
                        <button className="edit-button" onClick={() => setIsEditing("location")}>
                          {pencilSVG()}
                        </button>
                      )}

                      <div className="profile-edit-title">Headquarters</div>

                      <div className="profile-edit-text" data-testid="org-location">
                        <p
                          className={`${isEditing === "location" ? "profile-summry-edit" : "profile-txtbx-link"
                            }`}>{user.location != "undefined" ? user.location : ""}</p>
                        {/* profile-hidden */}
                        <div
                          className={`profile-about-edit ${isEditing === "location" ? "" : "profile-summry-edit"
                            }`}
                        >
                          <textarea
                            value={location}
                            placeholder="Lahore,Punjab"
                            onChange={(e) => {
                              setLocation(e.target.value);
                              handleFieldChange("location", e.target.value)
                            }}
                          ></textarea>
                        </div>

                      </div>
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
                      userType="organization"
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
                    <div className="shortlisted-filters-bar">
                      <div className="user-search">
                        <form>
                          <input type="search" placeholder="Quick Search" />
                        </form>
                      </div>
                      <div className="filters-buttons">
                        <button className="calendar-button">
                          12-04-2024
                          <div className="calendar-icon"></div>
                        </button>
                        <select>{console.log(jobService.statuses)}
                          <option key="all" value="all">All Statuses</option>
                          {
                            jobService.statuses.map((status) => (
                               <option key={status} value={status}>{status}</option>
                            ))
                          }
                          {/* cleanup */}
                          {/* <option value="Value1">Interviewed</option>
                          <option value="Value2">Interviewed 2</option>
                          <option value="Value3">Interviewed 3</option> */}
                        </select>
                        <select>
                          <option value="all">All JobTypes</option>
                          {
                            jobService.jobTypes.map((jobtype) => (
                              <option key={jobtype} value={jobtype}>{jobtype}</option>
                            ))
                          }
                          {/* cleanup */}
                          {/* <option value="Value1">Job Type</option>
                          <option value="Value2">Job Type 2</option>
                          <option value="Value3">Job Type 3</option> */}
                        </select>
                      </div>
                    </div>

                    {/* 
                    
                      Shortlisted section:

                      query job candidates
                    
                    
                    */}
                    <div className="shortlisted-tabs-content-area">
                      <div className="shortlisted-tabs-content">
                        {
                          currentCands.map((candidate) => (
                            <div className="profile-content-head">
                              <div className="profile-head-left">
                                <div className="profile-head-image">
                                  <img src={dummyProfile} alt="Avatar" />
                                </div>
                                <div className="profile-head-info">
                                  <h2 className="profile-head-title">
                                    {candidate.talentId.firstName || ""} {" "}
                                    {candidate.talentId.lastName || ""}
                                  </h2>
                                  <div className="profile-head-subtext">
                                    Jobs Applied for: <br></br>
                                    {candidate.orgJobs.map((title) => (
                                      <>
                                        <span>{title}</span><br/>
                                      </>
                                    ))}
                                  </div>
                                  <div className="profile-head-text">
                                    12-04-2024
                                  </div>
                                </div>
                              </div>
                              <div className="profile-head-right">
                                <button className="resume-btn fill-btn">
                                  <div className="play-icon">
                                    <img src={playIcon} alt="Play icon" />
                                  </div>
                                  View profile
                                </button>
                                <Link className="button outline resume-button">
                                  <div className="play-icon">
                                    <img src={eyeIcon} alt="Eye Icon" />
                                  </div>
                                  View video
                                </Link>
                              </div>
                            </div>
                          ))
                        }
                        {/* cleanup */}
                        {/* <div className="profile-content-head">
                          <div className="profile-head-left">
                            <div className="profile-head-image">
                              <img src={dummyProfile} alt="Avatar" />
                            </div>
                            <div className="profile-head-info">
                              <h2 className="profile-head-title">
                                Employee name
                              </h2>
                              <div className="profile-head-subtext">
                                Jobs Applied for
                              </div>
                              <div className="profile-head-text">
                                12-04-2024
                              </div>
                            </div>
                          </div>
                          <div className="profile-head-right">
                            <button className="resume-btn fill-btn">
                              <div className="play-icon">
                                <img src={playIcon} alt="Play icon" />
                              </div>
                              View profile
                            </button>
                            <Link className="button outline resume-button">
                              <div className="play-icon">
                                <img src={eyeIcon} alt="Eye Icon" />
                              </div>
                              View video
                            </Link>
                          </div>
                        </div>
                        {/*  */}
                        {/* <div className="profile-content-head">
                          <div className="profile-head-left">
                            <div className="profile-head-image">
                              <img src={dummyProfile} alt="Avatar" />
                            </div>
                            <div className="profile-head-info">
                              <h2 className="profile-head-title">
                                Employee name
                              </h2>
                              <div className="profile-head-subtext">
                                Jobs Applied for
                              </div>
                              <div className="profile-head-text">
                                12-04-2024
                              </div>
                            </div>
                          </div>
                          <div className="profile-head-right">
                            <button className="resume-btn fill-btn">
                              <div className="play-icon">
                                <img src={playIcon} alt="Play icon" />
                              </div>
                              View profile
                            </button>
                            <Link
                              href="#"
                              className="button outline resume-button"
                            >
                              <div className="play-icon">
                                <img src={eyeIcon} alt="Eye Icon" />
                              </div>
                              View video
                            </Link>
                          </div>
                        </div>
                        <div className="profile-content-head">
                          <div className="profile-head-left">
                            <div className="profile-head-image">
                              <img src={dummyProfile} alt="Avatar" />
                            </div>
                            <div className="profile-head-info">
                              <h2 className="profile-head-title">
                                Employee name
                              </h2>
                              <div className="profile-head-subtext">
                                Jobs Applied for
                              </div>
                              <div className="profile-head-text">
                                12-04-2024
                              </div>
                            </div>
                          </div>
                          <div className="profile-head-right">
                            <button className="resume-btn fill-btn">
                              <div className="play-icon">
                                <img src={playIcon} alt="Play icon" />
                              </div>
                              View profile
                            </button>
                            <Link
                              href="#"
                              className="button outline resume-button"
                            >
                              <div className="play-icon">
                                <img src={eyeIcon} alt="Eye Icon" />
                              </div>
                              View video
                            </Link>
                          </div>
                        </div>
                        <div className="profile-content-head">
                          <div className="profile-head-left">
                            <div className="profile-head-image">
                              <img src={dummyProfile} alt="Avatar" />
                            </div>
                            <div className="profile-head-info">
                              <h2 className="profile-head-title">
                                Employee name
                              </h2>
                              <div className="profile-head-subtext">
                                Jobs Applied for
                              </div>
                              <div className="profile-head-text">
                                12-04-2024
                              </div>
                            </div>
                          </div>
                          <div className="profile-head-right">
                            <button className="resume-btn fill-btn">
                              <div className="play-icon">
                                <img src={playIcon} alt="Play icon" />
                              </div>
                              View profile
                            </button>
                            <Link className="button outline resume-button">
                              <div className="play-icon">
                                <img src={eyeIcon} alt="Eye Icon" />
                              </div>
                              View video
                            </Link>
                          </div>
                        </div>  */}
                        <div className="custom-slider-pagination flex-between-center">
                          <button
                            className="custom-slick-nav custom-prev slick-arrow slick-disabled"
                            aria-disabled="true"
                            onClick={() =>
                              setCurrentCandPage(currentCandPage - 1)
                            }
                            disabled={currentCandPage === 1}
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
                            <span className="active">{currentCandPage}</span> of{" "}
                            <span className="total">{pageNumbers}</span>
                          </div>
                          <button
                            className="custom-slick-nav custom-next slick-arrow"
                            aria-disabled="false"
                            onClick={() =>
                              setCurrentCandPage(currentCandPage + 1)
                            }
                            disabled={currentCandPage === pageNumbers}
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
      {/* Is there a better way to do this? */}
      <div data-testid="current-tab" style={{ visibility: "hidden" }}>{tabName}</div>
    </>
  );
}
