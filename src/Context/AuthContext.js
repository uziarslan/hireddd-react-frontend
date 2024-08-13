import React, { createContext, useState, useEffect } from "react";
import authService from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const loggedInUser = await authService.getUser();
      if (
        loggedInUser === null &&
        window.location.pathname === "/employeeportal"
      ) {
        window.location.href = "/";
        return;
      }
      setUser(loggedInUser);
    };

    // const fetchAdmin = async () => {
    //   const loggedInAdmin = await authService.getAdmin();
    //   if (
    //     loggedInAdmin === null &&
    //     window.location.pathname === "/adminportal"
    //   ) {
    //     window.location.href = "/admin/login";
    //     return;
    //   }
    //   setAdmin(loggedInAdmin);
    // };

    fetchUser();
    // fetchAdmin();
  }, []);

  const login = async (userData) => {
    const response = await authService.login(userData);
    const loggedInUser = await authService.getUser();
    setUser(loggedInUser);
    return response;
  };

  // const adminLogin = async (adminData) => {
  //   setIsLoading(true);
  //   await authService.adminLogin(adminData);
  //   const loggedInAdmin = await authService.getAdmin();
  //   setAdmin(loggedInAdmin);
  //   setIsLoading(false);
  // };

  const register = async (userData) => {
    const response = await authService.register(userData);
    const registeredUser = await authService.getUser();
    setUser(registeredUser);
    return response;
  };

  const orgRegister = async (userData) => {
    const response = await authService.orgRegister(userData);
    const registeredUser = await authService.getUser();
    setUser(registeredUser);
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    // setAdmin(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        orgRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
