const smsModel  = require('../models/smsModel');

const { MessagingResponse } = require('twilio').twiml;

module.exports = async function(req, res) {
	try {
		await smsModel.insertTwilioInbox(req);

		// const twiml = new MessagingResponse();
		// twiml.message('The Robots are coming! Head for the hills!');
		// res.type('text/xml').send(twiml.toString());
	} catch(e) {
		console.log(e);
	}
}