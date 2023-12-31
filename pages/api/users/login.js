import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { username, password } = req.body;

      const userKey = `user:${username}`;
      const storedUserData = await kv.get(userKey);

      if (storedUserData && storedUserData.password === password) {
        // Successful login
        res.status(200).json({ message: 'Login successful', clearanceLevel: storedUserData.clearanceLevel });
      } else {
        // Failed login
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
