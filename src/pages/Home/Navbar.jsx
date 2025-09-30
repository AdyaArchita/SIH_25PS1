import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate
import {
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaTachometerAlt,
} from "react-icons/fa";

export function Navbar({ user, onLogout }) {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // NEW STATE for confirmation modal
  const [showLogoutModal, setShowLogoutModal] = useState(false); 
  const dropdownRef = useRef(null);

  const baseLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About Us", path: "/about", icon: <FaInfoCircle /> },
    { name: "FAQs", path: "/faqs", icon: <FaQuestionCircle /> },
  ];

  let dashboardPath;
  if (!user) {
    dashboardPath = "/dashboard-prompt"; // For logged-out users
  } else if (user.role === 'citizen') {
    dashboardPath = "/dashboard"; // For citizens
  } else if (user.role === 'admin') {
    dashboardPath = "/admin-dashboard"; // For admins
  }

  // Updated class function:
  const getLinkClassName = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-px hover:shadow-lg ${
      isActive
        ? "bg-blue-700 text-white shadow-md"
        : "text-slate-300 hover:bg-slate-700 hover:text-blue-400"
    }`;

  // 1. Function to trigger the modal
  const handleInitiateLogout = () => {
    setDropdownOpen(false); // Close dropdown
    setShowLogoutModal(true); // Open confirmation modal
    setMobileMenuOpen(false); // Close mobile menu
  };
  
  // 2. Function to execute logout after confirmation
  const handleConfirmLogout = () => {
    onLogout(); // Execute the actual logout function passed from App.jsx
    setShowLogoutModal(false);
    navigate('/'); // Explicitly redirect to the home page after logging out
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-slate-800 shadow-lg w-full z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <ul className="hidden md:flex items-center gap-4">
            {baseLinks.map((link) => (
              <li key={link.name}>
                <NavLink to={link.path} className={getLinkClassName} end>
                  {link.icon} <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to={dashboardPath} className={getLinkClassName}>
                <FaTachometerAlt />
                <span>Dashboard</span>
              </NavLink>
            </li>
          </ul>

          <div className="hidden md:flex items-center">
            {!user ? (
              <Link to="/login" className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:-translate-y-px hover:-shadow-lg">
                <FaSignInAlt /> Sign In
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 px-4 py-2 rounded-md font-semibold text-white bg-slate-700 hover:bg-slate-600 transition-all duration-200 transform hover:-translate-y-px hover:shadow-lg">
                  <FaUser />
                  <span>{user.name}</span>
                  <FaChevronDown className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <ul className="absolute right-0 mt-2 w-48 bg-slate-700 rounded-md shadow-xl z-50 overflow-hidden">
                    {user.role === 'citizen' && (
                      <li><Link to="/dashboard/profile" onClick={() => setDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-slate-200 hover:bg-slate-600">My Profile</Link></li>
                    )}
                    {user.role === 'admin' && (
                      <li><Link to="/admin-dashboard" onClick={() => setDropdownOpen(false)} className="block w-full text-left px-4 py-2 text-slate-200 hover:bg-slate-600">Admin Panel</Link></li>
                    )}
                    {/* Updated button to open the modal */}
                    <li><button onClick={handleInitiateLogout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-slate-200 hover:bg-slate-600"><FaSignOutAlt /> Logout</button></li>
                  </ul>
                )}
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white text-2xl p-2">
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden p-4 space-y-2 border-t border-slate-700">
          {baseLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={getLinkClassName} onClick={closeMobileMenu} end>
              {link.icon} <span>{link.name}</span>
            </NavLink>
          ))}
          <NavLink to={dashboardPath} className={getLinkClassName} onClick={closeMobileMenu}>
              <FaTachometerAlt />
              <span>Dashboard</span>
          </NavLink>
          <hr className="border-slate-600" />
          {!user ? (
            <NavLink to="/login" className={getLinkClassName} onClick={closeMobileMenu}><FaSignInAlt /> Sign In</NavLink>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white px-3 py-2">
                  <FaUser /> <span>{user.name}</span>
              </div>
              {user.role === 'citizen' && (
                  <NavLink to="/dashboard/profile" className={getLinkClassName} onClick={closeMobileMenu}>My Profile</NavLink>
              )}
                {user.role === 'admin' && (
                  <NavLink to="/admin-dashboard" className={getLinkClassName} onClick={closeMobileMenu}>Admin Panel</NavLink>
              )}
              {/* FIXED: Updated button to call the modal handler instead of direct logout */}
                <button onClick={handleInitiateLogout} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-md font-medium text-slate-300 hover:bg-slate-700 hover:text-blue-400">
                  <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* --- CONFIRMATION MODAL --- */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[60] bg-black bg-opacity-75 flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 transform transition-transform duration-300 scale-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Confirm Logout</h3>
            <p className="text-slate-600 mb-6">Are you sure you want to log out of your NagarSaarthi account?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
              >
                <FaSignOutAlt className="inline-block mr-2" /> Yes, Log Me Out
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- END CONFIRMATION MODAL --- */}
    </nav>
  );
}
