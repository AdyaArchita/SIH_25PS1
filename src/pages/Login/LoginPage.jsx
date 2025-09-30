import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loginpage.css';

const LoginPage = () => {
  const [userType, setUserType] = useState('Citizen');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    adminId: '',
    municipalityId: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setUserType(type);
    // Clear IDs when switching user type
    setFormData(prev => ({ ...prev, adminId: '', municipalityId: '' }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (userType === 'Admin' && !formData.adminId) newErrors.adminId = 'Admin ID is required';
    if (userType === 'Municipality' && !formData.municipalityId) newErrors.municipalityId = 'Municipality ID is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Redirect based on role
      if (userType === 'Citizen') navigate('/dashboard');
      else if (userType === 'Admin') navigate('/admin-dashboard');
      else if (userType === 'Municipality') navigate('/municipality-dashboard');
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Login to NagarSaarthi</h2>

        <div className="user-type-toggle">
          <button
            type="button"
            className={userType === 'Citizen' ? 'active' : ''}
            onClick={() => handleUserTypeChange('Citizen')}
          >
            👥 Citizen
          </button>
          <button
            type="button"
            className={userType === 'Admin' ? 'active' : ''}
            onClick={() => handleUserTypeChange('Admin')}
          >
            ⚙️ Admin
          </button>
          <button
            type="button"
            className={userType === 'Municipality' ? 'active' : ''}
            onClick={() => handleUserTypeChange('Municipality')}
          >
            🏛️ Municipality
          </button>
        </div>

        {/* Email */}
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? 'error' : ''}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="input-group password-group">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(prev => !prev)}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '👀' : '👁️'}
          </span>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        {/* Admin ID */}
        {userType === 'Admin' && (
          <div className="input-group">
            <input
              type="text"
              name="adminId"
              placeholder="Admin ID"
              value={formData.adminId}
              onChange={handleInputChange}
              className={errors.adminId ? 'error' : ''}
              required
            />
            {errors.adminId && <span className="error-message">{errors.adminId}</span>}
          </div>
        )}

        {/* Municipality ID */}
        {userType === 'Municipality' && (
          <div className="input-group">
            <input
              type="text"
              name="municipalityId"
              placeholder="Municipality ID"
              value={formData.municipalityId}
              onChange={handleInputChange}
              className={errors.municipalityId ? 'error' : ''}
              required
            />
            {errors.municipalityId && <span className="error-message">{errors.municipalityId}</span>}
          </div>
        )}

        <button type="submit" className="login-button">
          Login →
        </button>

        <div className="form-footer">
          <a href="#forgot-password">Forgot Password?</a>
          <span className="divider">|</span>
          <a href="#register">New User? Register</a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
