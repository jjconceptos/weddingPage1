// uploadToBucket.js
const { Storage } = require('@google-cloud/storage');

// Replace with your bucket name
const bucketName = 'ayf-publicwebapp';

// Replace with the path to the file you want to upload
const filePath = 'lalovich.png'; // Example: 'images/cat.jpg'

// Replace with the new ID you want for the file in the bucket
const destFileName = 'lalitogaleakis'; // Example: 'uploads/cat.jpg'

// Initialize the Google Cloud Storage client
const storage = new Storage();

async function uploadFile() {
  try {
    const options = {
      destination: destFileName,
      // Optional: Add any additional options you need
    };

    await storage.bucket(bucketName).upload(filePath, options);
    console.log(`${filePath} uploaded to ${bucketName}`);
  } catch (error) {
    console.error(error);
  }
}

uploadFile();


