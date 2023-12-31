import React, { useState, useEffect } from 'react';
import { useAuth } from '/auth/authContext';
import ProjectForm from '/pages/projects/manage/addProject';
import { fetchProjectsData } from '/utils/fetchProjects';
import DelProjectButton from 'pages/projects/manage/delProject'; // Update the path to the DelProjectButton component
import Layout from '/layouts/layout';
import '/layouts/styles.css'; 
import CenteredContentWrapper from '/layouts/centered';

const projectsData = await fetchProjectsData();



function Projects() {
  
  const { state } = useAuth();
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projects, setProjects] = useState([]); // State to hold fetched projects
  const [expandedProject, setExpandedProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [enlargedView, setEnlargedView] = useState(false);



  // Define a function to fetch projects
  const fetchProjects = async () => {
    
    try {
      
      // Pass the project names to fetchProjectsData
      
      // Log the URL from the first project (assuming there is at least one project)
      console.log('Projects received in fetchProjects function (projects.js):', projectsData);
        
      // Modify the descriptions to limit to 25 characters
      const modifiedProjects = projectsData.map((project) => ({
        ...project,
        description: project.description.length > 8
          ? project.description.slice(0, 8) + '...'
          : project.description,
      }));

      // Set the modified projects data in your state
      setProjects(modifiedProjects);
    } catch (error) {
      console.error('Error fetching projects (projects.js):', error);
    }
  };

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
  }, []);

  const handleProjectAddClick = () => {
    setShowProjectForm(true);
  };

  const handleProjectClick = (project) => {
    if (project) {
      // If a project is provided, set the selected project and toggle the enlarged view
      setSelectedProject(project);
      setEnlargedView(!enlargedView);
      setShowProjectForm(false); // Close the "Add project" form if it's open
    } else {
      // If no project is provided, toggle the "Add project" form
      setShowProjectForm((prevShowProjectForm) => !prevShowProjectForm);
    }
  };
  

  const handleProjectAdded = async () => {
    try {
      // Use fetchProjectsData to get the updated project list
      const updatedProjects = await fetchProjectsData();
      
      // Update the projects state with the updated project list
      setProjects(updatedProjects);
      
      console.log('Updated projects:', updatedProjects);
    } catch (error) {
      console.error('Error handling added project:', error);
    }
  };



  const handleProjectSubmit = async (project) => {
    // Validate and add the new project to the list
    if (project.name && project.description) {
     
      setShowProjectForm(false);

      // Notify the parent component that a new project has been added
      handleProjectAdded(project.name);
    } else {
      console.log('Validation failed: Missing name or description');
    }
  };

  const handleDeleteProject = async (projectName) => {
    try {
      // Remove the deleted project from the state
      const updatedProjects = projects.filter((project) => project.name !== projectName);
      setProjects(updatedProjects);
  
      // Clear the expanded project view if it's the deleted one
      if (expandedProject === projectName) {
        setExpandedProject(null);
      }
  
      // Use the router to trigger a page refresh
      
    } catch (error) {
      console.error(error);
    }
  };
  

  const isButtonVisible = state.clearanceLevel == 1 || state.clearanceLevel == 2;

  return (
    <Layout>
    <CenteredContentWrapper>
      <div>
        <h1></h1>
        {isButtonVisible && (
          <button onClick={handleProjectAddClick}>Add project</button>
        )}
        {showProjectForm && (
          <div>
            <h2></h2>
            <ProjectForm onSubmit={handleProjectSubmit} projects={projects} onProjectAdded={handleProjectAdded} />
          </div>
        )}

        {/* Display the list of projects */}
        <ul className="projects-grid">
  {Array.isArray(projects) && projects.length > 0 ? (
    projects.map((project, index) => (
      <li key={index} className={`project-card ${expandedProject === index ? 'expanded' : ''}`}>
        <h3 onClick={() => setExpandedProject(expandedProject === index ? null : index)}>
          {project.name}
        </h3>
        <p className={`project-description ${expandedProject === index ? 'expanded' : ''}`}>
          {project.description}
        </p>
        {/* If you have an imageUrl, you can display it here */}
        {project.imageUrl && (
  <img
    src={project.imageUrl}
    alt={project.name}
    className={`project-image ${expandedProject === index ? 'expanded' : ''}`}
    onClick={() => handleProjectClick(project)}
  />
)}
        {isButtonVisible && ( // Conditionally render the Delete Project button
          <DelProjectButton
            projectName={project.name}
            onDeleteProject={handleDeleteProject}
            
          />
        )}
      </li>
    ))
  ) : (
    <p className={`no-projects-message ${Array.isArray(projects) && projects.length === 0 ? 'centered' : ''}`}>
      No projects to display.</p>
  )}
</ul>
{enlargedView && selectedProject && (
<div className="enlarged-project">
              <h2>{selectedProject.name}</h2>
              <p>{selectedProject.description}</p>
              {/* Add any other project details you want to display */}
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.name}
                className="enlarged-project-image"
              />
            </div>
          )}

      </div>
      </CenteredContentWrapper>
    </Layout>
  );
}

export default Projects;