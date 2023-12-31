import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { bookNames } = req.body;

      if (!bookNames || !Array.isArray(bookNames)) {
        console.error('Invalid book names list');
        return res.status(400).json({ message: 'Invalid book names list' });
      }

      // Retrieve the existing book names from the key-value store
      let existingBookNames = await kv.get('booknames:');
      if (!existingBookNames) {
        existingBookNames = [];
      }

      // Filter out null values and invalid entries
      const validBookNames = bookNames
        .filter(book => typeof book === "string" && book.trim().length > 0)
        .map(book => book.trim());

      if (validBookNames.length === 0) {
        console.error('No valid book names found');
        return res.status(400).json({ message: 'No valid book names found' });
      }

      // Append the new book names to the existing list
      const updatedBookNames = [...existingBookNames, ...validBookNames];

      console.log('Received book names list (bookNames.js): ', validBookNames);

      // Store the updated books names list
      await kv.set('booknames:', updatedBookNames);

      console.log('Book names list updated successfully');

      res.status(200).json({ message: "Book names list updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
