import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/LandingPage";
import Login from "./pages/Login/LoginPage";
import LoginPrompt from "./pages/Login/LoginPrompt"; // Imported the component
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CitizenDashboard from "./pages/Citizen/CitizenDashboard"; // NEW: Import the Citizen Dashboard wrapper
import AboutUs from "./pages/AboutUs"; 
import FAQ from "./pages/FAQ"; 
import MunicipalityDashboard from './pages/MunicipalityDashboard';


import ReportIssue from "./pages/ReportIssue/ReportIssue";
import { EcoSortChatbot } from "./pages/Home/EcoSortChatbot";

function AppWrapper() {
  const location = useLocation();
  const [chatOpen, setChatOpen] = useState(false);

  // Don't show chatbot or floating button on login and FAQs page
  const showChat = location.pathname !== "/login" && location.pathname !== "/faqs";


  return (

    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* Route for unauthorized access attempt */}
        <Route path="/dashboard-prompt" element={<LoginPrompt />} />
        
        {/* UPDATED ROUTE: /dashboard now points to the main Citizen Dashboard with the sidebar */}
        <Route path="/dashboard" element={<CitizenDashboard />} />
        
        {/* NEW ROUTE: Explicit Admin Dashboard path based on Navbar logic */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/municipality-dashboard" element={<MunicipalityDashboard />} />
        {/* The previous '/citizen' route is no longer needed as CitizenDashboard handles all sub-paths via URL hash */}
        
        <Route path="/reportissue" element={<ReportIssue />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/faqs" element={<FAQ />} /> 
        

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>


      {showChat && (
        <>
          <EcoSortChatbot open={chatOpen} setOpen={setChatOpen} />

          <button
            onClick={() => setChatOpen(true)}
            className={`fixed bottom-6 right-6 z-50 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-lg flex items-center gap-2
              transition-all duration-300 ease-in-out
              ${chatOpen ? "opacity-0 translate-y-6 pointer-events-none" : "opacity-100 translate-y-0"}
            `}
          >
            💬 Chat
          </button>
        </>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
