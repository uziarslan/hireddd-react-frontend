// __tests__//OrgDash.test.js

import React from "react";
import { render, screen, fireEvent, waitFor, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import OrgDash from "../../Components/OrgDash";
import jobService from "../../services/jobService";
import "../../../jest.setup.js";
import axiosInstance from "../../services/axiosInstance";
import axiosInstanceChat from "../../services/axiosInstanceChat";
import userEvent from "@testing-library/user-event";

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
    get: jest.fn(() => {
        return Promise.resolve({
            data: [
            {
                _id: "chat123",
                organization: { firstName: "TechCorp", profile: { path: "org-profile.jpg" } },
                talent: { firstName: "Jane", profile: { path: "talent-profile.jpg" }, location: "New York" },
            },
            ],
        });
    }),
    post: jest.fn(() => Promise.resolve({ data: {} })),
}));
  

jest.mock("../../services/jobService", () => ({
    getJobsbyOrgId: jest.fn().mockResolvedValue([]), 
}));

jest.mock("../../services/authService", () => ({
    getUser: jest.fn().mockResolvedValue({
      _id: "12345",
      firstName: "Man",
      lastName: "Ager",
      companyName: "Random Corp",
      username: "manager@example.com",
      phone: "+1234567890",
      about: "World-leading corporation in random stuff",
    }),
  }));



// --- 2) CREATE A DUMMY ORGUSER ---
const dummyUser = {
    _id: "12345",
    firstName: "Man",
    lastName: "Ager",
    username: "manager@example.com",
    phone: "+1234567890",
    profile: { path: "dummy-profile-path.jpg" },
    about: "World-leading corporation in random stuff",
    video: { path: "dummy-resume.mp4" },
    role: "organization",
    website: "https://www.siliconmechanics.com",
    industry: "Computer science",
    location: "Mirabel",
    companySize: "50-100",
    documents: [],
    // portfolios: [{ href: "https://github.com/jane" }], // The first item is typically a placeholder; subsequent items are user links
  };
  
  
  // --- 3) WRAP THE COMPONENT RENDER ---
  function renderOrgDash(userValue = dummyUser) {
    return render(
      <AuthContext.Provider
        value={{
          user: userValue,
          updateUser: jest.fn(), // Mock updateUser if you want to test updates
        }}
      >
        <MemoryRouter>
          <OrgDash />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  }
  
  describe("Initial Organization user information", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      jobService.getJobsbyOrgId.mockResolvedValueOnce([]);
      axiosInstance.get.mockResolvedValueOnce({ data: [] });
  
    });  

    //------User Information rendering tests------------
    test("check if orgUser summary renders", async () => {
        renderOrgDash();
        const summarySection = await screen.findByTestId("org-summary");
        const summaryText = within(summarySection).getByRole('textbox'); 
        expect(summaryText.value).toBe("World-leading corporation in random stuff");
    });
    
    test("check if orgUser website renders", async () => {
      renderOrgDash();
      const webSection = await screen.findByTestId("org-website");
      const links = within(webSection).getAllByText(/https:\/\/www.siliconmechanics.com/i);
      expect(links).toHaveLength(2); // Expect two elements containing the URL
      expect(links[0]).toBeInTheDocument(); // (anchor)
      expect(links[1]).toBeInTheDocument(); // (textarea)   
    });

    test("check if orgUser industry renders", async () => {
        renderOrgDash();
        const industrySection = await screen.findByTestId("org-industry");
        const industryText = within(industrySection).getByRole('textbox'); 
        expect(industryText.value).toBe("Computer science");
    });

    test("check if orgUser companySize renders", async () => {
        renderOrgDash();
        const companySizeSection = await screen.findByTestId("org-companySize");
        const companySizeText = within(companySizeSection).getByRole('textbox'); 
        expect(companySizeText.value).toBe("50-100");
    });
   
    test("check if orgUser location renders", async () => {
        renderOrgDash();
        const locationSection = await screen.findByTestId("org-location");
        const locationText = within(locationSection).getByRole('textbox'); 
        expect(locationText.value).toBe("Mirabel");
    });
    
  
  });
  
  describe("Swap tabs", () => { 
    beforeEach(() => {
      jest.clearAllMocks();
      jobService.getJobsbyOrgId.mockResolvedValueOnce([]);
      axiosInstance.get.mockResolvedValueOnce({ data: [] });
    });
  
    test("check if user findTalents appear when findTalents tab clicked.", async () => {
        renderOrgDash();
        const findTalentsTab = screen.getByTestId("findTalents-tab");
        userEvent.click(findTalentsTab);
        await waitFor(() => {
          expect(screen.getByTestId("current-tab")).toHaveTextContent("findTalents");
        });
      });
  
    test("check if user messages appear when messages tab clicked.", async () => {
      renderOrgDash();
      const messagesTab = screen.getByTestId("messages-tab");
      userEvent.click(messagesTab);
      await waitFor(() => {
        expect(screen.getByTestId("current-tab")).toHaveTextContent("messages");
      });
    });
  
    test("check if user profile appear when profile tab clicked.", async () => {
        renderOrgDash();
        const profileTab = screen.getByTestId("profile-tab");
        userEvent.click(profileTab);
        await waitFor(() => {
          expect(screen.getByTestId("current-tab")).toHaveTextContent("profile");
        });
    });
    
    test("check if user hiredddStatus appear when hiredddStatus tab clicked.", async () => {
        renderOrgDash();
        const hiredddStatusTab = screen.getByTestId("hiredddStatus-tab");
        userEvent.click(hiredddStatusTab);
        await waitFor(() => {
          expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
        });
      });
  
  });
