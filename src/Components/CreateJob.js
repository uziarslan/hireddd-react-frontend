// Egbaiyelo
import React, { useState, useContext, useEffect, useRef } from "react";
import "../Assets/Css/styles.min.css";
import { Link } from "react-router-dom";
import DashNav from "./DashNav";
import { AuthContext } from "../Context/AuthContext";
import jobService from "../services/jobService";
import dummyProfile from "../Assets/images/uploads/user-avatar.png";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

const closeSVG = () => (
  <svg width="2em" height="2em" viewBox="0 0 24 24" fill="var(--hr_purple)" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.8" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#6656bc"/>
  <path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0304L13.0607 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="var(--hr_white)"/>
  </svg>
)

export default function CreateJob() {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [job, setJob] = useState(null); 

  const navigate = useNavigate();
  const textareaRef = useRef(null);  // To access the DOM directly

  // const [tags, setTags] = useState([]);

  // const [input, setInput] = useState("");

  // const removeTag = (index) => {
  //   setTags(tags.filter((_, i) => i !== index));
  // };


  // Job properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [skills, setSkills] = useState("");
  const [locations, setLocations] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("");
  const [expiry, setExpiry] = useState("");

  const [jobs, setJobs] = useState([]);

  const [issues, setIssues] = useState([]);
  const [showJobs, setShowJobs] = useState("");


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

    const fetchJobs = async () => {
      try{
        const jobsList = await jobService.getJobsbyOrgID(user._id)
        console.log(jobsList)
        setJobs(jobsList)
      } catch (error) {
        console.error(error)
        alert("Trouble fetching data")
      }
    }
    fetchJobs()
  }, [user, job, navigate]);

  // To toggle between the job types if selected or not
  const toggleJobType = (type) => {
    setJobType(prevState => {
      if (prevState.includes(type)) {
        return prevState.filter(item => item !== type); 
      } else {
        return [...prevState, type]; 
      }
    });
  };

  const handleSubmit = async () => {

    // Required fields
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
      navigate("/organization/dashboard")

    } catch (error) {
      console.error("Error managing job:", error);
    }
  };

  // This lets it grow
  const handleTextAreaInput = (e) => {
    e.target.style.height = "auto"; // Reset height to auto so its adjustable
    if (e.target.style.height !== `${e.target.scrollHeight}px`) // So no unnecessary adjustments
      e.target.style.height = `${e.target.scrollHeight}px`; 
  };


  const handleTitleInput = (e) => {
    console.log(jobs, e)
    // if creating a job
    let foundJob;
    if (!job) {
      foundJob = jobs//.find((jobItem) => jobItem.title === e.target.value);
      // Query similarity but lowercased and spaces removed
      .find((jobItem) => {
        const normalizedJobTitle = (jobItem.title || '').toLowerCase().replace(/\s+/g, '');
        const normalizedInputValue = (e.target.value || '').toLowerCase().replace(/\s+/g, '');
        return normalizedJobTitle === normalizedInputValue;
      })
    } else {
      foundJob = jobs
        .filter((jobItem) => jobItem.id !== job.id)
        // .find((jobItem) => jobItem.title === e.target.value);
        .find((jobItem) => {
          const normalizedJobTitle = (jobItem.title || '').toLowerCase().replace(/\s+/g, '');
          const normalizedInputValue = (e.target.value || '').toLowerCase().replace(/\s+/g, '');
          return normalizedJobTitle === normalizedInputValue;
        })
    }

    if (foundJob) 
      setIssues((prevIssues) => [...prevIssues, 'duplicateTitle']);
    else setIssues((prevIssues) => prevIssues.filter(error => error !== 'duplicateTitle'));
  }

  let debounceTimeout;

  const handleDebouncedInput = (e) => {
    clearTimeout(debounceTimeout); // Clear the previous timeout

    debounceTimeout = setTimeout(() => {
      handleTitleInput(e); // Call the actual handler after delay
    }, 500); // Delay in ms (e.g., 500ms)
  };

  if (isLoading && !user) return <Loading isLoading={isLoading} />;
  

  return (
    <>
      <DashNav
        profile={user?.profile?.path || dummyProfile }
        firstName={user?.firstName}
      />

      <main id="main-section" className="main-section">
        <div className="wrapper ">

          {/* Show job button */}
          {
            showJobs ? (
              <button 
                className="show-job-button"
                onClick={() => setShowJobs(false)}>Remove Jobs</button>
            ) : (
              <button 
                className="show-job-button"
                onClick={() => setShowJobs(true)}>See Jobs</button>
            )
          }

          <div className={`createjob-form ${showJobs ? "profile-body-row" : "profile-content-area"}`}>
            <div className={`${showJobs ? "show-job-sidebar" : ""}`}>
              <div>
                {
                  showJobs ? (
                    <>
                      <h2>Your Jobs</h2> 
                      {
                      jobs.map((thisJob) => (
                        <>
                          <div className="edit-job-tab clickable" 
                            onClick={() => setJob(thisJob)}
                          >
                            <div className="createjob-edit-title show-job-title">{thisJob.title}</div>
                            <div>{thisJob.description}</div>
                          </div>
                        </>
                      ))}
                    </>
                  ) : (null)
                }
              </div>

            </div>
            <div className={`${showJobs ? "show-job-right" : ""}`}>
              <div className="profile-edit-options">

                <div className="flexed-header">
                  <h3 id="createjob-title">{job ? "Edit a job" : "Create a job"}</h3>
                  <Link 
                    to={"/organization/dashboard"}
                  >
                    {closeSVG()}
                  </Link>
                </div>


                {/* Title */}
                <div className="createjob-edit-title">Title</div>
                <div className="profile-edit-text" data-testid="create-job-title">
                  <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                    onInput={(e) => handleDebouncedInput(e)}
                  />
                  { issues.includes("duplicateTitle") ? (<div>NB: You already have a job by this name, - <span className="">edit instead?</span></div>) : (null)}
                </div>


                {/* Description */}
                <div className="createjob-edit-title">Description</div>
                <div className="profile-edit-text" data-testid="create-job-description">

                  <textarea
                    ref={textareaRef}
                    onInput={handleTextAreaInput}
                    value={description}
                    placeholder=""
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>


                {/* Responsibilities */}
                <div className="createjob-edit-title">Responsibilities</div>
                <div className="profile-edit-text" data-testid="create-job-responsibilities">

                  <textarea
                    // ref={textareaRef} 
                    // className="light-scrollbar"
                    value={responsibilities}
                    placeholder=""
                    onInput={handleTextAreaInput}
                    onChange={(e) => {
                      // handleResponsibilitiesChange;
                      setResponsibilities(e.target.value);
                    }}
                  ></textarea>
                </div>


                {/* Skills */}
                <div className="createjob-edit-title">Skills</div>
                <div className="profile-edit-text" data-testid="create-job-skills">

                  <textarea
                    value={skills}
                    placeholder=""
                    onInput={handleTextAreaInput}
                    onChange={(e) => {
                      setSkills(e.target.value);
                    }}
                  ></textarea>
                </div>


                {/* Locations */}
                <div className="createjob-edit-title">Locations</div>
                <div className="profile-edit-text" data-testid="create-job-locations">
                  <input
                    type="text"
                    value={locations}
                    placeholder="Location"
                    onChange={(e) => setLocations(e.target.value)}
                  />
                </div>


                {/* Salary */}
                <div className="createjob-edit-title">Salary</div>
                <div className="profile-edit-text" data-testid="create-job-salary">
                  <input
                    type="text"
                    value={salary}
                    placeholder="Salary"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </div>


                {/* Job Type */}
                <div className="createjob-edit-title">Job Type</div>
                <div className="createjob-edit-text"  data-testid="create-job-jobType">
                  <div className="job-type-toggle">

                    {/* Restyle to div for more flexibility */}
                    {jobService.jobTypes.map((type) => (
                      <button
                        key={type} 
                        data-testid={`jobType-${type}`}
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
                <div className="profile-edit-text" data-testid="create-job-expiry">
                  <input
                    type="text"
                    value={expiry}
                    placeholder="YYYY-MM-DD"
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                </div>

                <div className="createjob-form-btns">

                  <Link
                    to={"/organization/dashboard"}
                  >
                    <button
                      className="button outline resume-button"
                    >
                      Cancel
                    </button>
                  </Link>
                  <button
                    data-testid="create-job-submit"
                    onClick={handleSubmit}
                  >
                    Continue
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

