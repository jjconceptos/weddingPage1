import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';

import BookForm from '/pages/library/manage/addBook';
import { fetchBooksData } from '/utils/fetchBooks';
import DelBookButton from 'pages/library/manage/delBook';
import Layout from '/layouts/layout';
import '/layouts/styles.css'; 
import CenteredContentWrapper from '/layouts/centered';

const booksData = await fetchBooksData();


function Books() {
  
  const { state } = useAuth();
  const [showBookForm, setShowBookForm] = useState(false);
  const [books, setBooks] = useState([]); // State to hold fetched books
  const [expandedBook, setExpandedBook] = useState(null);

  // Define a function to fetch books
  const fetchBooks = async () => {
    
    try {
      
      // Pass the book names to fetchBooksData
      
      // Log the URL from the first book (assuming there is at least one book)
      console.log('Books received in fetchBooks function (books.js):', booksData);
        
      // Modify the descriptions to limit to 25 characters
      const modifiedBooks = booksData.map((book) => ({
        ...book,
        description: book.description.length > 25
          ? book.description.slice(0, 25) + '...'
          : book.description,
      }));

      // Set the modified books data in your state
      setBooks(modifiedBooks);
    } catch (error) {
      console.error('Error fetching books (books.js):', error);
    }
  };

  useEffect(() => {
    // Fetch books when the component mounts
    fetchBooks();
  }, []);

  const handleBookClick = () => {
    setShowBookForm(true);
  };

  const handleBookAdded = async () => {
    try {
      // Use fetchBooksData to get the updated books list
      const updatedBooks = await fetchBooksData();
      
      // Update the books state with the updated books list
      setBooks(updatedBooks);
      
      console.log('Updated books:', updatedBooks);
    } catch (error) {
      console.error('Error handling added book:', error);
    }
  };



  const handleBookSubmit = async (book) => {
    // Validate and add the new book to the list
    if (book.name && book.description) {
      // Save books in localStorage using the addBook function
      addBook(book);

      // Clear the new book data
      setNewBook({ name: '', description: '' });
      setShowBookForm(false);

      // Notify the parent component that a new book has been added
      handleBookAdded(book.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteBook = async (bookName) => {
    try {
      // Remove the deleted book from the state
      const updatedBooks = books.filter((book) => book.name !== bookName);
      setBooks(updatedBooks);
  
      // Clear the expanded book view if it's the deleted one
      if (expandedBook === bookName) {
        setExpandedBook(null);
      }
  
      // Use the router to trigger a page refresh
      
    } catch (error) {
      console.error(error);
    }
  };
  

  const isButtonVisible = state.clearanceLevel == 1 || state.clearanceLevel == 2;

  return (
    <Layout>
    <CenteredContentWrapper>
      <div>
        <h1></h1>
        {isButtonVisible && (
          <button onClick={handleBookClick}>Add book</button>
        )}
        {showBookForm && (
          <div>
            <h2></h2>
            <BookForm onSubmit={handleBookSubmit} books={books} onBookAdded={handleBookAdded} />
          </div>
        )}

        {/* Display the list of books */}
        <ul className="books-grid">
  {Array.isArray(books) && books.length > 0 ? (
    books.map((book, index) => (
      <li key={index} className={`book-card ${expandedBook === index ? 'expanded' : ''}`}>
        <h3 onClick={() => setExpandedBook(expandedBook === index ? null : index)}>
          {book.name}
        </h3>
        <p className={`book-description ${expandedBook === index ? 'expanded' : ''}`}>
          {book.description}
        </p>
        {/* If you have an imageUrl, you can display it here */}
        {book.imageUrl && (
          <img
            src={book.imageUrl}
            alt={book.name}
            className={`book-image ${expandedBook === index ? 'expanded' : ''}`}
          />
        )}
        {isButtonVisible && ( // Conditionally render the Delete Book button
          <DelBookButton
            Name={book.name}
            onDeleteBook={handleDeleteBook}
            
          />
        )}
      </li>
    ))
  ) : (
    <p className={`no-books-message ${Array.isArray(books) && books.length === 0 ? 'centered' : ''}`}>
      No books to display.</p>
  )}
</ul>

      </div>
      </CenteredContentWrapper>
    </Layout>
  );
}

export default Books;