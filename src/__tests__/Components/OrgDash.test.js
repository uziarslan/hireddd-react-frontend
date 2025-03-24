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
  
// global.console.warn = jest.fn();

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
    statuses: ["open", "closed", "pending"],
    jobTypes: ["parttime", "fulltime"]
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
  
  describe("<OrgDash> - Initial Organization user information", () => {
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
  
  describe("<OrgDash> - Swap tabs", () => { 
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

  describe("<OrgDash> - Edit Functionality", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      axiosInstance.get.mockResolvedValueOnce({
        data: [],
      });
    });
  
    test("should toggle 'About' edit mode on clicking pencil icon", async () => {
      renderOrgDash();
      const editButton = screen.getByTestId("org-profile").querySelector('.edit-button');
      userEvent.click(editButton);
      const textArea = screen.getByTestId("org-summary").querySelector('textarea');
      expect(textArea).toBeInTheDocument();
    });
  
    test("should close edit mode when close button is clicked", async () => {
      renderOrgDash();
      const editButton = screen.getByTestId("org-profile").querySelector('.edit-button');
      userEvent.click(editButton);
      const closeButton = screen.getByTestId("org-profile").querySelector('.edit-button');
      console.log("__________________",closeButton)
      userEvent.click(closeButton);
      const summarySection = await screen.findByTestId("org-summary");
      const summaryText = summarySection.querySelector('textarea');
      expect(summaryText.value).toBe("World-leading corporation in random stuff");
    });
  
    test("should save changes when the save button is clicked", async () => {
      renderOrgDash();
      const editButton = screen.getByTestId("org-profile").querySelector('.edit-button');
      userEvent.click(editButton);
      const textArea = screen.getByTestId("org-summary").querySelector('textarea');
      userEvent.clear(textArea);
      userEvent.type(textArea, "Updated company description.");
      const saveButton = screen.getByTestId("org-profile").querySelector('.profile-txtbx-done');
      userEvent.click(saveButton);
      await waitFor(() => {
        expect(screen.getByTestId("org-summary")).toHaveTextContent("Updated company description.");
      });
    });
  });

  describe("<OrgDash> - Error Handling", () => {
    // They all use the same method which is great for test so we can just pick one
    beforeEach(() => {
      jest.clearAllMocks();
      axiosInstance.get.mockResolvedValueOnce({
        data: [],
      });
    });

    test("Check if empty field causes alert", async () => {
      const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
      renderOrgDash();
    
      const editButton = screen.getByTestId("org-profile").querySelector('.edit-button');
      // console.log("btton", editButton)
      
      userEvent.click(editButton);
    
      const textarea = screen.getByTestId("org-summary").querySelector('textarea');
      fireEvent.change(textarea, { target: { value: '' } }); // Clear the textarea
    
      const saveButton = screen.getByTestId("org-profile").querySelector('.profile-txtbx-done');
      userEvent.click(saveButton);
    
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("about section cannot be empty!");
      });
    
      mockAlert.mockRestore();
    });
  
    test("should handle failed API call when saving changes", async () => {
      axiosInstance.post.mockRejectedValueOnce(new Error("Network Error"));
      const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});

      renderOrgDash();
      const profileSection = screen.getByTestId("org-profile");
      // const aboutSection = screen.getByTestId("org-summary");

      const editButton = profileSection.querySelector('.edit-button');
      userEvent.click(editButton);
      const textArea = profileSection.querySelector("textarea");
      // userEvent.clear(textArea);
      fireEvent.change(textArea, { target: { value: '' } });
      userEvent.type(textArea, "New about text.");
      const saveButton = profileSection.querySelector(".profile-txtbx-done");
      userEvent.click(saveButton);
      await waitFor(() => {
        expect(mockAlert).toHaveBeenCalledWith("An error occurred while updating the about section.");
      });
      mockAlert.mockRestore();

    });
  });




  describe("Create Job", () => { 
    // beforeEach(() => {
    //   jest.clearAllMocks();
    //   jobService.getJobsbyOrgId.mockResolvedValueOnce([]);
    //   axiosInstance.get.mockResolvedValueOnce({ data: [] });
  
    // }); 
    
    // Tested in jobs
    // test("check if user create job appears when createjob button is clicked.", async () => {
    //   renderOrgDash();
    //   const createJobButton = screen.getByTestId("org-create-job").querySelector('button');
    //   userEvent.click(createJobButton);
    //   await waitFor(() => {
    //     expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
    //   });
    // });

  //   test("check if createJob title renders", async () => {
  //     renderOrgDash();
  //     const hiredddStatusTab = screen.getByTestId("hiredddStatus-tab");
  //     userEvent.click(hiredddStatusTab);
  //     await waitFor(() => {
  //       expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
  //     });
  //   });

  //   test("check if createJob description renders", async () => {
  //     renderOrgDash();
  //     const hiredddStatusTab = screen.getByTestId("hiredddStatus-tab");
  //     userEvent.click(hiredddStatusTab);
  //     await waitFor(() => {
  //       expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
  //     });
  //   });

  //   test("check if cancel button returns to orgdash.", async () => {
  //     renderOrgDash();
  //     const hiredddStatusTab = screen.getByTestId("hiredddStatus-tab");
  //     userEvent.click(hiredddStatusTab);
  //     await waitFor(() => {
  //       expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
  //     });
  //   });

    // test("check if submit button returns to orgdash.", async () => {
    //   renderOrgDash();
    //   const hiredddStatusTab = screen.getByTestId("hiredddStatus-tab");
    //   userEvent.click(hiredddStatusTab);
    //   await waitFor(() => {
    //     expect(screen.getByTestId("current-tab")).toHaveTextContent("hiredddStatus");
    //   });
    // });

  })
