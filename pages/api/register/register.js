import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, lastName, email, username, password } = req.body;

      const userData = {
        name,
        lastName,
        email,
        username,
        password,
        clearanceLevel: "5",
      };

      // Store user data using SET command after converting to JSON
      await kv.set(`user:${username}`, JSON.stringify(userData));

      res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
