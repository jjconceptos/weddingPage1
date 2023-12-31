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

      // Retrieve the books names list from the key-value store
      const bookNames = await kv.get('booknames:');

      console.log("Received GET Request for book names");
      console.log("Fetched Book Names List:", bookNames);

      // Check if bookNames is not null and is an array
      if (bookNames && Array.isArray(bookNames)) {
        res.status(200).json(bookNames);
      } else {
        console.error('Invalid book names list');
        res.status(500).json({ message: 'Invalid book names list' });
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
