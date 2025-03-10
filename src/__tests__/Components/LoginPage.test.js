// __tests__//LoginPage.test.js

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import LoginPage from "../../Components/LoginPage";

// test("jest setup file is loaded", () => {
//     expect(global.__JEST_SETUP_LOADED__).toBe(true);
//   });

// Create a mock for the navigate function.
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"), 
  useNavigate: () => mockNavigate
}));

describe("LoginPage", () => {
  let mockLogin;
  let rendered;

  beforeEach(() => {
    mockLogin = jest.fn();
    rendered = render(
      <AuthContext.Provider value={{ login: mockLogin }}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </AuthContext.Provider>
    );
  });

  it("renders expected elements", () => {
    expect(screen.getByText(/Login to your account/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    // The login button is rendered as an input of type submit.
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument();
  });

  it("updates input values on change", () => {
    const emailInput = screen.getByLabelText(/Email address/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("pass123");
  });

  it("submits the form and navigates on successful login", async () => {
    // Simulate a successful login response.
    mockLogin.mockResolvedValueOnce({
      status: 200,
      data: { callBack: "/dashboard" }
    });

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "test@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "pass123" }
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    expect(mockLogin).toHaveBeenCalledWith({
      username: "test@example.com",
      password: "pass123"
    });
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    );
  });

  it("displays an error message on login failure", async () => {
    // Simulate a rejected login with an error message.
    const errorResponse = { error: "Invalid credentials" };
    mockLogin.mockRejectedValueOnce({
      response: { data: errorResponse }
    });

    fireEvent.change(screen.getByLabelText(/Email address/i), {
      target: { value: "wrong@example.com" }
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpass" }
    });
    fireEvent.click(screen.getByRole("button", { name: /Login/i }));

    await waitFor(() =>
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    );
  });

  it("toggles password visibility when clicking the toggle", () => {
    const passwordInput = screen.getByLabelText(/Password/i);
    // Access the checkbox via its id since its label is an SVG.
    const toggle = rendered.container.querySelector("#show-password-checkbox");

    expect(passwordInput.type).toBe("password");
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe("text");
    fireEvent.click(toggle);
    expect(passwordInput.type).toBe("password");
  });
});