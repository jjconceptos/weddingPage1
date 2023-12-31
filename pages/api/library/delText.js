import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method === "DELETE") { // Update the method check to DELETE
    try {
      const { bookName } = req.body;

      if (!bookName) {
        res.status(400).json({ message: "Invalid request: Provide a book name" });
        return;
      }

      console.log("Received DELETE Text (title and description) Request for book:", bookName);

      // Define the key for the book text data
      const bookTextKey = `book:${bookName}`;

      // Delete the book text data
      await kv.del(bookTextKey);

      console.log("Deleted Text (title and description) for book:", bookName);

      res.status(200).json({ message: "Book text data deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
