import { Storage } from '@google-cloud/storage';
import multer from 'multer';

// Initialize the Google Cloud Storage client
const storage = new Storage();

// Create a Multer instance for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory for processing
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to initialize Google Cloud Storage based on the environment
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

// Define your API route handler for Google Cloud Storage uploads
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      console.log('Received a non-POST request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    console.log('Received a POST request to /api/projects/projectImage');
    console.log('Request body:', req.body);

    // Use the "upload" Multer middleware to handle file uploads
    upload.single('photo')(req, res, async function (err) {
      if (err) {
        // Handle any Multer errors here
        console.error('Multer error:', err);
        return res.status(500).json('File upload error: ' + err.message);
      }

      // Log the received request and file details
      console.log('Received a file upload request:');
      console.log('Uploaded file:', req.file); // Log the uploaded file details

      // Validate that a file was uploaded
      if (!req.file) {
        console.log('Validation failed: Missing photo');
        return res.status(400).json({ error: 'Photo is required' });
      }

      // Specify the Google Cloud Storage bucket and destination filename
      const bucketName = 'ayf-publicwebapp';
      const timestamp = req.headers.timestamp;
      const projectName = req.headers['image-name'];
      const destFileName = `${projectName}.jpg`; // Assuming it's a JPEG image
      console.log('Uploading photo to Google Cloud Storage:', destFileName);

      // Initialize Google Cloud Storage based on the environment
      const dynamicStorage = initStorage();

      // Upload the file to Google Cloud Storage using the dynamic storage instance
      const bucket = dynamicStorage.bucket(bucketName);
      const file = bucket.file(destFileName);
      const fileBuffer = req.file.buffer;

      await file.save(fileBuffer, {
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      console.log('Image data processing completed');

      // Respond with a success message
      res.status(200).json('File upload complete');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('File upload error: ' + error.message);
  }
}
