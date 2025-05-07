const express = require('express');
const app = express();
const PORT = 5000;
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const hotelRoutes = require('./routes/hotelRoutes');
const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true, 
  auth: {
      user:'hotel.fyp@zohomail.com',
      pass:'Passforfyp123!'
  }
});


transport.verify((error, success) => {
  if (error) {
    console.error('Error connecting to Zoho Mail:', error);
  } else {
    console.log('Successfully connected to Zoho Mail!');
  }
});


app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['http://localhost:5173'];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(adminRoutes);
app.use(hotelRoutes);
app.post('/send-booking-confirmation-email', async (req, res) => {
  const { userEmail, roomType, price, checkInDate, checkOutDate } = req.body;

  if (!userEmail || !roomType || !price || !checkInDate || !checkOutDate) {
    return res.status(400).json({ error: 'Missing required booking details for email.' });
  }

  const mailOptions = {
    from: 'hotel.fyp@zohomail.com', 
    to: userEmail,
    subject: 'Your Booking Confirmation!',
    html: `
      <p>Dear Guest,</p>
      <p>Thank you for your booking with us!</p>
      <p>Here are your booking details:</p>
      <ul>
        <li>Room Type: ${roomType}</li>
        <li>Check-in Date: ${new Date(checkInDate).toLocaleDateString()}</li>
        <li>Check-out Date: ${new Date(checkOutDate).toLocaleDateString()}</li>
        <li>Total Price: $${price}</li>
      </ul>
      <p>We look forward to welcoming you!</p>
      <p>Sincerely,</p>
      <p>The Team at Your Hotel</p>
    `,
  };

  try {
    const info = await transport.sendMail(mailOptions);
    console.log('Confirmation email sent:', info.messageId);
    res.json({ message: 'Confirmation email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send confirmation email.' });
  }
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const upload = multer({ dest: 'uploads/' });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});