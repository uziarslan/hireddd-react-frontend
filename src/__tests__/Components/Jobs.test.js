// Test all job dependencies across sites - Monte
// __tests__//Jobs.test.js
import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext.js";
import CreateJob from "../../Components/CreateJob.js";
import jobService from "../../services/jobService.js";
import AddTalentToJob from "../../Components/modals/AddTalentToJob.js";
import ProfilePage from "../../Components/ProfilePage.js";
import "../../../jest.setup.js";
import { BrowserRouter as Router } from 'react-router-dom';


// Mocking the jobService
jest.mock("../../services/jobService", () => ({
    createJob: jest.fn(),
    updateJob: jest.fn(),
    jobTypes: ["fulltime", "parttime", "Freelance"],
    getJobsbyOrgID: jest.fn(),
    getJobsForTalent: jest.fn(),
    updateCandidateStatusByJobTalent: jest.fn(),
}));

// Mocking the useNavigate hook
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
}));

const mockOnClose = jest.fn();

const dummyUser = {
    _id: "12345",
    firstName: "Test",
    lastName: "User",
    username: "testuser@example.com",
    profile: { path: "dummy-profile.jpg" },
    role: "organization",
};


function renderCreateJob(userValue = dummyUser) {
    return render(
      <AuthContext.Provider value={{ user: userValue }}>
        <MemoryRouter>
          <CreateJob />
        </MemoryRouter>
      </AuthContext.Provider>
    );
}

const renderProfilePageWithModal = (isOpen = true, talentId = "6789") => {
    return render(
      <AuthContext.Provider value={{ user: dummyUser }}>
        <MemoryRouter>
            <ProfilePage />
        </MemoryRouter>
      </AuthContext.Provider>
    );
};

// -- Create job --
describe("<CreateJob> - Rendering and Form Functionality", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    test("check if it renders the Create Job form", async () => {
      renderCreateJob();
      
      // Check if the form fields render
      expect(screen.getByTestId("create-job-title")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-description")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-responsibilities")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-skills")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-locations")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-salary")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-jobType")).toBeInTheDocument();
      expect(screen.getByTestId("create-job-expiry")).toBeInTheDocument();
    });
  
    test("check if input change are handled correctly", async () => {
      renderCreateJob();
      
      // Input fields interaction
      fireEvent.change(screen.getByTestId("create-job-title").querySelector('input'), {
        target: { value: "Software Engineer" },
      });
      fireEvent.change(screen.getByTestId("create-job-description").querySelector('textarea'), {
        target: { value: "We are hiring a software engineer..." },
      });
  
      await waitFor(() => {
        expect(screen.getByTestId("create-job-title")
            .querySelector('input').value)
            .toBe("Software Engineer");
        expect(screen.getByTestId("create-job-description")
            .querySelector('textarea').value)
            .toBe("We are hiring a software engineer...");
      });
    });
  
    test("check if toggle job type button toggles correctly", async () => {
      renderCreateJob();
      
      const fullTimeButton = screen.getByTestId("jobType-fulltime");
      const partTimeButton = screen.getByTestId("jobType-parttime");
  
      // Toggle fulltime job type
      fireEvent.click(fullTimeButton);
      await waitFor(() => {
        expect(fullTimeButton).toHaveClass("selected");
      });
  
      // Toggle parttime job type
      fireEvent.click(partTimeButton);
      await waitFor(() => {
        expect(partTimeButton).toHaveClass("selected");
      });
    });
  
    test("check if validation is triggered if title or description is empty", async () => {
      renderCreateJob();
  
      const submitButton = screen.getByTestId("create-job-submit");
  
      // Empty title and description should trigger an alert
      const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("Title and description are required");
      });
  
      mockAlert.mockRestore();
    });
  
    test("check if createJob service is called on form submission", async () => {
      renderCreateJob();
  
      fireEvent.change(screen.getByTestId("create-job-title").querySelector('input'), {
        target: { value: "Software Engineer" },
      });
      fireEvent.change(screen.getByTestId("create-job-description").querySelector('textarea'), {
        target: { value: "We are hiring a software engineer..." },
      });
  
      const submitButton = screen.getByTestId("create-job-submit");
  
      // Mock the service call to create a job
      jobService.createJob.mockResolvedValueOnce({
        _id: "job123",
        title: "Software Engineer",
        description: "We are hiring a software engineer...",
      });
  
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(jobService.createJob).toHaveBeenCalledWith(expect.objectContaining({
          title: "Software Engineer",
          description: "We are hiring a software engineer...",
        }));
      });
    });
  
    test("check if redirected to the dashboard after successful job creation", async () => {
      const mockNavigate = jest.fn(); // Creating a mock function for navigate
      useNavigate.mockReturnValue(mockNavigate); // mock navigate function
      renderCreateJob();
  
      fireEvent.change(screen.getByTestId("create-job-title").querySelector('input'), {
        target: { value: "Software Engineer" },
      });
      fireEvent.change(screen.getByTestId("create-job-description").querySelector('textarea'), {
        target: { value: "We are hiring a software engineer..." },
      });
  
      const submitButton = screen.getByTestId("create-job-submit");
  
      jobService.createJob.mockResolvedValueOnce({
        _id: "job123",
        title: "Software Engineer",
        description: "We are hiring a software engineer...",
      });
  
      fireEvent.click(submitButton);
  
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/organization/dashboard");
        // expect(window.location.pathname).toBe("/organization/dashboard");
      });
    });
});


// -- Add Profile -- 
