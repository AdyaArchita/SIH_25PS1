import React from 'react';
import { Link } from 'react-router-dom';

// IMPORTS: Importing components from their actual location in the src/pages/Home directory
// (Assuming named exports for all three components based on standard practice and conversation history)
import { Header } from '../Home/Header';
import { Navbar } from '../Home/Navbar';
import { Footer } from '../Home/Footer';

// Inline SVG replacement for FaSignInAlt (to prevent external dependency errors)
const SignInIcon = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 512 512" 
    fill="currentColor" 
    className="w-5 h-5" 
    {...props}
  >
    {/* Solid User Icon (like FaSignInAlt) */}
    <path d="M416 432c-20.5 0-38.1-12.7-44.5-31.5c-3.1-9-1.4-18.7 3.8-26.6c23.6-36.5 35.8-78.6 35.8-121.9C410.6 123 325.2 37.6 219.8 37.6S29 123 29 252c0 43.3 12.2 85.4 35.8 121.9c5.2 7.9 6.9 17.6 3.8 26.6c-6.3 18.8-23.9 31.5-44.5 31.5H30c-16.6 0-30 13.4-30 30s13.4 30 30 30h452c16.6 0 30-13.4 30-30s-13.4-30-30-30h-40zM219.8 87.6c71.4 0 129.8 58.4 129.8 129.8S291.2 347.2 219.8 347.2S90 288.8 90 217.4S148.4 87.6 219.8 87.6z"/>
  </svg>
);

const LoginPrompt = () => {
  return (
    // Wrapper for full page layout
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navbar /> 
      
      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center text-center bg-slate-50 p-4">
        <div className="bg-white p-10 rounded-2xl shadow-2xl max-w-lg w-full transform hover:scale-[1.01] transition duration-300 ease-in-out border border-slate-100">
          <div className="text-red-500 mb-4 mx-auto w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
              {/* Alert Icon (Inline SVG) */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.398 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">Access Restricted</h1>
          <p className="mt-4 text-slate-600 leading-relaxed">
            To view the **Dashboard** and utilize citizen features like issue tracking and profile management, please authenticate.
          </p>
          <Link 
            to="/login" 
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
          >
            <SignInIcon className="w-5 h-5"/>
            Go to Login Page
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPrompt;
