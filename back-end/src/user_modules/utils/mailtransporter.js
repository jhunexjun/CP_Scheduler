const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

module.exports = nodemailer.createTransport({
  port: process.env.MAIL_PORT,
  host: process.env.MAIL_HOST,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: process.env.MAIL_SECURE == 'false' ? false : true,
  
  // For Office 365
  // tls: {
  //   ciphers: 'SSLv3'
  // },
  // requireTLS: false,  // maybe needed for Office 365.
});