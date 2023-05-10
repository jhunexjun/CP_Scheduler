const smsModel  = require('../models/smsModel');

const { MessagingResponse } = require('twilio').twiml;

const fs = require('fs');

module.exports = async function(req, res) {
	try {
		await smsModel.insertTwilioInbox(req);
	
		const twiml = new MessagingResponse();
		twiml.message('The Robots are coming! Head for the hills!');
		res.type('text/xml').send(twiml.toString());
		// res.json('Okay!!!');

		// const jsonString = JSON.stringify(req.body);
		// const jsonString = JSON.stringify({test1: '1', test2: '2'});
		// console.log(jsonString);

		// if (Object.keys(jsonString).length > 0) {
		// 	fs.writeFile('C:\\Jhun\\scheduler.json', jsonString, 'utf8', (err) => {
		// 		if (err) {
		// 			console.log(err);
		// 		} else {
		// 			console.log('File written successfully.\n');
		// 			console.log('The file written is:\n');
		// 			console.log(fs.readFileSync('c:\\Jhun\\scheduler.json', 'utf8'));
		// 		}
		// 	});
		// }

		// return { status: 'OK', message: `SMS successfully sent to ${req.body.From}. SID: ${req.body.MessageSid}` };
		
	} catch(e) {
		console.log(e);
	}
}