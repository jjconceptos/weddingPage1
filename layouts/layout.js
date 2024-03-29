import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '/auth/authContext';
import 'layouts/styles.css';

const Layout = ({ children }) => {
  const { state } = useAuth();
 
  const [centeredContent, setCenteredContent] = useState(false);

 

 

  return (
    <div>
      {/* Include the Google Fonts stylesheet */}
      <link
      href="https://fonts.googleapis.com/css2?family=Baskervville:ital@0;1&family=Lateef:wght@200;300;400;500;600;700;800&family=Pinyon+Script&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&display=swap"        rel="stylesheet"
      />

      
{/* Main Content */}
<div >
        <div >
          {/* Rice-like figure or small circle */}
          <div className="rice-figure"></div>
        </div>

        {/* Content */}
        <div className={`content-container ${centeredContent ? 'centered' : ''}`}>
          {children}
        </div>
      </div>

      {/* Footer */}
      {/* 
      <footer>
        &copy; {new Date().getFullYear()} JRF. All rights reserved.
      </footer>
      */}

      


      {/* Styles */}
      <style jsx global>{`
        body {
          
          margin: 0;
          padding: 0;
          display: flex;
          min-height: 100vh;
        }
        
        .main-content {
          display: flex;
          flex-direction: column;
          z-index: 1;
          width: 100%;
        }
        
        .content-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
        
        ul {
          list-style: none;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 2;
        }
        
        li {
          margin: 10px;
        }
        
        ul.nav-links-right {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 20px;
          z-index: 2;
        }
        
        li.nav-links-right {
          justify-content: flex-end;
          right: 20px;
        }
        
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
          z-index: 2;
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
