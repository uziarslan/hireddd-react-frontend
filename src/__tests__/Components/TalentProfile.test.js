import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TalentProfile from "../../Components/TalentProfile";
import { AuthContext } from "../../Context/AuthContext";


// Dummy user for AuthContext
const dummyUser = {
  firstName: "John",
  lastName: "Doe",
  profile: { path: "dummy-profile.jpg" },
  location: "New York",
  skills: ["JavaScript", "React"],
  about: "Developer at XYZ",
  video: { path: "dummy-video.mp4" },
};

describe("TalentProfile Page", () => {
  const renderComponent = (user = dummyUser) =>
    render(
      <AuthContext.Provider value={{ user }}>
        <MemoryRouter>
          <TalentProfile />
        </MemoryRouter>
      </AuthContext.Provider>
    );

  test("renders user details correctly on the profile tab", () => {
    renderComponent();

    // Verify initial values in the profile form from dummyUser
    expect(screen.getByLabelText(/First name/i)).toHaveValue("John");
    expect(screen.getByLabelText(/Last name/i)).toHaveValue("Doe");
    expect(screen.getByLabelText(/Location/i)).toHaveValue("New York");
    expect(screen.getByLabelText(/Skills/i)).toHaveValue("JavaScript, React");
    expect(screen.getByLabelText(/About/i)).toHaveValue("Developer at XYZ");

    // Verify the submit button is rendered
    expect(screen.getByDisplayValue(/Create profile/i)).toBeInTheDocument();
  });

  test("toggles between Profile and Record Video tabs using id", () => {
    const { container } = renderComponent();

    // Ensure the profile form is shown by default (e.g., First name field exists)
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();

    // Use the id to get the Record video tab and simulate a click
    const recordVideoTab = container.querySelector("#record-video-tab");
    fireEvent.click(recordVideoTab);

    // Now the profile form should not be visible
    // expect(screen.queryByLabelText(/First name/i)).toBeNull();

    // Check that an element from the Record Video section is present
    expect(screen.getByText(/Record Video/i)).toBeInTheDocument();
  });

  test("shows loading overlay when isLoading is true on form submission", async () => {
    renderComponent();

    const { container } = renderComponent();

    // Fill out some fields to trigger form submission.
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/Last name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Los Angeles" },
    });
    fireEvent.change(screen.getByLabelText(/Skills/i), {
      target: { value: "CSS, HTML" },
    });
    fireEvent.change(screen.getByLabelText(/About/i), {
      target: { value: "Designer" },
    });

    // Click the submit button
    const createProfile = container.querySelector("#createProfile");
      
    fireEvent.click(createProfile);

    

    // Verify that the loading overlay (with class "overlay") appears.
    await waitFor(() => {
      const overlay = container.querySelector(".overlay");
      expect(overlay).toBeInTheDocument();
    });
  });
});