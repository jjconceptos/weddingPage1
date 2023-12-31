import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { username, email, name, lastName } = req.body;

      if (!username && !email && !(name && lastName)) {
        res.status(400).json({ message: "Invalid request: Provide username, email, or name and last name" });
        return;
      }

      const userKey = `user:${username || email || `${name}:${lastName}`}`;
      
      await kv.del(userKey);

      const metadataKeys = [
        
        `user:${username || email || `${name}:${lastName}`}`,
        
      ];
      
      for (const key of metadataKeys) {
        await kv.del(key);
      }
      console.log('Metadata Keys:', metadataKeys);
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
