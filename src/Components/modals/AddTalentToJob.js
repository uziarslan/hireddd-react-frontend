// Job addto page - egbaiyelo
import React, { useState, useEffect, useContext } from "react";
import jobService from "../../services/jobService";
import Loading from "../Loading";
import { AuthContext } from "../../Context/AuthContext";

const AddTalentToJob = ({ isOpen, onClose, talentId }) => {

  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState(null)
  // const [candidateJobs, setCandidateJobs] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  // const [selectedStatuses, setSelectedStatuses] = useState({});
  const [statusMap, setStatusMap] = useState({});

  const statuses = jobService.statuses

  useEffect(() => {
    // const statusMap = {}

    const fetchJobs = async () => {

      if (talentId && user) {
        try {
          setIsLoading(true); 

          //- refactor logic
          const jobData = await jobService.getJobsbyOrgID(user._id);
          // console.log("user if", user._id, jobData)
          if (!jobData) {
            alert("Couldn't find Jobs");
            onClose(); 
            return;
          }
          setJobs(jobData); 


          const candidateData = await jobService.getJobsForTalent(talentId)
          // console.log(candidateData)
          if (!candidateData) {
            // If candidate has no jobs, it still returns something
            alert("Couldn't find candidate Jobs");
            onClose(); 
            return;
          }
          console.log(candidateData)
          // setCandidateJobs(candidateData); 

          // console.log("jobdata#######################", jobData)
          // jobData.forEach((job) => {
          //   console.log("candidatedatas", candidateData)
          //   if (Array.isArray(candidateJobs)) {
          //     const statusForJob = candidateJobs.find(
          //       (candidate) => candidate.jobId._Id === job._Id
          //     )
          //     console.log("gto", statusForJob)
          //     // console.log("sta$$$$$$$$$$$$t", statusForJob)
          //     // console.log(statusMap)
          //     // console.log("i got",statusForJob)
          //     if (statusForJob){
          //       statusMap[job._id] = statusForJob.status;
          //     } else {
          //       statusMap[job._id] = "";
          //     }
          //   } else {
          //     statusMap[job._id] = "";
          //   }
          // })


          // Compute statusMap
          const newStatusMap = jobData.reduce((map, job) => {
            const statusForJob = candidateData.find(candidate => candidate.jobId._id === job._id);
            map[job._id] = statusForJob ? statusForJob.status : "";
            return map;
          }, {});

          console.log(newStatusMap)


          setStatusMap(newStatusMap);

        } catch (error) {
          console.error("Error fetching job:", error);
          // console.log("job data so far, ",jobData)
          alert("Error fetching job data");
        } finally {
          setIsLoading(false); 
        }
      }
    };


    if (isOpen) {
      fetchJobs(); 
    } else {
      setJobs(null); 
      // setCandidateJobs(null)
    }

  }, [user, talentId, isOpen, onClose, ]);

  //
  const handleStatusChange = async (jobIndex, status) => {

    console.log("i got", jobIndex, talentId, status)
    try {
      await jobService.updateCandidateStatusByJobTalent( jobIndex, talentId, status )

      setStatusMap((prevState) => ({
        ...prevState,
        [jobIndex]: status,
      }));

    } catch (error) {
      alert("Unable to update status")
    }
  };

 
  if (!isOpen) return null;
  if (!jobs) return null;
  
  if (isLoading) return <Loading isLoading={isLoading} />;

  return (
    <div className="modal-overlay">
      <div className="modal-content job-detail">

        <div className="flexed-header">
          <h3>Add To</h3>

          <div>
            <svg onClick={onClose} className="clickable"
                width="2em" height="2em" viewBox="0 0 24 24" fill="var(--hr_white)" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="var(--hr_black)"/>
                <path d="M8.96967 8.96967C9.26256 8.67678 9.73744 8.67678 10.0303 8.96967L12 10.9394L13.9697 8.96969C14.2626 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0304L13.0607 12L15.0303 13.9696C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0304 15.0303C9.73746 15.3232 9.26258 15.3232 8.96969 15.0303C8.6768 14.7374 8.6768 14.2626 8.96969 13.9697L10.9394 12L8.96967 10.0303C8.67678 9.73744 8.67678 9.26256 8.96967 8.96967Z" fill="var(--hr_white)"/>
              </svg>
          </div>
        </div>

        {/* Its reactive but maybe still display success message */}
        {
          jobs && jobs.length > 0 ? (
            jobs.map(
              (job, jobIndex) => 
                <div key={jobIndex}>
                  <fieldset>
                    <div>{job.title}</div>

                    { statuses.map((status, statusIndex) => 
                      <div key={statusIndex}>
                        <input type="radio" 
                          id={`${job._id}-${status}`} 
                          name={job._id} 
                          value={status} 
                          checked={statusMap[job._id] === status} 
                          onChange={() => {console.log("here, ", statusMap); handleStatusChange(job._id, status)}}
                        />
                        <label for={`${job._id}-${status}`}>{status}</label>
                      </div>
                    )}
                  </fieldset>
                </div>
            )
          ) : (null)
        }

      </div>
    </div>
  );
};

export default AddTalentToJob;
