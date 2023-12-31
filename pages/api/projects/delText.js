import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "DELETE") { // Update the method check to DELETE
    try {
      const { projectName } = req.body;

      if (!projectName) {
        res.status(400).json({ message: "Invalid request: Provide a project name" });
        return;
      }

      console.log("Received DELETE Text (title and description) Request for project:", projectName);

      // Define the key for the project text data
      const projectTextKey = `project:${projectName}`;

      // Delete the project text data
      await kv.del(projectTextKey);

      console.log("Deleted Text (title and description) for project:", projectName);

      res.status(200).json({ message: "Project text data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
