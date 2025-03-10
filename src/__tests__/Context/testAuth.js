import React from "react";
import { AuthContext } from "../../Context/AuthContext";

// In tests, you can use jest.fn() to create mocks for the functions.
export const TestAuthProvider = ({ children, value = {} }) => {
  const defaultValue = {
    user: null,
    updateUser: jest.fn(),
    login: jest.fn(() => Promise.resolve({ status: 200, data: {} })),
    register: jest.fn(() =>
      Promise.resolve({ status: 201, data: { success: "User created" } })
    ),
    orgRegister: jest.fn(() =>
      Promise.resolve({ status: 201, data: { success: "Organization created" } })
    ),
    logout: jest.fn(),
  };

  // Allow overriding defaults via the value prop if needed.
  const contextValue = { ...defaultValue, ...value };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default TestAuthProvider;