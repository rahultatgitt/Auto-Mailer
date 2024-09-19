const nodemailer = require('nodemailer');
const keys = require('./keys.js');
const generateOTP = require('./utils/otp.js');
const cron = require('node-cron');
const mongoose = require('mongoose');
const OTP = require('./otpSchema.js');  // Assuming otpSchema.js exports a Mongoose model

let username = keys.user;
let password = keys.pass;

// Create a transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: username,
    pass: password
  }
});

mongoose.connect('mongodb://localhost:27017/mailScheduler')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Function to send the OTP via email and save it to the database
async function sendOTP(email) {
  const otp = generateOTP(); // Generate OTP
  console.log(`Generated OTP: ${otp}`);

  // Save OTP to the database
  try {
    const otpEntry = new OTP({
      email: email,
      otp: otp,
      createdAt: new Date()  // Optionally store when the OTP was generated
    });

    await otpEntry.save();
    console.log(`OTP saved to DB for ${email}`);
  } catch (err) {
    console.error('Error saving OTP to DB:', err);
    return;
  }

  // Setup email data
  let mailOptions = {
    from: 'your-email@gmail.com',  // Sender address
    to: email,  // Receiver's email
    subject: 'Your OTP Code',  // Subject line
    text: `Your OTP code is ${otp}. Please use this to complete your authentication.`  // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

// Cron job to send OTP every minute
cron.schedule('*/1 * * * *', () => {
  console.log('Running scheduled task...');
  sendOTP('YourEmail@gmailcom');
});
