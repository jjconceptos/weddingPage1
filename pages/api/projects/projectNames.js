import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { projectNames } = req.body;

      if (!projectNames || !Array.isArray(projectNames)) {
        console.error('Invalid project names list');
        return res.status(400).json({ message: 'Invalid project names list' });
      }

      // Retrieve the existing project names from the key-value store
      let existingProjectNames = await kv.get('projectnames:');
      if (!existingProjectNames) {
        existingProjectNames = [];
      }

      // Filter out null values and invalid entries
      const validProjectNames = projectNames
        .filter(project => typeof project === "string" && project.trim().length > 0)
        .map(project => project.trim());

      if (validProjectNames.length === 0) {
        console.error('No valid project names found');
        return res.status(400).json({ message: 'No valid project names found' });
      }

      // Append the new project names to the existing list
      const updatedProjectNames = [...existingProjectNames, ...validProjectNames];

      console.log('Received project names list (projectNames.js): ', validProjectNames);

      // Store the updated project names list
      await kv.set('projectnames:', updatedProjectNames);

      console.log('Project names list updated successfully');

      res.status(200).json({ message: "Project names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
