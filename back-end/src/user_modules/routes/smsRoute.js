const smsModel  = require('../models/smsModel');
const utils = require('../utils/util');

const { MessagingResponse } = require('twilio').twiml;

module.exports = async function(req, res) {
  try {
    await smsModel.insertTwilioInbox(req);

    // const twiml = new MessagingResponse();
    // twiml.message('The Robots are coming! Head for the hills!');
    // res.type('text/xml').send(twiml.toString());

    const broadcastRecipients = await smsModel.getBroadcastRecipients();
    console.log('recipients: ', broadcastRecipients);
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
  } catch(e) {
    console.log(e);
  }
}