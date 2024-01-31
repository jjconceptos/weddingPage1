import multer from 'multer';
import nodemailer from 'nodemailer';

// Create a Multer instance for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(), // Store the file in memory for processing
});

export const config = {
  api: {
    bodyParser: false,
  },
};

// Function to send an email with the attached image
const sendEmailWithImage = async (formData, imageBuffer) => {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'comproterreno4@gmail.com',
      pass: 'denl ehnd uxvy nghl',
    },
  });

  // Setup email data
  const mailOptions = {
    from: 'comproterreno4@gmail.com',
    to: 'a01024815@tec.mx', // Replace with the actual destination email
    subject: 'Form Submission with Image',
    text: JSON.stringify(formData, null, 2),
    attachments: [
      {
        filename: 'uploaded-image.jpg', // Adjust the filename as needed
        content: imageBuffer,
        encoding: 'base64',
      },
    ],
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate the error for further handling
  }
};

// Define your API route handler for file uploads
export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      console.log('Received a non-POST request:', req.method);
      res.status(400).send(`Invalid method: ${req.method}`);
      return;
    }

    console.log('Received a POST request');
    console.log('Request body:', req.body);

    // Use the "upload" Multer middleware to handle file uploads
    upload.single('landPhoto')(req, res, async function (err) {
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

      // Send an email with the attached image
      await sendEmailWithImage(req.body, req.file.buffer);

      // Respond with a success message
      res.status(200).json('File upload complete');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json('File upload error: ' + error.message);
  }
}
