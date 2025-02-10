// Egbaiyelo
import axios from "axios";

const API_URL = process.env.REACT_APP_PUBLIC_URL + "/jobs";
const CANDIDATE_API_URL = process.env.REACT_APP_PUBLIC_URL + "/jobCandidates"; 

//-- Jobs --
// Fetch all jobs by orgID
const getJobsbyOrgID = async (orgId) => {
  try {
    const response = await axios.get(`${API_URL}/org/${orgId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching jobs by org");
  }
};

// Get a job by ID
const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching job by ID");
  }
};

// Create a new job
const createJob = async (jobData) => {
  try {
    const response = await axios.post(API_URL, jobData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating job");
  }
};

// Update job details
const updateJob = async (jobId, jobData) => {
  try {
    const response = await axios.put(`${API_URL}/${jobId}`, jobData);
    return response.data;
  } catch (error) {
    throw new Error("Error updating job");
  }
};

// Delete a job
// const deleteJob = async (jobId) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${jobId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error("Error deleting job");
//   }
// };

// Create a new candidate
const createCandidate = async (candidateData) => {
  try {
    const response = await axios.post(CANDIDATE_API_URL, candidateData);
    return response.data;
  } catch (error) {
    throw new Error("Error creating candidate");
  }
};

//-- Candidates --
// Update candidate status (by candidateId)
const updateCandidateStatus = async (candidateId, status) => {
  try {
    const response = await axios.put(`${CANDIDATE_API_URL}/${candidateId}`, { status });
    return response.data;
  } catch (error) {
    throw new Error("Error updating candidate status");
  }
};

// Update candidate status by jobId and talentId
const updateCandidateStatusByJobTalent = async (jobId, talentId, status) => {
  try {
    const response = await axios.put(`${CANDIDATE_API_URL}/job/${jobId}/talent/${talentId}`, { status });
    return response.data;
  } catch (error) {
    throw new Error("Error updating candidate status by job and talent");
  }
};

// Get all candidates for a particular job
const getCandidatesForJob = async (jobId) => {
  try {
    const response = await axios.get(`${CANDIDATE_API_URL}/job/${jobId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching candidates for job");
  }
};

// Get all jobs for a specific talent
const getJobsForTalent = async (talentId) => {
  try {
    const response = await axios.get(`${CANDIDATE_API_URL}/talent/${talentId}`);

        // // Defaulting
        // const jobsWithDefaults = jobs.map(job => ({
        //   ...job,
        //   description: job.description || '',
        //   responsibilities: job.responsibilities || [],
        //   skills: job.skills || [],
        //   locations: job.locations || [],
        //   salary: job.salary || '',
        //   jobType: job.jobType || '',
        //   companySize: job.companySize || '',
        // }));
    return response.data;
  } catch (error) {
    throw new Error("Error fetching jobs for talent");
  }
};

// Delete a candidate from a job
// const deleteCandidate = async (jobId, talentId) => {
//   try {
//     const response = await axios.delete(`${CANDIDATE_API_URL}/job/${jobId}/talent/${talentId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error("Error deleting candidate");
//   }
// };

const jobService = {
  createJob,
  getJobById,
  getJobsbyOrgID,
  updateJob,
//   deleteJob,
  createCandidate,
  updateCandidateStatus,
  updateCandidateStatusByJobTalent,
  getCandidatesForJob,
  getJobsForTalent,
//   deleteCandidate,
};

export default jobService;
