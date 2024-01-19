/*
 * Route for Twilio webhook.
 */
const { randomUUID } = require('crypto'); // Added in: node v14.17.0

const customersModel = require('../models/customersModel');
const smsModel  = require('../models/smsModel');
const utils = require('../utils/util');
const dotenv = require('dotenv');

const { MessagingResponse } = require('twilio').twiml;

const mailTransporter = require('../utils/mailTransporter');

module.exports = async function(req, res) {
  try {
    dotenv.config();

    const id = await smsModel.insertTwilioInbox(req);

    // const broadcastRecipients = await smsModel.getBroadcastRecipients(); // not being used.

    if (process.env.SMS_ARRIVE_SMS_NOTIF.toLowerCase() == 'true') {
      const broadcastRecipients = process.env.SMS_ARRIVE_SMS_RECIPIENTS.split(';');
      let sms = `Scheduler notification: A new text message has arrived`;

      const customer = await customersModel.getCustomerByMobileNo(req);
      if (customer.length > 0) {
        sms += ` from ${customer.NAM}.`;
      } else {
        sms += `!`;
      }

      broadcastRecipients.forEach(async (mobileNumber) => {
        const messageSid = await utils.sendSms(mobileNumber, sms); // send it with Twilio.

        const data = {
          sessionId: randomUUID(),
          recipient: mobileNumber,
          smsMessage: sms,
          // smsStatus: 'Sent',
        }

        await smsModel.insertSms2(data, messageSid, 'Sent', 'N'); // after sending the SMS, record it to database.
      });
    }

    // After broadcasting through SMS, send an email to notify if true.
    if (process.env.SMS_ARRIVE_EMAIL_NOTIF.toLowerCase() == 'true')
      await sendEmail();

    const twiml = new MessagingResponse();
    twiml.message(`Successfully received SMS. id:${id}`);
    res.type('text/xml').send(twiml.toString());
  } catch(e) {
    console.log(e);
  }
}

async function sendEmail() {
  // Send mail with defined transport object
  const info = await mailTransporter.sendMail({
    from: 'jmorcilla@computant.com', // sender address
    to: process.env.SMS_ARRIVE_EMAIL_RECIPIENTS, // list of receivers
    subject: "Scheduler System: New SMS", // Subject line
    text: "The Scheduler system received a new SMS from a certain customer.", // plain text body
  });

  // console.log("Message sent: %s", info.messageId);
}