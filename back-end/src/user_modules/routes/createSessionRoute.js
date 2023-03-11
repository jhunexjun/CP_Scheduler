const sessionModel = require('../models/sessionModel')

module.exports = async function(req, res) {
	try {
		// if (req.query.) // more error-trap here.

		const sessionId = await sessionModel.createSession(req)

		res.json({ status: 'OK', data: sessionId });
	} catch(e) {
		console.log(e)
	}
}