import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the project name to delete from the request body
      const { projectName } = req.body;

      if (!projectName) {
        res.status(400).json({ message: "Invalid request: Provide a project name to delete" });
        return;
      }

      // Define the key for the project names list in your Redis database
      const projectNamesKey = "projectnames:";

      // Get the current list of project names from Redis
      let projectNames = await kv.get(projectNamesKey);

      if (!projectNames) {
        projectNames = [];
      }

      // Remove the specified project name from the list
      projectNames = projectNames.filter(name => name !== projectName);

      // Store the updated list back in Redis
      await kv.set(projectNamesKey, projectNames);

      // Log that the project name was deleted successfully
      console.log('Project name deleted successfully:', projectName);

      res.status(200).json({ message: "Project name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
