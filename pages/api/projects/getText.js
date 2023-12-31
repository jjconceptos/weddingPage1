import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { projectNames } = req.query;

      console.log("Received GET Request for project text");
      console.log("Received Project Names (getText.js):", projectNames);

      // Validate projectNames if needed
      if (!projectNames || typeof projectNames !== 'string') {
        console.error('Project names string is required');
        return res.status(400).json({ message: 'Project names string is required' });
      }

      // Split the comma-separated project names
      const projectNamesArray = JSON.parse(projectNames);
      


      // Initialize an object to store project text data
      const projectsTextData = {};

     
// Loop through the project names and retrieve text data for each
for (const projectName of projectNamesArray) {
  console.log("Retrieving text data for project (getText.js):", projectName);
  const projectTextData = await kv.get(`project:${projectName}`);

  if (projectTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedProjectTextData = typeof projectTextData === 'string' ? JSON.parse(projectTextData) : projectTextData;
      projectsTextData[projectName] = parsedProjectTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for project:', projectName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this project or setting a default value.
    }
  }
}



      console.log("Fetched Projects Text Data:", projectsTextData);

      res.status(200).json(projectsTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

