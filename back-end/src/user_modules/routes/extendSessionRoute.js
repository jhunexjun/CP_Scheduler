const utils = require('../utils/util');
const extendSessionModel = require('../models/extendSessionModel');

module.exports = async function(req, res) {
	try {
		// if (!utils.isSet(req.body, 'sessionId')) {	// note: // case-sensitive sessionId != sessionid; if url all should be small letters;
		// 	res.json({ status: "Error" , message: "session id param is missing." });
		// 	return;
		// }

		if (!utils.isSet(req.body, 'expiryInMinutes')) {
			res.json({ status: "Error" , message: "expiryInMinutes param is missing." });
			return;
		}

		let session = await extendSessionModel.extendSession(req);

		if (session.hasOwnProperty('errorNo'))
			res.json({ status: 'Error', message: session.errMsg })
		else
			res.json({ status: "OK", data: { sessionId: session.sessionId }, });
	} catch(e) {
		console.log('Error in extendSessionRoute: ', e)
	}
}