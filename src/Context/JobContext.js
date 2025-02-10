import React, { createContext, useState, useContext } from "react";
import jobService from "../services/jobService"; 

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    // Maybe job array or just none
    //   const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

  // Fetch all jobs
    const getJobsbyOrgID = async (orgID) => {
        try {
            const response = await jobService.getJobsbyOrgID(orgID);
            setJobs(response);
        } catch (error) {
        //   setError("Failed to fetch jobs");
        } 
    };

    // Get job by ID
    const getJobById = async (jobId) => {
        try {
            const response = await jobService.getJobById(jobId);
            return response;
        } catch (error) {
        //   setError("Failed to fetch job");
        }
    };

    // Create a new job
    const createJob = async (jobData) => {
        try {
            const response = await jobService.createJob(jobData);
            setJobs((prevJobs) => [...prevJobs, response]); // Optionally add the new job to the state
            return response;
        } catch (error) {
        //   setError("Failed to create job");
        } 
    };

    // Update an existing job
    const updateJob = async (jobId, jobData) => {
        try {
            const response = await jobService.updateJob(jobId, jobData);
            setJobs((prevJobs) => prevJobs.map((job) => (job._id === jobId ? response : job))); // Update the job in the state
            return response;
        } catch (error) {
            // setError("Failed to update job");
        } 
    };

    //-- Candidates --

    // Fetch candidates for a specific job
    const getCandidatesForJob = async (jobId) => {
        try {
            const data = await jobService.getCandidatesForJob(jobId);
            return data;
        } catch (error) {
            // setError("Failed to fetch candidates");
        } 
    };

    // Update candidate status
    const updateCandidateStatus = async (candidateId, status) => {
        try {
            const data = await jobService.updateCandidateStatus(candidateId, status);
            return data;
        } catch (error) {
            setError("Failed to update candidate status");
        } 
    };

    return (
        <JobContext.Provider
        value={{
            jobs,
            error,
            getJobsbyOrgID,
            getJobById,
            createJob,
            updateJob,
            getCandidatesForJob,
            updateCandidateStatus,
        }}
        >
            {children}
        </JobContext.Provider>
    );
};

