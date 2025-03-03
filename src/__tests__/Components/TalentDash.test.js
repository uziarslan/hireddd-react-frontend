import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TalentDash from "../../Components/TalentDash";
import { AuthContext } from "../../Context/AuthContext";
import jobService from "../../services/jobService";

// --- 1) MOCK THE SERVICE CALLS ---
// Instead of calling the real endpoint, we mock the service
jest.mock("../../services/jobService", () => ({
  getJobsForTalent: jest.fn(),
}));

// --- 2) CREATE A DUMMY USER ---
const dummyUser = {
  _id: "12345",
  firstName: "Jane",
  lastName: "Doe",
  username: "janedoe@example.com",
  phone: "+1234567890",
  profile: { path: "dummy-profile-path.jpg" },
  location: "New York",
  skills: ["React", "Node.js"],
  about: "Software developer with a focus on React and Node.js.",
  video: { path: "dummy-resume.mp4" },
  role: "talent",
  documents: [],
  portfolios: [{ href: "https://github.com/jane" }], // The first item is typically a placeholder; subsequent items are user links
};

// --- 3) WRAP THE COMPONENT RENDER ---
function renderTalentDash(userValue = dummyUser) {
  return render(
    <AuthContext.Provider
      value={{
        user: userValue,
        updateUser: jest.fn(), // Mock updateUser if you want to test updates
      }}
    >
      <MemoryRouter>
        <TalentDash />
      </MemoryRouter>
    </AuthContext.Provider>
  );
}

describe("TalentDash Component", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  test("renders user's name and default 'My Profile' tab", async () => {
    // Mock the jobService.getJobsForTalent response
    jobService.getJobsForTalent.mockResolvedValueOnce([]);

    renderTalentDash();

    // The user’s first name should appear:
    expect(await screen.findByText(/Jane/i)).toBeInTheDocument();

    // The default tab is "My Profile," so check for the summary label
    expect(screen.getByText(/Summary/i)).toBeInTheDocument();

    // The "Messages" tab should be in the document but not active
    expect(screen.getByText(/Messages/i)).toBeInTheDocument();
  });

  test("switches to the 'Messages' tab when clicked", async () => {
    // Mock the jobService.getJobsForTalent response
    jobService.getJobsForTalent.mockResolvedValueOnce([]);

    renderTalentDash();

    // Click the 'Messages' link
    fireEvent.click(screen.getByText(/Messages/i));

    // Expect some text or element from the Messages screen to appear
    // For instance, there's a "Select a chat to start messaging" text by default
    expect(await screen.findByText(/Select a chat to start messaging/i)).toBeInTheDocument();

    // The summary text from the Profile tab should not be visible now
    expect(screen.queryByText(/Summary/i)).not.toBeInTheDocument();
  });

  test("switches to 'Hireddd Status' tab when clicked", async () => {
    jobService.getJobsForTalent.mockResolvedValueOnce([]);

    renderTalentDash();

    // Click the 'Hireddd Status' link
    fireEvent.click(screen.getByText(/Hireddd Status/i));

    // Expect the "Shortlisted" sub-tab to be visible
    expect(await screen.findByText(/Shortlisted/i)).toBeInTheDocument();
  });

  test("shows 'upload resume' button and resume link", async () => {
    jobService.getJobsForTalent.mockResolvedValueOnce([]);

    renderTalentDash();

    // Check that the "Upload resume" button is present
    expect(await screen.findByText(/Upload resume/i)).toBeInTheDocument();

    // Check that there is a link or button that says "View resume"
    expect(screen.getByText(/View resume/i)).toBeInTheDocument();
  });

  test("displays user skills correctly", async () => {
    jobService.getJobsForTalent.mockResolvedValueOnce([]);

    renderTalentDash();

    // Wait for component to finish loading user data
    await waitFor(() => {
      expect(screen.getByText(/React/i)).toBeInTheDocument();
      expect(screen.getByText(/Node.js/i)).toBeInTheDocument();
    });
  });

  test("calls jobService.getJobsForTalent on load", async () => {
    // Mock array of jobs to be returned
    const mockJobs = [
      {
        jobId: {
          _id: "job123",
          title: "Frontend Developer",
          location: "Remote",
          orgId: { profile: { path: "company-logo.jpg" } },
        },
        status: "Shortlisted",
      },
    ];
    jobService.getJobsForTalent.mockResolvedValueOnce(mockJobs);

    renderTalentDash();

    // jobService should have been called with the user’s ID
    expect(jobService.getJobsForTalent).toHaveBeenCalledWith("12345");

    // Check if the job title eventually appears
    expect(await screen.findByText(/Frontend Developer/i)).toBeInTheDocument();
  });
});