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

  const handleAnswer = async (event) => {
    event.preventDefault();  // Prevent the default form behavior
  
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
    // Scroll to the form section when showQuestions becomes true
    if (formRef.current && showQuestions) {
      const formPosition = formRef.current.offsetTop;
      const formHeight = formRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
  
      const scrollDistance = formPosition - windowHeight + formHeight + 100; // Adjust 20 for extra space
      
      window.scrollTo({
        top: scrollDistance,
        behavior: 'smooth',
      });
    }
  }, [showQuestions]);

  const startQuestions = () => {
    console.log('Starting questions...');
    setShowQuestions(true);
  
    // Scroll down to the form section when starting questions
    setTimeout(() => {
      if (formRef.current) {
        const formPosition = formRef.current.offsetTop;
        const formHeight = formRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        const scrollDistance = formPosition - windowHeight + formHeight + 10; // Adjust 20 for extra space
        
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
    min-height: 55vh; /* Adjust the min-height as needed */
  }

  .background-container {
    position: absolute;
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
    padding-bottom: 120px; /* Add padding-bottom to create space for the form */
  }

  .footer {
    position: relative;
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

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 75vh; /* Change to auto */
    padding: 50vh;
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
    width: 100%;
    box-sizing: border-box;
  }

  button {
    margin-top: 10px;
    z-index: 1;
  }

  .non-question-section {
    text-align: center;
    margin-top: 650px;
  }

  .explanatory-text {
    position: absolute;
    top: 25vh;  // Adjust the value as needed to position it at the desired height
    width: 100%;
    text-align: center;
    z-index: 2; // Ensure it appears above other elements
  }

  .image-text-section {
    position: absolute;
    top: 195vh; /* Adjust the top value as needed */
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 50px;
  }

  .image-text-item {
    text-align: center;
  }

  .image-text-item img {
    width: 100px; /* Adjust image width as needed */
    height: 100px; /* Adjust image height as needed */
    object-fit: cover;
    border-radius: 50%;
    margin-bottom: 10px;
  }
`}</style>


<div className="explanatory-text">
        <p>
          textotextotexto.
        </p>
        <p>
          textotextomastexto.
        </p>
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


          {/* Image-text representations section */}

  {/* Image-text representations section */}
{showQuestions && (
  <div className="image-text-section">
    <div className="image-text-item">
      <img src="image1.jpg" alt="Text 1" />
      <p>Text 1</p>
    </div>
    <div className="image-text-item">
      <img src="image2.jpg" alt="Text 2" />
      <p>Text 2</p>
    </div>
    <div className="image-text-item">
      <img src="image3.jpg" alt="Text 3" />
      <p>Text 3</p>
    </div>
  </div>
)}




        </div>

       
      </div>
    </Layout>
  );
};

export default Home;
