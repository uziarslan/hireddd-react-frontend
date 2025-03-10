import React from "react";
import { render, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TalentDash from "../../Components/TalentDash";
import { AuthContext } from "../../Context/AuthContext";
import jobService from "../../services/jobService";
import "../../../jest.setup.js";
import axiosInstance from "../../services/axiosInstance";
import axiosInstanceChat from "../../services/axiosInstanceChat";
import userEvent from "@testing-library/user-event";

// --- 1) MOCK THE SERVICE CALLS ---
// Instead of calling the real endpoint, we mock the service

// Mocking API Services
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
  })),
}));

jest.mock("../../services/axiosInstanceChat", () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("../../services/axiosInstance", () => ({
  get: jest.fn(() => {return Promise.resolve({data: [],});}),
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock("../../services/jobService", () => ({
  getJobsForTalent: jest.fn().mockResolvedValue([]), // Mock empty job response
}));

jest.mock("../../services/authService", () => ({
  getUser: jest.fn().mockResolvedValue({
    _id: "12345",
    firstName: "Jane",
    lastName: "Doe",
    username: "janedoe@example.com",
    phone: "+1234567890",
    about: "Software developer with a focus on React and Node.js.",
    skills: ["React", "Node.js"],
  }),
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

//----Dylan-----
describe("Initial Talent user information", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jobService.getJobsForTalent.mockResolvedValueOnce([]);
    axiosInstance.get.mockResolvedValueOnce({ data: [] });

  });  
  test("check if user summary renders", async () => {
    renderTalentDash();
    const summarySection = await screen.findByTestId("user-summary");
    expect(within(summarySection).getByText(/Software developer with a focus on React and Node.js./i)).toBeInTheDocument();
  });
  
  test("check if user skills render", async () => {
    renderTalentDash();
    const skillsList = await screen.findByTestId("skills-list");
    expect(within(skillsList).getByText(/React/i)).toBeInTheDocument();
    expect(within(skillsList).getByText(/Node.js/i)).toBeInTheDocument();
  });

  test("check if user phone & email render", async () => {
    renderTalentDash();
    const contactSection = await screen.findByTestId("user-contact");
    expect(within(contactSection).getByText(/janedoe@example.com/i)).toBeInTheDocument();
    expect(within(contactSection).getByText(/1234567890/i)).toBeInTheDocument();

  });

  //add more here

});

describe("Swap tabs", () => { 
  beforeEach(() => {
    jest.clearAllMocks();
    jobService.getJobsForTalent.mockResolvedValueOnce([]);
    axiosInstance.get.mockResolvedValueOnce({ data: [] });
  });

  test("check if user settings appear when settings tab clicked.", async () => {
    renderTalentDash(); 
    const settingsTab = screen.getByTestId("settings-tab");
    userEvent.click(settingsTab);
    await waitFor(() => {
      expect(screen.getByTestId("current-tab")).toHaveTextContent("settings");
    })
  });

  test("check if user messages appear when messages tab clicked.", async () => {
    renderTalentDash();
    const messagesTab = screen.getByTestId("messages-tab");
    userEvent.click(messagesTab);
    await waitFor(() => {
      expect(screen.getByTestId("current-tab")).toHaveTextContent("messages");
    });
  });

  test("check if hiredddd status appear when jobs tab clicked.", async () => {
    renderTalentDash();
    const jobsTab = screen.getByTestId("status-tab");
    userEvent.click(jobsTab);
    await waitFor(() => {
      expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
    });
  });
//-----------------------------------------
});