/*
 * Route for Twilio webhook.
 */

const smsModel  = require('../models/smsModel');
const utils = require('../utils/util');
const dotenv = require('dotenv');

const { MessagingResponse } = require('twilio').twiml;

const mailTransporter = require('../utils/mailTransporter');

module.exports = async function(req, res) {
  try {
    dotenv.config();

    await smsModel.insertTwilioInbox(req);

    // const twiml = new MessagingResponse();
    // twiml.message('The Robots are coming! Head for the hills!');
    // res.type('text/xml').send(twiml.toString());

    // const broadcastRecipients = await smsModel.getBroadcastRecipients();

    if (process.env.SMS_ARRIVE_SMS_NOTIF.toLowerCase() === 'true') {
      const broadcastRecipients = process.env.SMS_ARRIVE_SMS_RECIPIENTS.split(';');
      const sms = `Scheduler notification: A new text message has arrived!`;

      broadcastRecipients.forEach(async (item) => {
        const messageSid = await utils.sendSms(item.mobileNo, sms);
        const data = {
          recipient: item.mobileNo,
          smsMessage: sms,
          smsStatus: 'Sent',
        }

        await smsModel.insertSms(data, messageSid, 'Sent');
      });
    }

    // After broadcasting through SMS, send an email to notify if true.
    if (process.env.SMS_ARRIVE_EMAIL_NOTIF.toLowerCase() === 'true')
      await sendEmail();
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