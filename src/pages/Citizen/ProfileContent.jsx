import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCheckCircle, FaPlus, FaTicketAlt, FaHistory, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';

const CitizenProfile = ({ user }) => {
  const navigate = useNavigate();

  // --- MOCK DATA ---
  const [userData, setUserData] = useState({
    name: 'Priya Sharma',
    avatar: '👤',
    isVerified: true,
    totalReports: 8,
    resolvedReports: 5,
    points: 450,
    level: 'Eco Champion',
    badges: [
      { name: 'First Report', icon: '🎯', earned: true },
      { name: 'Recycle Pro', icon: '♻️', earned: true },
      { name: 'Community Watchdog', icon: '👀', earned: true },
      { name: 'Eco-Warrior', icon: '🛡️', earned: false }
    ]
  });
  const [latestIssue, setLatestIssue] = useState({
    id: 'BIN-7B12',
    title: 'Damaged Smart Bin',
    location: 'Ekamra Kanan Botanical Gardens, Nayapalli',
    description: 'The main lid of the bin is broken and does not close properly.',
    status: 'In Progress',
    reportedDate: '2025-09-27',
    photo: 'https://placehold.co/400x300/e74c3c/ffffff?text=Damaged+Bin',
    priority: 'High',
  });
  const [previousReports, setPreviousReports] = useState([
    { id: 'BIN-4F88', title: 'Bin Full', date: '2025-09-15', status: 'Resolved' },
    { id: 'BIN-9G21', title: 'Illegal Dumping', date: '2025-08-22', status: 'Resolved' },
  ]);
  const [statusSteps, setStatusSteps] = useState([
    { id: 1, name: 'Reported', icon: '📝', completed: true, active: false },
    { id: 2, name: 'Acknowledged', icon: '📥', completed: true, active: false },
    { id: 3, name: 'Assigned', icon: '👨‍🔧', completed: true, active: false },
    { id: 4, name: 'In Progress', icon: '🔧', completed: true, active: true },
    { id: 5, name: 'Resolved', icon: '✅', completed: false, active: false }
  ]);
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-8">

      {/* --- Profile Header Section --- */}
      <div className="bg-white p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="flex items-start gap-5">
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-4xl text-white shadow-md">
              <FaUser />
            </div>
            {userData.isVerified && <FaCheckCircle className="absolute -bottom-1 -right-1 text-green-500 text-3xl bg-white rounded-full" />}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Hi, {user ? user.name : userData.name}</h1>
            <p className="text-md text-slate-500 font-semibold mt-1">{userData.level}</p>
            <div className="flex items-center gap-4 mt-3 text-slate-600 text-sm">
              <span>📈 {userData.totalReports} Reports</span>
              <span>✅ {userData.resolvedReports} Resolved</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6">
          <div className="text-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex flex-col items-center justify-center text-white shadow-lg">
              <p className="text-4xl font-bold">{userData.points}</p>
              <p className="text-xs font-semibold uppercase tracking-wider">Green Points</p>
            </div>
          </div>
          <div className="text-center">
            <h3 className="font-bold text-slate-700 mb-2">Your Badges</h3>
            <div className="grid grid-cols-2 gap-2">
              {userData.badges.map((badge) => (
                <div key={badge.name} title={badge.name} className={`flex flex-col items-center p-2 rounded-lg text-center transition-all ${ badge.earned ? 'bg-green-100' : 'bg-slate-100 opacity-50' }`}>
                  <span className={`text-3xl ${!badge.earned && 'filter grayscale'}`}>{badge.icon}</span>
                  <p className="mt-1 text-xs font-semibold text-slate-700">{badge.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Latest Issue & History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><FaTicketAlt className="text-red-500" /> Latest Reported Issue</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <img src={latestIssue.photo} alt={latestIssue.title} className="w-full h-48 object-cover rounded-lg"/>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-slate-700">{latestIssue.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getPriorityClass(latestIssue.priority)}`}>{latestIssue.priority}</span>
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2"><FaMapMarkerAlt /> {latestIssue.location}</p>
                <p className="text-slate-600">{latestIssue.description}</p>
                <div className="text-sm text-slate-500 flex items-center gap-2 pt-2 border-t"><FaCalendarAlt /> Reported on {new Date(latestIssue.reportedDate).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-3"><FaHistory className="text-blue-500" /> Report History</h2>
            <ul className="space-y-2">
              {previousReports.map(report => (
                <li key={report.id} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                    <div>
                        <span className="font-semibold text-slate-700">{report.title}</span>
                        <span className="ml-3 text-sm text-slate-500">#{report.id}</span>
                    </div>
                    <span className="text-sm font-semibold text-green-600">{report.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Status Tracker & Actions */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Issue Progress</h2>
            <div className="relative space-y-6">
              {statusSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${step.active ? 'bg-blue-600 text-white animate-pulse' : step.completed ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-400'}`}>
                    {step.icon}
                  </div>
                  {index < statusSteps.length - 1 && (
                    <div className={`absolute left-6 top-14 h-full w-0.5 ${step.completed ? 'bg-green-600' : 'bg-slate-200'}`}></div>
                  )}
                  <div>
                    <h4 className="font-bold text-slate-700">{step.name}</h4>
                    <p className="text-sm text-slate-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Actions</h2>
            <div className="space-y-3">
              <button onClick={() => navigate('/report-issue')} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow">
                <FaPlus /> Report New Issue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenProfile;
