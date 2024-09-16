const nodemailer = require('nodemailer');
const keys = require('./keys.js');
const generateOTP = require('./utils/otp.js');

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

// Function to send OTP
function sendOTP(email, otp) {
  let mailOptions = {

    from: 'your-email@gmail.com', // sender address
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. Please use this code to complete your authentication.` // Plain text body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}


// Function to send the OTP via email
function sendOTP(email) {
  const otp = generateOTP(); // Generate OTP
  console.log(`Generated OTP: ${otp}`);

  // Setup email data
  let mailOptions = {
    from: 'your-email@gmail.com', // Sender address
    to: email, // Receiver's email
    subject: 'Your OTP Code', // Subject line
    text: `Your OTP code is ${otp}. Please use this to complete your authentication.` // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
}

  

// Call the sendOTP function with the recipient's email
sendOTP('seriesmovie71@gmail.com, rahul.usp@outlook.com');
