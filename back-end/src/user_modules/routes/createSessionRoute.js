const utils = require('../utils/util')
const sessionModel = require('../models/sessionModel')

module.exports = async function(req, res) {
	try {
		if (!utils.isSet(req.query, 'userid')) {
			res.json({ status: "Error" , message: "userid param is missing." });
			return;
		}

		if (!utils.isSet(req.query, 'expiryinminutes')) {
			res.json({ status: "Error" , message: "expiryinminutes param is missing." });
			return;
		}

		const sessionId = await sessionModel.createSession(req);

		res.json({ status: 'OK', data: sessionId });
	} catch(e) {
		console.log(e)
	}
}