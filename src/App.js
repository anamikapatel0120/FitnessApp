import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Importing all the pages
import HomePage from "./components/js/HomePage";
import SignUpPage from "./components/js/Signup";
import LoginPage from "./components/js/Login";
import BuddyFinderDashboard from "./components/js/BuddyFinderDashboard";
import GroupOrganizerDashboard from "./components/js/GroupOrganizerDashboard";
import GroupPage from "./components/js/GroupPage";
import BuddyProfile from "./components/js/BuddyProfile";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Define the routes for each page */}
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Sign Up page */}
          <Route path="/signup" element={<SignUpPage />} />
          
          {/* Login page */}
          <Route path="/login" element={<LoginPage />} />
          
          
          
          <Route path="/buddy-dashboard" element={<BuddyFinderDashboard />} />
          <Route path="/group-dashboard" element={<GroupOrganizerDashboard />} />

          <Route path="/group-page" element={<GroupPage />} />
          

          <Route path="/buddy/:buddyId" element={<BuddyProfile />} />

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
