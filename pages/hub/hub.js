// Hub.js

import React from 'react';
import Layout from '/layouts/layout';
import '/layouts/styles.css'; 
import CenteredContentWrapper from '/layouts/centered';

const Hub = () => {
  const socialNetworks = [
    { name: 'Instagram', src: '/instagram.png', link: 'https://instagram.com/' },
    { name: 'Linkedin', src: '/linkedin.png', link: 'https://www.linkedin.com/' },
    { name: 'GitHub', src: '/github.png', link: 'https://www.github.com/' },
    // Add more social networks as needed
  ];

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',    // Center items horizontally
    justifyContent: 'center', // Center items vertically
    height: '100vh',
    position: 'relative',
  };

  const titleStyles = {
    position: 'absolute',
    top: '10px',
    left: '10px',
  };

  const imageStyles = {
    width: '1.5cm',
    height: '1.5cm',
    display: 'block',
    margin: '0.5cm', // Center the image horizontally
  };

  const socialIconContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  };

  return (
    <Layout>
      <CenteredContentWrapper>
    <div className="hub-container" style={containerStyles}>
      <h1 style={titleStyles}></h1>
      <div style={socialIconContainerStyles}>
        {socialNetworks.map((network, index) => (
          <a href={network.link} target="_blank" rel="noopener noreferrer" key={index}>
            <img
              src={network.src}
              alt={`${network.name} Icon`}
              style={imageStyles}
            />
          </a>
        ))}
      </div>
    </div>
    </CenteredContentWrapper>
    </Layout>
  );
};

export default Hub;
