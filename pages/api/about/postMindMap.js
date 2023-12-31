import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { id, position, text, size, links } = req.body || {};

      // Validate at least one field is present
      if (!id || !position || !text || !size) {
        console.error('All of id, position, text, and size are required');
        return res.status(400).json({ message: 'All of id, position, text, and size are required' });
      }

      // Ensure position contains valid coordinates
      if (!position.x || !position.y) {
        console.error('Valid coordinates in the position field are required');
        return res.status(400).json({ message: 'Valid coordinates in the position field are required' });
      }

      // Retrieve existing mindMapNodes or initialize an empty array
      const existingNodes = await kv.get('mindMapNodes:') || [];

      // Check if the node with the same ID already exists
      const existingNodeIndex = existingNodes.findIndex(node => node.id === id);

      const mindMapNode = {
        id,
        position,
        text,
        size,
        links: links || [], // Add the links property to the node, initializing as an empty array if not provided
      };

      // If the node with the same ID exists, update it; otherwise, append a new one
      if (existingNodeIndex !== -1) {
        existingNodes[existingNodeIndex] = mindMapNode;
      } else {
        existingNodes.push(mindMapNode);
      }

      // Store the updated array using SET command after converting to JSON
      await kv.set('mindMapNodes:', JSON.stringify(existingNodes));

      console.log('Request Body:', req.body);

      res.status(200).json({ message: "Mind map node data uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
