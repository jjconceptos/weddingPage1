import React from 'react';

function ProjectModal({ project, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{project.name}</h2>
        <p>{project.description}</p>
        {project.imageUrl && (
          <img
            src={project.imageUrl}
            alt={project.name}
            style={{ width: '10cm', height: '10cm' }} // Set the image size
          />
        )}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ProjectModal;
