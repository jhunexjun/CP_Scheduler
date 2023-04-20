const utils = require('../utils/util');
const request = require('request');
const dotenv = require('dotenv');
const smsModel = require('../models/smsModel');

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

	const countryCode = '+1';
	req.body.recipient = countryCode + req.body.recipient;

	//const messageSid = sendSms(req.body.recipient, req.body.smsMessage);
	const messageSid = 'dfdsf86ndmeh1l';
	await smsModel.insertSms(req, messageSid, 'Sent');


	// const messageSid = 'random string here.';
	return { status: 'OK', message: `SMS successfully sent to +1${req.body.recipient}. SID: ${messageSid}` };
}

function sendSms(recipient, smsMessage) {
	const accountSid = process.env.TWILIO_ACCOUNTSID;
	const client = require("twilio")(accountSid, authToken);
	const authToken = process.env.TWILIO_AUTH_TOKEN;
	return client.messages.create({
								body: smsMessage,
								from: `${process.env.TWILIO_MOBILENO}`,
								to: `+1${recipient}`	// we only need american number.
								// to: `+63${recipient}`	// we only need american number.
							}).then(message => message.sid);
}

async function getSms(req) {
	return smsModel.getSms(req);
}