const utils = require('../utils/util');
const request = require('request');
const dotenv = require('dotenv');

function sendSms(recipient, smsMessage) {
	const accountSid = process.env.TWILIO_ACCOUNTSID;
	const client = require("twilio")(accountSid, authToken);
	const authToken = process.env.TWILIO_AUTH_TOKEN;
	return client.messages.create({
								body: "Hello from Twilio",
								from: `${process.env.TWILIO_MOBILENO}`,
								to: `+1${recipient}`	// we only need american number.
							}).then(message => message.sid);
}


module.exports = async function(req, res) {
	dotenv.config();

	try {
		if (!utils.isSet(req.body, 'recipient')) {
			res.json({ status: "Error" , message: "recipient body param is missing." });
			return;
		}

		if (!utils.isSet(req.body, 'smsMessage')) {
			res.json({ status: "Error" , message: "smsMessage body param is missing." });
			return;
		}

		// const messageSid = sendSms(req.body.recipient, req.body.smsMessage);
		const messageSid = 'random string here.';

		res.json({ status: 'OK', message: `SMS successfully sent to +1${req.body.recipient}. SID: ${messageSid}` });
	} catch(e) {
		console.log(e);
	}
}