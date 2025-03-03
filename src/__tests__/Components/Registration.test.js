import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Registration from "../Registration";
import { AuthContext } from "../../Context/AuthContext";

// Mock navigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Registration Component", () => {
  const mockRegister = jest.fn();
  const mockOrgRegister = jest.fn();

  const renderRegistration = () => {
    return render(
      <AuthContext.Provider
        value={{
          register: mockRegister,
          orgRegister: mockOrgRegister,
        }}
      >
        <MemoryRouter>
          <Registration />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders user registration form by default", () => {
    renderRegistration();

    // The 'User' tab should be active by default
    expect(screen.getByText(/Register as a user/i)).toBeInTheDocument();

    // Check that the user form fields are visible
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();

    // The organization form fields should not be in the DOM
    expect(screen.queryByPlaceholderText(/Name Your Realm/i)).toBeNull();
  });

  test("switches to organization form when 'Register as organization' is clicked", () => {
    renderRegistration();

    // Click the "Register as organization" button
    fireEvent.click(screen.getByText(/Register as organization/i));

    // The organization form should now be visible
    expect(screen.getByPlaceholderText(/Name Your Realm/i)).toBeInTheDocument();

    // The user form fields should not be visible
    expect(screen.queryByPlaceholderText(/XYZ@gmail.com/i)).toBeInTheDocument(); // still present but in a different (non-current) tab
  });

  test("submits user registration form successfully", async () => {
    // mock a success response
    mockRegister.mockResolvedValueOnce({
      status: 201,
      data: { success: "User registered successfully" },
    });

    renderRegistration();

    // Fill the user form
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Submit the user registration form
    fireEvent.click(screen.getByDisplayValue(/Register/i)); // The button text is "Register"

    // Check that register was called with the correct data
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: "user@test.com",
        password: "password123",
      });
    });

    // Check that a success message eventually appears
    // This depends on how you display the message in your Flash component
    // For example:
    expect(await screen.findByText(/User registered successfully/i)).toBeInTheDocument();
  });

  test("submits organization registration form successfully", async () => {
    mockOrgRegister.mockResolvedValueOnce({
      status: 201,
      data: { success: "Organization registered successfully" },
    });

    renderRegistration();

    // Switch to organization form
    fireEvent.click(screen.getByText(/Register as organization/i));

    const orgEmailInput = screen.getByLabelText(/Email address/i);
    const companyNameInput = screen.getByLabelText(/Company name/i);
    const orgWebsiteInput = screen.getByLabelText(/Website URL/i);
    const orgPasswordInput = screen.getAllByLabelText(/Password/i)[1];

    fireEvent.change(orgEmailInput, { target: { value: "org@test.com" } });
    fireEvent.change(companyNameInput, { target: { value: "Acme Corp" } });
    fireEvent.change(orgWebsiteInput, { target: { value: "https://acme.com" } });
    fireEvent.change(orgPasswordInput, { target: { value: "orgpass123" } });

    // Submit the organization registration form
    const orgSubmitButton = screen.getAllByDisplayValue(/Register/i)[1]; // Because there are two "Register" inputs
    fireEvent.click(orgSubmitButton);

    // Check that orgRegister was called with the correct data
    await waitFor(() => {
      expect(mockOrgRegister).toHaveBeenCalledWith({
        username: "org@test.com",
        website: "https://acme.com",
        password: "orgpass123",
        companyName: "Acme Corp",
      });
    });

    // Verify success message
    expect(await screen.findByText(/Organization registered successfully/i)).toBeInTheDocument();
  });

  test("toggle show/hide password", () => {
    renderRegistration();

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    // Click the eye icon/checkbox label to toggle show password
    const showPasswordLabel = screen.getByLabelText("show-password-checkbox");
    fireEvent.click(showPasswordLabel);

    // Now it should be type="text"
    expect(passwordInput).toHaveAttribute("type", "text");
  });

  test("shows loading spinner when isLoading is true", async () => {
    // We can’t directly set isLoading from outside.
    // Instead, we'll mock register in a way that
    // forces the component to show the spinner momentarily.
    //
    // One approach is to keep register unresolved for a short time
    // or to test the 'if (isLoading) return ...' condition by mocking a delay.

    // Create a promise that doesn't resolve immediately
    let resolvePromise;
    const registerPromise = new Promise((res) => {
      resolvePromise = res;
    });
    mockRegister.mockReturnValue(registerPromise);

    renderRegistration();

    // Fill the user form
    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "loading@test.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    // Submit the form
    fireEvent.click(screen.getByDisplayValue(/Register/i));

    // The component should show the loading spinner
    // e.g., the overlay with className="overlay"
    await waitFor(() => {
          const overlay = container.querySelector(".overlay");
          expect(overlay).toBeInTheDocument();
    });

    // Now resolve the promise to simulate a response
    await waitFor(() => {
      resolvePromise({ status: 201, data: { success: "Done" } });
    });
  });
});