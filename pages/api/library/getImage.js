import { Storage } from '@google-cloud/storage';

// Function to initialize the Google Cloud Storage client based on the environment
const initStorage = () => {
  if (process.env.VERCEL_ENV === 'production') {
    // Use environment variable for credentials in production
    return new Storage({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    });
  } else {
    // Use local JSON file for credentials in development
    return new Storage({
      keyFilename: './ayfpublicwebapp-f41d482866a8.json',
    });
  }
};

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      console.log('Received a non-GET request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    // Extract the book names from the query parameters
    const { bookNames } = req.query;

    // Log the received book names
    console.log('Received request for book names list (getImage.js):', bookNames);

    // Split the comma-separated book names into an array
    const bookNamesArray = Array.isArray(bookNames) ? bookNames : bookNames.split(',');

    // Specify the Google Cloud Storage bucket and image filename for each book
    const bucketName = 'ayf-publicwebapp';
    const imageFileNames = bookNamesArray.map((bookName) => `${bookName}.jpg`);
    console.log('Searching for books (getImage.js):', imageFileNames);

    // Initialize the Google Cloud Storage client based on the environment
    const storage = initStorage();

    // Create an array of references to the image files in the bucket
    const filePromises = imageFileNames.map((imageFileName) =>
      storage.bucket(bucketName).file(imageFileName).exists()
    );

    // Check if the files exist in the bucket
    const existsArray = await Promise.all(filePromises);
    const fileExists = existsArray.every((exists) => exists[0]);

    if (!fileExists) {
      console.log('Image(s) not found in storage');
      res.status(404).json({ error: 'Image(s) not found' });
      return;
    }

    // Get signed URLs for the images to make them publicly accessible
    const signedUrls = await Promise.all(
      imageFileNames.map((imageFileName) =>
        storage.bucket(bucketName).file(imageFileName).getSignedUrl({
          action: 'read',
          expires: '01-01-3000', // Adjust the expiration as needed
        })
      )
    );

    // Log the signedUrls array
    console.log('Retrieved signed URLs:', signedUrls);

    // Redirect the client to the signed URLs to fetch the images
    res.status(200).json({ signedUrls });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('Image fetch error: ' + error.message);
  }
}
