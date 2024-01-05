import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';

const Home = () => {
  const { state } = useAuth();
  const formRef = useRef(null);
  const [questions, setQuestions] = useState([
    'En donde esta?',
    'Cual es el área de tu terreno?',
    'Conoces el uso de suelo?',
    'Por favor danos tu contacto',
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    location: { address: '', street: '', zipCode: '' },
    size: '',
    landUse: '',
    contact: { name: '', lastName: '', email: '', cellphone: '' },
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = async () => {
    // Move to the next question if it exists
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Send the form data to the serverless function when "Submit" is clicked
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
          setFormSubmitted(true);
        } else {
          console.error('Failed to send form data:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
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
    // Adjust the form section position when showQuestions becomes true
    const scrollToForm = () => {
      if (showQuestions && formRef.current) {
        const formSection = formRef.current;
        console.log('Scroll position before:', window.scrollY);
  
        // Scroll the form section into view using the native scrollIntoView method
        formSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest',
        });
  
        console.log('Scroll position after:', window.scrollY);
      }
    };
  
    // Attach the scroll event listener
    window.addEventListener('scroll', scrollToForm);
  
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('scroll', scrollToForm);
    };
  }, [showQuestions]);


  const startQuestions = () => {
    setShowQuestions(true);
  };
  
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

        .background-container {
          position: fixed;
          top: 25px;
          left: 0px;
          right: 0px;
          width: 100%;
          height: 100%;
          margin: 0cm; 
          background-image: url('schematic.jpeg'); 
          background-size: cover;
          background-position: center;
          z-index: 0;
          
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
          width: 300px;
        }

        input {
          padding: 8px;
          margin: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          width: 100%; /* Set a fixed width for input elements */
          box-sizing: border-box;
        }

        button {
          margin-top: 10px;
          z-index: 1;
        }

        .non-question-section {
          position: absolute;
          bottom: 175px; /* Adjust the distance from the bottom as needed */
          left: 50%;
          transform: translateX(-50%);
          text-align: center;
        }

        .form-section {
          margin-top: 100vh; /* Set the distance from the top of the viewport */
        }

        .form-section {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }


      `}</style>

<div className="background-container">
        
<div className="non-question-section">
        {/* Navigation links go here */}
        {!showQuestions && !formSubmitted && (
          <>
            <p style={{ textAlign: 'center' }}>
              Por favor háblanos de tu terreno para poder hacerte una oferta
            </p>
            <button onClick={startQuestions}>Comenzar</button>
          </>
        )}

{!formSubmitted && showQuestions && currentQuestion < questions.length && (
          <>
          <div ref={formRef} className="form-section"></div>
            <p>{questions[currentQuestion]}</p>
            <form className="form">
              {currentQuestion === 0 && (
                <>
                  <label>
                    Dirección:
                    <input
                      type="text"
                      name="location.address"
                      value={formData.location.address}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Delegación:
                    <input
                      type="text"
                      name="location.street"
                      value={formData.location.street}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Código postal:
                    <input
                      type="text"
                      name="location.zipCode"
                      value={formData.location.zipCode}
                      onChange={handleChange}
                    />
                  </label>
                </>
              )}
              {currentQuestion === 1 && (
                <label>
                  Tamaño m2:
                  <input
                    type="text"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </label>
              )}
              {currentQuestion === 2 && (
                <label>
                  Uso de suelo:
                  <input
                    type="text"
                    name="landUse"
                    value={formData.landUse}
                    onChange={handleChange}
                  />
                </label>
              )}
              {currentQuestion === 3 && (
                <>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="contact.name"
                      value={formData.contact.name}
                      onChange={handleChange}
                    />
                  </label>
                  <label>
                    Apellidos:
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
                    Celular:
                    <input
                      type="tel"
                      name="contact.cellphone"
                      value={formData.contact.cellphone}
                      onChange={handleChange}
                    />
                  </label>
                </>
              )}
            </form>
            <button onClick={handleAnswer}>
              {isLastQuestion ? 'Enviar' : 'Siguiente'}
            </button>
          </>
        )}

{formSubmitted && (
  <p style={{ textAlign: 'center' }}>
    ¡Gracias por enviar la información! Nos pondremos en contacto contigo pronto.
  </p>
)}
      </div>




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

       
      </div>
    </Layout>
  );
};

export default Home;


