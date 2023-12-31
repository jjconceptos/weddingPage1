import React, { useState } from 'react';
import Layout from '/layouts/layout';

const ProjectForm = ({ onSubmit }) => {
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

  const timestamp = Date.now()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields if needed
    if (name === '' || description === '' || !photo) {
      console.error('All fields are required');
      return;
    }
    console.log('Photo file:', photo); // Add this line to check the photo file

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
          // Add any additional logic here, if needed
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
          
          <input  type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>
        <button type="submit">Add project</button>
      </form>
    </div>
    </Layout>
  );
};

export default ProjectForm;
