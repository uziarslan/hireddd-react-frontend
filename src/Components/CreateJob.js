// Egbaiyelo
import React, { useState, useContext, useEffect } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import { AuthContext } from "../Context/AuthContext";
import jobService from "../services/jobService";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";


export default function CreateJob() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState(null); 

  const navigate = useNavigate();

  // Job properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [locations, setLocations] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [expiry, setExpiry] = useState("");



  useEffect(() => {
    if(user?.role && user.role !== 'organization') {
      navigate('/');
    }


    if (job) {
      if(job.orgId !== user._id)
        navigate('/');

      setIsLoading(false);

      setTitle(job.title || "");
      setDescription(job.description || "");
      setResponsibilities(job.responsibilities?.join('\n') || "");
      setSkills(job.skills || "");
      setLocations(job.locations || "");
      setSalary(job.salary || "");
      setJobType(job.jobType || "");
      setExpiry(job.expiry || "");
    }
  }, [user, job, navigate]);


  // const handleResponsibilitiesChange = (e) => {
  //   const lines = e.target.value.split('\n');
  //   const bulletLines = lines.map(line => line.trim() ? `• ${line}` : '').join('\n');
  //   setResponsibilities(bulletLines);
  // };

  // const resizeTextarea = () => {
  //   if (textareaRef.current) {
  //     textareaRef.current.style.height = 'auto'; // Reset height
  //     textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to scrollHeight
  //   }
  // };

  // useEffect(() => {
  //   resizeTextarea(); // Resize when the component first mounts or when responsibilities change
  // }, [responsibilities]);

  // Also make editable textboxes so we can add divs and stuff and bulletpoints

  const toggleJobType = (type) => {
    setJobType(prevState => {
      if (prevState.includes(type)) {
        console.log("removing ", type, jobType)
        return prevState.filter(item => item !== type); 
      } else {
        console.log("adding", type, jobType)
        return [...prevState, type]; 
      }
    });
  };

  const handleSubmit = async () => {

    // Rewuired fields
    if (!title.trim() || !description.trim()){
      alert("Title and description are required");
    }

    const formattedExpiry = new Date("");

    if (expiry) {
      const datePattern = /^\d{4}-\d{2}-\d{2}$/;

      if (datePattern.test(expiry) || expiry === '') {
        const [year, month, day] = expiry.split('-');
  
        const currentDate = new Date();
        if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= currentDate.getFullYear()) {
          setExpiry(expiry);
        } else {
          alert('Invalid date: Month should be 01-12 and Day should be 01-31.');
        }
      } else {
        alert('Invalid format: Please use yyyy-mm-dd.');
      }



    }

    const jobData = {
      orgId: user._id,
      title,
      description, 
      responsibilities: responsibilities.split('\n'),  
      skills,
      locations, 
      salary, 
      jobType,
      expiry: formattedExpiry,
    }

    try {
      if (job){
        const updatedJob = await jobService.updateJob(job._id, jobData);
        setJob(updatedJob);
      } else {
        const newJob = await jobService.createJob(jobData);
        setJob(newJob);
      }

    } catch (error) {
      console.error("Error managing job:", error);
    }
  };


  if (isLoading && !user) return <Loading isLoading={isLoading} />;
  

  return (
    <>
      <DashNav
        profile={user?.profile?.path || dummyProfile }
        firstName={user?.firstName}
      />

      <main id="main-section" className="main-section">
        <div className="wrapper wide-1230">
          <div className="profile-content-area createjob-form">
            <div className="profile-edit-options">

              <h3 id="createjob-title">{job ? "Edit a job" : "Create a job"}</h3>


              {/* Title */}
              <div className="createjob-edit-title">Title</div>
              <div className="profile-edit-text">
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              {/* Editable
              <div className="createjob-edit-title">Editable</div>
              <div className="profile-edit-text">
                <div
                  placeholder=""
                  value={description}
                  className="content-area"
                  contentEditable="true"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  // dangerouslySetInnerHTML={{ __html: content }}
                  style={{ minHeight: '100px', border: '1px solid #ccc', padding: '10px' }}
                />
              </div> */}

              {/* Description */}
              <div className="createjob-edit-title">Description</div>
              <div className="profile-edit-text">

                <textarea
                  value={description}
                  placeholder=""
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>


              {/* Responsibilities */}
              <div className="createjob-edit-title">Responsibilities</div>
              <div className="profile-edit-text">

                <textarea
                  // ref={textareaRef} 
                  value={responsibilities}
                  placeholder=""
                  onChange={(e) => {
                    // handleResponsibilitiesChange;
                    setResponsibilities(e.target.value);
                  }}
                ></textarea>
              </div>


              {/* Skills */}
              <div className="createjob-edit-title">Skills</div>
              <div className="profile-edit-text">

                <textarea
                  value={skills}
                  placeholder=""
                  onChange={(e) => {
                    setSkills(e.target.value);
                  }}
                ></textarea>
              </div>


              {/* Locations */}
              <div className="createjob-edit-title">Locations</div>
              <div className="profile-edit-text">
                <input
                  type="text"
                  value={locations}
                  placeholder="Location"
                  onChange={(e) => setLocations(e.target.value)}
                />
              </div>


              {/* Salary */}
              <div className="createjob-edit-title">Salary</div>
              <div className="profile-edit-text">
                <input
                  type="text"
                  value={salary}
                  placeholder="Salary"
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>


              {/* Job Type */}
              <div className="createjob-edit-title">Job Type</div>
              <div className="createjob-edit-text">
                <div className="job-type-toggle">

                  {/* Restyle to div for more flexibility */}
                  {jobService.jobTypes.map((type) => (
                    <button
                      key={type} 
                      type="button"
                      className={`job-toggle-btn ${jobType.includes(type) ? "selected" : ""}`}
                      onClick={() => toggleJobType(type)}
                    >
                      {type} 
                    </button>
                  ))}


                </div>
              </div>


              {/* Expiry */}
              <div className="createjob-edit-title">Expiry</div>
              <div className="profile-edit-text">
                <input
                  type="text"
                  value={expiry}
                  placeholder="YYYY-MM-DD"
                  onChange={(e) => setExpiry(e.target.value)}
                />
              </div>

              <div className="createjob-form-btns">

                <Link
                  to={"/organization/profile"}
                >
                  <button
                    className="button outline resume-button"
                  >
                    Cancel
                  </button>
                </Link>
                <button
                  onClick={handleSubmit}
                >
                  Continue
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>
    </>
  );
};

