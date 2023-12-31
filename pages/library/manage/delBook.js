import React, { useState } from 'react';

const DelBookButton = ({ bookName, onDeleteBook }) => {
  const [showDeleteInput, setShowDeleteInput] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the book "${bookName}"?`)) {
      setShowDeleteInput(true); // Show the delete input when the delete button is clicked
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteInput === bookName) {
        // Send a request to delete the book text data
        const responseText = await fetch('/api/books/delText', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookName,
          }),
        });
  
        // Send a request to delete the book name
        const responseNames = await fetch('/api/books/delBookNames', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookName,
          }),
        });
  
        // Send a request to delete the book image
        const responseImage = await fetch('/api/library/delImage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bookName,
          }),
        });
        console.log(responseText);
        console.log(responseNames);
        console.log(responseImage);
  
        if (responseText.ok && responseNames.ok && responseImage.ok) {
          // Update the state to remove the deleted book
          onDeleteBook(bookName);
  
          // Clear the delete input and hide it
          setDeleteInput('');
          setShowDeleteInput(false);
        } else {
          console.error('Book deletion failed');
        }
      } else {
        console.error('Confirmation text does not match book name');
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div>
      <button onClick={handleDelete}>Delete Book</button>
      {showDeleteInput && (
        <div>
          <input
            type="text"
            placeholder={`Type "${bookName}" to confirm deletion`}
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <button onClick={handleConfirmDelete}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default DelBookButton;
