
// __tests__/Registration.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Registration from "../../Components/Registration";
// import { AuthContext } from "../../Context/AuthContext";
import { AuthContext } from "../Context/testAuth";


describe("Registration Component", () => {
  const mockRegister = jest.fn(() =>
    Promise.resolve({ status: 201, data: { success: "User created" } })
  );

  const mockOrgRegister = jest.fn(() =>
    Promise.resolve({ status: 201, data: { success: "Organization created" } })
  );

  // A helper function to render Registration component
  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <AuthContext
          value={{ register: mockRegister, orgRegister: mockOrgRegister }}
        >
          <Registration />
        </AuthContext>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the user form by default", () => {
    renderComponent();

    // The user form has an email label "Email address"
    const emailLabels = screen.getAllByLabelText(/email address/i);
    // If your CSS toggles display, you can either check length >= 1 or test the visibility.
    expect(emailLabels.length).toBeGreaterThanOrEqual(1);

    const registerButtons = screen.getAllByRole("button", { name: /register/i });
    expect(registerButtons.length).toBe(4);
  });

  test("switches to the organization form when 'Register as organization' is clicked", () => {
    renderComponent();

    // Initially, the user form is shown. Now we click the 'Register as organization' tab:
    const orgTabButton = screen.getByRole("button", {
      name: /register as organization/i,
    });
    fireEvent.click(orgTabButton);

    // After clicking, the Organization form becomes active.
    // We can check for the presence of fields specific to the organization form:
    expect(screen.getByLabelText(/company name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/website url/i)).toBeInTheDocument();
  });

  test("submits user registration data when user form is submitted", async () => {
    renderComponent();

    // User form is default. Fill out the user form fields
    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText("Password", { exact: false }); 

    fireEvent.change(emailInput, { target: { value: "user@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "UserPass123" } });

    // Submit the user form

    const { container } = renderComponent();
    const registerElement = container.querySelector("#Register");

    fireEvent.click(registerElement);

    // Expect our mockRegister to be called with the right shape
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledTimes(1);
      expect(mockRegister).toHaveBeenCalledWith({
        username: "user@example.com",
        password: "UserPass123",
      });
    });
  });

  test("submits organization registration data when organization form is submitted", async () => {
    renderComponent();

    // Switch to organization form
    const orgTabButton = screen.getByRole("button", {
      name: /register as organization/i,
    });
    fireEvent.click(orgTabButton);

    // Fill out organization form fields
    const orgEmailInput = screen.getByLabelText(/email address/i);
    const companyNameInput = screen.getByLabelText(/company name/i);
    const websiteInput = screen.getByLabelText(/website url/i);
    const orgPasswordInput = screen.getByLabelText("Password", { exact: false }); 

    fireEvent.change(orgEmailInput, { target: { value: "org@example.com" } });
    fireEvent.change(companyNameInput, { target: { value: "My Company" } });
    fireEvent.change(websiteInput, {
      target: { value: "https://www.example.org" },
    });
    fireEvent.change(orgPasswordInput, { target: { value: "OrgPass456" } });

    // Submit the org form
    // The second "Register" button in getAllByRole, or we can re-select it after switching forms:
    const orgRegisterButton = screen.getAllByRole("button", {
      name: /register/i,
    })[1];
    fireEvent.click(orgRegisterButton);

    // Expect our mockOrgRegister to be called with the correct data
    await waitFor(() => {
      expect(mockOrgRegister).toHaveBeenCalledTimes(1);
      expect(mockOrgRegister).toHaveBeenCalledWith({
        username: "org@example.com",
        website: "https://www.example.org",
        password: "OrgPass456",
        companyName: "My Company",
      });
    });
  });
});