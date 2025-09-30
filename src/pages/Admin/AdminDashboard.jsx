import React, { useState, useEffect, useRef } from 'react';
import './AdminDashboard.css';

/* Import Layout Components from Home directory */
import { Header } from '../Home/Header.jsx';
import { Navbar } from '../Home/Navbar.jsx';
import { Footer } from '../Home/Footer.jsx';

/* Leaflet & React-Leaflet */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

/* Fix default icon paths for many bundlers (CRA/Vite) */
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// CRITICAL FIX: Merge options to correctly load marker images
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const AdminDashboard = ({ user, onLogout }) => { // Accept user and onLogout props
  const [activeTab, setActiveTab] = useState('overview');
  const [issues, setIssues] = useState([]);
  const [users, setUsers] = useState([]);
  const [notifications, setNotifications] = useState(3);
  const mapRef = useRef(null);

  // --- WASTE MANAGEMENT MOCK DATA (Indian Context) ---
  useEffect(() => {
    setIssues([
      {
        id: 'BIN-025',
        type: 'Smart Bin Overflow',
        location: 'Sector 4 Market, Gurgaon',
        description: 'Sensor alert: Bin is 98% full and requires immediate collection.',
        status: 'Pending',
        priority: 'High',
        reportedBy: 'System Alert',
        reportedDate: '2025-09-28',
        assignedTo: 'Collection Route 1',
        votes: 5,
        coords: [28.4595, 77.0266] // Gurgaon coordinates
      },
      {
        id: 'DUMP-109',
        type: 'Illegal Dumping',
        location: 'Near Yamuna River Bridge, Delhi',
        description: 'Construction waste illegally dumped off-route.',
        status: 'In Progress',
        priority: 'High',
        reportedBy: 'Rohan Verma',
        reportedDate: '2025-09-27',
        assignedTo: 'Enforcement Team B',
        votes: 38,
        coords: [28.62, 77.23] // Delhi coordinates
      },
      {
        id: 'SEG-411',
        type: 'Segregation Failure',
        location: 'Community Compost Pit A, Bangalore',
        description: 'Wet waste mixed with non-compostable plastics in the pit.',
        status: 'Resolved',
        priority: 'Low',
        reportedBy: 'Suman Devi',
        reportedDate: '2025-09-25',
        assignedTo: 'Education Outreach',
        votes: 12,
        coords: [12.9716, 77.5946] // Bangalore coordinates
      },
      {
        id: 'ROUTE-005',
        type: 'Collection Delay',
        location: 'Juhu Road, Mumbai',
        description: 'Collection vehicle missed the street schedule for two days.',
        status: 'Pending',
        priority: 'Medium',
        reportedBy: 'Amit Patel',
        reportedDate: '2025-09-28',
        assignedTo: 'Unassigned',
        votes: 19,
        coords: [19.08, 72.82] // Mumbai coordinates
      }
    ]);

    setUsers([
      { id: 1, name: 'Priya Sharma', email: 'priya@email.com', role: 'Citizen', joinDate: '2025-01-15', status: 'Active', issuesReported: 3 },
      { id: 2, name: 'Vikas Singh', email: 'vikas@email.com', role: 'Citizen', joinDate: '2025-02-20', status: 'Active', issuesReported: 7 },
      { id: 3, name: 'Fatima Khan', email: 'fatima@email.com', role: 'Citizen', joinDate: '2025-03-10', status: 'Inactive', issuesReported: 2 },
      { id: 4, name: 'Rajesh Nair', email: 'rajesh@email.com', role: 'Citizen', joinDate: '2025-04-05', status: 'Active', issuesReported: 12 }
    ]);
  }, []);

  const handleStatusChange = (issueId, newStatus) => {
    setIssues(prev => prev.map(issue =>
      issue.id === issueId ? { ...issue, status: newStatus } : issue
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-progress';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  // --- Updated Stats for Waste Management ---
  const stats = {
    totalIssues: issues.length,
    pendingIssues: issues.filter(issue => issue.status === 'Pending').length,
    overflowAlerts: issues.filter(issue => issue.type === 'Smart Bin Overflow').length,
    resolvedIssues: issues.filter(issue => issue.status === 'Resolved').length,
    totalUsers: users.length,
    segregationFailures: issues.filter(issue => issue.type === 'Segregation Failure').length
  };

  // compute a simple center (average of coords) or fallback to India center
  const computeCenter = () => {
    const withCoords = issues.filter(i => Array.isArray(i.coords));
    if (withCoords.length === 0) return [20.5937, 78.9629];
    const avg = withCoords.reduce((acc, cur) => {
      acc[0] += cur.coords[0];
      acc[1] += cur.coords[1];
      return acc;
    }, [0,0]);
    return [avg[0] / withCoords.length, avg[1] / withCoords.length];
  };

  const mapCenter = computeCenter();

  // zoom/pan to a selected issue (called when clicking a table row)
  const handleZoomTo = (coords) => {
    if (!coords || !mapRef.current) return;
    try {
      mapRef.current.setView(coords, 14, { animate: true });
    } catch (e) {
      // Map not ready -> ignore
    }
  };

  // Function to get the color for the priority badge in the map popup
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'red';
      case 'Medium': return 'orange';
      case 'Low': return 'green';
      default: return 'gray';
    }
  };

  return (
    // Outer wrapper for the full page layout
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      {/* Pass user and onLogout to the Navbar */}
      <Navbar user={user} onLogout={onLogout} /> 

      {/* Existing Admin Dashboard content starts here */}
      <div className="admin-dashboard flex-grow">
        {/* Sidebar Navigation */}
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-icon">🏛️</span>
              <span className="logo-text">NagarSaarthi</span>
            </div>
            <div className="admin-badge">Admin Panel</div>
          </div>

          <nav className="sidebar-nav">
            <button
              className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <span className="nav-icon">📊</span>
              Overview
            </button>
            <button
              className={`nav-item ${activeTab === 'issues' ? 'active' : ''}`}
              onClick={() => setActiveTab('issues')}
            >
              <span className="nav-icon">🎯</span>
              Issue Management
            </button>
            <button
              className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <span className="nav-icon">👥</span>
              User Management
            </button>
            <button
              className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => setActiveTab('reports')}
            >
              <span className="nav-icon">📈</span>
              Reports & Analytics
            </button>
            <button
              className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              <span className="nav-icon">⚙️</span>
              Settings
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Top Header */}
          <header className="top-header">
            <div className="header-left">
              <h1 className="page-title">
                {activeTab === 'overview' && 'Dashboard Overview'}
                {activeTab === 'issues' && 'Issue Management'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'reports' && 'Reports & Analytics'}
                {activeTab === 'settings' && 'System Settings'}
              </h1>
            </div>
            <div className="header-right">
              <div className="notification-bell">
                <span className="bell-icon">🔔</span>
                {notifications > 0 && <span className="notification-count">{notifications}</span>}
              </div>
              <div className="admin-profile">
                <span className="admin-avatar">👤</span>
                <span className="admin-name">{user ? user.name : 'Admin User'}</span>
              </div>
            </div>
          </header>

          {/* Overview Tab (Waste Management Focused) */}
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="stats-grid">
                <div className="stat-card total">
                  <div className="stat-icon">📋</div>
                  <div className="stat-info">
                    <h3>Total Reports</h3>
                    <p className="stat-number">{stats.totalIssues}</p>
                  </div>
                </div>
                <div className="stat-card pending">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-info">
                    <h3>Pending Collection</h3>
                    <p className="stat-number">{stats.pendingIssues}</p>
                  </div>
                </div>
                <div className="stat-card progress">
                  <div className="stat-icon">🗑️</div>
                  <div className="stat-info">
                    <h3>Overflow Alerts</h3>
                    <p className="stat-number">{stats.overflowAlerts}</p>
                  </div>
                </div>
                <div className="stat-card resolved">
                  <div className="stat-icon">❌</div>
                  <div className="stat-info">
                    <h3>Segregation Failure</h3>
                    <p className="stat-number">{stats.segregationFailures}</p>
                  </div>
                </div>
                <div className="stat-card users">
                  <div className="stat-icon">👥</div>
                  <div className="stat-info">
                    <h3>Total Users</h3>
                    <p className="stat-number">{stats.totalUsers}</p>
                  </div>
                </div>
                <div className="stat-card active-users">
                  <div className="stat-icon">✅</div>
                  <div className="stat-info">
                    <h3>Issues Resolved</h3>
                    <p className="stat-number">{stats.resolvedIssues}</p>
                  </div>
                </div>
              </div>

              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-icon">🆕</span>
                    <span className="activity-text">Smart Bin Overflow: Sector 4 Market, Gurgaon (BIN-025)</span>
                    <span className="activity-time">5 mins ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🚨</span>
                    <span className="activity-text">Illegal Dumping reported near Yamuna River Bridge, Delhi (DUMP-109)</span>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                  <div className="activity-item">
                    <span className="activity-icon">🔄</span>
                    <span className="activity-text">Route Collection Delay (ROUTE-005) acknowledged by supervisor</span>
                    <span className="activity-time">4 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Issues Management Tab (with map) */}
          {activeTab === 'issues' && (
            <div className="issues-content">
              {/* Map box */}
              <div className="issues-map" aria-hidden={false}>
                <MapContainer
                  center={mapCenter}
                  zoom={10} // Increased zoom for initial view
                  style={{ height: '100%', width: '100%' }}
                  whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />

                  {issues.map(issue => (
                    Array.isArray(issue.coords) ? (
                      <Marker key={issue.id} position={issue.coords}>
                        <Popup>
                          <div style={{ minWidth: 200 }}>
                            <h4 style={{ margin: 0, color: '#2c3e50' }}>{issue.type} — {issue.id}</h4>
                            <p style={{ margin: '6px 0', color: '#7f8c8d' }}>{issue.description}</p>
                            <p style={{ margin: 0, fontSize: 13, color: '#2c3e50' }}>
                              <strong>Location:</strong> {issue.location}<br/>
                              <strong>Status:</strong> <span style={{ color: getPriorityColor(issue.priority), fontWeight: 'bold' }}>{issue.status}</span><br/>
                              <strong>Priority:</strong> <span style={{ color: getPriorityColor(issue.priority), fontWeight: 'bold' }}>{issue.priority}</span>
                            </p>
                          </div>
                        </Popup>
                      </Marker>
                    ) : null
                  ))}
                </MapContainer>
              </div>

              {/* Filters + search (kept simple) */}
              <div className="content-header">
                <div className="filters">
                  <select className="filter-select">
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                  </select>
                  <select className="filter-select">
                    <option>All Priorities</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <input type="text" placeholder="Search issues..." className="search-input" />
                </div>
              </div>

              <div className="issues-table" role="table" aria-label="Issues table">
                <div className="table-header">
                  <div className="header-cell">Issue ID</div>
                  <div className="header-cell type-location">Type & Location</div>
                  <div className="header-cell">Priority</div>
                  <div className="header-cell">Status</div>
                  <div className="header-cell">Assigned To</div>
                  <div className="header-cell">Actions</div>
                </div>

                {issues.map(issue => (
                  <div
                    key={issue.id}
                    className="table-row"
                    onClick={() => handleZoomTo(issue.coords)}
                    title="Click to zoom to this issue on map"
                  >
                    <div className="table-cell">
                      <span className="issue-id">{issue.id}</span>
                      <span className="votes">👍 {issue.votes}</span>
                    </div>
                    <div className="table-cell">
                      <div className="issue-info">
                        <span className="issue-type">{issue.type}</span>
                        <span className="issue-location">{issue.location}</span>
                      </div>
                    </div>
                    <div className="table-cell">
                      <span className={`priority-badge ${getPriorityClass(issue.priority)}`}>
                        {issue.priority}
                      </span>
                    </div>
                    <div className="table-cell">
                      <select
                        value={issue.status}
                        onChange={(e) => { e.stopPropagation(); handleStatusChange(issue.id, e.target.value); }}
                        className={`status-select ${getStatusClass(issue.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </div>
                    <div className="table-cell">
                      <span className="assigned-to">{issue.assignedTo}</span>
                    </div>
                    <div className="table-cell">
                      <button className="action-btn view" onClick={(e) => e.stopPropagation()}>👁️</button>
                      <button className="action-btn edit" onClick={(e) => e.stopPropagation()}>✏️</button>
                      <button className="action-btn delete" onClick={(e) => e.stopPropagation()}>🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Management Tab */}
          {activeTab === 'users' && (
            <div className="users-content">
              <div className="content-header">
                <div className="filters">
                  <select className="filter-select">
                    <option>All Users</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <input type="text" placeholder="Search users..." className="search-input" />
                </div>
                <button className="add-btn">+ Add User</button>
              </div>

              <div className="users-table">
                <div className="table-header">
                  <div className="header-cell">User Info</div>
                  <div className="header-cell">Email</div>
                  <div className="header-cell">Role</div>
                  <div className="header-cell">Join Date</div>
                  <div className="header-cell ">Issues Reported</div>
                  <div className="header-cell">Status</div>
                  <div className="header-cell">Actions</div>
                </div>

                {users.map(user => (
                  <div key={user.id} className="table-row">
                    <div className="table-cell">
                      <div className="user-info">
                        <span className="user-avatar">👤</span>
                        <span className="user-name">{user.name}</span>
                      </div>
                    </div>
                    <div className="table-cell user-email">{user.email}</div>
                    <div className="table-cell">
                      <span className="role-badge">{user.role}</span>
                    </div>
                    <div className="table-cell user-date">{user.joinDate}</div>
                    <div className="table-cell">
                      <span className="issues-count">{user.issuesReported}</span>
                    </div>
                    <div className="table-cell">
                      <span className={`user-status ${user.status.toLowerCase()}`}>
                        {user.status}
                      </span>
                    </div>
                    <div className="table-cell">
                      <button className="action-btn view">👁️</button>
                      <button className="action-btn edit">✏️</button>
                      <button className="action-btn delete">🗑️</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}


          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="reports-content">
              <div className="reports-grid">
                <div className="report-card">
                  <h3>📊 Segregation & Disposal Metrics</h3>
                  <p>Comprehensive analytics on waste stream quality, segregation compliance, and disposal efficiency.</p>
                  <button className="generate-btn">Generate Report</button>
                </div>
                <div className="report-card">
                  <h3>📈 Collection Route Performance</h3>
                  <p>Track fleet response times, fill levels per route, and optimization opportunities.</p>
                  <button className="generate-btn">Generate Report</button>
                </div>
                <div className="report-card">
                  <h3>👥 Citizen Engagement & Education</h3>
                  <p>User reporting frequency, participation in campaigns, and satisfaction surveys regarding bin usage.</p>
                  <button className="generate-btn">Generate Report</button>
                </div>
                <div className="report-card">
                  <h3>🗺️ Illegal Dumping Hotspots</h3>
                  <p>Location-based identification of frequent illegal dumping sites for enforcement action.</p>
                  <button className="generate-btn">Generate Report</button>
                </div>
              </div>
            </div>
          )}


          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="settings-content">
              <div className="settings-sections">
                <div className="settings-section">
                  <h3>Smart Bin Configuration</h3>
                  <div className="setting-item">
                    <label>Minimum trigger level for overflow alert (%)</label>
                    <input type="number" defaultValue="85" />
                  </div>
                  <div className="setting-item">
                    <label>Enable AI segregation error notifications</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Default collection frequency (days)</label>
                    <input type="number" defaultValue="2" />
                  </div>
                </div>

                <div className="settings-section">
                  <h3>Route Management</h3>
                  <div className="setting-item">
                    <label>Optimize routes based on density</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Require collection photo verification</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>

              <button className="save-settings-btn">Save Settings</button>
            </div>
          )}
        </div>
      </div>
      {/* Existing Admin Dashboard content ends here */}
      
      <Footer />
    </div>
  );
};


export default AdminDashboard;