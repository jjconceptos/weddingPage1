// pages/api/getMindMapNodes.js
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      // Retrieve existing mindMapNodes or initialize an empty array
      const mindMapNodes = await kv.get('mindMapNodes:') || [];
      res.status(200).json(mindMapNodes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
