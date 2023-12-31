export async function fetchProjectsData() {
  try {
    // Define the base API URL
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

    // Construct the URL for fetching project names
    const projectNamesURL = `${apiBaseUrl}/api/projects/getProjectNames`;
    console.log('Fetching URL (fetchProjects.js) for: ', projectNamesURL);

    const projectNamesResponse = await fetch(projectNamesURL);
    if (!projectNamesResponse.ok) {
      throw new Error('Failed to fetch project names');
    }

    const projectNamesData = await projectNamesResponse.json();
    console.log('Received Project Names (fetchProjects.js): ', projectNamesData);

    // Construct the URL for fetching project text
    const textURL = `${apiBaseUrl}/api/projects/getText?projectNames=${encodeURIComponent(JSON.stringify(projectNamesData))}`;
    console.log('Fetching response for getText.js (fetchProjects.js): ', textURL);
    const textResponse = await fetch(textURL);

    // Construct the URL for fetching project image
    const imageURL = `${apiBaseUrl}/api/projects/getImage?projectNames=${encodeURIComponent(projectNamesData)}`;
    console.log('Fetching response for getImage.js (fetchProjects.js): ', imageURL);
    const imageResponse = await fetch(imageURL);

    // Check if the responses are successful
    if (!textResponse.ok || !imageResponse.ok) {
      throw new Error('Failed to fetch data');
    }

    const textData = await textResponse.json();
    const imageData = await imageResponse.json();

    console.log('Text Data:', textData);
    console.log('Image Data:', imageData);

    // Combine text and image data
    const combinedProjects = combineTextAndImage(textData, imageData, projectNamesData);

    return combinedProjects;
  } catch (error) {
    console.error('Error fetching projects (fetchProjects.js):', error);
    return [];
  }
}

function combineTextAndImage(textData, imageData, projectNamesData) {
  // Convert imageData to an array of project objects
  const imageProjectsArray = imageData.signedUrls;

  // Convert textData to an array of project objects
  const textProjectsArray = Object.values(textData);

  // Combine the filtered data
  const combinedProjects = textProjectsArray.map((textProject) => {
    const matchingImageProject = imageProjectsArray.find((imageProject) =>
      imageProject[0].toLowerCase().includes(`${textProject.name.toLowerCase()}.jpg`)
    );
    return {
      ...textProject,
      // Set imageUrl to the matching URL
      imageUrl: matchingImageProject ? matchingImageProject[0] : null,
    };
  });

  return combinedProjects;
}