import React, { useState } from 'react';
import Layout from '/layouts/layout';


const ProjectForm = ({ onSubmit, onProjectAdded, projects }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const timestamp = Date.now();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate fields if needed
    if (name === '' || description === '' || !photo) {
      console.error('All fields are required');
      return;
    }
    console.log('Photo file:', photo); // Log the photo file being sent
  
    // Create a FormData object to send the form data as a multipart request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('photo', photo);
  
    try {
      // Send the form data to the local image upload endpoint
      const imageResponse = await fetch('/api/projects/projectImage', {
        method: 'POST',
        body: formData,
        headers: {
          // Include the project name in the image headers
          'image-name': name,
          'timestamp': timestamp,
        },
      });
  
      if (imageResponse.ok) {
        // Project image data submission successful
        console.log('Image data submitted successfully');
  
        // Now, send the text data
        const textData = {
          name,
          description,
          timestamp,
        };
  
        const textResponse = await fetch('/api/projects/projectText', {
          method: 'POST',
          body: JSON.stringify({ textData }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (textResponse.ok) {
          // Text data submission successful
          console.log('Text data submitted successfully');
  
          // Send the project name to the API immediately after adding it
          const projectNamesResponse = await fetch('/api/projects/projectNames', {
            method: 'POST',
            body: JSON.stringify({ projectNames: [name] }), // Send just the project name as an array
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (projectNamesResponse.ok) {
            console.log('Project name added to the list successfully');
          } else {
            console.error('Failed to add the project name to the list');
          }
  
          // Notify the parent component that a new project has been added
          onProjectAdded(name);
  
          // Clear form fields
          setName('');
          setDescription('');
          setPhoto(null);
        } else {
          // Text data submission failed
          console.error('Text data submission failed');
        }
      } else {
        // Project image data submission failed
        console.error('Image data submission failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  return (
    <Layout>
      <div>
        <h2></h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div>
            <input className="input-field" type="text" value={name} onChange={handleNameChange} placeholder="Name" />
          </div>
          <div>
            <textarea className="input-field" value={description} onChange={handleDescriptionChange} placeholder="Description" />
          </div>
          <div>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* Log the updated projects array here */}
      <div>
        <h2></h2>
        {/* 
        <ul>
          {Array.isArray(projects) &&
            projects.map((project, index) => (
              <li key={index}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </li>
            ))}
        </ul>
        */}
      </div>
    </Layout>
  );
};

export default ProjectForm;
