import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      // Get the requesting origin
      const requestingOrigin = req.headers.origin || 'http://localhost:3000';

      // Set the CORS headers to allow the requesting origin
      res.setHeader('Access-Control-Allow-Origin', requestingOrigin);
      res.setHeader('Access-Control-Allow-Methods', 'GET');

      // Retrieve the project names list from the key-value store
      const projectNames = await kv.get('projectnames:');

      console.log("Received GET Request for project names");
      console.log("Fetched Project Names List:", projectNames);

      // Check if projectNames is not null and is an array
      if (projectNames && Array.isArray(projectNames)) {
        res.status(200).json(projectNames);
      } else {
        console.error('Invalid project names list');
        res.status(500).json({ message: 'Invalid project names list' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}
