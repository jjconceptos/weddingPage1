import nodemailer from 'nodemailer';

async function sendEmail(formData) {
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
    subject: 'Form Submission',
    text: JSON.stringify(formData, null, 2),
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Propagate the error for further handling
  }
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
