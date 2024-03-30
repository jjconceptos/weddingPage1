import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Layout from '/layouts/layout';
import 'layouts/carousel.css';


const LandingPage = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sections, setSections] = useState([]);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  // Define sections and their scroll positions
  const sectionsData = [
    { name: 'Inicio', scrollPosition: 0 },
    { name: 'Fotos', scrollPosition: 680 },
    { name: 'Vestimenta', scrollPosition: 10500 },
    { name: 'Hospedaje', scrollPosition: 12000 },
    { name: 'Maquillaje y peinado', scrollPosition: 27000 },
    { name: 'Transporte', scrollPosition: 27800 },
    { name: 'Mesa de regalos', scrollPosition: 28600 },
    // Add more sections as needed
  ];

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Set sections only when the menu is opened
    if (!isMenuOpen) {
      setSections(sectionsData);
    } else {
      setSections([]); // Clear sections when the menu is closed
    }
  };

  

  const handleMenuItemClick = (scrollPosition) => {
    setIsMenuOpen(false); // Close menu when a menu item is clicked
    window.scrollTo({ top: scrollPosition, behavior: 'smooth' }); // Scroll to the selected section
  };

  const handleConocenosClick = () => {
    // Specify the position you want to scroll to (adjust the value as needed)
    const scrollPosition = 680; // Replace with your desired position
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth', // Use smooth scrolling
    });
  };

  const yourCarouselItemsMobile = [
    
    {
      imagePath: '/dyc1.jpg',
      
      
    },
    {
      imagePath: '/dyc2.jpg',
      
      
    },
    {
      imagePath: '/dyc3.jpg',
      
      
    },
    {
      imagePath: '/dyc4.jpg',
      
      
    },
    {
      imagePath: '/dyc5.jpg',
      
      
    },
    {
      imagePath: '/dyc6.jpg',
      
      
    },
    {
      imagePath: '/dyc7.jpg',
     
      
    },
    {
      imagePath: '/dyc8.jpg',
      
      
    },
    {
      imagePath: '/dyc9.jpg',
    
      
    },
    {
      imagePath: '/dyc10.jpg',
      
      
    },
  ];

  const yourCarouselItemsDesktop = [
    
    {
      imagePath: '/dyc11.jpeg',
      
      
    },
    {
      imagePath: '/dyc12.jpeg',
      
      
    },
    {
      imagePath: '/dyc13.jpeg',
      
      
    },
    {
      imagePath: '/dyc14.jpeg',
      
      
    },
    
  ];

  useEffect(() => {
    const checkIsMobileViewport = () => {
        setIsMobileViewport(window.innerWidth <= 768); // Example threshold for mobile viewport width
    };

    // Check viewport width on initial render
    checkIsMobileViewport();

    // Add event listener to update viewport width on window resize
    window.addEventListener('resize', checkIsMobileViewport);

    // Cleanup function to remove event listener
    return () => {
        window.removeEventListener('resize', checkIsMobileViewport);
    };
}, []);

  const carouselItems = isMobileViewport ? yourCarouselItemsMobile : yourCarouselItemsDesktop;


  const Carousel = ({ items }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
    };
  
    return (
      <div className="carousel">
        <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {items.map((item, index) => (
            <div key={index} className="carousel-item">
              <img src={item.imagePath} alt={`Image ${index + 1}`} />
              <div className="carousel-footer">
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={handlePrev} className="carousel-button prev">
        {"<"} 
        </button>
        <button type="button" onClick={handleNext} className="carousel-button next">
        {">"} 
        </button>
      </div>
    );
  };
  


  return (
    <Layout>
      <style jsx>{`
       
       

        .burger-menu {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 999;
          cursor: pointer;
        }

        .bar {
          width: 35px;
          height: 5px;
          background-color: #000;
          margin: 6px 0;
          transition: 0.4s;
        }

        // Rotate the first and third bar to create the burger menu icon effect
        .change .bar-1 {
          -webkit-transform: rotate(-45deg) translate(-9px, 6px);
          transform: rotate(-45deg) translate(-9px, 6px);
        }

        .change .bar-2 {
          opacity: 0;
        }

        .change .bar-3 {
          -webkit-transform: rotate(45deg) translate(-8px, -8px);
          transform: rotate(45deg) translate(-8px, -8px);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #A09D93;
          z-index: 998;
          display: ${isMenuOpen ? 'block' : 'none'}; // Show overlay when menu is open
        }

        
        .menu-items {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          text-align: center;
        }

        .menu-item {
          margin-bottom: 20px;
          font-size: 20px;
          color: #ffff;
          cursor: pointer;
        }

        .section {
          display: ${isMenuOpen ? 'block' : 'none'};
        }

        .presentation-card-container {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            padding-top: 10vh;      
        }

        .horizontal-line {
          position: absolute;
          left: 0;
          width: 100% !important; /* Set the width to span the entire viewport */
          height: 1px; /* Set the height of the line */
          background-color: #000; /* Set the color of the line */
          margin-top: 50vh; /* Adjust margin as needed */
        }

        .rosemary {
          position: relative;
         
          margin-left: auto; /* Center horizontally */
          margin-right: auto; /* Center horizontally */
          transform: scale(.6);
        }

        .image {
          position: relative;
          margin-top: 100vw;
          width: 100%; /* Set the width to 70% of the viewport width */
          height: auto; /* Maintain the aspect ratio */
          transform: scale(.5); /* Scale the image by 1.3 times its original size */
        }
 

        .main-title-section-container {
        position: absolute;
        margin-top: 10vh;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
        border-bottom: 1px solid #000;
        
        }

        .logo-image {
          position: relative;

          width: 100%; /* Set the width to 70% of the viewport width */
          height: auto; /* Maintain the aspect ratio */
          transform: scale(.3); /* Scale the image by 1.3 times its original size */
        }

        .title {
          font-size: 42px;
          width: 60vw;
          
        }

        .section-title {
        font-size: 40px;
        }

        .section-subtitle {
        font-size: 28px;
        
        font-weight: 300;
        }

        .container {
          position: absolute;
          margin-top: 150vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-one {
            position: absolute;
          margin-top: 345vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .itinerary-info {
            margin-top: 10vh; /* Adjust margin-top as needed */
            
          }

          .container-two {
          position: absolute;
          margin-top: 575vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .color-palette {
            display: grid;
            grid-template-columns: repeat(3, 100px); /* Adjust the number and size of columns as needed */
            gap: 10px; /* Adjust the gap between color squares */
          }
          
          .color-square {
            width: 100px; /* Adjust the width of color squares */
            height: 100px; /* Adjust the height of color squares */
            border-radius: 5px; /* Optional: Add rounded corners */
          }

          .attire-info {
            margin-top: 20vh; /* Adjust margin-top as needed */
          }

          .container-three {
            position: absolute;
          margin-top: 2000vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .hosting {
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .hosting-title {
            font-size: 28px;
            margin-top: 25vh;
        }
  
        .hosting-image {
          position: relative;
          margin-top: 100vw;
          width: 100%; /* Set the width to 70% of the viewport width */
          height: auto; /* Maintain the aspect ratio */
          transform: scale(1.75); /* Scale the image by 1.3 times its original size */
        }

          .container-four {
            position: absolute;
          margin-top: 3435vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-five {
            position: absolute;
          margin-top: 3600vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-six {
            position: absolute;
          margin-top: 3700vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }



              @media screen and (min-width: 768px) and (min-height: 600px) {

                
        .burger-menu {
          position: fixed;
          top: 20px;
          left: 20px;
          z-index: 999;
          cursor: pointer;
        }

        .bar {
          width: 35px;
          height: 5px;
          background-color: #000;
          margin: 6px 0;
          transition: 0.4s;
        }

        // Rotate the first and third bar to create the burger menu icon effect
        .change .bar-1 {
          -webkit-transform: rotate(-45deg) translate(-9px, 6px);
          transform: rotate(-45deg) translate(-9px, 6px);
        }

        .change .bar-2 {
          opacity: 0;
        }

        .change .bar-3 {
          -webkit-transform: rotate(45deg) translate(-8px, -8px);
          transform: rotate(45deg) translate(-8px, -8px);
        }

        .menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: #A09D93;
          z-index: 998;
          display: ${isMenuOpen ? 'block' : 'none'}; // Show overlay when menu is open
        }

        
        .menu-items {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 999;
          text-align: center;
        }

        .menu-item {
          margin-bottom: 20px;
          font-size: 20px;
          color: #ffff;
          cursor: pointer;
        }

        .section {
          display: ${isMenuOpen ? 'block' : 'none'};
        }

        .presentation-card-container {
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
                  
        }

        .horizontal-line {
          position: absolute;
          left: 0;
          width: 100% !important; /* Set the width to span the entire viewport */
          height: 1px; /* Set the height of the line */
          background-color: #000; /* Set the color of the line */
          margin-top: 50vh; /* Adjust margin as needed */
        }

        .rosemary {
          position: relative;
         
          margin-left: auto; /* Center horizontally */
          margin-right: auto; /* Center horizontally */
          transform: scale(.8);
        }

        .image {
          position: relative;
          width: 100%; /* Set the width to 70% of the viewport width */
          height: auto; /* Maintain the aspect ratio */
          transform: scale(.3); /* Scale the image by 1.3 times its original size */
          margin-bottom: -30%;
        }

      
        .main-title-section-container {
        position: absolute;
        margin-top: -75vh;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
        border-bottom: 1px solid #000;
        }

        .logo-image {
          position: relative;
          width: 100%; /* Set the width to 70% of the viewport width */
          height: auto; /* Maintain the aspect ratio */
          transform: scale(1.3); /* Scale the image by 1.3 times its original size */
        }

        .title {
          font-size: 100px;
          width: 60vw;
          
        }

        .section-title {
        font-size: 104px;
        font-weight: bold;
        }

        .section-subtitle {
        font-size: 28px;
        
        font-weight: 300;
        }

        .container {
          position: absolute;
          margin-top: 200vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-one {
            position: absolute;
          margin-top: 350vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .itinerary-info {
            margin-top: 10vh; /* Adjust margin-top as needed */
          }

          .container-two {
          position: absolute;
          margin-top: 550vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .color-palette {
            display: grid;
            grid-template-columns: repeat(3, 100px); /* Adjust the number and size of columns as needed */
            gap: 10px; /* Adjust the gap between color squares */
          }
          
          .color-square {
            width: 100px; /* Adjust the width of color squares */
            height: 100px; /* Adjust the height of color squares */
            border-radius: 5px; /* Optional: Add rounded corners */
          }

          .attire-info {
            margin-top: 20vh; /* Adjust margin-top as needed */
          }

          .container-three {
            position: absolute;
          margin-top: 2550vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .hosting {
            position: relative;
            margin-bottom: -100vh; /* Adjusted margin for shorter vertical distance between hotels */
        }

          .hosting-title {
            font-size: 100px;
            margin-top: 25vh;
        }

            .hosting-image {
              position: relative;
              margin-top: 100vw;
              width: 100%; /* Set the width to 70% of the viewport width */
              height: auto; /* Maintain the aspect ratio */
              transform: scale(1.75); /* Scale the image by 1.3 times its original size */
            }

          .container-four {
            position: absolute;
          margin-top: 4080vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-five {
            position: absolute;
          margin-top: 4200vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

          .container-six {
            position: absolute;
          margin-top: 4320vh;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          margin-bottom: 10vh; /* Adjusted margin for better separation from the next section */
          }

              }

           
    

          

        
       
      `}</style>

{/* Burger menu icon */}
<div className={`burger-menu ${isMenuOpen ? 'change' : ''}`} onClick={handleToggleMenu}>
        <div className="bar bar-1"></div>
        <div className="bar bar-2"></div>
        <div className="bar bar-3"></div>
      </div>

      

      
     {/* Menu items */}
{isMenuOpen && (
  <>
    <div className="menu-overlay" onClick={handleToggleMenu}></div>
    <div className="menu-items">
      {sectionsData.map((section, index) => (
        <div className="menu-item" key={index} onClick={() => handleMenuItemClick(section.scrollPosition)}>
          {section.name}
        </div>
      ))}
    </div>
  </>
)}


      {/* Sections */}
      {isMenuOpen && sections.length > 0 && sections.map((section, index) => (
  <div className="section" key={index} onClick={() => handleMenuItemClick(section.scrollPosition)}>
    {section.name}
  </div>
))}

<div className="presentation-card-container">
      <div className="main-title-section-container">
      <img src="/dycLogo.png" alt="Your Image" className="image"  />
      <link
        href="https://db.onlinewebfonts.com/c/57f0d312017e3471c956900c601e683d?family=Cherolina" 
        rel="stylesheet"
      />
      <div className="title" style={{ fontFamily: 'Cherolina'}}>
        Daniela y César
      </div>


      <div className="sub-title" onClick={handleConocenosClick}>
       2024
      </div>
     {/*  <div className="horizontal-line" style={{ width: '100%', height: '1px', backgroundColor: '#000', marginTop: '50vh' }}></div>*/}
      </div>
      
      <div className="container">
      
      <div className="section-title"></div>
      <Carousel items={carouselItems}/>
      {/* 
      <img src="/dyc1.jpg" alt="Your Image" className="image"  />
      <img src="/dyc2.jpg" alt="Your Image" className="image"  />
      <img src="/dyc3.jpg" alt="Your Image" className="image"  />
      <img src="/dyc4.jpg" alt="Your Image" className="image"  />
      <img src="/dyc5.jpg" alt="Your Image" className="image"  />
      <img src="/dyc6.jpg" alt="Your Image" className="image"  />
      <img src="/dyc7.jpg" alt="Your Image" className="image"  />
      <img src="/dyc8.jpg" alt="Your Image" className="image"  />
      <img src="/dyc9.jpg" alt="Your Image" className="image"  />
      <img src="/dyc10.jpg" alt="Your Image" className="image"  />
      */}
       {/* <div className="horizontal-line"></div>*/}
       <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '8vh' }} />

       
      </div>
       
      <div className="container-one">
          <div className="section-title"><strong>Itinerario</strong></div>
          <div className="itinerary-info">
          <p><strong style={{ fontSize: '30px' }}>Boda civil</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong >Cuando?</strong></p>
          <p><strong>Viernes 16 de agosto</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong>Donde?</strong></p>
          <p><strong>Hacienda San José Lavista</strong></p>
          {/*<img src="/haciendaSanJose.jpeg" alt="Your Image" style={{ marginTop: '8vh',  transform: 'scale(1.6)'}} />*/}
          
          <p style={{ fontSize: '24px', marginTop: '7vh' }}><strong>Dresscode: </strong></p>
          <p >Cocktail Boho</p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong>Horarios: </strong></p>
          <li style={{ fontSize: '18px', marginTop: '4vh' }}>Ceremonia Civil: 5:00 pm</li>
          <li style={{ fontSize: '18px' }}>Callejoneada: 6:00 pm</li>
          <li style={{ fontSize: '18px' }}>Rompe Hielos: 7:00 pm – 11:00 pm</li>
         

          <p style={{ fontSize: '30px', marginTop: '7vh' }}><strong>Boda religiosa</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong >Cuando?</strong></p>
          <p><strong>Sábado 17 de Agosto</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong>Donde?</strong></p>
          <p><strong>Hacienda San José Lavista</strong></p>
          <p>Dress Code: Etiqueta rigurosa</p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong>Horarios: </strong></p>
          <li>Ceremonia Religiosa: 5:00 pm</li>
          <li>Cata: 6:00 pm</li>
          <li>Recepción: 7:00 pm</li>

          <p style={{ fontSize: '30px', marginTop: '7vh' }}><strong>Tornaboda</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong >Cuando?</strong></p>
          <p><strong>Domingo 18 de Agosto</strong></p>
          <p style={{ fontSize: '24px', marginTop: '5vh' }}><strong>Horarios: </strong></p>
          <li>Tornaboda: 12:00 pm</li>
          </div>
          <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />
          {/* <div className="horizontal-line"></div>*/}
      </div>
      
      <div className="container-two">
      <div className="section-title"><strong>Vestimenta</strong></div>

       {/* <div style={{ fontSize: '30px', marginTop: '10vh' }}>Paleta de colores</div>

      <div className="color-palette">
        <div className="color-square" style={{ backgroundColor: '#4B4C2D' }}></div>
        <div className="color-square" style={{ backgroundColor: '#C19A68' }}></div>
        <div className="color-square" style={{ backgroundColor: '#DED5C8' }}></div>
        <div className="color-square" style={{ backgroundColor: '#271523' }}></div>
        <div className="color-square" style={{ backgroundColor: '#FFFFFF' }}></div>
        <div className="color-square" style={{ backgroundColor: '#D7AE42' }}></div>
      </div> */}

      <div className="attire-info">
          <p><strong style={{ fontSize: '30px' }}>Mujeres</strong></p>

          <p><strong style={{ fontSize: '30px' }}>Boda civil</strong></p>
          <p >Cocktail Boho</p>
          <a href="https://www.pinterest.com.mx/danypesant/women-dresscode-civil-ceremony/?invite_code=8dd54549174d44dfb788935e9ae7c876&sender=347410696163627453" style={{ textDecoration: 'underline', color: '#ffff' }}>Ideas</a>
          {/*<img src="/womensBoho.avif" alt="Your Image" className="image"  />*/}
  
          <p style={{ fontSize: '30px', marginTop: '20vh' }}><strong>Boda religiosa</strong></p>
          <p >Etiqueta Rigurosa </p>
          <a href="https://www.pinterest.com.mx/danypesant/women-dresscode-ceremonia-religiosa/?invite_code=ba0030bf2d4746e7b215b95709355aad&sender=347410696163627453" style={{ textDecoration: 'underline', color: '#ffff' }}>Ideas</a>

          {/* <img src="/longDress.avif" alt="Your Image" className="image"  />*/}
          </div>
          <div className="attire-info">
          <p><strong style={{ fontSize: '30px' }}>Hombres</strong></p>

          <p><strong style={{ fontSize: '30px'}}>Boda civil</strong></p>
          <p >Cocktail Boho</p>
          <a href="https://www.pinterest.com.mx/danypesant/men-dresscode-civil-ceremony/?invite_code=d82ae94f2f2d4a5eb8a30982ef6ba4d0&sender=347410696163627453" style={{ textDecoration: 'underline', color: '#ffff' }}>Ideas</a>     
          <p style={{ fontSize: '30px', marginTop: '20vh' }}><strong>Boda religiosa</strong></p>
          <p >Etiqueta Rigurosa </p>
          <a href="https://www.pinterest.com.mx/danypesant/men-dresscode-ceremonia-religiosa/?invite_code=26d707542cfc4f1c944e9b9eb58f9abf&sender=347410696163627453" style={{ textDecoration: 'underline', color: '#ffff' }}>Ideas</a>
          {/* <img src="/blackTie.jpeg" alt="Your Image" className="image"  />*/}
          </div>   
      {/* <div className="horizontal-line"></div>*/}
      <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />
      </div>
      
      <div className="container-three">
      <div className="section-title"><strong>Hospedaje</strong></div>
      
      <div className="hosting">
      <img src="/hotel1.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>APAPACHO HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Bajada del chorro #11 Col.Centro, San Miguel de Allende, Gto. Mexico</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.apapachohotel.mx/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel2.png" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>CLANDESTINO HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Recreo 31, Centro. San Miguel De Allende, Gto, México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://clandestinohotel.com/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel3.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>L&rsquo;</strong>OTEL</div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Callejón de Chiquitos 1A, Centro, San Miguel de Allende, Gto.</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://l-otelgroup.com/chiquitos/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel4.png" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>BELMOND CASA DE SIERRA NEVADA</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Hospicio 35 San Miguel de Allende, Gto. México 37700</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.belmond.com/hotels/north-america/mexico/san-miguel-de-allende/belmond-casa-de-sierra-nevada/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel5.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>CASA QUEBRADA HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Recreo 31, Centro. San Miguel de Allende, Gto., México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://hotelcasaquebrada.mx/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel6.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>CASA 1810</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Hidalgo #8, San Miguel de Allende, Gto. México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://hotels.cloudbeds.com/reservation/oqBpi9#checkin=2024-03-24&checkout=2024-03-25">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel7.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>HOTEL MATILDA</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Aldama 53 · San Miguel de Allende, Gto. México 37700</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://hotelmatilda.com/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel8.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>LIVE AQUA</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Calzada de la Presa No. 85 Zona Centro, 37700 San Miguel de Allende, Gto., México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.liveaqua.com/hoteles-y-resorts/live-aqua-urban-resort-san-miguel-de-allende?gclid=CjwKCAjwzaSLBhBJEiwAJSRoktxuYj2yQbFhSdgbbyYZfKF3Z4lumxMMj_PwzYAGdIxNw3fm2LZotRoCujsQAvD_BwE&gclsrc=aw.ds">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel9.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>ROSEWOOD HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Nemesio Diez 11, Col. Centro, San Miguel de Allende, Gto. México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.rosewoodhotels.com/en/san-miguel-de-allende/offers">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel10.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>CASA HOYOS</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Mesones No. 14 , Zona Centro San Miguel de Allende, Gto., 37700, México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.casahoyos.mx/es">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel11.png" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>AMATTE</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Salida real a Querétaro 168, Zona Centro, 37700 San Miguel de Allende Gto.</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://amatte.com.mx/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel12.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>REAL DE MINAS</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Camino Viejo al Panteón 1, San Antonio, 37700 San Miguel de Allende, Gto. México</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.realdeminas.com/es/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel13.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>LA MORADA HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Correo #10 Centro. San Miguel de Allende Guanajuato, Mexico 37700</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.lamoradahotel.com.mx/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel14.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>NUMU BOUTIQUE HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Nemesio Diez 20, Zona Centro, 37700 San Miguel de Allende, Gto.</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.hyatt.com/en-US/hotel/mexico/numu/bjxub?src=corp_lclb_gmb_seo_bjxub">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel15.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>ILOROJO</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Salida Real a Querétaro 136-A, Zona Centro, 37774 San Miguel de Allende, Gto.</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.ilorojohotel.com/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel16.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>CASA BLANCA HOTEL</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Juarez No. 7 CentroSan Miguel de Allende Gto 37700</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://casablanca7.com/es/">Visit website</a>
      </div>

      <div className="hosting">
      <img src="/hotel17.jpeg" alt="Your Image" className="hosting-image"  />
      <div className="hosting-title"><strong>HACIENDA LOS PICACHOS</strong></div>
      <div style={{ fontSize: '23px', marginTop: '2vh' }}>Carretera San Miguel de Allende, Qto. Km. 3, San Jose de la Posta, 37700 San Miguel de Allende, Gto.</div>
      <div style={{ marginTop: '4vh' }}></div>
      <a style={{ fontSize: '20px'}} href="https://www.haciendalospicachos.com.mx/">Visit website</a>
      </div>

      {/* <div className="horizontal-line"></div>*/}
      <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />

      </div>
      
      <div className="container-four">
          <div className="section-title"><strong>Maquillaje y peinado</strong></div>
          <div className="itinerary-info">
          
          <p><strong style={{ fontSize: '24px' }}>Maquillaje</strong></p>
          <p><strong>Ubicacion</strong></p>
          
          <p style={{ fontSize: '24px' }}>Peinado</p>
          <p><strong>Ubicacion</strong></p>    
          </div>
          {/*<div className="horizontal-line"></div>*/}
          <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />

      </div>

      <div className="container-five">
          <div className="section-title"><strong>Transporte</strong></div>
          <div className="itinerary-info">
          <p><strong style={{ fontSize: '30px' }}>Boda civil</strong></p>
          <p><strong style={{ fontSize: '24px' }}>Cuando?</strong></p>
          <p><strong>Viernes 16 de agosto</strong></p>
          <p><strong style={{ fontSize: '24px' }}>Donde?</strong></p>
          <p><strong>Hacienda San José Lavista</strong></p>
        
          <p><strong>Boda religiosa</strong></p>
          <p><strong>Sábado 17 de agosto Hacienda San José Lavista</strong></p>
          </div>
         {/* <div className="horizontal-line"></div>*/}
         <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />

      </div>

      <div className="container-six">
          <div className="section-title"><strong>Mesa de regalos</strong></div>
          <div className="itinerary-info">
          
          <p><strong style={{ fontSize: '24px' }}>Palacio de hierro</strong></p>
          <p><strong>Evento número 385296</strong></p> 
          <a style={{ fontSize: '20px'}} href="https://www.elpalaciodehierro.com/buscar?eventId=385296">Click aqui para ver mesa de regalos online</a>
             

          <p style={{ fontSize: '24px' }}>Cuenta bancaria</p>
          <p><strong>cuenta</strong></p>    
          </div>
          {/* <div className="horizontal-line"></div> */}
          <img src="/rosemary.png" alt="Your Image" className="rosemary" style={{ marginTop: '15vh',  transform: 'scale(1.2)'}} />

      </div>
      
    </div>
    </Layout>
  );
};

export default LandingPage;