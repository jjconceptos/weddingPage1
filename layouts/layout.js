import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '/auth/authContext';
import 'layouts/styles.css';

const Layout = ({ children }) => {
  const { state } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [centeredContent, setCenteredContent] = useState(false);

  useEffect(() => {
    console.log('isSidebarOpen:', isSidebarOpen);
    setCenteredContent(!isSidebarOpen);
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Include the Google Fonts stylesheet */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap"
        rel="stylesheet"
      />

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-content" style={{ marginTop: '50px' }}>
          <ul>
          <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/home/home">Home</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/about/about">About</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/projects/projects">Projects</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/library/library">Library</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/register/registerForm">Register</Link>
            </li>
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/login/login">Login</Link>
            </li>
            {state.clearanceLevel <= 2 && state.clearanceLevel > 0 && (
              <li onClick={() => setIsSidebarOpen(false)}>
                <Link href="/master/master">Master</Link>
              </li>
            )}
            <li onClick={() => setIsSidebarOpen(false)}>
              <Link href="/hub/hub">Hub</Link>
            </li>
          </ul>
        </div>
      </div>
{/* Main Content */}
<div className={`main-content ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="toggle-sidebar" onClick={toggleSidebar}>
          {/* Rice-like figure or small circle */}
          <div className="rice-figure"></div>
        </div>

        {/* Content */}
        <div className={`content-container ${centeredContent ? 'centered' : ''}`}>
          {children}
        </div>
      </div>

      {/* Footer */}
      <footer>
        {/* Footer content */}
        &copy; {new Date().getFullYear()} JRF. All rights reserved.
      </footer>

      {/* Styles */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 100vh; /* Ensure the body takes at least the full viewport height */
        }
      
        .sidebar {
          width: 0;
          height: 100vh;
          background-color: #761a1a;
          overflow-x: hidden;
          transition: 0.5s;
          position: fixed;
          z-index: 2; /* Set z-index higher than the body */
        }
      
        .sidebar.open {
          width: 250px;
        }
      
        .sidebar-content {
          padding-top: 20px;
          display: flex;
          flex-direction: column;
        }
      
        .sidebar ul {
          list-style-type: none;
          padding: 20px;
        }
      
        .sidebar li {
          margin-bottom: 10px;
          color: #f2f2f2;
        }
      
        .main-content {
          display: flex;
          flex-direction: column;
          transition: margin-left 0.5s; /* Add this line for smooth transition */
          margin-left: ${isSidebarOpen ? '250px' : '0'}; /* Adjust the margin based on sidebar state */
          z-index: 1; /* Set z-index lower than the sidebar */
          width: 100%; /* Make sure it takes the full width */
        }
      
        .content-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%; /* Make sure it takes the full width */
        }
      
        .toggle-sidebar {
          position: fixed;
          top: 10px;
          left: 10px;
          cursor: pointer;
          z-index: 3; /* Set a higher z-index than main-content */
        }
      
        .rice-figure {
          width: 20px;
          height: 20px;
          background-color: ${isSidebarOpen ? '#fff' : '#000'};
          border-radius: 50%;
          position: fixed;
          top: 15px;
          left: ${isSidebarOpen ? '265px' : '15px'}; /* Adjust the left position based on sidebar state */
          cursor: pointer;
          z-index: 4; /* Set a higher z-index than the toggle-sidebar */
          transition: left 0.5s, background-color 0.5s; /* Add this line for smooth transition */
        }
      
        .sidebar-open .rice-figure {
          left: 265px; /* Adjust the left position when the sidebar is open */
          background-color: ${isSidebarOpen ? '#999' : '#000'}; /* Change the color when the sidebar is open */
        }
      
        /* Custom styling for the footer */
        footer {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          background-color: transparent;
          padding: 10px;
          text-align: right;
          color: black;
          font-size: 14px;
          opacity: 0.8;
          z-index: 2; /* Set z-index higher than the body */
        }

        .content-container.centered {
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>
  );
};

export default Layout;
