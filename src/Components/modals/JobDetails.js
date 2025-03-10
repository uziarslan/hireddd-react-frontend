// Job Details page - egbaiyelo
import React, { useState, useEffect } from "react";
import jobService from "../../services/jobService";
import Loading from "../Loading";


const JobDetails = ({ isOpen, onClose, Id }) => {

  const [job, setJob] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  useEffect(() => {
    const fetchJob = async () => {
      setIsLoading(true); 
      if (Id) {
        try {
          const jobData = await jobService.getJobById(Id);
          if (!jobData) {
            alert("Couldn't find Job");
            onClose(); 
          } else {
            setJob(jobData); 
          }
        } catch (error) {
          console.error("Error fetching job:", error);
          alert("Error fetching job data");
        }
      }
      setIsLoading(false); 
    };


    if (isOpen) {
      fetchJob(); 
    } else {
      setJob(null); 
    }

  }, [Id, isOpen, onClose]);

  // useEffect(() => {
  //   const fetchJob = async () => {
  //     if (Id) {
  //       const jobData = await jobService.getJobById(Id);
  //       if (!jobData) {
  //         alert("Couldn't find Job");
  //         onClose();  // Close the modal if no job is found.
  //       } else {
  //         setJob(jobData);
  //       }
  //     }
  //   };

  //   if (isOpen) {
  //     fetchJob();
  //   } else {
  //     setJob(null);  // Clear job data when the modal is closed
  //   }
  // }, [Id, isOpen, onClose]);

  if (!isOpen) return null;
  if (!job){
    // alert("bad call")
    return null;
  }

  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <div className="modal-overlay">
      <div className="modal-content job-detail popup-job-detail">
        {console.log(job)}

        <div className="flexed-header">
          <h3>Job Details</h3>

          <svg onClick={onClose} className="clickable"
            width="2em" height="2em" viewBox="0 0 24 24" fill="var(--hr_white)" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="var(--hr_black)"/>
            <path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0304L13.0607 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="var(--hr_white)"/>
          </svg>
        </div>


        <h2 className="job-popup-title">{job.title}</h2>


        <div className="jobdetail-set">
          <div>About this job</div>
          <p>{job.description || "No description available"}</p>
        </div>

        <div className="jobdetail-set">
          <div>Responsibilities</div>
          {
            job.responsibilities ? (

              <ul>
                {job.responsibilities.map(
                  (responsibility, index) => 
                    <li key={index}>{responsibility} </li>
                  )}
              </ul>
            ) : (
              <p>No responsibilities available</p>
            )
          }
        </div>
              
        <div className="jobdetail-set">
          <div>Skills Required</div>
          <div className="profile-edit-tags">
            {job.skills.map(
              (skill, index) => 
                <div key={index} className="profile-edit-tag">{skill}</div>
              )}
          </div>
        </div>
        
        <div className="jobdetail-set">
          <div>locations</div>
          {/* {console.log("locations", job.locations.join("\n"))} */}
          {
            job.locations && job.locations.length > 0 ? (

              job.locations.map((location, index) => 
                <span key={index} className="display-block">{location}</span>
              )
              
              // <p>{job.locations.join("\n")}</p>
            ) : (
              <p>No locations specified</p>
            )
          }        
        </div>

        <div className="jobdetail-set">
          <div>Company Size</div>
          { job.companySize || "Unknown company size" }
        </div>

        <div className="jobdetail-set">
          <div>Salary</div>
          <p>{job.salary || "No salary available"}</p>
        </div>

        <div className="jobdetail-set">
          <div>Job Type</div>
          { job.jobtype && job.jobtype.length > 0? (
            <p>{job.jobtype.join(", ")}</p>
          ) : (
            <p>No Jobtype information available</p>
          )}
        </div>

        { job.expiry != null ? (
          <div className="jobdetail-set">
            <div>Job Expiry</div>
            <p>{job.expiry}</p>
          </div>
        ) : null}

        <div>
          {/* No styling or functionality yet */}
          <button>
            Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
