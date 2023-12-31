import React, { useState } from 'react';
import Users from 'pages/master/db/users/users'; // Correct the import path based on your file structure

function Database() {
  const [showUsers, setShowUsers] = useState(false); // State to control showing Users component

  return (
    <div>
      <h2></h2>
      {/* Your database content */}
      <button onClick={() => setShowUsers(true)}>Users</button> {/* Add this button */}
      
      {showUsers && (
        <div>
          <Users />
        </div>
      )}
    </div>
  );
}

export default Database;
