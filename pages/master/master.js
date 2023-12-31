import React, { useState } from 'react';
import Database from 'pages/master/db/database';
import Content from 'pages/master/content/content'; // Import the Content component
import Layout from '/layouts/layout';

function Master() {
  const [showDatabase, setShowDatabase] = useState(false);
  const [showContent, setShowContent] = useState(false); // State to control showing the Content component

  const handleDatabaseClick = () => {
    setShowDatabase(true);
    setShowContent(false); // Hide the Content component when switching to Database
  };

  const handleContentClick = () => {
    setShowContent(true); // Show the Content component when Content button is clicked
    setShowDatabase(false); // Hide the Database component when switching to Content
  };

  return (
    
    <Layout>
    <div>
      <h1></h1>
      <div>
        <button onClick={handleDatabaseClick}>Database</button>
        <button onClick={handleContentClick} style={{ marginLeft: '1cm' }}>Content</button> {/* Add the Content button */}
      </div>
      {showDatabase && (
        <div>
          <Database />
        </div>
      )}
      {showContent && (
        <div>
          <Content />
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Master;
