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
import { act } from "@testing-library/react";

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

const updateUserMock = jest.fn((update) => {
  Object.assign(dummyUser, update);
  rerenderTalentDash(); // Force React to pick up the change
});





// --- 2) CREATE A DUMMY USER ---
const dummyUser = {
  _id: "12345",
  firstName: "Jane",
  lastName: "Doe",
  username: "janedoe@example.com",
  phone: "123 456 7890",
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
        updateUser: updateUserMock, // Mock updateUser if you want to test updates
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
    expect(within(contactSection).getByText(/123 456 7890/i)).toBeInTheDocument();

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



//In these tests, once we have proper alerts, they should be added and checked to ensure they appear with the correct message.
describe("Edit Contact Details", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jobService.getJobsForTalent.mockResolvedValueOnce([]);
    axiosInstance.get.mockResolvedValueOnce({ data: [] });
    jest.spyOn(window, "alert").mockImplementation(() => {}); // Prevents alert from breaking the test

  });
  test("Update contact details with CORRECT format - Ensure data flow", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            talent: {
              phone: "098 765 4321",
              username: "newemail@example.com",
            },
          }),
      })
    );
    

    renderTalentDash();
    axiosInstance.get.mockResolvedValueOnce({ data: [] });
    const emailDisplay = screen.getByTestId("email-display");
    const phoneDisplay = screen.getByTestId("phone-display");
    const editDetailsBtn = screen.getByTestId("edit-contact-button");
  
    userEvent.click(editDetailsBtn);
  
    const editPhoneText = await screen.findByTestId("edit-phone");
    const editEmailText = await screen.findByTestId("edit-email");
  
    await act(async () => {
      userEvent.clear(editEmailText);
      userEvent.type(editEmailText, "newemail@example.com");
    });
    await waitFor(() => {
      expect(editEmailText).toHaveValue("newemail@example.com");
    });

    await act(async () => {
      userEvent.clear(editPhoneText);
      userEvent.type(editPhoneText, "098 765 4321");
    });
    await waitFor(() => {
      expect(editPhoneText).toHaveValue("098 765 4321");
    });

    const saveButton = screen.getByTestId("save-contact-button");
    userEvent.click(saveButton);
  
    //verifies that a api request was made with the user data.
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `http://localhost:4000/api/v1/talent/update-contact-details/${dummyUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: "098 765 4321",
            email: "newemail@example.com",
          }),
        }
      );
    });
    
    //verifies that updateuser was called with the data
    await act(async () => {
      await waitFor(() => {
        expect(updateUserMock).toHaveBeenCalledWith(
          expect.objectContaining({
            phone: "098 765 4321",
            username: "newemail@example.com",
          })
        );
      });
    });
    
     //dummyUser.username = "newemail@example.com"
     //dummyUser.phone = "098 765 4321"
   });

   test("Update contact details with INCORRECT format - Ensure data flow", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            success: true,
            talent: {
              phone: "098 765 4321",
              username: "newemail@example.com",
            },
          }),
      })
    );
    
    renderTalentDash();
    axiosInstance.get.mockResolvedValueOnce({ data: [] });
    const emailDisplay = screen.getByTestId("email-display");
    const phoneDisplay = screen.getByTestId("phone-display");
    const editDetailsBtn = screen.getByTestId("edit-contact-button");
  
    userEvent.click(editDetailsBtn);
  
    const editPhoneText = await screen.findByTestId("edit-phone");
    const editEmailText = await screen.findByTestId("edit-email");
  
    await act(async () => {
      userEvent.clear(editEmailText);
      userEvent.type(editEmailText, "newemcom");
    });
    await waitFor(() => {
      expect(editEmailText).toHaveValue("newemcom");
    });

    await act(async () => {
      userEvent.clear(editPhoneText);
      userEvent.type(editPhoneText, "098");
    });
    await waitFor(() => {
      expect(editPhoneText).toHaveValue("098");
    });

    const saveButton = screen.getByTestId("save-contact-button");
    userEvent.click(saveButton);
  
    //verifies that a api request was NOT made with the user data.
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalledWith(
        `http://localhost:4000/api/v1/talent/update-contact-details/${dummyUser._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: "098 765 4321",
            email: "newemail@example.com",
          }),
        }
      );
    });
    
    //verifies that updateuser was NOT called with the data
    await act(async () => {
      await waitFor(() => {
        expect(updateUserMock).not.toHaveBeenCalledWith(
          expect.objectContaining({
            phone: "098 765 4321",
            username: "newemail@example.com",
          })
        );
      });
    });
    
   });
  

  
  

  /*test("Update contact details with CORRECT format", async () => {
    renderTalentDash();
  
    const emailDisplay = screen.getByTestId("email-display");
    const phoneDisplay = screen.getByTestId("phone-display");
  
    const editDetailsBtn = screen.getByTestId("edit-contact-button");
    userEvent.click(editDetailsBtn);
  
    const editPhoneText = await screen.findByTestId("edit-phone");
    const editEmailText = await screen.findByTestId("edit-email");
  
    userEvent.clear(editPhoneText);
    userEvent.type(editPhoneText, "098 765 4321");
    userEvent.clear(editEmailText);
    userEvent.type(editEmailText, "newemail@example.com");
  
    const saveButton = screen.getByTestId("save-contact-button");
    userEvent.click(saveButton);
    
    await waitFor(() => expect(updateUserMock).toHaveBeenCalled());

    await waitFor(() => {
      expect(within(phoneDisplay).getByText(/098 765 4321/i)).toBeInTheDocument();
      expect(within(emailDisplay).getByText(/newemail@example.com/i)).toBeInTheDocument();
    });
  
    expect(updateUserMock).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "0987654321",
        username: "newemail@example.com",
      })
    );
  });*/
  

   /* test("Update contact details with INCORRECT format", async () => {
      renderTalentDash();
      
      const emailDisplay = screen.getByTestId("email-display");
      const phoneDisplay = screen.getByTestId("phone-display");
    
      const editDetailsBtn = screen.getByTestId("edit-contact-button");
      userEvent.click(editDetailsBtn);
    
      const editPhoneText = await screen.findByTestId("edit-phone");
      const editEmailText = await screen.findByTestId("edit-email");
    
      userEvent.clear(editPhoneText);
      userEvent.type(editPhoneText, "098"); // incorrect
      userEvent.clear(editEmailText);
      userEvent.type(editEmailText, "newemai"); // incorrect
    
      const saveButton = screen.getByTestId("save-contact-button");
      userEvent.click(saveButton);
    
      await waitFor(() => {
        expect(within(phoneDisplay).getByText(/1234567890/i)).toBeInTheDocument();
        expect(within(emailDisplay).getByText(/janedoe@example.com/i)).toBeInTheDocument();
        expect(window.alert).toHaveBeenCalledWith("Please enter a valid phone number.");

      });
    });*/

  });
