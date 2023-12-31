// Create a file called localStorage.js in your project directory

// Function to get the projects from localStorage
export function getProjects() {
    // Get projects from localStorage or return an empty array if there are none
    return JSON.parse(localStorage.getItem('projects')) || [];
  }

// Function to add a project to localStorage
export function addProject(project) {
    // Get existing projects from localStorage
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Add the new project to the array
    storedProjects.push(project);
    
    // Save the updated projects array back to localStorage
    localStorage.setItem('projects', JSON.stringify(storedProjects));
  }

// Function to update a project in localStorage
export const updateProject = (updatedProject) => {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.id === updatedProject.id);
  if (index !== -1) {
    projects[index] = updatedProject;
    localStorage.setItem('projects', JSON.stringify(projects));
  }
};

// Function to delete a project from localStorage
export const deleteProject = (projectId) => {
  const projects = getProjects();
  const updatedProjects = projects.filter((project) => project.id !== projectId);
  localStorage.setItem('projects', JSON.stringify(updatedProjects));
};

