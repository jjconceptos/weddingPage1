import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const search = req.query.search;

      // Get user data from KV storage
      const userData = await kv.get(`user:${search}`);

      console.log("Retrieved user data from KV:", userData);

      if (userData) {
        res.status(200).json(userData); // Send the retrieved JSON data as response
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
