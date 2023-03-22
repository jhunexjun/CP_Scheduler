const utils = require('../utils/util')
const logoutModel = require("../models/logoutModel")


module.exports = async function(req, res) {
	try {
		// if (!utils.isSet(req.body, 'sessionId')) {
		// 	res.json({ status: "Error" , message: "session id is missing." });
		// 	return;
		// }

		let rowsAffected = await logoutModel.logoutSession(req);
		if (rowsAffected <= 0)
			res.json({ status: "OK", message: 'Logging out NOT successful.'});
		else
			res.json({ status: "OK", message: 'Logging out successful.'});
	} catch(e) {
		console.log("Error in locationRoute: ", e);
	}
}

function isSetScalar(param) {
	if (param === undefined || param === null || param === "")
		return false;
	else
		return true;
}