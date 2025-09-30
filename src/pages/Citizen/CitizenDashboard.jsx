import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaHandsHelping, FaBook, FaChartLine, FaTrashAlt, FaBars, FaTimes, FaPlus } from 'react-icons/fa';

// Layout Components
import { Header } from '../Home/Header';
import { Navbar } from '../Home/Navbar';
import { Footer } from '../Home/Footer';

// Content Views
import ProfileContent from './ProfileContent';
import CommunityInitiatives from './CommunityInitiatives.jsx';
import Education from './Education.jsx';
import ImpactMetrics from './ImpactMetrics.jsx';
import SmartDisposal from './SmartDisposal.jsx';
import ReportIssue from '../ReportIssue/ReportIssue.jsx'; // Make sure the path is correct

const sidebarItems = [
  { id: 'profile', name: 'User Profile', icon: FaUser, component: ProfileContent },
  { id: 'community', name: 'Community Initiatives', icon: FaHandsHelping, component: CommunityInitiatives },
  { id: 'education', name: 'Education', icon: FaBook, component: Education },
  { id: 'impact', name: 'Impact Metrics', icon: FaChartLine, component: ImpactMetrics },
  { id: 'disposal', name: 'Smart Disposal', icon: FaTrashAlt, component: SmartDisposal },
  { id: 'report', name: 'Report Issue', icon: FaPlus, component: ReportIssue }, // Added internal view
];

const mockUser = { name: 'Priya Sharma', role: 'citizen' };

export default function CitizenDashboard({ user = mockUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [activeView, setActiveView] = useState('profile');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sync active view with URL hash
  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash && sidebarItems.some(item => item.id === hash)) {
      setActiveView(hash);
    } else {
      setActiveView('profile');
      navigate('#profile', { replace: true });
    }
    setIsSidebarOpen(false);
  }, [location.hash, navigate]);

  const handleSidebarClick = (id) => {
    setActiveView(id); // Set active view internally
    navigate(`#${id}`); // Update URL hash
  };

  const ActiveComponent = sidebarItems.find(item => item.id === activeView)?.component || ProfileContent;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <Navbar user={user} onLogout={() => console.log('Logout action')} />

      <div className="flex flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6">

        {/* Mobile Sidebar Toggle */}
        <button 
          className="lg:hidden fixed top-20 left-4 z-40 p-3 rounded-full bg-blue-600 text-white shadow-xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Sidebar */}
        <nav className={`fixed lg:static inset-y-0 left-0 lg:left-auto z-30 w-64 bg-white shadow-xl lg:shadow-none p-6 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shrink-0`}>
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Citizen Menu</h2>
          <ul className="space-y-3">
            {sidebarItems.map((item) => (
              <li key={item.id}>
<button
  onClick={() => handleSidebarClick(item.id)}
  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 text-left
    ${activeView === item.id 
      ? 'bg-green-100 text-green-700 shadow-md'  // Light green instead of dark
      : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700'
    }`}
>
  <item.icon className="w-5 h-5" />
  <span>{item.name}</span>
</button>

              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'lg:ml-0 ml-64' : 'lg:ml-0 ml-0'} p-4 lg:p-0`}>
          <div className="lg:pl-8 pt-4 lg:pt-0">
            <ActiveComponent user={user} />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
