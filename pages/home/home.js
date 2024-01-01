import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';

const Home = () => {
  const { state } = useAuth();

  const [questions, setQuestions] = useState([
    'Where is the land located?',
    'What is the size of the land?',
    'Can you provide your contact information?',
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    location: { address: '', street: '', zipCode: '' },
    size: '',
    contact: { name: '', lastName: '', email: '', cellphone: '' },
  });

  const handleAnswer = async () => {
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
        // Process contact information
        const { name, lastName, email, cellphone } = formData.contact;
        console.log('Contact - Name:', name);
        console.log('Contact - Last Name:', lastName);
        console.log('Contact - Email:', email);
        console.log('Contact - Cellphone:', cellphone);

        // Send the form data to the serverless function
        try {
          const response = await fetch('/api/mails/submitForm', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            console.log('Form data sent successfully:', formData);
          } else {
            console.error('Failed to send form data:', response.statusText);
          }
        } catch (error) {
          console.error('Error sending form data:', error);
        }
        break;
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
    } else if (name.includes('contact.')) {
      // Update contact subfields
      const contactField = name.split('.')[1];
      setFormData((prevData) => ({
        ...prevData,
        contact: { ...prevData.contact, [contactField]: value },
      }));
    } else {
      // Update other fields
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  console.log('Clearance Level:', state.clearanceLevel);

  useEffect(() => {
    // createAndAnimateLogo();
  }, []);

  return (
    <Layout>
      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
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
        }

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
      `}</style>

      <div>
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

        <div>
          {questions.length > 0 && (
            <div>
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
                    Name:
                    <input
                      type="text"
                      name="contact.name"
                      value={formData.contact.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      type="text"
                      name="contact.lastName"
                      value={formData.contact.lastName}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Email:
                    <input
                      type="email"
                      name="contact.email"
                      value={formData.contact.email}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Cellphone:
                    <input
                      type="tel"
                      name="contact.cellphone"
                      value={formData.contact.cellphone}
                      onChange={handleChange}
                    />
                  </label>
                </form>
              )}

              <button onClick={handleAnswer}>Next</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;


