/*
 * Route for Twilio webhook.
 */

const smsModel  = require('../models/smsModel');
const utils = require('../utils/util');

const { MessagingResponse } = require('twilio').twiml;

const mailTransporter = require('../utils/mailTransporter');

module.exports = async function(req, res) {
  try {
    await smsModel.insertTwilioInbox(req);

    // const twiml = new MessagingResponse();
    // twiml.message('The Robots are coming! Head for the hills!');
    // res.type('text/xml').send(twiml.toString());

    const broadcastRecipients = await smsModel.getBroadcastRecipients();
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

    // After broadcasting, send an email to notify.
    // send mail with defined transport object
    await sendEmail();
  } catch(e) {
    console.log(e);
  }
}

async function sendEmail() {
  // send mail with defined transport object
  const info = await mailTransporter.sendMail({
    from: 'jmorcilla@computant.com', // sender address
    to: "jmorcilla@computant.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
}