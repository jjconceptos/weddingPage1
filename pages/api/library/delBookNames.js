import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Get the book name to delete from the request body
      const { bookName } = req.body;

      if (!bookName) {
        res.status(400).json({ message: "Invalid request: Provide a book name to delete" });
        return;
      }

      // Define the key for the book names list in your Redis database
      const bookNamesKey = "booknames:";

      // Get the current list of book names from Redis
      let bookNames = await kv.get(bookNamesKey);

      if (!bookNames) {
        bookNames = [];
      }

      // Remove the specified book name from the list
      bookNames = bookNames.filter(name => name !== bookName);

      // Store the updated list back in Redis
      await kv.set(bookNamesKey, bookNames);

      // Log that the book name was deleted successfully
      console.log('Book name deleted successfully:', bookName);

      res.status(200).json({ message: "Book name deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
