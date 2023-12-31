import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const requestType = req.method;

  if (requestType === "GET") {
    try {
      const { bookNames } = req.query;

      console.log("Received GET Request for book text");
      console.log("Received Book Names (getText.js):", bookNames);

      // Validate bookNames if needed
      if (!bookNames || typeof bookNames !== 'string') {
        console.error('Book names string is required');
        return res.status(400).json({ message: 'Book names string is required' });
      }

      // Split the comma-separated book names
      const bookNamesArray = JSON.parse(bookNames);
      


      // Initialize an object to store book text data
      const booksTextData = {};

     
// Loop through the book names and retrieve text data for each
for (const bookName of bookNamesArray) {
  console.log("Retrieving text data for book (getText.js):", bookName);
  const bookTextData = await kv.get(`book:${bookName}`);

  if (bookTextData !== null) {
    try {
      // Attempt to parse the JSON data, but check if it's already an object
      const parsedBookTextData = typeof bookTextData === 'string' ? JSON.parse(bookTextData) : bookTextData;
      booksTextData[bookName] = parsedBookTextData;
    } catch (parseError) {
      console.error('Error parsing JSON for book:', bookName);
      console.error(parseError);
      // Handle the error, e.g., by skipping this book or setting a default value.
    }
  }
}



      console.log("Fetched Books Text Data:", booksTextData);

      res.status(200).json(booksTextData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    console.log("Received Request Type:", requestType);
    res.status(405).json({ message: "Method not allowed" });
  }
}

