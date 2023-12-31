// pages/home.js
import React from 'react';
import { useEffect } from 'react';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext'; // Adjust the path accordingly
import { createAndAnimateLogo } from '/public/jamiesLogo';

const Home = () => {
  const { state } = useAuth();

  console.log('Clearance Level:', state.clearanceLevel); // Add this log to check the clearance level
  
  // Call the function to create and animate the logo
  useEffect(() => {
    createAndAnimateLogo();
  }, []); // Ensure it runs only once on mount

  return (
    <Layout>
      

      {/* Remove the background image styling */}
      <style jsx global>{`
        body {
          /* Remove or comment out the background image styling */
          /* background-image: url('/lake.jpg'); */
          /* background-size: cover; */
          /* background-repeat: no-repeat; */
          /* background-attachment: fixed; */
          /* background-position: center; */
          margin: 0;
          padding: 0;
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
        }
      `}</style>

      {/* Content above the image */}
      <div>
        
        {/* Add other content as needed */}
      </div>

      
    </Layout>
  );
};

export default Home;
