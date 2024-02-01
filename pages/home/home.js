import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';

const Home = () => {
  const { state } = useAuth();
  const formRef = useRef(null);
  const [showExplanatoryText, setShowExplanatoryText] = useState(true);
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);

  const [questions, setQuestions] = useState([
    'Aviso de privacidad',
    'En donde esta?',
    'Cual es el área de tu terreno?',
    'Conoces el uso de suelo?',
    'Nos puedes enseñar una foto del terreno?',
    'Por favor danos tu contacto',
  ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [formData, setFormData] = useState({
    location: { street: '', number: '', neighbourhood: '', county: '', city: '', zipCode: '' },
    size: '',
    landUse: '',
    landPhoto: '',
    contact: { name: '', lastName: '', email: '', cellphone: '' },
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = async (event) => {
    event.preventDefault();
  
    // Move to the next question if it exists
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      // Send the form data to the serverless function when "Submit" is clicked
      try {
        const formDataToSend = new FormData();
        for (const key in formData) {
          if (formData.hasOwnProperty(key)) {
            if (key === 'landPhoto') {
              formDataToSend.append(key, formData[key]);
            } else {
              formDataToSend.append(key, JSON.stringify(formData[key]));
            }
          }
        }
  
        const response = await fetch('/api/mails/submitForm', {
          method: 'POST',
          body: formDataToSend,
        });
  
        if (response.ok) {
          console.log('Form data sent successfully:', formData);
          setFormSubmitted(true);
  
          // Set showQuestions to true after submitting the form
          setShowQuestions(true);
        } else {
          console.error('Failed to send form data:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending form data:', error);
      }
    }
  };
  
  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    if (type === 'file') {
      // Handle file input separately
      const photoFile = files[0];
      setFormData((prevData) => ({ ...prevData, [name]: photoFile }));
  
      // Optionally, you can display the file name for user reference
      console.log('Selected photo:', photoFile.name);
    } else {
      // Handle other input types
      // Update form data on input change
      if (name.includes('location.') || name.includes('contact.')) {
        const field = name.split('.')[1];
        setFormData((prevData) => ({
          ...prevData,
          [name.split('.')[0]]: { ...prevData[name.split('.')[0]], [field]: value },
        }));
      } else {
        // Update other fields
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    }
  };
  
  

  console.log('Clearance Level:', state.clearanceLevel);


  const startQuestions = () => {
    console.log('Starting questions...');
    setShowQuestions(true);
    setShowExplanatoryText(false); // Hide explanatory text
  
    // Scroll down to the form section when starting questions
    setTimeout(() => {
      if (formRef.current) {
        
        
        const scrollDistance =  1000; // Adjust 20 for extra space
        
        window.scrollBy({
          top: scrollDistance,
          behavior: 'smooth',
        });
      }
    }, 1);
  };

  const handleBack = () => {
    // Move to the previous question if it's not the first question
    if (currentQuestion > 0) {
      setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    }
  };

  const handlePrivacyAgreement = () => {
    // Hide the privacy notice when the user agrees
    if (!privacyAgreed) {
      // Set privacyAgreed to true only if the checkbox is checked
      setPrivacyAgreed(true);
    } else {
      // Uncheck has been triggered, set privacyAgreed to false
      setPrivacyAgreed(false);
    }
    setShowPrivacyNotice(false);
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
    min-height: 55vh;
  }

  .background-container {
    position: absolute;
    top: -50vh;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    
    background-size: cover;
    background-position: center;
    z-index: 0;
    padding-bottom: 10vw; /* Adjust padding-bottom for better responsiveness */
  }

  .header {
    position: absolute;
    top: 2vw; /* Adjust the top value using vw */
    right: 2vw; /* Adjust the right value using vw */
    font-family: 'Your Custom Font', sans-serif;
    font-size: 2vw; /* Adjust the font-size using vw */
    justify-content: space-between;
    color: #fff; 
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 7vh; /* Adjust the margin-top using vw for spacing */
    padding: 10vw; /* Adjust padding using vw */
  }

  label {
    margin: 1vw 0; /* Adjust margin using vw */
    font-weight: bold;
    width: 100%;
  }

  input {
    padding: 0.5vw; /* Adjust padding using vw */
    margin: 0.5vw; /* Adjust margin using vw */
    border: 0.1vw solid #ccc; /* Adjust border thickness using vw */
    border-radius: 4vw; /* Adjust border-radius using vw */
    width: 100%;
    box-sizing: border-box;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
    margin-top: 1vh;
    gap: 1vw; 
  }

  .back-button,
  .next-button {
    padding: 1vw 2vw; /* Adjust padding using vw */
    border: none;
    border-radius: 4vw; /* Adjust border-radius using vw */
    cursor: pointer;
    font-size: 1.5vw; /* Adjust font-size using vw */
  }

  .back-button {
    background-color: #0070f3;
    color: #fff;
  }

  .next-button {
    background-color: #0070f3;
    color: #fff;
  }

  .question-trigger-section {
    text-align: center;
    margin-top: 30vh; /* Adjust margin-top using vw */
  }

  .centered-text {
    position: absolute;
    top: 35vh; /* Adjust the top value using vw */
    width: 70%;
    text-align: center;
    z-index: 2; // Ensure it appears above other elements
  }
  .privacy-section {
    text-align: center;
    margin-top: 1vw; /* Adjust margin-top using vw */
  }

  
  .privacy-checkbox {
    margin-top: 50px;
    margin-bottom: 50px;
  
    
  }

`}</style>




<div className="centered-text">
  






{showExplanatoryText && (
          <>
            <p>textotextotexto.</p>
            <p>textotextomastexto.</p>
          </>
        )}
      </div>
      <div className="header">
    <a href="#contacto">Contacto</a>
    <span> | </span>
    <a href="#sitio-de-compradores">Sitio de compradores</a>
    <span> | </span>
    <a href="#solicitar-informacion">Solicitar información</a>
  </div>

      
        <div className="question-trigger-section">
          {!showQuestions && !formSubmitted && (
            <>
            
              <p style={{ textAlign: 'center' }}>
                Por favor háblanos de tu terreno para poder hacerte una oferta
              </p>
              <button onClick={startQuestions}>Comenzar</button>
            </>
          )}
        </div>
        
          {!formSubmitted && showQuestions && currentQuestion < questions.length && (
            <>
              <form className="form" ref={formRef}>
                <p>{questions[currentQuestion]}</p>

                {currentQuestion === 0 && (
  <div className="privacy-section">
    <label>
      <p>
        Para poder procesar tu solicitud, necesitamos recopilar y procesar tu información personal. Al enviar este formulario, aceptas que tus datos serán utilizados de acuerdo con nuestra política de privacidad.
      </p>
    </label>
    
      <input className="privacy-checkbox"
        type="checkbox"
        onChange={handlePrivacyAgreement}
      />
      
    
  </div>
)}

                {currentQuestion === 1 && (
                  <>
                    <label>
                      Calle:
                      <input
                        type="text"
                        name="location.street"
                        value={formData.location.street}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Numero:
                      <input
                        type="text"
                        name="location.number"
                        value={formData.location.number}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Colonia:
                      <input
                        type="text"
                        name="location.neighbourhood"
                        value={formData.location.neighbourhood}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Delegación:
                      <input
                        type="text"
                        name="location.county"
                        value={formData.location.county}
                        onChange={handleChange}
                      />
                    </label>
                    <label>
                      Ciudad:
                      <input
                        type="text"
                        name="location.city"
                        value={formData.location.city}
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
                {currentQuestion === 2 && (
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
                {currentQuestion === 3 && (
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
                {currentQuestion === 4 && (
                  <label>
                    Uso de suelo:
                    <input
                      type="file"
                      accept="image/*"
                      name="landPhoto"
                      onChange={handleChange}
                    />
                  </label>
                )}
                {currentQuestion === 5 && (
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
                <div className="button-container">
                {currentQuestion > 1 && (
                <button type="button" onClick={handleBack} className="back-button">
                  Atrás
                </button>
)}
              <button
                onClick={handleAnswer}
                disabled={currentQuestion === 0 && !privacyAgreed}
                className="next-button"
              >
                {isLastQuestion ? 'Enviar' : 'Siguiente'}
              </button>
            </div>
              </form>
            </>
          )}

          {formSubmitted && (
            <p className="centered-text">
              ¡Gracias por enviar la información! Nos pondremos en contacto contigo pronto.
            </p>
          )}




        

       
      
    </Layout>
  );
};

export default Home;
