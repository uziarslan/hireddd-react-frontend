import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage";
import LoginPage from "./Components/LoginPage";
import Registration from "./Components/Registration";
import VerifyCode from "./Components/VerifyCode";
import ForgotPassword from "./Components/ForgotPassword";
import NewPassword from "./Components/NewPassword";
import TalentProfile from "./Components/TalentProfile";
import TalentDash from "./Components/TalentDash";
import OrgProfile from "./Components/OrgProfile";
import OrgDash from "./Components/OrgDash";
import SearchPage from "./Components/SearchPage";
import ProfilePage from "./Components/ProfilePage";
import TalentSetting from "./Components/TalentSetting";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Registration />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/verify/code" element={<VerifyCode />} />
          <Route path="/new/password" element={<NewPassword />} />
          <Route path="/talent/profile" element={<TalentProfile />} />
          <Route path="/talent/dashboard" element={<TalentDash />} />
          <Route path="/organization/profile" element={<OrgProfile />} />
          <Route path="/organization/dashboard" element={<OrgDash />} />
          <Route path="/find/employees" element={<SearchPage />} />
          <Route path="/talent/:talentId" element={<ProfilePage />} />
          <Route path="/talent/settings" element={<TalentSetting />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
