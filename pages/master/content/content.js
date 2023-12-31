import React, { useState } from 'react';
import Projects from 'pages/master/content/projects/projectForm'; // Correct the import path based on your file structure
import Layout from '/layouts/layout';

function Database() {
  const [showUsers, setShowUsers] = useState(false); // State to control showing Users component

  return (
    <Layout>
    <div>
      <h2></h2>
      {/* Your database content */}
      <button onClick={() => setShowUsers(true)}>Projects</button> {/* Add this button */}
      
      {showUsers && (
        <div>
          <Projects />
        </div>
      )}
    </div>
    </Layout>
  );
}

export default Database;
