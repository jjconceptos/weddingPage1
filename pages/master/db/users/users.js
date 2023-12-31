import React, { useState } from 'react';

function Users() {
  const [searchInput, setSearchInput] = useState('');
  const [userData, setUserData] = useState(null);
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/users/getUser?search=${searchInput}`);
      const responseData = await response.json();
      console.log("Response from API:", responseData);
      setUserData(responseData);
      setShowDeleteInput(false); // Hide the delete input after user search
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    setShowDeleteInput(true); // Show the delete input when delete button is clicked
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch('/api/users/deleteUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: deleteInput,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.message === "User deleted successfully") {
          console.log('User deleted successfully');
          setUserData(null);
          setShowDeleteInput(false); // Hide the delete input after successful deletion
          setDeleteInput('');
        } else {
          console.error('User deletion failed');
        }
      } else {
        console.error('User deletion failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2></h2>
      <div>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Enter username, email, name, or last name"
          className="input-field"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {userData !== null && (
        <div>
          <h3>User Profile</h3>
          <p>Name: {userData.name}</p>
          <p>Last Name: {userData.lastName}</p>
          <p>Email: {userData.email}</p>
          <p>Username: {userData.username}</p>
          <p>Clearance Level: {userData.clearanceLevel}</p>
          <button onClick={handleDeleteUser}>Delete User</button>
          {showDeleteInput && (
            <div>
              <h3></h3>
              <input
                type="text"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
                placeholder="Enter username to delete"
              />
              <button onClick={handleConfirmDelete}>Confirm delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Users;
