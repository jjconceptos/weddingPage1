// pages/home.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext'; // Adjust the path accordingly

const Home = () => {
  const { state } = useAuth();

  const [questions, setQuestions] = useState([
    'Where is the land located?',
    'What is the size of the land?',
    'Do you have any hobbies?',
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    location: { address: '', street: '', zipCode: '' },
    size: '',
    hobbies: '',
  });

  const handleAnswer = () => {
    // Process the data from the form based on the current question
    switch (currentQuestion) {
      case 0:
        // Process location data
        const { address, street, zipCode } = formData.location;
        console.log('Location - Address:', address);
        console.log('Location - Street:', street);
        console.log('Location - Zip Code:', zipCode);
        break;
      case 1:
        // Process size data
        console.log('Size:', formData.size);
        break;
      case 2:
        // Process hobbies data
        console.log('Hobbies:', formData.hobbies);
        break;
      // Add more cases for other questions if needed
      default:
        break;
    }

    // Remove the answered question
    const updatedQuestions = [...questions];
    updatedQuestions.splice(currentQuestion, 1);
    setQuestions(updatedQuestions);

    // Move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handleChange = (e) => {
    // Update form data on input change
    const { name, value } = e.target;

    if (name.includes('location.')) {
      // Update location subfields
      const locationField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        location: { ...prevData.location, [locationField]: value },
      }));
    } else {
      // Update other fields
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  console.log('Clearance Level:', state.clearanceLevel); // Add this log to check the clearance level

  // Call the function to create and animate the logo
  useEffect(() => {
    // createAndAnimateLogo(); // Uncomment this line if needed
  }, []); // Ensure it runs only once on mount

  return (
    <Layout>
      {/* Remove the background image styling */}
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
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

        /* Additional styling for the navigation links */
        ul {
          list-style: none;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0;
          padding: 0;
          position: absolute;
          top: 20px;
        }

        li {
          margin: 0 10px;
        }

        /* Styling for the form */
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        label {
          margin: 10px 0;
          font-weight: bold;
        }

        input {
          padding: 8px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 200px;
        }

        /* Add other custom styles as needed */
      `}</style>

      {/* Content above the image */}
      <div>
        {/* Navigation links */}
        <ul>
          <li>
            <Link href="/home/home">Home</Link>
          </li>
          <li>
            <Link href="/about/about">About</Link>
          </li>

          <li>
            <Link href="/register/registerForm">Register</Link>
          </li>
          <li>
            <Link href="/login/login">Login</Link>
          </li>
          {state.clearanceLevel <= 2 && state.clearanceLevel > 0 && (
            <li>
              <Link href="/master/master">Master</Link>
            </li>
          )}
        </ul>

        {/* Question section */}
        <div>
          {questions.length > 0 && (
            <div>
              {/* Display different forms based on the current question */}
              {currentQuestion === 0 && (
                <form className="form">
                  <label>
                    Address:
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Street:
                    <input
                      type="text"
                      name="location.street"
                      value={formData.location.street}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Zip Code:
                    <input
                      type="text"
                      name="location.zipCode"
                      value={formData.location.zipCode}
                      onChange={handleChange}
                    />
                  </label>
                </form>
              )}
              {currentQuestion === 1 && (
                <form className="form">
                  <label>
                    Size:
                    <input
                      type="text"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                    />
                  </label>
                </form>
              )}
              {currentQuestion === 2 && (
                <form className="form">
                  <label>
                    Hobbies:
                    <input
                      type="text"
                      name="hobbies"
                      value={formData.hobbies}
                      onChange={handleChange}
                    />
                  </label>
                </form>
              )}

              <button onClick={handleAnswer}>Next</button>
            </div>
          )}
          {/* Add other content as needed */}
        </div>
      </div>
    </Layout>
  );
};

export default Home;

