import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Layout from '/layouts/layout';
import { useAuth } from '/auth/authContext';

const Home = () => {
  const { state } = useAuth();
  const formRef = useRef(null);
  const [showExplanatoryText, setShowExplanatoryText] = useState(true);
  const [questions, setQuestions] = useState([
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
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    background-image: url('schematic.jpeg');
    background-size: cover;
    background-position: center;
    z-index: 0;
    padding-bottom: 120px; /* Add padding-bottom to create space for the form */
  }

  .header {
    position: absolute;
    top: 5px; /* Adjust the top value as needed */
    right: 10px; /* Adjust the right value as needed */
    font-family: 'Your Custom Font', sans-serif;
    font-size: 12px; 
    justify-content: space-between;
    color: #fff; 
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1vh; /* Adjust the margin-top as needed for spacing */
    padding: 20px;
  }

  label {
    margin: 10px 0;
    font-weight: bold;
    width: 100%;
  }

  input {
    padding: 4px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
  }

  button {
    margin-top: 10px;
    z-index: 1;
  }

  .non-question-section {
    text-align: center;
    margin-top: 50vh; /* Adjust the margin-top as needed */
  }

  .explanatory-text {
    position: absolute;
    top: 25vh; /* Adjust the top value as needed to position it at the desired height */
    width: 100%;
    text-align: center;
    z-index: 2; // Ensure it appears above other elements
  }
`}</style>



<div className="explanatory-text">
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

      <div className="background-container">
        <div className="non-question-section">
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
              <form className="form" ref={formRef}>
                <p>{questions[currentQuestion]}</p>

                {currentQuestion === 0 && (
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
                {currentQuestion === 4 && (
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
                <button onClick={handleAnswer}>
                  {isLastQuestion ? 'Enviar' : 'Siguiente'}
                </button>
              </form>
            </>
          )}

          {formSubmitted && (
            <p style={{ textAlign: 'center', marginTop: '900px', padding: '50vh'}}>
              ¡Gracias por enviar la información! Nos pondremos en contacto contigo pronto.
            </p>
          )}



  {/*  
{showQuestions && (
  <div className="image-text-section">
    <div className="image-text-item">
      <img src="terreno1.jpeg" alt="Text 1" />
      <p>Luis Flaminguez vendio su terreno en 49,000,000</p>
    </div>
    <div className="image-text-item">
      <img src="terreno2.jpeg" alt="Text 2" />
      <p>Señor Gaultier vendió su terreno y ahora se construyen bodegas en el</p>
    </div>
    <div className="image-text-item">
      <img src="image3.jpg" alt="Text 3" />
      <p>Margarov aporto su terreno y ahora es dueño de la ciudad de Sicilia</p>
    </div>
  </div>
)}
*/}



        </div>

       
      </div>
    </Layout>
  );
};

export default Home;
