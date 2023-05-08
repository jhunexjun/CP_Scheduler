const { MessagingResponse } = require('twilio').twiml;

module.exports = async function(req, res) {
	const twiml = new MessagingResponse();

	twiml.message('The Robots are coming! Head for the hills!');

	res.type('text/xml').send(twiml.toString());
}