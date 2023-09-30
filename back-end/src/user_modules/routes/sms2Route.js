const utils = require('../utils/util');
// const request = require('request');
const dotenv = require('dotenv');
const smsModel = require('../models/smsModel');
const mailTransporter = require('../utils/mailTransporter');

let resData;

module.exports = async function(req, res) {
  dotenv.config();

  try {
    switch(req.method) {
      case 'GET':
        const sms = await getSms(req);

        if (sms.length <= 0) {
          res.json({ status: "OK", data: [] });
        } else {
          if (sms[0].hasOwnProperty('errorNo'))
            resData = { status: "Error", message: sms[0].errMsg, data: [] };
          else
            resData = { status: "OK", message: "Okay", data: sms }

          res.json(resData);
        }
        break;
      case 'POST':
        resData = await addSms(req);
        res.json(resData);
        break;
      default:
        res.json({ status: 'OK', message: 'Okay' });
    }
  } catch(e) {
    await smsModel.insertSms(req, '0', 'Outbox');
    console.log(e);
  }
}

async function addSms(req) {
  if (!utils.isSet(req.body, 'recipient')) {
    res.json({ status: "Error" , message: "recipient body param is missing." });
    return;
  }

  if (!utils.isSet(req.body, 'smsMessage')) {
    res.json({ status: "Error" , message: "smsMessage body param is missing." });
    return;
  }

  // const countryCode = '+1';  // we only need american number.
  // req.body.recipient = countryCode + req.body.recipient;

  try {
    // Send SMS via Twilio.
    const messageSid = await utils.sendSms(req.body.recipient, req.body.smsMessage);
    // Save SMS to db.
    await smsModel.insertSms(req, messageSid, 'Sent');

    return { status: 'OK', message: `SMS successfully sent to ${req.body.recipient}. SID: ${messageSid}` };
  } catch(e) {
    console.log(e);
    return { status: 'Error', message: `Undelivered SMS. You may ask assistance from the software developer. SID: 0` };
  }
}

async function getSms(req) {
  return smsModel.getSms(req);
}