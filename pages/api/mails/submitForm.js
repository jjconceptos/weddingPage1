// /api/submitForm.js
import nodemailer from 'nodemailer';

async function sendEmail(formData) {
  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        /*
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
      */
      user: 'a01024815@tec.mx',
      pass: 'trafalgarA.9',
    },
  });

  // Setup email data
  const mailOptions = {
    //from: process.env.EMAIL_USER,
    from: 'a01024815@tec.mx',
    to: 'comproterreno4@gmail.com', // Replace with the actual destination email
    subject: 'Form Submission',
    text: JSON.stringify(formData, null, 2),
  };

  // Send the email
  await transporter.sendMail(mailOptions);
}

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const formData = req.body;

      // Log that the request was received
      console.log('Form submission request received:', formData);

      // Additional processing logic here if needed

      // Send the processed data to the email function
      await sendEmail(formData);

      // Log that the email was sent successfully
      console.log('Email sent successfully:', formData);

      res.status(200).json({ message: 'Form submitted successfully' });
    } else {
      // Log that an invalid method was used
      console.log('Invalid method:', req.method);
      
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    // Log any errors that occurred during form processing
    console.error('Error processing form:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
